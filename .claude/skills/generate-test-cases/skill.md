# Skill Definition — Generate Test Cases using Playwright-Test-Planner

## Skill Metadata

| Property | Value |
|---|---|
| **Skill Name** | `generate-test-cases` |
| **Trigger Command** | `/generate-test-cases` |
| **Skill File** | `.claude/skills/generate-test-cases.md` |
| **Version** | 1.0.0 |
| **Category** | QA Automation / Test Design |
| **Agent Type** | `playwright-test-planner` |
| **Output Type** | Test Cases + Gherkin Feature Files + Reports |
| **Execution Mode** | Interactive (questionnaire) then automated |

---

## Skill Purpose

This skill automates the end-to-end process of test case design for web applications. It replaces manual test case writing by:

1. Collecting application context from the user (interactive)
2. Crawling and analyzing the target web application (automated)
3. Generating structured test cases across all QA scenario categories (automated)
4. Producing Gherkin feature files for BDD frameworks (automated)
5. Generating coverage and risk reports (automated)

---

## Skill Architecture

```
User Invokes /generate-test-cases
         │
         ▼
┌─────────────────────┐
│ Interactive         │  ← 9-question wizard
│ Questionnaire       │    (URL, auth, scope, browsers...)
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Directory           │  ← Creates test-artifacts/[TICKET_ID]/ and
│ Initialization      │    features/[TICKET_ID]/ folder structure
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Playwright-Test-    │  ← Navigates application
│ Planner Analysis    │    Handles auth, crawls pages
└────────┬────────────┘    Detects forms, flows, elements
         │
         ▼
┌─────────────────────┐
│ Test Case           │  ← Positive, Negative, Edge,
│ Generation Engine   │    Boundary, Regression, Security,
└────────┬────────────┘    Accessibility scenarios
         │
         ▼
┌─────────────────────┐
│ Gherkin Feature     │  ← .feature files per module
│ File Generation     │    Scenario Outlines + Examples
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Report Generation   │  ← Coverage report
│                     │    Risk analysis
└────────┬────────────┘    Execution log
         │
         ▼
┌─────────────────────┐
│ Summary Output      │  ← Final summary to user
│                     │    with artifact locations
└─────────────────────┘
```

---

## Inputs

| Input | Required | Source | Description |
|---|---|---|---|
| Application URL | Yes | User (question 1) | Target web application URL |
| Auth credentials | Conditional | User (question 3) | Username/password if app requires login |
| Testing scope | Yes | User (question 4) | Which test types to generate |
| Critical areas | No | User (question 5) | Business-critical modules for P0 coverage |
| Restricted areas | No | User (question 6) | Pages/modules to exclude |
| Browser list | Yes | User (question 8) | Which browsers to target |
| Mobile coverage | Yes | User (question 9) | Generate responsive scenarios |

---

## Outputs

All outputs are scoped under `BASE_DIR = test-artifacts/[TICKET_ID]` (Jira modes) or `test-artifacts/[SANITIZED_HOSTNAME]` (URL-only mode).

| Output | Location | Format |
|---|---|---|
| Smoke test cases | `[BASE_DIR]/test-cases/smoke/` | Markdown |
| Regression test cases | `[BASE_DIR]/test-cases/regression/` | Markdown |
| Negative test cases | `[BASE_DIR]/test-cases/negative/` | Markdown |
| Edge case test cases | `[BASE_DIR]/test-cases/edge-cases/` | Markdown |
| Boundary test cases | `[BASE_DIR]/test-cases/boundary/` | Markdown |
| Security test cases | `[BASE_DIR]/test-cases/security/` | Markdown |
| Accessibility test cases | `[BASE_DIR]/test-cases/accessibility/` | Markdown |
| Gherkin feature files | `features/[TICKET_ID or SANITIZED_HOSTNAME]/[type]/[module].feature` | Gherkin |
| Coverage report | `[BASE_DIR]/reports/coverage-report.md` | Markdown |
| Risk analysis | `[BASE_DIR]/reports/risk-analysis.md` | Markdown |
| App flow analysis | `[BASE_DIR]/application-analysis/app-flow-analysis.md` | Markdown |
| Detected modules | `[BASE_DIR]/application-analysis/detected-modules.md` | Markdown |
| **Discrepancies** | **`[BASE_DIR]/application-analysis/discrepancies.md`** | **Markdown — always generated** |
| Requirements vs app | `[BASE_DIR]/application-analysis/requirements-vs-app.md` | Markdown (Jira mode only) |
| Execution log | `[BASE_DIR]/logs/execution.log` | Plain text |

---

## Dependencies

| Dependency | Purpose | Required |
|---|---|---|
| `@playwright/test` | Browser automation | Yes |
| Playwright-Test-Planner MCP | Page analysis | Yes |
| Node.js 18+ | Runtime | Yes |
| `.mcp.json` config | MCP server connection | Yes |

---

## Error Recovery

| Error Condition | Recovery Strategy |
|---|---|
| URL unreachable | Ask user to verify, retry once, then abort |
| Auth failure | Generate public-area tests only |
| Page load timeout | Skip page, log warning, continue |
| MCP server unavailable | Log error, generate template tests based on URL structure |
| Write permission denied | Log error, display tests in console instead |

---

## Integration Points

| Skill/Tool | Integration Type | Use Case |
|---|---|---|
| `/jira-ticket` | Post-execution | Link test cases to JIRA tickets |
| `/jira-sprint` | Pre-execution | Pull scope from JIRA sprint |
| `/generate-gherkin` | Alternative | If app analysis already done |
| `playwright-test-generator` | Post-execution | Convert feature files to Playwright scripts |
| `playwright-test-healer` | Post-execution | Auto-heal generated scripts after app changes |

---

## Sample Execution Timeline

```
T+0:00  — User runs /generate-test-cases
T+0:30  — Interactive questionnaire complete
T+1:00  — Directory structure initialized
T+2:00  — Application analysis begins (Playwright navigates app)
T+5:00  — All pages crawled, modules identified
T+8:00  — Test cases generated (all scenario types)
T+10:00 — Gherkin feature files written
T+11:00 — Reports generated
T+11:30 — Summary displayed to user
```
*Times are estimates for a medium-complexity application (10–20 pages)*

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0.0 | 2026-05-16 | Initial release |
| 1.1.0 | 2026-05-20 | Added mandatory `discrepancies.md` output to application-analysis/ — always generated regardless of mode |

---

## Author
Generated by Claude Code — Anthropic AI
Skill Category: Enterprise QA Automation
