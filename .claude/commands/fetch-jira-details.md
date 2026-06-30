---
name: fetch-jira-details
description: Fetch complete Jira ticket details via REST API and save to a structured local folder. Supports single and batch tickets, downloads attachments, and generates a consolidated markdown context file for downstream AI agents.
---

# Fetch Jira Details Skill

## Trigger
`/fetch-jira-details <TICKET-ID> [TICKET-ID2 ...]`

## What This Skill Does

Fetches all available data for one or more Jira tickets and persists it to `jira-output/<TICKET-ID>/` in a structured folder hierarchy:

```
jira-output/
└── TICKET-ID/
    ├── Summary/
    │   ├── ticket_summary.md
    │   ├── description.md
    │   └── acceptance_criteria.md
    ├── Comments/
    │   ├── comments.json
    │   └── comments.md
    ├── Attachments/
    │   ├── <downloaded files>
    │   └── attachments_manifest.json
    ├── Links/
    │   ├── linked_issues.json
    │   ├── web_links.json
    │   └── dependency_graph.md
    ├── Metadata/
    │   ├── issue_details.json
    │   └── changelog.json
    ├── Subtasks/
    │   └── subtasks.json
    ├── Logs/
    │   └── execution.log
    └── complete_ticket_context.md   ← consolidated AI context
```

## Prerequisites

Ensure the following environment variables are set (in `.env` or system env):

| Variable | Description |
|----------|-------------|
| `JIRA_BASE_URL` | e.g. `https://your-org.atlassian.net` |
| `JIRA_EMAIL` | Your Jira login email |
| `JIRA_API_TOKEN` | API token from https://id.atlassian.com/manage-profile/security/api-tokens |
| `JIRA_OUTPUT_DIR` | *(optional)* Output directory, defaults to `./jira-output` |

## Execution Instructions for Claude

When this skill is invoked:

1. **Parse the ticket IDs** from the arguments (one or more, space-separated).
2. **Check for a `.env` file** in the project root. If missing, inform the user with the required variables.
3. **Run the script** using PowerShell (Windows) or Bash:

```powershell
node ".claude/skills/fetch-jira-details/scripts/fetch-jira-details.js" <TICKET-ID>
```

For batch execution:

```powershell
node ".claude/skills/fetch-jira-details/scripts/fetch-jira-details.js" PROJ-1 PROJ-2 PROJ-3
```

4. **Monitor the output** — the script logs progress to both console and `jira-output/<TICKET-ID>/Logs/execution.log`.
5. **On success**, report the output path and key stats (comment count, attachment count).
6. **On failure**, read the execution log and report the specific error to the user.

## Error Handling

| Error | Resolution |
|-------|-----------|
| Missing env vars | Show which variables are missing; point to `.env.example` |
| Ticket not found (404) | Confirm the ticket ID and Jira base URL are correct |
| Auth failure (401/403) | API token may be expired; regenerate at Atlassian profile |
| Rate limit (429) | Script retries automatically with exponential backoff |
| Attachment download failure | Logged in manifest; other data still saved |

## Notes for Downstream Agents

- `complete_ticket_context.md` is the primary file for test generation and analysis
- `Metadata/issue_details.json` contains all raw fields including custom fields
- `Attachments/attachments_manifest.json` maps filenames to download status
- `Links/dependency_graph.md` is a Mermaid diagram of ticket relationships
