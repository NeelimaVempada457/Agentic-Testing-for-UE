#!/usr/bin/env node
'use strict';

/**
 * prepare-context.js
 * Reads all available jira-output files for a ticket and outputs a
 * structured JSON summary to stdout for Claude to use during Gherkin generation.
 */

const fs   = require('fs');
const path = require('path');

const ticketId  = (process.argv[2] || '').trim().toUpperCase();
const outputDir = process.env.JIRA_OUTPUT_DIR || path.join(process.cwd(), 'jira-output');
const ticketDir = path.join(outputDir, ticketId);

function exit(msg) {
  console.error(msg);
  process.exit(1);
}

if (!ticketId) exit('Usage: node prepare-context.js <TICKET-ID>');
if (!fs.existsSync(ticketDir)) {
  exit(`No jira-output found for ${ticketId}. Run /fetch-jira-details ${ticketId} first.`);
}

// ─── Readers ──────────────────────────────────────────────────────────────────

function readFile(relPath) {
  const abs = path.join(ticketDir, relPath);
  return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
}

function readJSON(relPath) {
  const abs = path.join(ticketDir, relPath);
  if (!fs.existsSync(abs)) return null;
  try { return JSON.parse(fs.readFileSync(abs, 'utf8')); } catch { return null; }
}

// ─── Extract acceptance criteria from markdown ─────────────────────────────────

function extractAC(acText) {
  if (!acText) return [];
  const lines = acText.split('\n');
  const criteria = [];
  let current = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      if (current) { criteria.push(current.trim()); current = ''; }
      continue;
    }
    // Numbered list items or bullet points start a new AC
    if (/^(\d+[.)]\s|[-*]\s)/.test(trimmed)) {
      if (current) criteria.push(current.trim());
      current = trimmed.replace(/^(\d+[.)]\s|[-*]\s)/, '').trim();
    } else {
      current += ' ' + trimmed;
    }
  }
  if (current) criteria.push(current.trim());
  return criteria.filter(Boolean).map((c, i) => ({ id: `AC-${i + 1}`, text: c }));
}

// ─── Extract mentioned user roles from text ────────────────────────────────────

function extractRoles(text) {
  if (!text) return [];
  const roleKeywords = [
    'admin', 'administrator', 'manager', 'supervisor', 'agent', 'user',
    'customer', 'client', 'viewer', 'read-only', 'readonly', 'operator',
    'editor', 'owner', 'guest', 'approver', 'reviewer', 'superuser',
  ];
  const found = new Set();
  const lower = text.toLowerCase();
  for (const role of roleKeywords) {
    if (lower.includes(role)) found.add(role);
  }
  return [...found];
}

// ─── Scan for existing feature files ──────────────────────────────────────────

function findExistingFeatureFiles(ticketKey) {
  const featuresDir = path.join(process.cwd(), 'features');
  if (!fs.existsSync(featuresDir)) return [];
  const found = [];
  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { scan(full); }
      else if (entry.name.endsWith('.feature')) { found.push(path.relative(process.cwd(), full)); }
    }
  }
  scan(featuresDir);
  return found.filter(f => f.toLowerCase().includes(ticketKey.toLowerCase()));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const metadata   = readJSON('Metadata/issue_details.json');
const acText     = readFile('Summary/acceptance_criteria.md');
const descText   = readFile('Summary/description.md');
const summaryTxt = readFile('Summary/ticket_summary.md');
const contextMd  = readFile('complete_ticket_context.md');
const commentsRaw = readJSON('Comments/comments.json');
const linkedRaw  = readJSON('Links/linked_issues.json');
const subtasksRaw = readJSON('Subtasks/subtasks.json');
const changelogRaw = readJSON('Metadata/changelog.json');
const manifestRaw  = readJSON('Attachments/attachments_manifest.json');

const acceptanceCriteria = extractAC(acText);
const allText = [acText, descText, summaryTxt, contextMd].join(' ');
const mentionedRoles = extractRoles(allText);
const existingFeatureFiles = findExistingFeatureFiles(ticketId);

// Extract API endpoints / URLs mentioned in description
const urlPattern = /(https?:\/\/[^\s"'<>]+|\/api\/[^\s"'<>]+|\/rest\/[^\s"'<>]+)/gi;
const mentionedEndpoints = [...new Set((allText.match(urlPattern) || []))].slice(0, 20);

// Comments summary (last 5 relevant)
const comments = (commentsRaw || []).slice(-10).map(c => ({
  author:  c.author?.displayName || 'Unknown',
  date:    c.created,
  excerpt: (typeof c.body === 'string' ? c.body : JSON.stringify(c.body)).slice(0, 300),
}));

// Linked issues summary
const linkedIssues = (linkedRaw || []).map(l => ({
  type: l.type?.name,
  outward: l.outwardIssue ? `${l.outwardIssue.key}: ${l.outwardIssue.fields?.summary}` : null,
  inward:  l.inwardIssue  ? `${l.inwardIssue.key}: ${l.inwardIssue.fields?.summary}`  : null,
})).filter(l => l.outward || l.inward);

// Attachments
const attachments = (manifestRaw || []).map(a => ({
  filename: a.filename,
  type:     a.mimeType,
  status:   a.status,
}));

// Changelog highlights (last 10 changes)
const changelog = (changelogRaw || []).slice(-10).map(h => ({
  date:   h.created,
  author: h.author?.displayName,
  items:  (h.items || []).map(i => `${i.field}: "${i.fromString}" → "${i.toString}"`),
}));

const output = {
  ticketId,
  exists: true,
  contextFilePath: path.join(ticketDir, 'complete_ticket_context.md'),
  summary:    metadata?.summary  || 'N/A',
  status:     metadata?.status   || 'N/A',
  priority:   metadata?.priority || 'N/A',
  issueType:  metadata?.issuetype || 'N/A',
  assignee:   metadata?.assignee?.displayName || 'Unassigned',
  reporter:   metadata?.reporter?.displayName || 'N/A',
  components: (metadata?.components || []).map(c => c.name),
  labels:     metadata?.labels || [],
  storyPoints: metadata?.storyPoints,
  sprint:     metadata?.sprint?.name || null,
  epic:       metadata?.epic ? `${metadata.epic.key}: ${metadata.epic.summary}` : null,
  environment: metadata?.environment || null,
  created:    metadata?.created,
  updated:    metadata?.updated,

  acceptanceCriteria,
  acCount: acceptanceCriteria.length,
  acHasContent: acceptanceCriteria.length > 0,
  hasExplicitAC: acText && !acText.includes('No explicit acceptance criteria'),

  mentionedRoles,
  mentionedEndpoints,
  linkedIssues,
  subtasks: (subtasksRaw || []).map(s => ({
    key:    s.key,
    summary: s.fields?.summary,
    status:  s.fields?.status?.name,
  })),
  comments,
  attachments,
  changelog,

  existingFeatureFiles,
  hasExistingFeature: existingFeatureFiles.length > 0,

  // Flags for Claude to act on
  warnings: [
    ...(acceptanceCriteria.length === 0 ? ['⚠️ No acceptance criteria found — will generate from description'] : []),
    ...(mentionedRoles.length === 0     ? ['ℹ️ No user roles detected — scenarios will use generic "user"'] : []),
    ...(existingFeatureFiles.length > 0 ? [`⚠️ Existing feature file found: ${existingFeatureFiles.join(', ')}`] : []),
  ],
};

process.stdout.write(JSON.stringify(output, null, 2) + '\n');
