'use strict';

const axios = require('axios');
const { getConfig } = require('./config');

const ISSUE_KEY_PATTERN = /^[A-Z][A-Z0-9]+-\d+$/;

function buildClient() {
  const config = getConfig();
  return axios.create({
    baseURL: `${config.baseUrl}/rest/api/3`,
    timeout: 15000,
    auth: {
      username: config.email,
      password: config.apiToken,
    },
    headers: {
      Accept: 'application/json',
    },
  });
}

function extractIssueFields(data) {
  const f = data.fields;
  return {
    key: data.key,
    summary: f.summary,
    description: f.description,
    status: f.status?.name ?? null,
    priority: f.priority?.name ?? null,
    assignee: f.assignee?.displayName ?? null,
    reporter: f.reporter?.displayName ?? null,
    created: f.created,
    updated: f.updated,
    issueType: f.issuetype?.name ?? null,
    labels: f.labels ?? [],
    components: (f.components ?? []).map((c) => c.name),
  };
}

async function getIssueDetails(issueKey) {
  if (!issueKey || typeof issueKey !== 'string') {
    throw new Error('Issue key must be a non-empty string.');
  }
  if (!ISSUE_KEY_PATTERN.test(issueKey.trim().toUpperCase())) {
    throw new Error(
      `Invalid issue key format: "${issueKey}". Expected format: PROJECT-123`
    );
  }

  const client = buildClient();

  try {
    const response = await client.get(`/issue/${issueKey.trim().toUpperCase()}`);
    return extractIssueFields(response.data);
  } catch (err) {
    if (err.response) {
      const { status } = err.response;
      if (status === 401) {
        throw new Error(
          'Authentication failed (401). Check your JIRA_EMAIL and JIRA_API_TOKEN.'
        );
      }
      if (status === 403) {
        throw new Error(
          `Access forbidden (403). You do not have permission to view issue ${issueKey}.`
        );
      }
      if (status === 404) {
        throw new Error(
          `Issue not found (404): "${issueKey}". Verify the issue key and project.`
        );
      }
      if (status === 429) {
        throw new Error(
          'Rate limit exceeded (429). Wait a moment before retrying.'
        );
      }
      throw new Error(
        `Jira API error (${status}): ${err.response.data?.errorMessages?.join(', ') || err.message}`
      );
    }
    if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
      throw new Error(
        `Network timeout reaching Jira. Check JIRA_BASE_URL and your connection.`
      );
    }
    if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
      throw new Error(
        `Cannot connect to Jira at ${getConfig().baseUrl}. Check JIRA_BASE_URL.`
      );
    }
    throw err;
  }
}

module.exports = { getIssueDetails };
