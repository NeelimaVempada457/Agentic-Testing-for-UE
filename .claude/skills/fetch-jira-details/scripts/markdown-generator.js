'use strict';

class MarkdownGenerator {

  // ─── Individual section files ─────────────────────────────────────────────────

  generateTicketSummary(issue) {
    const f = issue.fields;
    const sp = this._storyPoints(f);
    return [
      `# ${issue.key}: ${f.summary || 'N/A'}`,
      '',
      `| Field | Value |`,
      `|---|---|`,
      `| **Status** | ${f.status?.name || 'N/A'} |`,
      `| **Priority** | ${f.priority?.name || 'N/A'} |`,
      `| **Type** | ${f.issuetype?.name || 'N/A'} |`,
      `| **Assignee** | ${f.assignee?.displayName || 'Unassigned'} |`,
      `| **Reporter** | ${f.reporter?.displayName || 'N/A'} |`,
      `| **Story Points** | ${sp ?? 'N/A'} |`,
      `| **Labels** | ${(f.labels || []).join(', ') || 'None'} |`,
      `| **Components** | ${(f.components || []).map((c) => c.name).join(', ') || 'None'} |`,
      `| **Fix Versions** | ${(f.fixVersions || []).map((v) => v.name).join(', ') || 'None'} |`,
      `| **Created** | ${this._date(f.created)} |`,
      `| **Updated** | ${this._date(f.updated)} |`,
      `| **Due Date** | ${this._date(f.duedate)} |`,
      `| **Resolution** | ${f.resolution?.name || 'Unresolved'} |`,
      '',
      '## Environment',
      '',
      f.environment ? this.render(f.environment) : '_No environment details provided_',
    ].join('\n');
  }

  generateDescription(issue) {
    return [
      `# Description — ${issue.key}`,
      '',
      issue.fields.description
        ? this.render(issue.fields.description)
        : '_No description provided_',
    ].join('\n');
  }

  generateAcceptanceCriteria(issue) {
    const f = issue.fields;
    const raw = this._findAcceptanceCriteria(f);
    return [
      `# Acceptance Criteria — ${issue.key}`,
      '',
      raw || '_No explicit acceptance criteria found. Review description for implicit criteria._',
    ].join('\n');
  }

  generateComments(comments) {
    if (!comments || comments.length === 0) {
      return '# Comments\n\n_No comments found_';
    }
    const lines = [`# Comments (${comments.length})`, ''];
    comments.forEach((c, i) => {
      const author  = c.author?.displayName || 'Unknown';
      const created = this._date(c.created);
      const edited  = c.updated && c.updated !== c.created
        ? ` *(edited ${this._date(c.updated)})*`
        : '';
      lines.push(`## ${i + 1}. ${author} — ${created}${edited}`, '');
      lines.push(this.render(c.body), '', '---', '');
    });
    return lines.join('\n');
  }

  // ─── Consolidated context file ────────────────────────────────────────────────

  generateCompleteContext(issue, comments, attachmentManifest, linkedIssues, epicDetails, subtasks) {
    const f   = issue.fields;
    const sp  = this._storyPoints(f);
    const now = new Date().toISOString();
    const jiraUrl = `${process.env.JIRA_BASE_URL || ''}/browse/${issue.key}`;

    const lines = [
      `# Complete Ticket Context: ${issue.key}`,
      '',
      `> **Generated:** ${now}`,
      `> **Jira URL:** ${jiraUrl}`,
      '',
      '---',
      '',
      '## Summary',
      '',
      `**${f.summary || 'N/A'}**`,
      '',
      `| Field | Value |`,
      `|---|---|`,
      `| Status | ${f.status?.name || 'N/A'} |`,
      `| Priority | ${f.priority?.name || 'N/A'} |`,
      `| Type | ${f.issuetype?.name || 'N/A'} |`,
      `| Assignee | ${f.assignee?.displayName || 'Unassigned'} |`,
      `| Reporter | ${f.reporter?.displayName || 'N/A'} |`,
      `| Story Points | ${sp ?? 'N/A'} |`,
      `| Labels | ${(f.labels || []).join(', ') || 'None'} |`,
      `| Components | ${(f.components || []).map((c) => c.name).join(', ') || 'None'} |`,
      `| Created | ${this._date(f.created)} |`,
      `| Updated | ${this._date(f.updated)} |`,
      '',
    ];

    if (epicDetails) {
      lines.push('### Epic');
      lines.push('');
      lines.push(`**${epicDetails.key}:** ${epicDetails.fields?.summary || 'N/A'}`);
      lines.push(`Status: ${epicDetails.fields?.status?.name || 'N/A'}`);
      lines.push('');
    }

    lines.push('---', '', '## Description', '');
    lines.push(f.description ? this.render(f.description) : '_No description provided_');
    lines.push('', '---', '', '## Acceptance Criteria', '');
    const ac = this._findAcceptanceCriteria(f);
    lines.push(ac || '_No explicit acceptance criteria found_');
    lines.push('', '---', '');

    // Comments
    lines.push(`## Comments (${comments.length})`, '');
    if (comments.length > 0) {
      comments.forEach((c, i) => {
        const author  = c.author?.displayName || 'Unknown';
        const created = this._date(c.created);
        lines.push(`### ${i + 1}. ${author} — ${created}`, '');
        lines.push(this.render(c.body), '');
      });
    } else {
      lines.push('_No comments_');
    }
    lines.push('---', '');

    // Linked Issues
    lines.push('## Linked Issues', '');
    if (linkedIssues && linkedIssues.length > 0) {
      linkedIssues.forEach((link) => {
        const typeName = link.type?.name || 'relates to';
        if (link.outwardIssue) {
          const t = link.outwardIssue;
          lines.push(`- **${typeName}** → \`${t.key}\` ${t.fields?.summary || ''} *(${t.fields?.status?.name || 'N/A'})*`);
        }
        if (link.inwardIssue) {
          const t = link.inwardIssue;
          lines.push(`- **${link.type?.inward || typeName}** ← \`${t.key}\` ${t.fields?.summary || ''} *(${t.fields?.status?.name || 'N/A'})*`);
        }
      });
    } else {
      lines.push('_No linked issues_');
    }
    lines.push('', '---', '');

    // Subtasks
    const sts = subtasks || f.subtasks || [];
    lines.push(`## Subtasks (${sts.length})`, '');
    if (sts.length > 0) {
      sts.forEach((st) => {
        const status = st.fields?.status?.name || 'N/A';
        const icon   = ['Done', 'Closed', 'Resolved'].includes(status) ? '✅' : '🔲';
        lines.push(`- ${icon} \`${st.key}\` ${st.fields?.summary || 'N/A'} — *${status}*`);
      });
    } else {
      lines.push('_No subtasks_');
    }
    lines.push('', '---', '');

    // Attachments
    const downloaded = (attachmentManifest || []).filter((a) => a.status === 'downloaded');
    const failed     = (attachmentManifest || []).filter((a) => a.status === 'failed');
    const dupes      = (attachmentManifest || []).filter((a) => a.status === 'duplicate');
    lines.push(`## Attachments (${attachmentManifest?.length || 0})`, '');
    if (attachmentManifest && attachmentManifest.length > 0) {
      attachmentManifest.forEach((a) => {
        const kb     = a.size ? `${(a.size / 1024).toFixed(1)} KB` : 'N/A';
        const status = a.status === 'downloaded' ? '✅' : a.status === 'duplicate' ? '♻️' : '❌';
        const note   = a.status === 'failed' ? ` — *${a.error}*` : '';
        lines.push(`- ${status} **${a.filename}** (${a.mimeType || 'unknown'}, ${kb}) uploaded by ${a.author?.displayName || 'Unknown'} on ${this._date(a.created)}${note}`);
      });
      if (dupes.length)   lines.push(`\n> ♻️ ${dupes.length} duplicate attachment(s) skipped`);
      if (failed.length)  lines.push(`> ❌ ${failed.length} attachment(s) failed to download — see Logs`);
    } else {
      lines.push('_No attachments_');
    }
    lines.push('', '---', '');

    // Observations
    lines.push('## Important Observations', '');
    lines.push(this._observations(issue, comments, attachmentManifest, linkedIssues));
    lines.push('', '---', '');
    lines.push(`*Auto-generated by fetch-jira-details skill · ${now}*`);

    return lines.join('\n');
  }

  // ─── ADF → Markdown renderer ──────────────────────────────────────────────────

  render(content) {
    if (!content) return '';
    if (typeof content === 'string') return this._wikiToMarkdown(content);
    if (content.type === 'doc' && Array.isArray(content.content)) {
      return this._adf(content).trim();
    }
    return JSON.stringify(content, null, 2);
  }

  _wikiToMarkdown(text) {
    if (!text) return '';
    const lines = this._joinMultilineTableRows(text).split('\n');
    const out   = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // ── Jira wiki table ──────────────────────────────────────────────
      // Header row starts with ||, data rows start with | but not ||
      if (/^\|\|/.test(line) || (/^\|[^|]/.test(line) && this._isTableRow(line))) {
        const tableLines = [];
        while (i < lines.length && this._isTableRow(lines[i])) {
          tableLines.push(lines[i]);
          i++;
        }
        out.push(this._wikiTable(tableLines));
        continue;
      }

      // ── Headings: h1. … h6. ──────────────────────────────────────────
      const headingMatch = line.match(/^h([1-6])\.\s*(.*)/);
      if (headingMatch) {
        out.push(`${'#'.repeat(Number(headingMatch[1]))} ${headingMatch[2]}`);
        i++;
        continue;
      }

      // ── Horizontal rule ───────────────────────────────────────────────
      if (/^-{4,}$/.test(line.trim())) {
        out.push('---');
        i++;
        continue;
      }

      // ── Inline markup on everything else ─────────────────────────────
      out.push(this._wikiInline(line));
      i++;
    }

    return out.join('\n');
  }

  _joinMultilineTableRows(text) {
    // Jira wiki table cells can span multiple lines. This joins continuation
    // lines back onto the row so each table row is a single string.
    const lines  = text.split('\n');
    const result = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (/^\|/.test(line.trim()) && !/\|$/.test(line.trimEnd())) {
        let combined = line;
        i++;
        while (i < lines.length && !/\|$/.test(combined.trimEnd())) {
          combined += ' ' + lines[i].trim();
          i++;
        }
        result.push(combined);
      } else {
        result.push(line);
        i++;
      }
    }
    return result.join('\n');
  }

  _isTableRow(line) {
    if (!line) return false;
    const t = line.trim();
    return /^\|\|/.test(t) || (/^\|/.test(t) && /\|$/.test(t) && t.length > 2);
  }

  _wikiTable(tableLines) {
    const rows = tableLines.map((line) => {
      const isHeader = /^\|\|/.test(line.trim());
      // Split on || (header) or | (data), drop empty first/last
      const cells = isHeader
        ? line.trim().split('||').slice(1, -1)
        : line.trim().split('|').slice(1, -1);
      return { isHeader, cells: cells.map((c) => this._wikiInline(c.trim()).replace(/\|/g, '\\|')) };
    });

    if (rows.length === 0) return '';

    const mdRows  = [];
    let headerSet = false;

    for (const row of rows) {
      const rowStr = `| ${row.cells.join(' | ')} |`;
      mdRows.push(rowStr);
      // After the first header row, insert separator
      if (row.isHeader && !headerSet) {
        const sep = `| ${row.cells.map(() => '---').join(' | ')} |`;
        mdRows.push(sep);
        headerSet = true;
      }
    }

    // If no header row was found, insert separator after the first row
    if (!headerSet && mdRows.length > 0) {
      const colCount = rows[0].cells.length;
      const sep = `| ${Array(colCount).fill('---').join(' | ')} |`;
      mdRows.splice(1, 0, sep);
    }

    return mdRows.join('\n');
  }

  _wikiInline(text) {
    if (!text) return '';
    return text
      // Bold: *text* → **text**  (avoid matching list bullets at line start)
      .replace(/(?<!\*)\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, '**$1**')
      // Italic: _text_
      .replace(/(?<!_)_(?!\s)(.+?)(?<!\s)_(?!_)/g, '_$1_')
      // Monospace: {{text}} → `text`
      .replace(/\{\{(.+?)\}\}/g, '`$1`')
      // Strikethrough: -text- (only when surrounded by dashes, not hyphens in words)
      .replace(/(?<=\s|^)-([^-\s][^-]*[^-\s])-(?=\s|$)/g, '~~$1~~')
      // Citation/mention: [~accountid:xxx] → @user
      .replace(/\[~accountid:[^\]]+\]/g, '@user')
      // Named links: [text|url] → [text](url)
      .replace(/\[([^\]|]+)\|([^\]]+)\]/g, '[$1]($2)')
      // Bare links: [url] → [url](url)
      .replace(/\[([^\]|]+)\]/g, '[$1]($1)')
      // Color macros: {color:xxx}text{color} → text
      .replace(/\{color:[^}]+\}([\s\S]*?)\{color\}/g, '$1')
      // Jira bold markup *text* already handled above
      .trim();
  }

  _adf(node, listDepth = 0, listCounter = 0) {
    if (!node) return '';
    if (typeof node === 'string') return node;

    const c     = node.content || [];
    const attrs = node.attrs   || {};

    switch (node.type) {
      case 'doc':
        return c.map((n) => this._adf(n)).join('\n\n');

      case 'paragraph':
        return c.map((n) => this._adf(n)).join('') || '';

      case 'text': {
        let t = node.text || '';
        for (const mark of (node.marks || [])) {
          switch (mark.type) {
            case 'strong':        t = `**${t}**`; break;
            case 'em':            t = `_${t}_`;   break;
            case 'code':          t = `\`${t}\``; break;
            case 'strike':        t = `~~${t}~~`; break;
            case 'underline':     t = `<u>${t}</u>`; break;
            case 'link':          t = `[${t}](${mark.attrs?.href || ''})`; break;
            case 'textColor':     break;  // ignore
          }
        }
        return t;
      }

      case 'heading': {
        const level  = Math.min(attrs.level || 1, 6);
        const prefix = '#'.repeat(level + 1); // offset by 1 since doc title is H1
        return `${prefix} ${c.map((n) => this._adf(n)).join('')}`;
      }

      case 'bulletList':
        return c.map((n) => this._adf(n, listDepth + 1)).join('\n');

      case 'orderedList': {
        let counter = attrs.order || 1;
        return c.map((n) => {
          const item = this._adf(n, listDepth + 1, counter);
          counter++;
          return item;
        }).join('\n');
      }

      case 'listItem': {
        const indent  = '  '.repeat(Math.max(listDepth - 1, 0));
        const bullet  = listCounter > 0 ? `${listCounter}.` : '-';
        const inner   = c.map((n) => this._adf(n, listDepth)).join(' ').trim();
        return `${indent}${bullet} ${inner}`;
      }

      case 'codeBlock': {
        const lang = attrs.language || '';
        const code = c.map((n) => n.text || '').join('');
        return `\`\`\`${lang}\n${code}\n\`\`\``;
      }

      case 'blockquote':
        return c.map((n) => `> ${this._adf(n)}`).join('\n');

      case 'rule':
        return '---';

      case 'hardBreak':
        return '\n';

      case 'mention':
        return `@${attrs.text || attrs.id || 'user'}`;

      case 'emoji':
        return attrs.text || attrs.shortName || '';

      case 'inlineCard':
      case 'blockCard':
        return `[${attrs.url || ''}](${attrs.url || ''})`;

      case 'table':
        return this._adfTable(node);

      case 'mediaSingle':
      case 'mediaGroup':
        return c.map((n) => this._adf(n)).join('\n');

      case 'media':
        return `![${attrs.alt || 'attachment'}](${attrs.url || attrs.id || ''})`;

      case 'panel': {
        const panelType = attrs.panelType || 'info';
        const body = c.map((n) => this._adf(n)).join('\n');
        return `> **[${panelType.toUpperCase()}]**\n> ${body.replace(/\n/g, '\n> ')}`;
      }

      case 'expand': {
        const title = attrs.title || 'Details';
        return `**${title}**\n${c.map((n) => this._adf(n)).join('\n')}`;
      }

      default:
        return c.length ? c.map((n) => this._adf(n)).join('') : '';
    }
  }

  _adfTable(tableNode) {
    const rows = (tableNode.content || []).map((row) => {
      const cells = (row.content || []).map((cell) => {
        return (cell.content || []).map((n) => this._adf(n)).join('').replace(/\|/g, '\\|').trim();
      });
      return `| ${cells.join(' | ')} |`;
    });

    if (rows.length === 0) return '';
    // Insert separator after header row
    const headerCellCount = ((tableNode.content[0]?.content) || []).length;
    const separator = `| ${Array(headerCellCount).fill('---').join(' | ')} |`;
    return [rows[0], separator, ...rows.slice(1)].join('\n');
  }

  // ─── Observations ─────────────────────────────────────────────────────────────

  _observations(issue, comments, attachmentManifest, linkedIssues) {
    const f    = issue.fields;
    const obs  = [];

    if (!f.assignee)
      obs.push('- ⚠️ **Unassigned** — no assignee set');

    if (!f.description)
      obs.push('- ⚠️ **Missing description** — ticket has no description');

    if ((f.labels || []).length === 0)
      obs.push('- ℹ️ **No labels** set');

    if ((f.components || []).length === 0)
      obs.push('- ℹ️ **No components** assigned');

    const priority = f.priority?.name;
    if (['Highest', 'Critical', 'Blocker'].includes(priority))
      obs.push(`- 🔴 **${priority} priority** ticket`);

    const sts      = f.subtasks || [];
    const openSts  = sts.filter((st) => !['Done', 'Closed', 'Resolved'].includes(st.fields?.status?.name));
    if (openSts.length > 0)
      obs.push(`- 📋 **${openSts.length} open subtask(s)** remaining`);

    if (comments && comments.length > 0) {
      const last      = comments[comments.length - 1];
      const daysSince = Math.floor((Date.now() - new Date(last.created).getTime()) / 86400000);
      if (daysSince > 30)
        obs.push(`- ⏰ **Stale** — last comment was ${daysSince} days ago`);
    }

    const blockers = (linkedIssues || []).filter((l) => {
      const name = (l.type?.name || '').toLowerCase();
      return name.includes('block');
    });
    if (blockers.length > 0)
      obs.push(`- 🚫 **${blockers.length} blocker(s)** detected in linked issues`);

    const images = (attachmentManifest || []).filter((a) => a.mimeType?.startsWith('image/'));
    const pdfs   = (attachmentManifest || []).filter((a) => a.mimeType === 'application/pdf');
    if (images.length > 0) obs.push(`- 📸 **${images.length} screenshot(s)** attached`);
    if (pdfs.length > 0)   obs.push(`- 📄 **${pdfs.length} PDF(s)** attached`);

    return obs.length > 0 ? obs.join('\n') : '- ✅ No notable observations';
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────────

  _date(iso) {
    if (!iso) return 'N/A';
    try { return new Date(iso).toLocaleString('en-GB', { timeZone: 'UTC', hour12: false }); }
    catch { return iso; }
  }

  _storyPoints(fields) {
    const candidates = [
      'story_points',
      'customfield_10016',
      'customfield_10028',
      'customfield_10035',
      'customfield_10004',
    ];
    for (const k of candidates) {
      if (fields[k] != null) return fields[k];
    }
    return null;
  }

  _findAcceptanceCriteria(fields) {
    // Try dedicated custom fields first
    const acField =
      fields.customfield_10033 ||
      fields.customfield_10034 ||
      fields.customfield_10500 ||
      fields.acceptance_criteria;

    if (acField) return this.render(acField);

    // Fall back: extract from description text
    const descText = this.render(fields.description);
    const match = descText.match(
      /acceptance criteria[:\s]*([\s\S]*?)(?=\n#{1,6}\s|\n\*\*[A-Z]|$)/i
    );
    return match ? match[1].trim() : null;
  }
}

module.exports = { MarkdownGenerator };
