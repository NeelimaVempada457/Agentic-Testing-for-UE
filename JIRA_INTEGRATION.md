# Jira Integration

Fetch Jira issue details from the command line for use in Playwright tests.

## Setup

### 1. Get a Jira API Token

1. Log in to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token**
3. Give it a label (e.g. `playwright-tests`) and copy the token

### 2. Configure credentials

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```
JIRA_BASE_URL=https://your-company.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=your-api-token-here
```

### 3. Install dependencies

```bash
npm install
```

## Usage

```bash
npm run jira:get -- ABC-123
```

Or directly:

```bash
node scripts/fetch-jira.js ABC-123
```

## Sample Output

```json
{
  "key": "ABC-123",
  "summary": "Login page throws 500 on empty password",
  "description": { ... },
  "status": "In Progress",
  "priority": "High",
  "assignee": "Jane Smith",
  "reporter": "John Doe",
  "created": "2024-01-15T10:30:00.000+0000",
  "updated": "2024-01-20T14:22:10.000+0000",
  "issueType": "Bug",
  "labels": ["regression", "auth"],
  "components": ["Frontend", "Auth Service"]
}
```

## Error Reference

| Error | Cause | Fix |
|-------|-------|-----|
| Missing env vars | `.env` not configured | Copy `.env.example` to `.env` |
| 401 Unauthorized | Wrong email or token | Re-check `JIRA_EMAIL` / `JIRA_API_TOKEN` |
| 403 Forbidden | No permission for issue | Ask your Jira admin for access |
| 404 Not Found | Wrong issue key | Verify the key exists in your project |
| 429 Rate Limited | Too many requests | Wait a moment and retry |
| Network timeout | Bad `JIRA_BASE_URL` | Check the URL and your network |
