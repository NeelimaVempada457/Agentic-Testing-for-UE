# Generate Test Cases — Skill Documentation

> **Skill:** `/generate-test-cases`
> **Powered by:** Claude Code + Playwright-Test-Planner
> **Version:** 1.0.0

---

## What This Skill Does

The `/generate-test-cases` skill is a one-command solution for creating enterprise-grade, comprehensive test cases for any web application. Point it at your application URL and it handles everything:

- Crawls and analyzes your web application via Playwright
- Identifies all modules, forms, workflows, and user flows
- Generates structured test cases across 8 scenario categories
- Produces Gherkin BDD feature files ready for automation
- Delivers coverage and risk reports

---

## How to Use

### Step 1 — Run the skill
```
/generate-test-cases
```

### Step 2 — Answer 9 questions
The skill walks you through a structured questionnaire:

| # | Question | Example |
|---|---|---|
| 1 | Application URL | `https://your-app.com` |
| 2 | Authentication required? | Yes |
| 3 | Credentials | Username, password, MFA, roles |
| 4 | Testing scope | Smoke, Regression, Security |
| 5 | Business-critical areas | Login, Checkout, Dashboard |
| 6 | Restricted areas | Payment sandbox, Admin panel |
| 7 | Existing assets | Playwright scripts, JIRA tickets |
| 8 | Browsers | Chrome, Edge, Firefox |
| 9 | Mobile/responsive? | Yes |

### Step 3 — Wait for analysis & generation
The skill automatically:
- Navigates your application
- Maps all pages, forms, and workflows
- Generates test cases (typically 50–200 depending on app size)
- Creates Gherkin feature files
- Writes coverage and risk reports

### Step 4 — Review outputs
```
test-artifacts/          ← Test cases & reports
features/                ← Gherkin feature files
```

---

## Generated Test Case Categories

| Category | Coverage |
|---|---|
| Positive / Smoke | Happy path, successful flows |
| Negative | Invalid inputs, error states |
| Edge Cases | Special chars, unicode, back-button, concurrency |
| Boundary Values | Min/max input values, field length limits |
| Regression | Core workflows re-tested after changes |
| Validation | Field validation, required fields, format checks |
| Security | XSS, SQL injection, RBAC, HTTPS, session security |
| Accessibility | WCAG 2.1 AA — keyboard, screen reader, contrast |

---

## Priority System

| Tag | Description |
|---|---|
| `P0` | Critical — must pass for release (login, checkout, auth) |
| `P1` | High — important functional flows |
| `P2` | Medium — edge cases, cross-browser, responsive |
| `P3` | Low — cosmetic, nice-to-have |

---

## Output Structure

```
test-artifacts/
├── test-cases/
│   ├── smoke/           ← Positive & critical path
│   ├── regression/      ← Core re-test suite
│   ├── functional/      ← Full functional coverage
│   ├── edge-cases/      ← Edge and corner cases
│   ├── negative/        ← Failure scenarios
│   ├── boundary/        ← BVA test cases
│   ├── security/        ← Security test cases
│   └── accessibility/   ← WCAG 2.1 test cases
├── reports/
│   ├── coverage-report.md
│   └── risk-analysis.md
├── application-analysis/
│   ├── app-flow-analysis.md
│   └── detected-modules.md
└── logs/
    └── execution.log

features/
├── smoke/[module].feature
├── regression/[module].feature
├── functional/[module].feature
├── edge-cases/[module].feature
├── negative/[module].feature
├── boundary/[module].feature
├── security/[module].feature
└── accessibility/[module].feature
```

---

## Skill Files

| File | Purpose |
|---|---|
| `.claude/skills/generate-test-cases.md` | **Main skill file** — Claude Code invokes this |
| `.claude/skills/generate-test-cases/README.md` | Detailed skill documentation |
| `.claude/skills/generate-test-cases/skill.md` | Skill architecture & metadata |
| `.claude/skills/generate-test-cases/setup-guide.md` | Installation & setup instructions |
| `.claude/skills/generate-test-cases/reusable-prompts.md` | 10 standalone prompts for individual use |
| `.claude/skills/generate-test-cases/sample-outputs/` | Reference outputs showing expected format |

---

## Works Best With

Combine this skill with the rest of the QA automation pipeline:

```
/generate-test-cases          ← Generate test cases (this skill)
       ↓
/jira-ticket PROJ-123         ← Link to JIRA tickets
       ↓
playwright-test-generator     ← Convert .feature files to Playwright scripts
       ↓
playwright-test-healer        ← Auto-fix failing tests
       ↓
/jira-sprint PROJ             ← Full sprint coverage
```

---

## Prerequisites

- Claude Code CLI
- Node.js 18+
- `@playwright/test` installed
- Playwright browsers installed (`npx playwright install`)
- Playwright-Test-Planner MCP configured in `.mcp.json`

See [setup-guide.md](.claude/skills/generate-test-cases/setup-guide.md) for full installation steps.

---

## Support

If tests are not being generated as expected:
1. Check `test-artifacts/logs/execution.log` for errors
2. Verify the application URL is accessible
3. Verify `.mcp.json` has the Playwright-Test-Planner configured
4. See [setup-guide.md](.claude/skills/generate-test-cases/setup-guide.md) for troubleshooting

---

*Generated by Claude Code — Anthropic AI*
