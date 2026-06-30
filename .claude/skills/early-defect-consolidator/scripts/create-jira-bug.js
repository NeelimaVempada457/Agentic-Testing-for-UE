'use strict';

/**
 * create-jira-bug.js
 *
 * Creates a single consolidated Jira bug for the Early Defect Consolidator skill.
 *
 * Usage:
 *   node create-jira-bug.js --ticket BDBP1-202 --report <path-to-EarlyDefectReviewReport.md> --discrepancies <path-to-discrepancies.md>
 *
 * Environment variables (from .env):
 *   JIRA_BASE_URL   — e.g. https://your-org.atlassian.net
 *   JIRA_EMAIL      — Atlassian account email
 *   JIRA_API_TOKEN  — API token
 */

const fs    = require('fs');
const path  = require('path');
const axios = require('axios');

// ── Load .env ──────────────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

// ── Argument parsing ───────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--') && argv[i + 1]) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

// ── Read report sections ───────────────────────────────────────────────────────

function extractSection(content, heading) {
  const pattern = new RegExp(
    `##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?(?=\\n##\\s|$)`,
    'i'
  );
  const match = content.match(pattern);
  return match ? match[0].trim() : '';
}

function extractField(content, label) {
  const pattern = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`, 'i');
  const match = content.match(pattern);
  return match ? match[1].trim() : '';
}

function extractReportMetadata(reportContent) {
  const summary = (reportContent.match(/\*\*Story Key:\*\*\s*(.+)/i) || [])[1]?.trim() || '';
  const storySummary = (reportContent.match(/\*\*Story Summary:\*\*\s*(.+)/i) || [])[1]?.trim() || '';
  const severitySection = extractSection(reportContent, 'Severity Distribution');
  const bugDescSection  = extractSection(reportContent, 'Recommended Jira Bug Description');
  const bugSummary      = extractSection(reportContent, 'Recommended Jira Bug Summary');

  // Derive highest severity from distribution table
  const criticalCount = parseInt((severitySection.match(/Critical\s*\|\s*(\d+)/i) || [])[1] || '0');
  const highCount      = parseInt((severitySection.match(/High\s*\|\s*(\d+)/i) || [])[1] || '0');
  const mediumCount    = parseInt((severitySection.match(/Medium\s*\|\s*(\d+)/i) || [])[1] || '0');

  let priority = 'Low';
  if (criticalCount > 0)     priority = 'Highest';
  else if (highCount > 0)    priority = 'High';
  else if (mediumCount > 0)  priority = 'Medium';

  // Extract the one-line summary from the section
  const summaryLine = bugSummary
    .split('\n')
    .map(l => l.trim())
    .find(l => l && !l.startsWith('#') && !l.startsWith('---')) || '';

  return { storyKey: summary, storySummary, priority, summaryLine, bugDescSection };
}

function extractIncludedDefects(reportContent) {
  const ids = [];
  const matches = reportContent.matchAll(/###\s+(D\d+)\s*—/g);
  for (const m of matches) ids.push(m[1]);
  return ids;
}

// ── Build Jira description (ADF-compatible plain text) ────────────────────────

function buildDescription(bugDescSection, reportPath, discrepanciesPath) {
  const body = bugDescSection
    .replace(/^##\s+Recommended Jira Bug Description/i, '')
    .replace(/^\*\*Story Reference:\*\*/m, 'Story Reference:')
    .replace(/^\*\*Detection Method:\*\*/m, 'Detection Method:')
    .replace(/^\*\*Consolidated Findings:\*\*/m, 'Consolidated Findings:')
    .replace(/^\*\*Environment:\*\*/m, 'Environment:')
    .replace(/^\*\*Steps to Reproduce:\*\*/m, 'Steps to Reproduce:')
    .replace(/^\*\*Expected Behaviour:\*\*/m, 'Expected Behaviour:')
    .replace(/^\*\*Actual Behaviour:\*\*/m, 'Actual Behaviour:')
    .replace(/^\*\*Acceptance Criteria Violated:\*\*/m, 'Acceptance Criteria Violated:')
    .trim();

  return (
    body +
    `\n\n---\n` +
    `Review Report: ${path.resolve(reportPath)}\n` +
    `Discrepancies File: ${path.resolve(discrepanciesPath)}\n` +
    `Created by: Early Defect Consolidator (Claude Code Skill)`
  );
}

// ── Jira REST API call ─────────────────────────────────────────────────────────

async function createJiraBug({ baseUrl, email, apiToken, projectKey, summary, description, priority, labels }) {
  const credentials = Buffer.from(`${email}:${apiToken}`).toString('base64');
  const url = `${baseUrl.replace(/\/+$/, '')}/rest/api/2/issue`;

  const payload = {
    fields: {
      project:     { key: projectKey },
      summary,
      description,
      issuetype:   { name: 'Bug' },
      priority:    { name: priority },
      labels,
    },
  };

  let attempt = 0;
  const maxRetries = 3;

  while (attempt <= maxRetries) {
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 30000,
      });
      return response.data;
    } catch (err) {
      const status = err.response?.status;
      const isRetryable = !status || status === 429 || status >= 500;

      if (isRetryable && attempt < maxRetries) {
        const delay = 1000 * Math.pow(2, attempt);
        console.error(`[RETRY ${attempt + 1}/${maxRetries}] Status ${status || 'network'} — retrying in ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        attempt++;
        continue;
      }

      const msg =
        err.response?.data?.errors
          ? JSON.stringify(err.response.data.errors)
          : err.response?.data?.errorMessages?.join(', ') ||
            err.response?.data?.message ||
            err.message;
      throw new Error(`Jira API [${status || 'ERR'}]: ${msg}`);
    }
  }
}

// ── Screenshot attachment ──────────────────────────────────────────────────────

function parseScreenshotPaths(discrepanciesContent) {
  const paths = [];
  // Match Screenshot column values in table rows: | `path/to/file.png` |
  const tablePattern = /\|\s*`([^`]+\.png)`\s*\|/g;
  let m;
  while ((m = tablePattern.exec(discrepanciesContent)) !== null) {
    const p = m[1].trim();
    if (!paths.includes(p)) paths.push(p);
  }
  // Match Screenshot property rows in detail blocks: | **Screenshot** | `path` |
  const detailPattern = /\*\*Screenshot\*\*\s*\|\s*`([^`]+\.png)`/g;
  while ((m = detailPattern.exec(discrepanciesContent)) !== null) {
    const p = m[1].trim();
    if (!paths.includes(p)) paths.push(p);
  }
  return paths;
}

async function attachFileToJira(baseUrl, authHeader, issueKey, filePath) {
  const filename = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath);

  const boundary = '----ClaudeFormBoundary' + Math.random().toString(36).slice(2);
  const body = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
      `Content-Type: application/octet-stream\r\n\r\n`
    ),
    fileContent,
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ]);

  await axios.post(
    `${baseUrl.replace(/\/+$/, '')}/rest/api/2/issue/${issueKey}/attachments`,
    body,
    {
      headers: {
        Authorization: authHeader,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'X-Atlassian-Token': 'no-check',
        Accept: 'application/json',
      },
      timeout: 60000,
    }
  );
}

async function attachScreenshots(baseUrl, authHeader, issueKey, discrepanciesPath) {
  const content = fs.readFileSync(discrepanciesPath, 'utf8');
  const rawPaths = parseScreenshotPaths(content);

  if (rawPaths.length === 0) {
    console.log('[INFO] No screenshot paths found in discrepancies.md — skipping attachments.');
    return 0;
  }

  let attached = 0;
  for (const relPath of rawPaths) {
    const absPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`[WARN] Screenshot not found, skipping: ${absPath}`);
      continue;
    }
    try {
      await attachFileToJira(baseUrl, authHeader, issueKey, absPath);
      console.log(`[OK] Attached: ${path.basename(absPath)}`);
      attached++;
    } catch (err) {
      console.warn(`[WARN] Failed to attach ${path.basename(absPath)}: ${err.message}`);
    }
  }

  console.log(`[INFO] Screenshots attached: ${attached} / ${rawPaths.length}`);
  return attached;
}

// ── Update Discrepancies.md ────────────────────────────────────────────────────

function appendToDiscrepancies(discrepanciesPath, bugKey, storyKey, storySummary, reportPath, includedDefects) {
  const timestamp   = new Date().toISOString();
  const defectList  = includedDefects.map(d => `  - ${d}`).join('\n');
  const appendBlock = `

---

## Consolidated Jira Defect

| Field | Value |
|---|---|
| **Jira Bug Key** | ${bugKey} |
| **Jira Summary** | [Early Defect Detection][${storyKey}] Consolidated Defect Report - ${storySummary} |
| **Created Date** | ${timestamp} |
| **Status** | Created |
| **Linked Story** | ${storyKey} |
| **Included Findings** | ${includedDefects.join(', ')} |
| **Review Status** | FINAL_APPROVED |
| **Review Report** | ${path.resolve(reportPath)} |
`;

  fs.appendFileSync(discrepanciesPath, appendBlock, 'utf8');
  console.log(`[OK] Discrepancies.md updated with bug key ${bugKey}`);
}

// ── Update report status ───────────────────────────────────────────────────────

function updateReportStatus(reportPath, bugKey, timestamp) {
  let content = fs.readFileSync(reportPath, 'utf8');
  content = content
    .replace(/\*\*Status:\*\*\s*\w+/i, `**Status:** FINAL_APPROVED`)
    .concat(`\n\n---\n\n## Created Jira Bug\n\n| Field | Value |\n|---|---|\n| **Bug Key** | ${bugKey} |\n| **Created At** | ${timestamp} |\n`);
  fs.writeFileSync(reportPath, content, 'utf8');
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const args = parseArgs(process.argv);

  const ticketId        = args.ticket;
  const reportPath      = args.report;
  const discrepancies   = args.discrepancies;

  // Validate required arguments
  if (!ticketId || !reportPath || !discrepancies) {
    console.error('Usage: node create-jira-bug.js --ticket <ID> --report <path> --discrepancies <path>');
    process.exit(1);
  }

  // Validate environment
  const baseUrl  = process.env.JIRA_BASE_URL;
  const email    = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  if (!baseUrl || !email || !apiToken) {
    console.error('Missing required env vars: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN');
    process.exit(1);
  }

  // Validate files exist
  if (!fs.existsSync(reportPath)) {
    console.error(`Review report not found: ${reportPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(discrepancies)) {
    console.error(`Discrepancies file not found: ${discrepancies}`);
    process.exit(1);
  }

  const reportContent = fs.readFileSync(reportPath, 'utf8');

  // Check not already created
  if (/##\s+Created Jira Bug/i.test(reportContent)) {
    const existingKey = (reportContent.match(/\*\*Bug Key\*\*\s*\|\s*(\S+)/i) || [])[1] || 'UNKNOWN';
    console.log(`BUG_ALREADY_CREATED:${existingKey}`);
    process.exit(0);
  }

  const { storyKey, storySummary, priority, summaryLine, bugDescSection } =
    extractReportMetadata(reportContent);

  const projectKey = ticketId.replace(/-\d+$/, '');
  const summary    = summaryLine || `[Early Defect Detection][${ticketId}] Consolidated Defect Report - ${storySummary}`;
  const description = buildDescription(bugDescSection, reportPath, discrepancies);
  const includedDefects = extractIncludedDefects(reportContent);

  const labels = [
    'early-defect-detection',
    'agentic-testing',
    'playwright',
    'consolidated-defect',
  ];

  console.log(`[INFO] Creating Jira bug for ${ticketId}...`);
  console.log(`[INFO] Project: ${projectKey}`);
  console.log(`[INFO] Priority: ${priority}`);
  console.log(`[INFO] Defects included: ${includedDefects.join(', ') || 'none'}`);

  try {
    const result = await createJiraBug({
      baseUrl, email, apiToken,
      projectKey, summary, description, priority, labels,
    });

    const bugKey    = result.key;
    const timestamp = new Date().toISOString();

    console.log(`BUG_CREATED:${bugKey}`);

    appendToDiscrepancies(discrepancies, bugKey, storyKey || ticketId, storySummary, reportPath, includedDefects);
    updateReportStatus(reportPath, bugKey, timestamp);

    // Attach screenshots referenced in discrepancies.md
    const credentials = Buffer.from(`${email}:${apiToken}`).toString('base64');
    const authHeader  = `Basic ${credentials}`;
    await attachScreenshots(baseUrl, authHeader, bugKey, discrepancies);

    console.log(`[OK] Done. Jira bug: ${baseUrl}/browse/${bugKey}`);
  } catch (err) {
    console.error(`[ERROR] ${err.message}`);
    process.exit(1);
  }
}

main();
