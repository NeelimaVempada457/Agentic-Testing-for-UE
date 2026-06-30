# Generate Test Cases Skill

> **Skill Name:** `generate-test-cases`
> **Version:** 1.0.0
> **Powered by:** Playwright-Test-Planner + Claude AI
> **Category:** QA Automation / Test Generation

---

## Overview

The **Generate Test Cases** skill is an AI-powered, enterprise-grade test case generation engine built on top of Claude Code and Playwright-Test-Planner. It analyzes any web application through intelligent browser automation, understands its structure, workflows, and validations — then generates comprehensive, structured test cases across all QA scenario categories.

This skill is designed for:
- Enterprise QA teams needing rapid test coverage
- Agile teams automating test design
- AI-driven agentic testing workflows
- Organizations building scalable Playwright automation suites

---

## Features

| Feature | Description |
|---|---|
| Interactive Setup | Guided questionnaire before execution |
| AI-Powered Analysis | Uses Playwright-Test-Planner to crawl and understand the app |
| Full Scenario Coverage | Positive, Negative, Edge, Boundary, Regression, Security, Accessibility |
| Priority Tagging | Automatic P0/P1/P2/P3 classification |
| Gherkin Generation | Feature files with Scenario Outlines for data-driven tests |
| Enterprise Output | Structured artifacts ready for JIRA, Playwright, and CI/CD |
| Composable | Integrates with `/jira-ticket`, `/jira-sprint`, `playwright-test-generator` |
| Retry & Error Handling | Graceful degradation on page load failures |

---

## Quick Start

### 1. Run the skill
In Claude Code:
```
/generate-test-cases
```

### 2. Answer the interactive prompts
The skill will ask you about:
- Application URL
- Authentication details (if required)
- Testing scope priorities
- Business-critical modules
- Browser and device coverage

### 3. Review generated artifacts
All outputs are saved to:
```
test-artifacts/          — Test cases, reports, analysis
features/                — Gherkin feature files
```

---

## Prerequisites

- Claude Code CLI installed and running
- Node.js 18+ installed
- Playwright installed (`npm install @playwright/test`)
- Playwright browsers installed (`npx playwright install`)
- The Playwright-Test-Planner MCP server configured in `.mcp.json`

---

## Output Structure

```
test-artifacts/
├── test-cases/
│   ├── smoke/           → P0 happy path scenarios
│   ├── regression/      → Core regression suite
│   ├── functional/      → Full functional coverage
│   ├── edge-cases/      → Edge and corner cases
│   ├── negative/        → Negative test scenarios
│   ├── boundary/        → Boundary value analysis
│   ├── security/        → Security test scenarios
│   └── accessibility/   → WCAG/A11y scenarios
├── reports/
│   ├── coverage-report.md   → Full coverage metrics
│   └── risk-analysis.md     → Risk assessment
├── application-analysis/
│   ├── app-flow-analysis.md → Detected flows/workflows
│   └── detected-modules.md  → Module inventory
└── logs/
    └── execution.log        → Execution trace

features/
├── smoke/
├── regression/
├── functional/
├── edge-cases/
├── negative/
├── boundary/
├── security/
└── accessibility/
```

---

## Test Case Format

Every generated test case follows this structured format:

```
Test Case ID:   [MODULE]-[TYPE]-[NNN]
Title:          Descriptive test case title
Priority:       P0 / P1 / P2 / P3
Module:         Detected module/page name
Scenario Type:  Positive / Negative / Edge / Boundary / Regression /
                Validation / Security / Accessibility
Risk Level:     Critical / High / Medium / Low
Tags:           [@Smoke, @Auth, @P0, ...]

Preconditions:
  - User is on the application
  - [Additional preconditions]

Test Steps:
  1. Navigate to [URL/page]
  2. Perform [action]
  3. Verify [state]

Expected Results:
  - [Assertion 1]
  - [Assertion 2]
```

---

## Priority Classification

| Priority | Description | Examples |
|---|---|---|
| **P0** | Business-critical, must pass for release | Login, Checkout, Payment |
| **P1** | Important functional paths | Profile update, Search, Filters |
| **P2** | Secondary flows, cross-browser, responsive | Edge cases, UI validation |
| **P3** | Low-risk, cosmetic, nice-to-have | Tooltips, non-critical text |

---

## Gherkin Output

The skill generates Gherkin feature files with:
- `Scenario` blocks for single test cases
- `Scenario Outline + Examples` for data-driven cases
- Tags for priority (`@P0`), type (`@Smoke`), and module (`@Auth`)
- Background steps for shared preconditions

**Example:**
```gherkin
Feature: User Authentication

  Background:
    Given the user navigates to the login page

  @P0 @Smoke @Auth
  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters valid username "testuser@example.com"
    And the user enters valid password "SecurePass123!"
    And the user clicks the "Login" button
    Then the user should be redirected to the dashboard
    And the welcome message should display the user's name

  @P0 @Negative @Auth
  Scenario Outline: Login fails with invalid credentials
    Given the user is on the login page
    When the user enters username "<username>"
    And the user enters password "<password>"
    And the user clicks the "Login" button
    Then an error message "<error_message>" should be displayed

    Examples:
      | username              | password      | error_message             |
      | invalid@example.com   | WrongPass123  | Invalid email or password |
      | testuser@example.com  | wrongpassword | Invalid email or password |
      |                       | SecurePass123 | Email is required         |
      | testuser@example.com  |               | Password is required      |
```

---

## Integration with Other Skills

```bash
# Generate test cases first
/generate-test-cases

# Then link to JIRA tickets
/jira-ticket PROJ-123

# Or process entire sprint
/jira-sprint PROJ

# Then generate Playwright scripts from feature files
# (using playwright-test-generator agent)
```

---

## Configuration

The skill respects the following environment settings:

| Variable | Description |
|---|---|
| `APP_URL` | Target application URL |
| `AUTH_USERNAME` | Login username (if auth required) |
| `AUTH_PASSWORD` | Login password (if auth required) |
| `ENV_TYPE` | QA / UAT / STAGE / PROD |
| `BROWSER_COVERAGE` | Chrome, Edge, Firefox, Safari |

These can be set in `.env` or provided interactively during skill execution.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| "Application URL unreachable" | Verify the URL is accessible, check VPN/network |
| "Authentication failed" | Verify credentials, check if MFA is required |
| "Page analysis timeout" | The page may have heavy dynamic content — skill retries once |
| "No modules detected" | Application may be fully JavaScript-rendered — ensure Playwright waits for network idle |
| "Feature files not generated" | Check `features/` directory permissions |

---

## License
Internal enterprise skill — proprietary to your QA organization.

---

## Author
Generated and maintained by Claude Code AI Agent.
