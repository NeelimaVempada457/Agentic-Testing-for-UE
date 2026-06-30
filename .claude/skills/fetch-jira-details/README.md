# Fetch Jira Details — Claude Code Skill

Fetches complete Jira ticket data via REST API and persists it to a structured local folder hierarchy. The output is optimised for downstream AI agents (Playwright test generators, Claude analysis agents).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Output Structure](#output-structure)
- [Environment Variables](#environment-variables)
- [Module Architecture](#module-architecture)
- [Error Handling Strategy](#error-handling-strategy)
- [Jira Cloud vs Server](#jira-cloud-vs-server)
- [Downstream AI Usage](#downstream-ai-usage)

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm packages | `axios`, `dotenv` (already in `package.json`) |
| Jira access | API token with read access to the project |

---

## Setup

**1. Install dependencies** (if not already done):

```bash
npm install
```

**2. Create your `.env` file** in the project root:

```bash
cp .claude/skills/fetch-jira-details/.env.example .env
```

Then edit `.env` with your credentials:

```
JIRA_BASE_URL=https://your-org.atlassian.net
JIRA_EMAIL=you@company.com
JIRA_API_TOKEN=your_api_token_here
```

**3. Generate an API token** (Jira Cloud):
- Go to https://id.atlassian.com/manage-profile/security/api-tokens
- Click **Create API token**
- Copy the token into `JIRA_API_TOKEN`

---

## Usage

### Single ticket

```bash
node .claude/skills/fetch-jira-details/scripts/fetch-jira-details.js PROJ-123
```

### Batch execution (multiple tickets)

```bash
node .claude/skills/fetch-jira-details/scripts/fetch-jira-details.js PROJ-123 PROJ-456 PROJ-789
```

### Via npm script

```bash
npm run jira:fetch-details -- PROJ-123
```

### Via Claude Code skill

```
/fetch-jira-details PROJ-123
```

### Enable debug logging

```bash
DEBUG=true node .claude/skills/fetch-jira-details/scripts/fetch-jira-details.js PROJ-123
```

### Custom output directory

```bash
JIRA_OUTPUT_DIR=./my-tickets node .claude/skills/fetch-jira-details/scripts/fetch-jira-details.js PROJ-123
```

---

## Output Structure

```
jira-output/
└── PROJ-123/
    ├── Summary/
    │   ├── ticket_summary.md         # Key fields in a table + environment
    │   ├── description.md            # Full ticket description
    │   └── acceptance_criteria.md    # Extracted AC (custom field or description)
    │
    ├── Comments/
    │   ├── comments.json             # Raw comment objects
    │   └── comments.md               # Formatted comments with authors + dates
    │
    ├── Attachments/
    │   ├── <downloaded files>        # Binary content saved locally
    │   └── attachments_manifest.json # Status of each attachment (downloaded/duplicate/failed)
    │
    ├── Links/
    │   ├── linked_issues.json        # Jira issue links (blocks, is blocked by, relates to…)
    │   ├── web_links.json            # Remote/web links
    │   └── dependency_graph.md       # Mermaid diagram of ticket relationships
    │
    ├── Metadata/
    │   ├── issue_details.json        # Structured metadata + all raw fields
    │   └── changelog.json            # Full change history
    │
    ├── Subtasks/
    │   └── subtasks.json             # All subtasks with key, summary, status
    │
    ├── Logs/
    │   └── execution.log             # Timestamped run log
    │
    └── complete_ticket_context.md    # ★ Consolidated AI context file
```

### The `complete_ticket_context.md` file

This is the primary output for downstream agents. It contains:

- Summary table
- Full description (ADF → Markdown converted)
- Acceptance criteria
- All comments with authors and timestamps
- Linked issues with relationship types
- Subtask status overview
- Attachment inventory
- Auto-generated observations (unassigned, stale, blockers, etc.)
- Mermaid dependency graph

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `JIRA_BASE_URL` | ✅ | Base URL e.g. `https://your-org.atlassian.net` |
| `JIRA_EMAIL` | ✅ | Login email (Cloud) or username (Server) |
| `JIRA_API_TOKEN` | ✅ | API token (Cloud) or password (Server) |
| `JIRA_OUTPUT_DIR` | ❌ | Output path, defaults to `./jira-output` |
| `DEBUG` | ❌ | Set to `true` to enable verbose debug logs |

---

## Module Architecture

```
scripts/
├── fetch-jira-details.js   Entry point — orchestrates all modules, CLI parsing, batch loop
├── jira-client.js          Jira REST API wrapper — auth, retry, pagination, all endpoints
├── file-manager.js         File I/O — folder setup, safe filenames, duplicate detection
├── markdown-generator.js   Markdown output — ADF→MD renderer, all section generators
└── logger.js               Colored console + file logging
```

### Key design decisions

- **ADF parser** in `markdown-generator.js` handles Atlassian Document Format (rich text used by Jira Cloud) and converts it to readable Markdown. Falls back to raw JSON for unknown node types.
- **Retry with exponential backoff** in `jira-client.js`: up to 3 retries on network errors, 429 (rate limit), and 5xx errors.
- **Duplicate attachment detection** uses SHA-256 content hashing so the same file uploaded multiple times is only downloaded once.
- **Unique filenames** — if a filename already exists on disk, a numeric suffix is added rather than overwriting.
- **Acceptance criteria extraction** — tries dedicated custom fields first (`customfield_10033`, `customfield_10034`, `customfield_10500`), then falls back to regex parsing of the description.

---

## Error Handling Strategy

| Scenario | Behaviour |
|----------|-----------|
| Missing env vars | Prints list of missing variables and exits with code 1 |
| Ticket not found (404) | Throws descriptive error; skips to next ticket in batch |
| Auth failure (401/403) | Logged with instruction to regenerate token |
| Rate limit (429) | Automatic retry with exponential backoff (1s → 2s → 4s) |
| Network / 5xx errors | Retried up to 3 times; error logged if all retries fail |
| Attachment download failure | Logged in manifest with error message; other data still saved |
| Changelog unavailable | Warns and saves empty array; does not abort ticket processing |
| Sprint/Agile API unavailable | Falls back to custom field extraction; warns if both fail |

All errors are written to `TICKET-ID/Logs/execution.log`.

---

## Jira Cloud vs Server

| Feature | Cloud | Server / Data Center |
|---------|-------|----------------------|
| Auth | `Basic email:token` | `Basic user:password` or `Bearer token` |
| Rich text | ADF (JSON) | Wiki markup (string) |
| Sprint field | `customfield_10020` | May differ |
| Epic link | `customfield_10014` | `customfield_10008` |
| Agile API | `/rest/agile/1.0/` | Requires Jira Software |

The skill auto-detects Cloud vs Server by checking if `JIRA_BASE_URL` contains `atlassian.net`.

---

## Downstream AI Usage

After running the skill:

1. **Test generation** — point Playwright agents at `complete_ticket_context.md`
2. **Defect analysis** — compare attachments (screenshots) with acceptance criteria
3. **Dependency analysis** — use `Links/dependency_graph.md` to understand impact
4. **Regression scope** — use `Metadata/changelog.json` to see what changed and when
