---
name: generate-test-cases
description: Crawl and analyze a live web application using Playwright-Test-Planner, then generate comprehensive structured test cases covering positive, negative, edge, boundary, regression, security, and accessibility scenarios. Optionally accepts a Jira ticket ID to use fetched requirements as the golden source — combining Jira acceptance criteria with live app behavior for richer, requirements-traced test cases. Produces test case files, Gherkin feature files, coverage report, risk analysis, and a requirements traceability matrix. Use this skill when the user provides a URL (with or without a Jira ticket ID).
---

# Generate Test Cases using Playwright-Test-Planner

## Skill Description
Analyzes a live web application and generates comprehensive, structured test cases across all QA scenario categories. When a Jira ticket ID is also provided, loads the fetched requirements from `jira-output/<TICKET-ID>/` and uses them as the golden source — combining Jira acceptance criteria with live app behavior to produce requirements-traced test cases.

## Trigger
- `/generate-test-cases` — URL-only mode (asks for URL interactively)
- `/generate-test-cases BOSLFS-202 https://myapp.com` — Jira + URL mode
- Natural language: "Generate test cases (BOSLFS-202, Url: https://myapp.com)"

---

## EXECUTION INSTRUCTIONS

Follow each step in sequence. Do not skip steps. Do not proceed to the next step until the current step is complete.

---

## STEP 0 — Detect Input Mode

Before asking any questions, inspect the user's prompt for:
- A **Jira ticket ID** — pattern: one or more uppercase letters, a hyphen, and digits (e.g. `BOSLFS-202`, `PROJ-45`)
- An **application URL** — any `http://` or `https://` URL, or a domain-like string labeled as "Url:"

### Case A — Both Jira ticket ID AND URL detected
Set:
- `TICKET_ID` = detected Jira ticket ID
- `APP_URL` = detected URL
- `MODE` = `JIRA_AND_URL`

Confirm with the user:
> "I'll generate test cases for **[TICKET_ID]** against **[APP_URL]** — combining the Jira requirements with live app analysis. Does that sound right? (Yes/No)"

If No — ask which they want to proceed with.

### Case B — Only URL detected (no Jira ticket ID)
Set:
- `APP_URL` = detected URL
- `MODE` = `URL_ONLY`

Proceed directly to STEP 1.

### Case C — Only Jira ticket ID detected (no URL)
Set:
- `TICKET_ID` = detected Jira ticket ID
- `MODE` = `JIRA_ONLY`

Ask:
> "I found Jira ticket **[TICKET_ID]** but no application URL. Please provide the URL of the application to test."

Store as `APP_URL`, then set `MODE = JIRA_AND_URL`.

### Case D — Neither detected
Set `MODE = URL_ONLY` and proceed to STEP 1 (the questionnaire will collect the URL).

---

## STEP 0B — Set Base Output Directory

After resolving the mode and inputs above, define `BASE_DIR`:

- If `TICKET_ID` is set → `BASE_DIR = test-artifacts/[TICKET_ID]`
- If only `APP_URL` is set → derive a sanitized hostname from the URL (replace dots and slashes with dashes, strip protocol) and set `BASE_DIR = test-artifacts/[SANITIZED_HOSTNAME]`
  - Example: `https://myapp.example.com/login` → `BASE_DIR = test-artifacts/myapp-example-com`

Use `BASE_DIR` as the root for **all** output paths in every subsequent step.

---

## STEP 0A — Load Jira Context (only if MODE = JIRA_AND_URL)

Check if `jira-output/[TICKET_ID]/complete_ticket_context.md` exists.

### If the file EXISTS:
Read the full contents of `jira-output/[TICKET_ID]/complete_ticket_context.md`.

Extract and store the following from the Jira context:
- `JIRA_SUMMARY` — ticket title/summary
- `JIRA_DESCRIPTION` — full ticket description
- `JIRA_ACCEPTANCE_CRITERIA` — all acceptance criteria (AC) listed
- `JIRA_USER_STORIES` — user stories if present
- `JIRA_TICKET_TYPE` — Bug / Story / Task / Epic
- `JIRA_PRIORITY` — Jira priority (Critical/High/Medium/Low)
- `JIRA_LABELS` — labels/tags on the ticket
- `JIRA_COMPONENTS` — components/modules listed
- `JIRA_ATTACHMENTS` — list of any attachments (wireframes, specs, screenshots)
- `JIRA_LINKED_ISSUES` — linked tickets

Also read if available:
- `jira-output/[TICKET_ID]/Summary/acceptance_criteria.md`
- `jira-output/[TICKET_ID]/Summary/description.md`
- `jira-output/[TICKET_ID]/Comments/comments.md` — for QA notes in comments

Inform the user:
> "Jira context loaded for **[TICKET_ID]**: [JIRA_SUMMARY]
> Found **[N] acceptance criteria** that will be used as the requirements baseline."

### If the file does NOT EXIST:
Tell the user:
> "No Jira data found for **[TICKET_ID]**. Fetching it now..."

Run the fetch-jira-details skill:
```
node ".claude/skills/fetch-jira-details/scripts/fetch-jira-details.js" [TICKET_ID]
```

Wait for completion. If fetch succeeds, re-read the context file and continue.
If fetch fails, inform the user and ask whether to:
1. Retry fetch
2. Continue in URL-only mode (no Jira context)
3. Abort

---

## STEP 1 — Collect Application Information (Interactive)

Ask the following questions. Skip or pre-fill any question where Jira context already provides the answer.

### Question 1 — Application URL
**Skip if** `APP_URL` already detected in STEP 0.
Otherwise ask:
> "Please provide the Web Application URL you want to test."

Store as: `APP_URL`

### Question 2 — Authentication Requirement
Ask:
> "Does the application require login/authentication? (Yes/No)"

Store as: `REQUIRES_AUTH`

### Question 3 — Credentials (only if REQUIRES_AUTH = Yes)
Ask:
> "Please provide the following authentication details:
> - Username:
> - Password:
> - MFA/OTP requirement (if any):
> - Available user roles (e.g., Admin, User, Guest):
> - Environment type (QA / UAT / STAGE / PROD):"

Store as: `AUTH_USERNAME`, `AUTH_PASSWORD`, `AUTH_MFA`, `USER_ROLES`, `ENV_TYPE`

### Question 4 — Testing Scope
**Pre-fill suggestion from Jira** if `MODE = JIRA_AND_URL`:
- If `JIRA_TICKET_TYPE = Bug` → suggest Regression + Functional
- If `JIRA_TICKET_TYPE = Story` → suggest Smoke + Functional + End-to-End
- If `JIRA_LABELS` contains "security" → add Security
- If `JIRA_LABELS` contains "accessibility" → add Accessibility

Ask (allow multiple selections):
> "What type of testing should be prioritized? (Select all that apply)
> [Pre-selected based on Jira: X, Y] — confirm or change:
> 1. Smoke
> 2. Regression
> 3. Functional
> 4. End-to-End
> 5. API
> 6. Security
> 7. Accessibility"

Store as: `TESTING_SCOPE`

### Question 5 — Business Critical Areas
**Pre-fill from Jira** if `MODE = JIRA_AND_URL`: use `JIRA_COMPONENTS` as the default answer.

Ask:
> "Please specify any business-critical workflows or modules that require high-priority coverage.
> [Detected from Jira: [JIRA_COMPONENTS]] — confirm or add more:"

Store as: `CRITICAL_AREAS`

### Question 6 — Restricted Areas
Ask:
> "Are there any modules or pages that should NOT be tested? (e.g., Admin panel, Payment gateway sandbox, Third-party integrations)"

Store as: `RESTRICTED_AREAS`

### Question 7 — Existing Assets
Ask:
> "Do you already have any of the following? (List all that apply)
> - Existing Playwright scripts
> - Existing Gherkin/feature files
> - Existing test cases (Excel/Sheets/JIRA)
> - API collections (Postman/Swagger)
> - Requirement documents (BRD/FRD/User Stories)"

If `MODE = JIRA_AND_URL`, automatically note: "Jira ticket [TICKET_ID] data is available as a requirement source."

Store as: `EXISTING_ASSETS`

### Question 8 — Browser Coverage
Ask (allow multiple selections):
> "Which browsers should be covered? (Select all that apply)
> 1. Chrome (Chromium)
> 2. Edge
> 3. Firefox
> 4. Safari (WebKit)"

Store as: `BROWSER_COVERAGE`

### Question 9 — Device/Responsive Coverage
Ask:
> "Should responsive/mobile scenarios also be generated? (Yes/No)"

Store as: `MOBILE_COVERAGE`

---

## STEP 2 — Initialize Output Directory Structure

Create the following folder structure under the project root. If folders exist, do not overwrite — create only missing items.

`[BASE_DIR]` is `test-artifacts/[TICKET_ID]` (Jira modes) or `test-artifacts/[SANITIZED_HOSTNAME]` (URL-only mode).

```
test-artifacts/
└── [TICKET_ID or SANITIZED_HOSTNAME]/     ← ticket/domain-named folder (BASE_DIR)
    ├── test-cases/
    │   ├── smoke/
    │   ├── regression/
    │   ├── functional/
    │   ├── edge-cases/
    │   ├── negative/
    │   ├── boundary/
    │   ├── security/
    │   └── accessibility/
    ├── reports/
    │   ├── coverage-report.md
    │   ├── risk-analysis.md
    │   └── traceability-matrix.md        ← only if MODE = JIRA_AND_URL
    ├── application-analysis/
    │   ├── app-flow-analysis.md
    │   ├── detected-modules.md
    │   ├── requirements-vs-app.md        ← only if MODE = JIRA_AND_URL
    │   ├── discrepancies.md              ← ALWAYS generated; lists every gap between requirements and live app
    │   └── screenshots/                  ← one screenshot per discrepancy, named DISC-NNN-[slug].png
    └── logs/
        └── execution.log

features/
└── [TICKET_ID or SANITIZED_HOSTNAME]/     ← mirrors BASE_DIR ticket/domain scoping
    ├── smoke/
    ├── regression/
    ├── functional/
    ├── edge-cases/
    ├── negative/
    ├── boundary/
    ├── security/
    └── accessibility/
```

Log the initialization timestamp and mode to `[BASE_DIR]/logs/execution.log`:
```
[TIMESTAMP] Execution started
Mode: [MODE]
Ticket: [TICKET_ID or N/A]
App URL: [APP_URL]
Base Directory: [BASE_DIR]
```

---

## STEP 3 — Analyze Requirements from Jira (only if MODE = JIRA_AND_URL)

Before touching the live application, deeply analyze the Jira context loaded in STEP 0A.

### 3A — Parse Acceptance Criteria
For each acceptance criterion found in `JIRA_ACCEPTANCE_CRITERIA`:
- Identify the **feature or behaviour** being specified
- Identify **positive conditions** (Given/When/Then patterns)
- Identify **negative conditions** (validation failures, error states)
- Identify **boundary conditions** (limits, thresholds, ranges)
- Extract **data values** mentioned (specific inputs, formats, constraints)
- Flag **ambiguous criteria** that need clarification

Save the parsed breakdown to:
`[BASE_DIR]/application-analysis/requirements-vs-app.md` (requirements section)

### 3B — Identify Requirements-Based Test Coverage
Generate a preliminary list of test cases that must exist purely from the Jira requirements (before any app analysis). These are **requirements-driven tests** — they must pass even before the app is crawled.

Label each: `SOURCE: JIRA-[TICKET_ID]`

### 3C — Note Gaps and Ambiguities
List any acceptance criteria that are:
- Vague or untestable as written
- Missing expected values or thresholds
- Contradictory to other criteria

Document in `test-artifacts/application-analysis/requirements-vs-app.md` under "Ambiguities".

---

## STEP 4 — Launch Playwright-Test-Planner and Analyze the Application

Use `mcp__playwright-test__planner_setup_page` to initialize the planner session.
Use `mcp__playwright-test__browser_navigate` to navigate to `APP_URL`.

If `REQUIRES_AUTH = Yes`:
- Navigate to the login page
- Authenticate using `AUTH_USERNAME` and `AUTH_PASSWORD`
- Handle MFA if `AUTH_MFA` is specified
- Verify successful login before proceeding

### Application Analysis — detect the following:
1. **Page inventory**: All navigable pages and routes
2. **Navigation structure**: Menus, breadcrumbs, links, tabs
3. **Forms**: All input fields, dropdowns, checkboxes, radio buttons, file uploads
4. **Interactive elements**: Buttons, toggles, modals, accordions, carousels
5. **Data tables**: Columns, sorting, filtering, pagination
6. **Validation rules**: Required fields, format validations, character limits
7. **User flows**: Multi-step workflows, wizards, checkout flows
8. **API calls**: Network requests detected during navigation (endpoint, method)
9. **Error states**: Error messages, empty states, loading states
10. **Authorization**: Role-based UI elements and access controls

Take screenshots of key pages for analysis context.

### If MODE = JIRA_AND_URL — cross-reference with Jira requirements:
After crawling, compare the live app against `JIRA_ACCEPTANCE_CRITERIA`:

For each acceptance criterion:
- Mark **VERIFIED IN APP** — the feature/behaviour exists in the live app
- Mark **NOT FOUND IN APP** — the feature is in Jira but not visible in the live app
- Mark **DIFFERS FROM SPEC** — the app behaviour differs from what Jira describes

Save cross-reference to `[BASE_DIR]/application-analysis/requirements-vs-app.md`.

Save cross-reference to `[BASE_DIR]/application-analysis/requirements-vs-app.md`.

Save app analysis to:
- `[BASE_DIR]/application-analysis/app-flow-analysis.md`
- `[BASE_DIR]/application-analysis/detected-modules.md`

### MANDATORY — Capture Annotated Screenshots for Each Discrepancy

For every discrepancy identified during the crawl (both `JIRA_AND_URL` and `URL_ONLY` modes), follow this 5-step annotated capture sequence:

**Step 1 — Navigate to the discrepant state**
Navigate to or re-trigger the exact page state that exposes the issue. Wait for the element to be visible before proceeding.

**Step 2 — Highlight the problematic element**
Call `mcp__playwright-test__browser_highlight` targeting the specific element that has the discrepancy.
- Use `style: "outline: 3px solid red; outline-offset: 3px; background: rgba(255,0,0,0.08);"` for a clear red callout.
- `target` must be the precise selector or snapshot reference for the discrepant field/button/section.

Example:
```
browser_highlight(
  target: "#underwriter-select",
  element: "Underwriter combobox",
  style: "outline: 3px solid red; outline-offset: 3px; background: rgba(255,0,0,0.08);"
)
```

**Step 3 — Inject a text label onto the page**
Call `mcp__playwright-test__browser_evaluate` to inject a floating annotation label near the highlighted element. This label must contain the DISC ID and a short description of the issue.

Use this exact JS template (replace `[DISC-NNN]`, `[selector]`, and `[short description]` with real values):

```javascript
(() => {
  const el = document.querySelector('[selector]');
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const label = document.createElement('div');
  label.id = 'disc-annotation-label';
  label.textContent = '[DISC-NNN]: [short description]';
  label.style.cssText = `
    position: fixed;
    top: ${Math.max(rect.top - 36, 4)}px;
    left: ${rect.left}px;
    background: #d32f2f;
    color: #fff;
    font: bold 12px/1.4 Arial, sans-serif;
    padding: 4px 8px;
    border-radius: 4px;
    z-index: 999999;
    pointer-events: none;
    max-width: 360px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  `;
  document.body.appendChild(label);
})();
```

**Step 4 — Capture the screenshot**
Call `mcp__playwright-test__browser_take_screenshot` immediately.
- Naming convention: `DISC-NNN-[short-slug].png`
  - Example: `DISC-001-underwriting-fields-editable.png`
- Save to: `[BASE_DIR]/application-analysis/screenshots/`
- Store the full relative path for reference in `discrepancies.md`.

**Step 5 — Clean up**
Remove both the highlight overlay and the injected label so they do not affect subsequent page interactions:
```
browser_hide_highlight(target: "[selector]")
browser_evaluate(() => { const el = document.getElementById('disc-annotation-label'); if (el) el.remove(); })
```

**If a discrepancy cannot be re-triggered** (transient state, dialog that auto-dismisses, etc.), record the screenshot path as `N/A — state not capturable` in `discrepancies.md`.

### MANDATORY — Write Discrepancies File

**Always** write `[BASE_DIR]/application-analysis/discrepancies.md` regardless of mode.

- In `JIRA_AND_URL` mode: populate from the requirements vs live app cross-reference above.
- In `URL_ONLY` mode: populate from any observed issues, unexpected UI behaviour, broken elements, or deviations from standard UX patterns found during the crawl.

The file must use this exact format:

```markdown
# Application Discrepancies — [TICKET_ID or APP_URL]
# Generated: [TIMESTAMP]

## Summary

| Total Discrepancies | High Severity | Medium Severity | Low Severity |
|---|---|---|---|
| [N] | [N] | [N] | [N] |

---

## Discrepancy Table

| # | Area / Field | Requirement / Expected | Observed in Live App | Severity | Screenshot | Action Required |
|---|---|---|---|---|---|---|
| 1 | [Field or section name] | [What the spec / standard UX says] | [What the live app actually does] | High / Medium / Low | `[BASE_DIR]/application-analysis/screenshots/DISC-001-[slug].png` | [Raise defect / Clarify with BA / Update spec] |
| 2 | ... | ... | ... | ... | ... | ... |

---

## Detail

### DISC-001: [Short title]

| Property | Value |
|---|---|
| **Area** | [Form section or field name] |
| **Requirement Source** | [Jira AC-XX / UX Convention / N/A] |
| **Expected Behaviour** | [What should happen] |
| **Observed Behaviour** | [What actually happens in the live app] |
| **Severity** | High / Medium / Low |
| **Screenshot** | `[BASE_DIR]/application-analysis/screenshots/DISC-NNN-[slug].png` / N/A — state not capturable |
| **Impact on Tests** | [Which test cases are affected — e.g. TC-NEG-011 assertion must be updated] |
| **Action Required** | [Raise defect / Confirm with BA / Update requirements / Update test cases] |

---
```

Severity guide:
- **High** — violates a Jira acceptance criterion or blocks a core user flow
- **Medium** — undocumented behaviour or UX mismatch that may affect test assertions
- **Low** — minor visual/label inconsistency with no functional impact

If no discrepancies are found, write the file with the message: `_No discrepancies found between requirements and the live application._`

---

## STEP 5 — Generate Test Cases

Generate test cases using BOTH sources (when `MODE = JIRA_AND_URL`):
- **Jira-driven tests**: Derived directly from acceptance criteria — these validate requirements
- **App-driven tests**: Derived from live app analysis — these validate actual behaviour
- **Gap tests**: Where Jira says X but app does Y — these surface discrepancies

When `MODE = URL_ONLY`: generate app-driven tests only.

Each test case must include a `Source` field:
- `Source: JIRA-[TICKET_ID]` — derived from Jira acceptance criteria
- `Source: APP-ANALYSIS` — derived from live app crawl
- `Source: COMBINED` — derived from both (AC validated against live behaviour)

### Priority Rules
- **P0** — Directly maps to a Jira acceptance criterion OR critical business flow
- **P1** — Important functional flow, major user journey, key integration
- **P2** — Edge case, secondary workflow, cross-browser, responsive
- **P3** — Nice-to-have, low-risk UI, minor validation

### Test Case Format — Tabular (use for every file and every test case)

Every test case file must be structured in two parts:

---

#### PART A — Summary Table (one row per test case, at the top of the file)

Place this table at the very top of each generated test case file, before the individual test case detail tables. It gives a quick at-a-glance overview of all test cases in that file.

```markdown
| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | [MODULE]-[TYPE]-001 | [Short title] | P0 | Positive | Critical | COMBINED | AC-01 | @Smoke @P0 |
| 2 | [MODULE]-[TYPE]-002 | [Short title] | P1 | Negative | High | APP-ANALYSIS | N/A | @Negative @P1 |
| N | ... | ... | ... | ... | ... | ... | ... | ... |
```

---

#### PART B — Detail Table (one vertical table per test case)

After the summary table, render each test case as its own vertical key-value table. Use `<br>` to separate multiple items within a single cell. Preconditions, Test Steps, and Expected Results must be numbered within the cell using `1.`, `2.`, `3.` separated by `<br>`.

```markdown
---

### [MODULE]-[TYPE]-NNN

| Field | Details |
|---|---|
| **Test Case ID** | [MODULE]-[TYPE]-NNN |
| **Title** | [Full descriptive title] |
| **Priority** | P0 / P1 / P2 / P3 |
| **Module** | [Module / Page Name] |
| **Scenario Type** | Positive / Negative / Edge / Boundary / Regression / Validation / Security / Accessibility |
| **Risk Level** | Critical / High / Medium / Low |
| **Source** | JIRA-[TICKET_ID] / APP-ANALYSIS / COMBINED |
| **Jira AC Ref** | AC-01 / N/A |
| **Tags** | `@Tag1` `@Tag2` `@Tag3` |
| **Preconditions** | 1. [Precondition 1]<br>2. [Precondition 2] |
| **Test Steps** | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3]<br>4. [Step N] |
| **Expected Results** | 1. [Expected result 1]<br>2. [Expected result 2]<br>3. [Expected result N] |
```

---

**Rules for tabular output:**
- Every test case file begins with the Part A summary table
- Every individual test case immediately follows as a Part B detail table separated by `---`
- Multi-line cell content uses `<br>` — never break out of the table
- Use numbered items (`1.`, `2.`) inside cells — not bullet dashes
- Bold all field name cells using `**Field Name**`
- Jira AC Ref column is included in all tables regardless of mode — use `N/A` when no Jira ticket is provided
- The summary table columns are always in this fixed order: #, Test Case ID, Title, Priority, Scenario Type, Risk Level, Source, Jira AC Ref, Tags

### 5.1 Positive Test Cases → `[BASE_DIR]/test-cases/smoke/` and `[BASE_DIR]/test-cases/functional/`
Generate for:
- Every acceptance criterion that describes a successful outcome (`SOURCE: JIRA-[TICKET_ID]`)
- Happy path flows detected in the live app (`SOURCE: APP-ANALYSIS`)
- Successful form submissions with valid data
- Successful navigation through all pages
- Successful CRUD operations
- Successful state transitions in multi-step flows

### 5.2 Negative Test Cases → `[BASE_DIR]/test-cases/negative/`
Generate for:
- Every acceptance criterion that implies a failure/validation state (e.g., "shall display an error when...")
- Invalid/wrong credentials
- Empty mandatory fields
- Invalid data formats
- Unauthorized access attempts
- Operations on deleted/nonexistent records

### 5.3 Edge Cases → `[BASE_DIR]/test-cases/edge-cases/`
Generate for:
- Unicode / special characters in all input fields
- Whitespace-only entries
- Concurrent actions (rapid clicks, double submit)
- Back-button / refresh behavior mid-flow
- Session timeout during active workflow
- Network interruption mid-submission
- Browser tab duplication
- Copy-paste from external sources

### 5.4 Boundary Value Cases → `[BASE_DIR]/test-cases/boundary/`
For each field/constraint identified (from Jira AC or app analysis):
- Value exactly at minimum boundary (valid)
- Value just below minimum (invalid)
- Value just above minimum (valid)
- Value just below maximum (valid)
- Value exactly at maximum (valid)
- Value just above maximum (invalid)

### 5.5 Regression Scenarios → `[BASE_DIR]/test-cases/regression/`
Generate for:
- All acceptance criteria (each AC = at least one regression test)
- Core workflows from `CRITICAL_AREAS`
- Authentication flows
- Primary navigation paths
- All CRUD operations
- Integration points

### 5.6 Validation Scenarios → `[BASE_DIR]/test-cases/functional/`
Generate for:
- Form field validation messages
- Required field indicators
- Format validations (email, phone, date, password strength)
- Cross-field validations
- File upload validations (type, size)

### 5.7 Security Scenarios → `[BASE_DIR]/test-cases/security/` (if Security in TESTING_SCOPE)
Generate for:
- SQL injection in all input fields
- XSS attempts
- Direct URL manipulation to bypass auth
- IDOR — accessing other users' data by ID manipulation
- Session fixation and CSRF checks
- JWT/token manipulation
- Role escalation attempts

### 5.8 Accessibility Scenarios → `[BASE_DIR]/test-cases/accessibility/` (if Accessibility in TESTING_SCOPE)
Generate for:
- Full keyboard navigation (Tab, Enter, Escape)
- Visible focus indicators
- Alt text on all images
- ARIA labels on form fields
- ARIA live regions for error announcements
- Color contrast (WCAG 2.1 AA: 4.5:1 for text)
- 200% zoom — no horizontal scroll
- Heading hierarchy

### 5.9 Gap / Discrepancy Tests (only if MODE = JIRA_AND_URL) → `[BASE_DIR]/test-cases/regression/`
For every item marked **NOT FOUND IN APP** or **DIFFERS FROM SPEC** in STEP 4:
- Generate a test case that verifies the acceptance criterion
- Mark it `Source: JIRA-[TICKET_ID]`, `Priority: P0`
- Tag with `@RequirementGap`
- These tests are expected to FAIL until the app matches the specification

---

## STEP 6 — Generate Gherkin Feature Files

For EVERY test case generated in STEP 5, create a corresponding Gherkin scenario.

### Feature File Header (use when MODE = JIRA_AND_URL)
```gherkin
# Feature: [Module Name]
# Generated by: Generate Test Cases Skill (Playwright-Test-Planner + Jira)
# Jira Ticket: [TICKET_ID] — [JIRA_SUMMARY]
# Application: [APP_URL]
# Generated on: [TIMESTAMP]
# AC Coverage: [N of M acceptance criteria covered]
```

### Feature File Template
```gherkin
Feature: [Module Name] - [Brief Description]

  Background:
    Given the user is on the "[APP_URL]" application
    [Additional background steps if applicable]

  # Jira AC-01: [exact acceptance criterion text]
  @[Priority] @[ScenarioType] @[TICKET_ID] @JiraAC-01
  Scenario: [Test Case Title]
    Given [precondition]
    When [action]
    And [additional action]
    Then [expected result]
    And [additional assertion]

  @[Priority] @[ScenarioType] @Outline
  Scenario Outline: [Data-driven test title]
    Given [precondition with <variable>]
    When [action with <variable>]
    Then [expected result with <expected>]

    Examples:
      | variable | expected |
      | value1   | result1  |
      | value2   | result2  |
```

Key rules:
- Each scenario must include the Jira ticket tag `@[TICKET_ID]` when `MODE = JIRA_AND_URL`
- Each scenario derived from a specific AC must include `@JiraAC-[N]`
- Gap test scenarios must include `@RequirementGap`

### Save Feature Files
- Smoke → `features/[TICKET_ID or SANITIZED_HOSTNAME]/smoke/[module].feature`
- Regression → `features/[TICKET_ID or SANITIZED_HOSTNAME]/regression/[module].feature`
- Functional → `features/[TICKET_ID or SANITIZED_HOSTNAME]/functional/[module].feature`
- Edge cases → `features/[TICKET_ID or SANITIZED_HOSTNAME]/edge-cases/[module].feature`
- Negative → `features/[TICKET_ID or SANITIZED_HOSTNAME]/negative/[module].feature`
- Boundary → `features/[TICKET_ID or SANITIZED_HOSTNAME]/boundary/[module].feature`
- Security → `features/[TICKET_ID or SANITIZED_HOSTNAME]/security/[module].feature`
- Accessibility → `features/[TICKET_ID or SANITIZED_HOSTNAME]/accessibility/[module].feature`

---

## STEP 7 — Generate Reports

### 7.1 Coverage Report (`[BASE_DIR]/reports/coverage-report.md`)
Include:
- Total pages/modules detected
- Total test cases generated (by type and source)
- Coverage breakdown by module
- Browser coverage matrix
- Priority distribution (P0/P1/P2/P3 counts)
- Scenario type distribution
- Modules with full/partial/no coverage

If `MODE = JIRA_AND_URL` also include:
- Total acceptance criteria found in Jira: N
- Acceptance criteria with test coverage: N (X%)
- Acceptance criteria without test coverage: N (list them)
- Requirements-driven tests vs app-driven tests breakdown

### 7.2 Risk Analysis (`[BASE_DIR]/reports/risk-analysis.md`)
Include:
- High-risk areas identified
- Critical workflows with no test coverage
- Missing validation scenarios
- Security gaps
- Accessibility gaps
- Recommended additional coverage
- Estimated automation effort (S/M/L per module)

If `MODE = JIRA_AND_URL` also include:
- AC items marked "NOT FOUND IN APP" (potential implementation gaps)
- AC items marked "DIFFERS FROM SPEC" (potential bugs)

### 7.3 Requirements Traceability Matrix (only if MODE = JIRA_AND_URL)
Save to: `[BASE_DIR]/reports/traceability-matrix.md`

Format:

```
# Requirements Traceability Matrix
# Jira Ticket: [TICKET_ID] — [JIRA_SUMMARY]
# Generated on: [TIMESTAMP]

| AC ID | Acceptance Criterion (Summary) | Test Case IDs | Feature File | Status |
|-------|-------------------------------|---------------|--------------|--------|
| AC-01 | [Brief AC text]               | TC-001, TC-002| features/smoke/login.feature | COVERED |
| AC-02 | [Brief AC text]               | TC-003        | features/negative/login.feature | COVERED |
| AC-03 | [Brief AC text]               | —             | —            | NOT COVERED |
| AC-04 | [Brief AC text]               | TC-010        | features/regression/... | REQUIREMENT GAP |
```

Status values:
- `COVERED` — at least one test case traces to this AC
- `NOT COVERED` — no test case generated for this AC (needs attention)
- `REQUIREMENT GAP` — AC exists in Jira but feature not found in live app

### 7.4 Update Execution Log (`[BASE_DIR]/logs/execution.log`)
Append:
- Completion timestamp
- Mode used
- Total artifacts generated
- AC coverage percentage (if Jira mode)
- Files created (list)
- Any errors or warnings

---

## STEP 8 — Final Summary Output

Print a structured summary to the user:

```
==================================================
GENERATE TEST CASES — EXECUTION COMPLETE
==================================================

Mode:                    [URL_ONLY / JIRA_AND_URL]
Jira Ticket:             [TICKET_ID — JIRA_SUMMARY / N/A]
Application Analyzed:    [APP_URL]
Environment:             [ENV_TYPE]
Generated On:            [TIMESTAMP]

─────────────────────────────────────────────────
JIRA REQUIREMENTS COVERAGE          (Jira mode only)
─────────────────────────────────────────────────
Acceptance Criteria Found:          [N]
Acceptance Criteria Covered:        [N] ([X]%)
Not Covered:                        [N]
Requirement Gaps (not in app):      [N]
─────────────────────────────────────────────────

APPLICATION MODULES DETECTED:       [N]
  [List module names]

TEST CASES GENERATED:
  Source — Jira Requirements:       [N]
  Source — App Analysis:            [N]
  Source — Combined:                [N]
  ─────────────────────────────────
  By Type:
  Positive (Smoke/Functional):      [N]
  Negative:                         [N]
  Edge Cases:                       [N]
  Boundary:                         [N]
  Regression:                       [N]
  Security:                         [N]
  Accessibility:                    [N]
  Requirement Gaps:                 [N]
  ─────────────────────────────────
  TOTAL:                            [N]

GHERKIN FEATURE FILES:              [N] files

PRIORITY BREAKDOWN:
  P0 (Critical):                    [N]
  P1 (High):                        [N]
  P2 (Medium):                      [N]
  P3 (Low):                         [N]

BROWSER COVERAGE: [Chrome / Edge / Firefox / Safari]
MOBILE/RESPONSIVE: [Yes / No]

ARTIFACTS SAVED TO:
  [BASE_DIR]/test-cases/
  [BASE_DIR]/reports/coverage-report.md
  [BASE_DIR]/reports/risk-analysis.md
  [BASE_DIR]/reports/traceability-matrix.md  ← (Jira mode only)
  [BASE_DIR]/application-analysis/
  features/[TICKET_ID or SANITIZED_HOSTNAME]/

NEXT STEPS:
  1. Review traceability-matrix.md for AC coverage gaps
  2. Review requirements-vs-app.md for implementation gaps
  3. Use playwright-test-generator to convert .feature files to scripts
  4. Fix any "REQUIREMENT GAP" items with the development team
  5. Run /jira-sprint to process the full sprint
==================================================
```

---

## ERROR HANDLING

- **URL unreachable**: Log error, ask user to verify URL, retry once, then generate Jira-requirements-only tests
- **Jira fetch fails**: Ask to retry, continue in URL-only mode, or abort
- **Auth failure**: Log failure, generate public-area tests only, note auth-protected areas as untested
- **Page load timeout**: Log, skip page, continue — mark as "requires manual analysis"
- **SPA application**: Wait for network idle before capturing page state
- **Dynamic content**: Use wait-for-selector and network idle strategies
- **Missing AC in Jira**: Note which fields were missing, proceed with what's available
- All errors → append to `test-artifacts/logs/execution.log` with timestamp

---

## CONFIGURATION

Reads from:
- `playwright.config.js` — browser/device configuration
- `.env` — environment URLs, credentials, Jira API settings
- `CRITICAL_AREAS` — P0 prioritization
- `RESTRICTED_AREAS` — pages to exclude

---

## MODULAR ARCHITECTURE

Composes with:
- `/fetch-jira-details` — auto-invoked if Jira data not pre-fetched
- `/jira-ticket` — full end-to-end pipeline for a single ticket
- `/jira-sprint` — bulk sprint processing
- `/generate-gherkin` — Gherkin-only from Jira (no live app analysis)
- `playwright-test-generator` — convert feature files to Playwright scripts
- `playwright-test-healer` — auto-heal failing generated scripts
