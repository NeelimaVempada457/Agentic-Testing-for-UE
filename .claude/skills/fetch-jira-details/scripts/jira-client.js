'use strict';

const axios = require('axios');

class JiraClient {
  constructor(baseUrl, email, apiToken, logger) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.email = email;
    this.apiToken = apiToken;
    this.logger = logger;
    this.maxRetries = 3;
    this.retryBaseDelay = 1000;

    // Cloud: email + token via Basic auth. Server: token as Bearer when no email.
    this.isCloud = this.baseUrl.includes('atlassian.net');
    if (this.isCloud || email) {
      const credentials = Buffer.from(`${email}:${apiToken}`).toString('base64');
      this.authHeader = `Basic ${credentials}`;
    } else {
      this.authHeader = `Bearer ${apiToken}`;
    }

    this.http = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: this.authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 30000,
    });
  }

  // ─── Core HTTP ────────────────────────────────────────────────────────────────

  async _request(method, url, config = {}, attempt = 0) {
    try {
      const response = await this.http[method](url, config);
      return response.data;
    } catch (err) {
      const status = err.response?.status;
      const isRetryable = !status || status === 429 || status >= 500;

      if (isRetryable && attempt < this.maxRetries) {
        const delay = this.retryBaseDelay * Math.pow(2, attempt);
        this.logger.warn(
          `Request failed [${status || 'network'}] → ${url}. Retry ${attempt + 1}/${this.maxRetries} in ${delay}ms`
        );
        await this._sleep(delay);
        return this._request(method, url, config, attempt + 1);
      }

      const msg =
        err.response?.data?.errorMessages?.join(', ') ||
        err.response?.data?.message ||
        err.message;
      throw new Error(`[${status || 'ERR'}] ${msg} (${url})`);
    }
  }

  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get(endpoint, params = {}) {
    return this._request('get', endpoint, { params });
  }

  async getBuffer(url) {
    try {
      const response = await this.http.get(url, {
        responseType: 'arraybuffer',
        baseURL: '',          // override — url is already absolute
        headers: { Authorization: this.authHeader },
      });
      return Buffer.from(response.data);
    } catch (err) {
      throw new Error(`Download failed: ${err.message} (${url})`);
    }
  }

  // ─── Issue ────────────────────────────────────────────────────────────────────

  async validateTicket(ticketId) {
    try {
      await this.get(`/rest/api/2/issue/${ticketId}`, { fields: 'summary' });
      return true;
    } catch (err) {
      if (err.message.includes('[404]')) return false;
      throw err;
    }
  }

  async getIssue(ticketId) {
    this.logger.info(`Fetching issue: ${ticketId}`);
    return this.get(`/rest/api/2/issue/${ticketId}`, {
      expand: 'renderedFields,names,schema,transitions,changelog',
    });
  }

  // ─── Comments (paginated) ─────────────────────────────────────────────────────

  async getAllComments(ticketId) {
    this.logger.info('Fetching comments…');
    const all = [];
    let startAt = 0;
    const maxResults = 100;

    while (true) {
      const page = await this.get(`/rest/api/2/issue/${ticketId}/comment`, {
        startAt,
        maxResults,
        orderBy: 'created',
      });
      const batch = page.comments || [];
      all.push(...batch);
      if (all.length >= page.total || batch.length === 0) break;
      startAt += batch.length;
    }

    this.logger.info(`  → ${all.length} comment(s)`);
    return all;
  }

  // ─── Changelog (paginated, separate endpoint) ─────────────────────────────────

  async getChangelog(ticketId) {
    this.logger.info('Fetching changelog…');
    try {
      const all = [];
      let startAt = 0;
      const maxResults = 100;

      while (true) {
        const page = await this.get(`/rest/api/2/issue/${ticketId}/changelog`, {
          startAt,
          maxResults,
        });
        const batch = page.values || [];
        all.push(...batch);
        if (all.length >= page.total || batch.length === 0) break;
        startAt += batch.length;
      }

      this.logger.info(`  → ${all.length} history entries`);
      return all;
    } catch (err) {
      this.logger.warn(`Changelog unavailable: ${err.message}`);
      return [];
    }
  }

  // ─── Epic ─────────────────────────────────────────────────────────────────────

  async getEpic(epicKey) {
    this.logger.info(`Fetching epic: ${epicKey}`);
    try {
      return await this.get(`/rest/api/2/issue/${epicKey}`, {
        fields: 'summary,description,status,assignee,priority,customfield_10014',
      });
    } catch (err) {
      this.logger.warn(`Epic fetch failed (${epicKey}): ${err.message}`);
      return null;
    }
  }

  // ─── Sprint (Agile API) ───────────────────────────────────────────────────────

  async getSprintFromAgileApi(issueIdOrKey) {
    this.logger.info('Fetching sprint via Agile API…');
    try {
      return await this.get(`/rest/agile/1.0/issue/${issueIdOrKey}`, {
        fields: 'sprint,closedSprints',
      });
    } catch (err) {
      this.logger.warn(`Agile API unavailable: ${err.message}`);
      return null;
    }
  }

  // ─── Remote Links ─────────────────────────────────────────────────────────────

  async getRemoteLinks(ticketId) {
    this.logger.info('Fetching remote links…');
    try {
      return await this.get(`/rest/api/2/issue/${ticketId}/remotelink`);
    } catch (err) {
      this.logger.warn(`Remote links unavailable: ${err.message}`);
      return [];
    }
  }

  // ─── User resolution (with in-memory cache) ───────────────────────────────────

  async _resolveUser(accountId) {
    if (!this._userCache) this._userCache = {};
    if (this._userCache[accountId] !== undefined) return this._userCache[accountId];

    try {
      const user = await this.get('/rest/api/2/user', { accountId });
      const name = user.displayName || user.name || accountId;
      this._userCache[accountId] = name;
      this.logger.debug(`Resolved ${accountId} → ${name}`);
      return name;
    } catch (err) {
      this.logger.warn(`Cannot resolve user ${accountId}: ${err.message}`);
      this._userCache[accountId] = accountId;
      return accountId;
    }
  }

  // Resolve a list of unique account IDs in parallel and return an id→name map.
  async resolveAccountIds(accountIds) {
    const unique = [...new Set(accountIds)].filter(Boolean);
    if (unique.length === 0) return {};
    this.logger.info(`Resolving ${unique.length} mentioned user(s)…`);
    const entries = await Promise.all(
      unique.map(async (id) => [id, await this._resolveUser(id)])
    );
    const map = Object.fromEntries(entries);
    this.logger.info(`  → resolved: ${Object.values(map).join(', ')}`);
    return map;
  }
}

module.exports = { JiraClient };
