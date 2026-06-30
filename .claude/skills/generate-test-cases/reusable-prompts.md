# Reusable Prompts — Generate Test Cases Skill

> These prompts can be used standalone with Claude or as building blocks within the skill pipeline.
> Copy, customize, and use in Claude Code, Claude API, or automated pipelines.

---

## PROMPT 1 — Application Analysis

```
You are a QA analysis agent. Analyze the web application at [APP_URL] and produce a structured report.

Navigate through the application and identify:
1. All accessible pages and their URLs
2. All forms with field names, types, and validation rules
3. Navigation structure (menus, breadcrumbs, sidebar items)
4. Interactive components (modals, accordions, tabs, carousels)
5. Data tables with their columns, sorting, and filtering options
6. API calls made during navigation (endpoint, method, response)
7. Authentication/authorization patterns visible in the UI
8. Error states and empty states encountered
9. Multi-step workflows (wizards, checkout, onboarding)
10. Role-based UI differences (if multiple user roles accessible)

Format output as:
- Module inventory table
- Navigation tree
- Form inventory (field-by-field)
- Detected user flows
- API endpoint list

Be thorough. This analysis forms the foundation of test case generation.
```

---

## PROMPT 2 — Positive Test Case Generation

```
Based on the following application analysis:
[PASTE APP ANALYSIS OUTPUT HERE]

Generate POSITIVE test cases for the [MODULE_NAME] module.

Requirements:
- Cover all happy path workflows
- Include successful form submissions
- Include successful navigation flows
- Cover all primary user journeys for this module
- Prioritize based on user impact (P0 = highest)

For each test case use this format:
Test Case ID: [MODULE]-POS-[NNN]
Title: [Descriptive title]
Priority: [P0/P1/P2/P3]
Module: [Module name]
Scenario Type: Positive
Risk Level: [Critical/High/Medium/Low]
Tags: [@Smoke, @Positive, ...]
Preconditions: [List]
Test Steps: [Numbered list]
Expected Results: [List]

Generate at least 5 positive test cases for [MODULE_NAME].
```

---

## PROMPT 3 — Negative Test Case Generation

```
Based on the following module analysis for [MODULE_NAME]:
[PASTE MODULE DETAILS]

Generate NEGATIVE test cases covering:
1. Invalid input combinations
2. Missing required fields
3. Unauthorized access attempts
4. Operations on non-existent records
5. System behavior under unexpected input
6. Form submission with all fields empty
7. Character limit violations
8. Wrong data type inputs

For each test case:
- Test Case ID format: [MODULE]-NEG-[NNN]
- Include the specific invalid input or condition
- Specify the exact expected error message or system behavior
- Mark P0 for scenarios with security implications
- Use @Negative tag for all cases

Ensure negative cases complement the positive cases without overlap.
Generate at least 7 negative test cases.
```

---

## PROMPT 4 — Boundary Value Analysis Test Cases

```
Perform Boundary Value Analysis (BVA) for the [MODULE_NAME] module.

Form fields identified:
[PASTE FIELD LIST WITH MIN/MAX CONSTRAINTS]

For each field with numeric or length constraints, generate test cases for:
- Value at exactly the minimum boundary (valid)
- Value just below the minimum boundary (invalid)
- Value just above the minimum boundary (valid)
- Value just below the maximum boundary (valid)
- Value at exactly the maximum boundary (valid)
- Value just above the maximum boundary (invalid)

Also apply BVA to:
- Date fields (min date, max date, leap years)
- Numeric ranges (negative, zero, max integer)
- String length fields (empty, 1 char, max-1, max, max+1)
- File sizes (0 bytes, 1 byte, max-1 KB, max KB, max+1 KB)

Format: Test Case ID: [MODULE]-BVA-[NNN]
Include the exact boundary value being tested in the title.
```

---

## PROMPT 5 — Edge Case Generation

```
Generate edge case test cases for [MODULE_NAME] in the [APP_URL] application.

Cover the following edge case categories:
1. Special characters: `!@#$%^&*()_+{}|:"<>?`
2. Unicode/international characters: Arabic, Chinese, emoji (😀), RTL text
3. Whitespace: leading spaces, trailing spaces, whitespace-only
4. Concurrent actions: rapid double-clicks, multiple tab submissions
5. Browser behavior: back button mid-workflow, refresh during submission, page reload
6. Network conditions: slow connection, network interruption during form submission
7. Copy-paste behavior: pasting invalid formats, pasting from external sources
8. Session edge cases: token expiry mid-workflow, session in multiple tabs
9. Empty states: no data to display, filtered results returning zero items
10. Large data: maximum number of records, very long text display

For each edge case, document:
- The specific condition being tested
- Why this is an edge case (what could go wrong)
- The expected graceful behavior
- Risk level if not handled
```

---

## PROMPT 6 — Security Test Case Generation

```
Generate security test cases for [MODULE_NAME] in [APP_URL].

Cover the OWASP Top 10 relevant to this module:
1. A01 — Broken Access Control: Direct URL access, IDOR, privilege escalation
2. A02 — Cryptographic Failures: Password in URL, sensitive data in logs
3. A03 — Injection: SQL injection, XSS, LDAP injection in all input fields
4. A04 — Insecure Design: Business logic flaws, rate limiting absence
5. A05 — Security Misconfiguration: Error message disclosure, debug info
6. A06 — Vulnerable Components: Outdated library signatures in headers
7. A07 — Authentication Failures: Brute force, credential stuffing, weak session
8. A08 — Software/Data Integrity: Token manipulation, JWT tampering
9. A09 — Security Logging: Verify critical actions are logged
10. A10 — SSRF: URL parameters that fetch external resources

For each security test case:
- Document the attack vector being tested
- List the exact payload or technique
- Specify what a PASS looks like (attack is blocked, no data leaked)
- Specify what a FAIL looks like (vulnerable behavior)
- Tag with @Security and specific vulnerability type

Important: These are defensive tests — the expected result is always that the attack FAILS.
```

---

## PROMPT 7 — Accessibility Test Case Generation

```
Generate accessibility test cases for [MODULE_NAME] in [APP_URL].

Coverage standard: WCAG 2.1 Level AA

Generate test cases for these WCAG success criteria:
1. SC 1.1.1 — Non-text Content: All images have meaningful alt text
2. SC 1.3.1 — Info and Relationships: Form labels programmatically associated
3. SC 1.3.3 — Sensory Characteristics: Instructions don't rely on color alone
4. SC 1.4.1 — Use of Color: Color not the only visual means of information
5. SC 1.4.3 — Contrast (Minimum): 4.5:1 for text, 3:1 for large text
6. SC 1.4.4 — Resize Text: Page usable at 200% zoom
7. SC 2.1.1 — Keyboard: All functionality accessible via keyboard
8. SC 2.1.2 — No Keyboard Trap: Keyboard can always navigate away
9. SC 2.4.3 — Focus Order: Focus follows logical reading order
10. SC 2.4.7 — Focus Visible: Focus indicator always visible
11. SC 3.2.2 — On Input: No unexpected context changes on input
12. SC 3.3.1 — Error Identification: Errors described in text
13. SC 3.3.2 — Labels or Instructions: Instructions before required format

For each accessibility test case:
- Reference the WCAG success criterion
- Describe the test methodology (keyboard, screen reader, axe-core, manual)
- Include both automated and manual verification steps
- Use @Accessibility @WCAG-2.1-AA tags
```

---

## PROMPT 8 — Gherkin Feature File Generation

```
Convert the following test cases to Gherkin BDD format:
[PASTE TEST CASES HERE]

Requirements:
1. Group related scenarios into Feature blocks by module
2. Extract shared preconditions into Background steps
3. Use Given-When-Then structure strictly
4. Create Scenario Outline + Examples for data-driven tests (3+ similar scenarios)
5. Add tags: @Priority (@P0/@P1/@P2/@P3), @ScenarioType (@Smoke/@Negative/@Boundary), @Module
6. Use declarative style (WHAT, not HOW) — avoid implementation details
7. Step definitions should be reusable across scenarios
8. Keep scenarios independent (no shared state between scenarios)
9. Negative scenarios should clearly state the expected error in Then steps

Output: Complete .feature file content ready to save.
Include file header comment with metadata.
```

---

## PROMPT 9 — Coverage Gap Analysis

```
Review the following test coverage for [APP_URL]:

Modules detected: [LIST]
Test cases generated: [COUNT BY MODULE]
Testing scope: [SCOPE]
Business critical areas: [AREAS]

Identify:
1. Modules with less than 70% coverage
2. Scenario types missing for each module (Positive/Negative/Boundary/Security/Accessibility)
3. P0 scenarios that haven't been covered
4. Cross-module integration scenarios missing
5. API-level validation gaps
6. Regression scenarios that should be re-run after each deployment

Output as:
- Coverage gaps table (Module | Coverage% | Missing Types)
- P0 uncovered scenarios list
- Recommended additional test cases (title and priority only)
- Estimated effort to close gaps (S/M/L per module)
```

---

## PROMPT 10 — Risk-Based Test Prioritization

```
Given the following test cases for [APP_URL]:
[PASTE TEST CASE LIST]

Apply risk-based test prioritization using these factors:
1. Business impact if the feature fails (Revenue, User Experience, Compliance)
2. Frequency of use by end users
3. Technical complexity and change frequency
4. Historical defect density (if known)
5. Regulatory/compliance requirements

For each test case, assign:
- Risk Score: 1–10 (10 = highest risk)
- Priority: P0/P1/P2/P3
- Execution order in regression suite
- Tag: @Critical | @High | @Medium | @Low

Output:
- Prioritized test execution order
- P0 smoke suite (must pass for any release)
- P1 regression suite (must pass before release)
- P2/P3 extended suite (run nightly/weekly)
```
