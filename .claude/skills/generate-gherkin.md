---
name: generate-gherkin
description: Analyze Jira ticket details and functional requirements to generate comprehensive Gherkin BDD test cases covering positive, negative, and edge-case scenarios. Produces .feature files, test summaries, coverage reports, and risk analysis. Asks the user for application context before generating.
---

# Generate Gherkin Test Cases Skill

## Trigger
`/generate-gherkin <TICKET-ID>`

## Overview
This skill reads a fetched Jira ticket from `jira-output/<TICKET-ID>/`, interactively gathers application context from the user, then generates enterprise-grade Gherkin feature files with full scenario coverage and supporting analysis artifacts.

---

## Prerequisites Check

Before doing anything else:

1. Verify `jira-output/<TICKET-ID>/complete_ticket_context.md` exists.
   - If it does **not** exist, tell the user: *"No Jira data found for <TICKET-ID>. Please run `/fetch-jira-details <TICKET-ID>` first."* — then stop.
2. Check whether `features/<TICKET-ID>.feature` already exists.
   - If it does, ask the user whether to **overwrite** or **append** before continuing.

---

## Step 1 — Gather Application Context (Interactive)

Use the `AskUserQuestion` tool to ask the following questions **before** any analysis. Group them logically. Always ask all groups unless the user says to skip a group.

### Group A — Application Access
```
Question 1: "What is the Web Application URL for this ticket's feature?"
  (If no URL exists, e.g. API-only or internal, accept "N/A")

Question 2: "Does this application require login / authentication?"
  Options: Yes | No | Depends on role
```

### Group B — Credentials & Roles (only if Auth = Yes)
```
Question 3: "What is the test username / email?"
  (Store as env var TEST_USERNAME — do NOT log in plain text)

Question 4: "What is the test password?"
  (Store as env var TEST_PASSWORD — mask in all logs and output)

Question 5: "Are there multiple user roles to test? If yes, list them."
  Example: Admin, Manager, Read-Only User, Guest

Question 6: "Is MFA / 2FA required? If yes, describe the mechanism."
  Options: No | TOTP | SMS | Email OTP | Hardware Key

Question 7: "Which test environment are you targeting?"
  Options: QA | UAT | Staging | Production | Other
```

### Group C — Application Type
```
Question 8: "What type of application is this?"
  Options (multi-select):
  - Web Application (browser-based)
  - Mobile Application (iOS / Android)
  - API Only (REST / GraphQL / SOAP)
  - Salesforce
  - SAP
  - Desktop Application
  - Other
```

### Group D — Scope & Constraints
```
Question 9: "What is the testing scope for these test cases?" (multi-select)
  Options:
  - Smoke Testing (critical path only)
  - Regression Testing (full coverage)
  - Functional Testing
  - API Testing
  - Security Testing
  - Accessibility Testing (WCAG)

Question 10: "Are there any business-critical workflows I must prioritize?"
  (Free text — list key flows or say "No")

Question 11: "Are there restricted modules or out-of-scope areas?"
  (Free text or "None")

Question 12: "Any known limitations, special validation rules, or constraints?"
  (Free text or "None")
```

### Group E — Existing Assets
```
Question 13: "Do you have any existing assets I should incorporate?" (multi-select)
  Options:
  - Existing .feature files
  - Existing Playwright / automation scripts
  - Prepared test data sets
  - API collections (Postman / Insomnia)
  - BRD / FRD / Requirements documents
  - None of the above

Question 14: "If you selected any above, please share the file paths or paste the content."
  (Optional — skip if None selected)
```

**Security rules:**
- Never write TEST_PASSWORD to any file. Reference it only as `"${TEST_PASSWORD}"` in feature file examples.
- Mask credentials in all logs, summaries, and coverage files.
- If the application is public (no auth), skip Group B entirely.

---

## Step 2 — Prepare Jira Context

Run the context preparation script:

```powershell
node ".claude/skills/generate-gherkin/scripts/prepare-context.js" <TICKET-ID>
```

This script outputs a structured JSON summary to stdout. Read it and use it as the primary input for analysis alongside the user's answers from Step 1.

Also read these files directly for deep context:
- `jira-output/<TICKET-ID>/complete_ticket_context.md`
- `jira-output/<TICKET-ID>/Summary/acceptance_criteria.md`
- `jira-output/<TICKET-ID>/Summary/description.md`
- `jira-output/<TICKET-ID>/Comments/comments.md`
- `jira-output/<TICKET-ID>/Links/linked_issues.json`

---

## Step 3 — Analyze Requirements

Read `.claude/skills/generate-gherkin/prompts/analysis-framework.md` for the full analysis protocol.

Perform in order:

### 3A. Extract Acceptance Criteria
- Parse every AC from the context. Number them AC-1, AC-2, etc.
- For each AC: identify the actor, action, expected outcome, and any conditions.
- Flag any AC that is ambiguous, contradictory, or missing detail.

### 3B. Identify Test Categories
Map each requirement to one or more categories:
- **Positive** — happy path, valid inputs, successful outcomes
- **Negative** — invalid inputs, missing fields, unauthorized access, boundary violations
- **Edge Case** — null/empty, max/min boundaries, concurrent access, network interruption, browser refresh
- **API** — endpoint validation, response codes, payload structure
- **Security** — auth bypass, SQL injection, XSS, IDOR, role escalation
- **Accessibility** — keyboard navigation, screen reader labels, WCAG 2.1 AA

### 3C. Identify Risks
For each area, assess risk level:
- **High** — auth, payments, data mutation, role permissions
- **Medium** — search/filter, pagination, file upload
- **Low** — static content, cosmetic UI

### 3D. Role-Based Scenario Mapping
If multiple roles were provided, generate at least one scenario per role per critical AC.

---

## Step 4 — Generate Gherkin

Read `.claude/skills/generate-gherkin/prompts/gherkin-rules.md` and `.claude/skills/generate-gherkin/prompts/scenario-templates.md` before writing.

### Scenario minimum targets
| Category | Minimum |
|----------|---------|
| Positive (Smoke) | 1 per AC |
| Positive (Regression) | 2 per AC |
| Negative | 2 per AC or validation rule |
| Edge Case | 1 per boundary/constraint |
| Security | 1 per auth/permission flow |
| Accessibility | 1 per interactive UI element group |

### Tag every scenario:
- `@Smoke` — critical path, always in smoke suite
- `@Regression` — full regression suite
- `@Positive` / `@Negative` / `@EdgeCase`
- `@HighPriority` / `@MediumPriority` / `@LowPriority`
- `@UI` / `@API` / `@Security` / `@Accessibility`
- `@<TICKET-ID>` — e.g. `@BOSLFS-1584`
- Role tag if applicable: `@AsAdmin` / `@AsManager` etc.

### Background block
If the application requires login, always include a `Background:` block with login steps.

### Scenario Outlines
Use `Scenario Outline` + `Examples` for:
- Boundary value analysis (min, max, min-1, max+1)
- Multiple invalid inputs of the same type
- Multi-role permission checks

### Playwright-friendly rules
- Prefer `role`, `label`, `placeholder`, `text` selectors over CSS/XPath
- Use `<variable>` placeholders in steps — never hardcode test data
- Keep step language at the business level (no implementation details)
- Reference `"${TEST_USERNAME}"` and `"${TEST_PASSWORD}"` for credentials — never paste actual values

---

## Step 5 — Setup Output Folders

Run:

```powershell
node ".claude/skills/generate-gherkin/scripts/setup-folders.js" <TICKET-ID>
```

This creates:
```
features/
├── <TICKET-ID>.feature
├── summaries/
├── coverage/
└── risks/
```

---

## Step 6 — Save All Files

Write the following files using the Write tool. Do not skip any file.

### 6A. Feature file
Path: `features/<TICKET-ID>.feature`

### 6B. Test summary
Path: `features/summaries/<TICKET-ID>-summary.md`

Content must include:
- Ticket ID and summary
- Total scenario count
- Breakdown: Positive / Negative / Edge Case / Security / Accessibility
- List of all scenario titles with tags
- Missing coverage warnings
- Masked credential reference (username only, password shown as `[MASKED]`)
- Application context (URL, type, environment, roles)
- Date and model used to generate

### 6C. Coverage JSON
Path: `features/coverage/<TICKET-ID>-coverage.json`

Structure:
```json
{
  "ticketId": "<TICKET-ID>",
  "generatedAt": "<ISO timestamp>",
  "applicationContext": {
    "url": "...",
    "type": "...",
    "environment": "...",
    "roles": []
  },
  "totalScenarios": 0,
  "breakdown": { "positive": 0, "negative": 0, "edgeCase": 0, "security": 0, "accessibility": 0 },
  "acceptanceCriteriaCoverage": [
    { "id": "AC-1", "description": "...", "coveredBy": ["Scenario title 1"], "status": "covered" }
  ],
  "missingCoverage": [],
  "tagDistribution": { "@Smoke": 0, "@Regression": 0 },
  "playwrightReady": true
}
```

### 6D. Risk analysis
Path: `features/risks/<TICKET-ID>-risk-analysis.md`

Content:
- Risk matrix table (Area | Risk Level | Mitigation Scenario)
- Missing acceptance criteria list
- Unclear requirements flagged during analysis
- Recommended additional edge cases not yet covered
- Dependency risks from linked issues

---

## Step 7 — Report to User

After saving all files, report:

```
✅ Gherkin generation complete for <TICKET-ID>

📄 Feature file:     features/<TICKET-ID>.feature
📋 Summary:          features/summaries/<TICKET-ID>-summary.md
📊 Coverage report:  features/coverage/<TICKET-ID>-coverage.json
⚠️  Risk analysis:   features/risks/<TICKET-ID>-risk-analysis.md

Scenario counts:
  ✅ Positive:      N
  ❌ Negative:      N
  🔁 Edge Cases:    N
  🔒 Security:      N
  ♿ Accessibility:  N
  ─────────────────
  📦 Total:         N

⚠️  Warnings:
  - List any missing AC coverage
  - List any flagged unclear requirements
  - List recommended additions

💡 Next step: /generate-playwright <TICKET-ID>
```

---

## Error Handling

| Situation | Action |
|-----------|--------|
| Jira data not found | Tell user to run `/fetch-jira-details` first, then stop |
| Feature file already exists | Ask user: overwrite / append / cancel |
| No acceptance criteria in ticket | Warn user; generate scenarios from description only |
| Application URL not reachable | Note in summary; generate scenarios anyway |
| Auth required but no credentials given | Generate scenarios with `"${TEST_USERNAME}"` placeholders |
| Script execution fails | Read error, tell user exact failure, suggest fix |

---

## Reference Files
- Analysis protocol: `.claude/skills/generate-gherkin/prompts/analysis-framework.md`
- Gherkin syntax rules: `.claude/skills/generate-gherkin/prompts/gherkin-rules.md`
- Scenario templates: `.claude/skills/generate-gherkin/prompts/scenario-templates.md`
- Sample output: `.claude/skills/generate-gherkin/sample/SAMPLE-101.feature`
