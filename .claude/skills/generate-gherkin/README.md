# Generate Gherkin Test Cases — Claude Code Skill

Analyzes a fetched Jira ticket and generates enterprise-grade Gherkin BDD test cases covering positive, negative, edge-case, security, and accessibility scenarios. Interactively gathers application context before generating.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Output Structure](#output-structure)
- [Module Architecture](#module-architecture)
- [Interactive Questions](#interactive-questions)
- [Scenario Coverage](#scenario-coverage)
- [Tagging Standards](#tagging-standards)
- [Playwright Integration](#playwright-integration)

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Jira ticket fetched | Run `/fetch-jira-details <TICKET-ID>` first |
| Node.js 18+ | For helper scripts |
| Claude Code | Skill is AI-driven — Claude does the analysis |

---

## Setup

**1.** Fetch the Jira ticket:

```
/fetch-jira-details BOSLFS-1584
```

**2.** Run the skill:

```
/generate-gherkin BOSLFS-1584
```

Claude will ask you 14 questions across 5 groups (see [Interactive Questions](#interactive-questions)) before generating.

**3.** Find output at:

```
features/
├── BOSLFS-1584.feature
├── summaries/BOSLFS-1584-summary.md
├── coverage/BOSLFS-1584-coverage.json
└── risks/BOSLFS-1584-risk-analysis.md
```

---

## Usage

### Single ticket
```
/generate-gherkin BOSLFS-1584
```

### Via npm helper scripts only (no AI generation)
```bash
# Prepare context JSON (used internally by the skill)
node .claude/skills/generate-gherkin/scripts/prepare-context.js BOSLFS-1584

# Create output folders only
node .claude/skills/generate-gherkin/scripts/setup-folders.js BOSLFS-1584
```

### Skip questions (provide context inline)
```
/generate-gherkin BOSLFS-1584 --url https://app.example.com --env QA --auth yes --roles Admin,Manager --scope Regression,Smoke
```
*(Claude will skip groups where answers are provided)*

---

## Output Structure

```
features/
├── BOSLFS-1584.feature              ← Main Gherkin file (all scenarios)
├── summaries/
│   └── BOSLFS-1584-summary.md       ← Human-readable test summary
├── coverage/
│   └── BOSLFS-1584-coverage.json    ← Machine-readable coverage report
└── risks/
    └── BOSLFS-1584-risk-analysis.md ← Risk matrix + gap analysis
```

### Feature file sections
1. Feature header with user story
2. Background (if auth required)
3. Positive scenarios (happy path, AC-driven)
4. Negative scenarios (validation, auth failure, error handling)
5. Edge cases (boundary, concurrency, browser behavior)
6. Security scenarios (access control, injection, escalation)
7. Accessibility scenarios (keyboard, screen reader, contrast)

---

## Module Architecture

```
.claude/skills/
├── generate-gherkin.md                    ← Main skill definition (Claude instructions)
└── generate-gherkin/
    ├── scripts/
    │   ├── prepare-context.js             ← Reads jira-output, outputs structured JSON
    │   └── setup-folders.js               ← Creates features/ folder structure
    ├── prompts/
    │   ├── analysis-framework.md          ← 7-phase requirement analysis protocol
    │   ├── gherkin-rules.md               ← Syntax, naming, anti-pattern rules
    │   └── scenario-templates.md          ← 13 copy-paste scenario templates
    ├── sample/
    │   └── SAMPLE-101.feature             ← Reference output (25 scenarios, all types)
    └── README.md                          ← This file
```

### Data flow
```
/generate-gherkin TICKET-ID
       │
       ▼
[Interactive questions] → user context collected
       │
       ▼
[prepare-context.js] → reads jira-output/TICKET-ID/ → structured JSON
       │
       ▼
[Claude reads analysis-framework.md] → 7-phase analysis
       │
       ▼
[Claude reads gherkin-rules.md + scenario-templates.md] → apply rules
       │
       ▼
[setup-folders.js] → creates features/ folders
       │
       ▼
[Claude writes via Write tool]:
  features/TICKET-ID.feature
  features/summaries/TICKET-ID-summary.md
  features/coverage/TICKET-ID-coverage.json
  features/risks/TICKET-ID-risk-analysis.md
       │
       ▼
[Report to user] → counts, warnings, next steps
```

---

## Interactive Questions

Claude asks these before any generation:

| Group | Questions |
|-------|-----------|
| A — Access | App URL, authentication required? |
| B — Credentials | Username (env var), password (masked), MFA, roles, environment |
| C — App Type | Web / Mobile / API / Salesforce / SAP / Desktop |
| D — Scope | Testing scope, critical workflows, restricted areas, constraints |
| E — Assets | Existing feature files, scripts, test data, API collections, BRDs |

Credentials are **never** written to files. The feature file references `"${TEST_USERNAME}"` and `"${TEST_PASSWORD}"`.

---

## Scenario Coverage

### Minimum targets per ticket

| Type | Minimum |
|------|---------|
| Positive (Smoke) | 1 per acceptance criterion |
| Positive (Regression) | 2 per acceptance criterion |
| Negative | 2 per AC or validation rule |
| Edge Cases | 1 per boundary/constraint identified |
| Security | 1 per auth/permission flow |
| Accessibility | 1 per interactive element group |

### Coverage JSON structure
```json
{
  "ticketId": "BOSLFS-1584",
  "generatedAt": "2026-05-15T10:00:00Z",
  "applicationContext": { "url": "...", "environment": "QA", "roles": ["Admin", "Manager"] },
  "totalScenarios": 24,
  "breakdown": { "positive": 7, "negative": 8, "edgeCase": 5, "security": 3, "accessibility": 1 },
  "acceptanceCriteriaCoverage": [
    { "id": "AC-1", "description": "...", "coveredBy": ["Scenario title"], "status": "covered" }
  ],
  "missingCoverage": [],
  "tagDistribution": { "@Smoke": 4, "@Regression": 20, "@HighPriority": 12 },
  "playwrightReady": true
}
```

---

## Tagging Standards

| Tag | Meaning |
|-----|---------|
| `@Smoke` | Critical path — always run first |
| `@Regression` | Full regression suite |
| `@Positive` | Happy path scenario |
| `@Negative` | Error/failure scenario |
| `@EdgeCase` | Boundary/unusual input |
| `@HighPriority` | Auth, payments, core CRUD |
| `@MediumPriority` | Secondary flows, optional features |
| `@LowPriority` | Cosmetic, informational |
| `@UI` | Browser-rendered interface |
| `@API` | REST/GraphQL endpoint |
| `@Security` | Auth bypass, injection, escalation |
| `@Accessibility` | WCAG 2.1 AA |
| `@AC-N` | Maps to acceptance criterion N |
| `@TICKET-ID` | Ticket reference (e.g. `@BOSLFS-1584`) |
| `@AsAdmin` etc. | Role-specific scenario |

---

## Playwright Integration

Generated scenarios are optimized for Playwright automation:

- Steps use **role/label/text** selectors, not CSS/XPath
- **Variable placeholders** `<value>` instead of hardcoded test data
- **Credentials** reference env vars `${TEST_USERNAME}` / `${TEST_PASSWORD}`
- **Scenario Outlines** drive data-driven test execution
- **Background** blocks map directly to `beforeEach` hooks
- **Tag-based filtering**: `npx playwright test --grep @Smoke`

### Running tagged tests
```bash
# Smoke suite only
npx playwright test --grep @Smoke

# All regression tests for a ticket
npx playwright test --grep @BOSLFS-1584

# High-priority negative scenarios
npx playwright test --grep "@Negative.*@HighPriority"

# Security tests only
npx playwright test --grep @Security
```

---

## Next Steps After Generation

1. Review `features/risks/BOSLFS-1584-risk-analysis.md` for flagged gaps
2. Address any `⚠️ Missing coverage` warnings in the summary
3. Run `/generate-playwright BOSLFS-1584` to auto-generate Playwright test code
4. Add missing test data to your test data fixtures
5. Configure `TEST_USERNAME` and `TEST_PASSWORD` in your `.env` file
