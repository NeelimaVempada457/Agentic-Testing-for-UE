#!/usr/bin/env node
'use strict';

require('dotenv').config();  // loads .env from cwd (project root)

const path = require('path');

const { JiraClient }        = require('./jira-client');
const { FileManager }       = require('./file-manager');
const { MarkdownGenerator } = require('./markdown-generator');
const { Logger }            = require('./logger');

// ─── Environment validation ───────────────────────────────────────────────────

function validateEnv() {
  const required = ['JIRA_BASE_URL', 'JIRA_EMAIL', 'JIRA_API_TOKEN'];
  const missing  = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Copy .env.example to .env and fill in the values.`
    );
  }
}

// ─── Custom-field helpers ─────────────────────────────────────────────────────

function extractStoryPoints(fields) {
  for (const k of ['story_points', 'customfield_10016', 'customfield_10028', 'customfield_10035', 'customfield_10004']) {
    if (fields[k] != null) return fields[k];
  }
  return null;
}

function extractSprintFromFields(fields) {
  const raw = fields.customfield_10020;
  if (!raw) return null;
  const entry = Array.isArray(raw) ? raw[raw.length - 1] : raw;
  if (typeof entry === 'string') {
    // Parse sprint string like: com.atlassian…Sprint@abc[id=42,name=Sprint 3,…]
    const parsed = {};
    for (const [, key, val] of entry.matchAll(/(\w+)=([^,\]]+)/g)) {
      parsed[key] = val;
    }
    return parsed;
  }
  return entry;
}

function extractCustomFields(fields) {
  const result = {};
  for (const [k, v] of Object.entries(fields)) {
    if (k.startsWith('customfield_') && v != null) {
      result[k] = v;
    }
  }
  return result;
}

// ─── Dependency graph (Mermaid) ───────────────────────────────────────────────

function buildDependencyGraph(ticketKey, linkedIssues, subtasks, epicDetails) {
  const lines = ['# Dependency Graph', '', '```mermaid', 'graph TD'];
  const safe  = (k) => k.replace(/-/g, '_');

  lines.push(`  ${safe(ticketKey)}["${ticketKey} *(current)*"]`);

  if (epicDetails) {
    const ek = safe(epicDetails.key);
    lines.push(`  ${ek}["${epicDetails.key} *(epic)*"] --> ${safe(ticketKey)}`);
  }

  for (const link of linkedIssues || []) {
    const typeName = link.type?.name || 'relates to';
    if (link.outwardIssue) {
      const k = link.outwardIssue.key;
      lines.push(`  ${safe(ticketKey)} -->|"${typeName}"| ${safe(k)}["${k}"]`);
    }
    if (link.inwardIssue) {
      const k = link.inwardIssue.key;
      lines.push(`  ${safe(k)}["${k}"] -->|"${link.type?.inward || typeName}"| ${safe(ticketKey)}`);
    }
  }

  for (const st of subtasks || []) {
    lines.push(`  ${safe(ticketKey)} --> ${safe(st.key)}["${st.key} *(subtask)*"]`);
  }

  lines.push('```');
  return lines.join('\n');
}

// ─── ADF mention patcher ──────────────────────────────────────────────────────
// Walks an ADF tree and replaces mention attrs.text with the resolved display name.

function resolveAdfMentions(node, userNameMap) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'mention' && node.attrs?.id) {
    const name = userNameMap[node.attrs.id];
    if (name) node.attrs.text = `@${name}`;
  }
  for (const child of node.content || []) {
    resolveAdfMentions(child, userNameMap);
  }
}

// ─── Single ticket processor ──────────────────────────────────────────────────

async function processTicket(ticketId, outputBase, client, fileManager, markdownGen) {
  const logger = fileManager.logger;
  logger.separator(ticketId);

  // Validate
  logger.info(`Validating ticket ${ticketId}…`);
  const exists = await client.validateTicket(ticketId);
  if (!exists) throw new Error(`Ticket "${ticketId}" not found or not accessible`);
  logger.success('Ticket found');

  // Create folder tree
  const baseDir = fileManager.setupTicketFolders(ticketId);

  // Fetch in parallel where safe
  const [issue, comments, changelog] = await Promise.all([
    client.getIssue(ticketId),
    client.getAllComments(ticketId),
    client.getChangelog(ticketId),
  ]);

  const fields       = issue.fields;
  const attachments  = fields.attachment   || fields.attachments || [];
  const linkedIssues = fields.issuelinks   || [];
  const subtasks     = fields.subtasks     || [];

  // Sprint — try field first, fall back to Agile API
  let sprintDetails = extractSprintFromFields(fields);
  if (!sprintDetails) {
    const agile = await client.getSprintFromAgileApi(issue.id);
    sprintDetails = agile?.fields?.sprint || null;
  }

  // Epic
  const epicKey =
    fields.customfield_10014 ||   // Jira Cloud
    fields.customfield_10008 ||   // Jira Server
    fields.epic?.key || null;
  const epicDetails = epicKey ? await client.getEpic(epicKey) : null;

  // Remote / web links
  const webLinks = await client.getRemoteLinks(ticketId);

  // ── Resolve @-mentions in comment bodies ──────────────────────
  // Wiki-markup bodies contain [~accountid:ID] tokens; resolve to display names.
  const mentionPattern = /\[~accountid:([^\]]+)\]/g;
  const allMentionedIds = [];
  for (const comment of comments) {
    if (typeof comment.body === 'string') {
      for (const [, id] of comment.body.matchAll(mentionPattern)) {
        allMentionedIds.push(id);
      }
    }
  }
  const userNameMap = await client.resolveAccountIds(allMentionedIds);

  // Replace [~accountid:ID] → @DisplayName in every comment body
  for (const comment of comments) {
    if (typeof comment.body === 'string') {
      comment.body = comment.body.replace(
        mentionPattern,
        (_, id) => `@${userNameMap[id] || id}`
      );
    }
    // ADF mentions carry attrs.text already; patch any that are still raw IDs
    if (comment.body && typeof comment.body === 'object') {
      resolveAdfMentions(comment.body, userNameMap);
    }
  }

  // ── Metadata ──────────────────────────────────────────────────
  logger.info('Saving metadata…');
  const metadata = {
    key:            issue.key,
    id:             issue.id,
    self:           issue.self,
    summary:        fields.summary,
    status:         fields.status?.name,
    priority:       fields.priority?.name,
    issuetype:      fields.issuetype?.name,
    assignee:       fields.assignee  ? { displayName: fields.assignee.displayName,  emailAddress: fields.assignee.emailAddress }  : null,
    reporter:       fields.reporter  ? { displayName: fields.reporter.displayName,   emailAddress: fields.reporter.emailAddress }  : null,
    labels:         fields.labels || [],
    components:     (fields.components   || []).map((c) => ({ id: c.id, name: c.name })),
    fixVersions:    (fields.fixVersions  || []).map((v) => ({ id: v.id, name: v.name, released: v.released })),
    affectsVersions:(fields.versions     || []).map((v) => ({ id: v.id, name: v.name })),
    storyPoints:    extractStoryPoints(fields),
    sprint:         sprintDetails,
    epic:           epicDetails ? { key: epicDetails.key, summary: epicDetails.fields?.summary } : null,
    environment:    fields.environment,
    created:        fields.created,
    updated:        fields.updated,
    dueDate:        fields.duedate,
    resolution:     fields.resolution?.name,
    resolutionDate: fields.resolutiondate,
    votes:          fields.votes?.votes,
    watches:        fields.watches?.watchCount,
    customFields:   extractCustomFields(fields),
  };

  fileManager.writeJSON(path.join(baseDir, 'Metadata', 'issue_details.json'), { ...metadata, rawFields: fields });
  fileManager.writeJSON(path.join(baseDir, 'Metadata', 'changelog.json'), changelog);

  // ── Summary markdowns ─────────────────────────────────────────
  logger.info('Generating summary files…');
  fileManager.writeMarkdown(path.join(baseDir, 'Summary', 'ticket_summary.md'),      markdownGen.generateTicketSummary(issue));
  fileManager.writeMarkdown(path.join(baseDir, 'Summary', 'description.md'),         markdownGen.generateDescription(issue));
  fileManager.writeMarkdown(path.join(baseDir, 'Summary', 'acceptance_criteria.md'), markdownGen.generateAcceptanceCriteria(issue));

  // ── Comments ──────────────────────────────────────────────────
  logger.info('Saving comments…');
  fileManager.writeJSON(    path.join(baseDir, 'Comments', 'comments.json'), comments);
  fileManager.writeMarkdown(path.join(baseDir, 'Comments', 'comments.md'),   markdownGen.generateComments(comments));

  // ── Links ─────────────────────────────────────────────────────
  logger.info('Saving links…');
  fileManager.writeJSON(path.join(baseDir, 'Links', 'linked_issues.json'), linkedIssues);
  fileManager.writeJSON(path.join(baseDir, 'Links', 'web_links.json'),     webLinks);
  fileManager.writeMarkdown(
    path.join(baseDir, 'Links', 'dependency_graph.md'),
    buildDependencyGraph(issue.key, linkedIssues, subtasks, epicDetails)
  );

  // ── Subtasks ──────────────────────────────────────────────────
  logger.info('Saving subtasks…');
  fileManager.writeJSON(path.join(baseDir, 'Subtasks', 'subtasks.json'), subtasks);

  // ── Attachments ───────────────────────────────────────────────
  logger.info(`Downloading ${attachments.length} attachment(s)…`);
  const attachmentManifest = [];

  for (const att of attachments) {
    const safeName = fileManager.sanitizeFilename(att.filename);
    const destPath = fileManager.resolveUniqueFilename(path.join(baseDir, 'Attachments'), safeName);

    if (fileManager.fileExists(destPath)) {
      logger.warn(`Skip (exists): ${safeName}`);
      attachmentManifest.push({ ...att, status: 'skipped_exists', localPath: destPath });
      continue;
    }

    try {
      const kb = att.size ? `${(att.size / 1024).toFixed(1)} KB` : '?';
      logger.info(`  ↓ ${att.filename} (${kb})`);
      const buffer = await client.getBuffer(att.content);

      if (fileManager.isDuplicate(buffer)) {
        logger.warn(`  Duplicate content: ${att.filename}`);
        attachmentManifest.push({ ...att, status: 'duplicate', localPath: null });
        continue;
      }

      fileManager.writeBuffer(destPath, buffer);
      attachmentManifest.push({ ...att, status: 'downloaded', localPath: destPath });
      logger.success(`  ✓ ${safeName}`);
    } catch (err) {
      logger.error(`  ✗ ${att.filename}: ${err.message}`);
      attachmentManifest.push({ ...att, status: 'failed', error: err.message });
    }
  }

  fileManager.writeJSON(path.join(baseDir, 'Attachments', 'attachments_manifest.json'), attachmentManifest);

  // ── Consolidated context ──────────────────────────────────────
  logger.info('Building complete_ticket_context.md…');
  fileManager.writeMarkdown(
    path.join(baseDir, 'complete_ticket_context.md'),
    markdownGen.generateCompleteContext(issue, comments, attachmentManifest, linkedIssues, epicDetails, subtasks)
  );

  logger.separator('DONE');
  logger.success(`Output: ${baseDir}`);

  return {
    ticketId,
    baseDir,
    commentCount:    comments.length,
    attachmentCount: attachments.length,
    downloaded:      attachmentManifest.filter((a) => a.status === 'downloaded').length,
  };
}

// ─── Entry point ──────────────────────────────────────────────────────────────

async function main() {
  try {
    validateEnv();
  } catch (err) {
    console.error(`\n❌ Configuration error: ${err.message}\n`);
    process.exit(1);
  }

  const args = process.argv.slice(2).map((a) => a.trim().toUpperCase()).filter(Boolean);
  if (args.length === 0) {
    console.error('Usage: node fetch-jira-details.js <TICKET-ID> [TICKET-ID2 ...]');
    console.error('Example: node fetch-jira-details.js PROJ-123 PROJ-456');
    process.exit(1);
  }

  const outputBase = process.env.JIRA_OUTPUT_DIR || path.join(process.cwd(), 'jira-output');
  const markdownGen = new MarkdownGenerator();

  const results = [];
  const errors  = [];

  for (const ticketId of args) {
    // Each ticket gets its own logger writing to its own Logs/ folder
    const logDir      = path.join(outputBase, ticketId, 'Logs');
    const logger      = new Logger(logDir);
    const client      = new JiraClient(process.env.JIRA_BASE_URL, process.env.JIRA_EMAIL, process.env.JIRA_API_TOKEN, logger);
    const fileManager = new FileManager(outputBase, logger);

    try {
      const result = await processTicket(ticketId, outputBase, client, fileManager, markdownGen);
      results.push(result);
    } catch (err) {
      logger.error(`Failed: ${err.message}`);
      errors.push({ ticketId, error: err.message });
    }
  }

  // ── Final summary ─────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║         EXECUTION SUMMARY            ║');
  console.log('╚══════════════════════════════════════╝');

  if (results.length > 0) {
    console.log(`\n✅ Successful (${results.length}):`);
    for (const r of results) {
      console.log(`   ${r.ticketId}`);
      console.log(`   └─ Comments: ${r.commentCount}  Attachments: ${r.downloaded}/${r.attachmentCount}`);
      console.log(`   └─ ${r.baseDir}`);
    }
  }

  if (errors.length > 0) {
    console.log(`\n❌ Failed (${errors.length}):`);
    for (const e of errors) {
      console.log(`   ${e.ticketId}: ${e.error}`);
    }
  }

  console.log('');
  process.exit(errors.length > 0 && results.length === 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
