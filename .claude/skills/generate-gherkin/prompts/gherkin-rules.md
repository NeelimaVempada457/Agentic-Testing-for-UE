# Gherkin Rules — Generate Gherkin Skill

Strict rules Claude must follow when writing Gherkin. Every generated scenario is checked against all rules below before it is written to the feature file.

---

## File Structure Rules

```gherkin
@tag1 @tag2                        ← Feature-level tags (apply to all scenarios)
Feature: <Short declarative title> ← One Feature per .feature file
  As a <actor>
  I want to <capability>
  So that <business value>

  Background:                      ← Optional; only if 3+ scenarios share steps
    Given ...
    And ...

  @Smoke @Positive @HighPriority @AC-1 @TICKET-ID
  Scenario: <Short imperative title>
    Given <precondition>
    When  <action>
    Then  <expected outcome>
    And   <additional assertion>   ← Use And/But to chain, never repeat Given/When/Then
```

---

## Tag Rules

### Required tags per scenario — ALL must be present

| Tag Group | Options | Rule |
|-----------|---------|------|
| Suite | `@Smoke` / `@Regression` | Every scenario gets at least one |
| Sentiment | `@Positive` / `@Negative` / `@EdgeCase` | Exactly one per scenario |
| Priority | `@HighPriority` / `@MediumPriority` / `@LowPriority` | Exactly one |
| Layer | `@UI` / `@API` / `@Security` / `@Accessibility` | At least one |
| Ticket | `@<TICKET-ID>` (e.g. `@BOSLFS-1584`) | Always |
| AC reference | `@AC-1` (matching the AC number) | When scenario covers a specific AC |

### Optional tags
- `@AsAdmin` / `@AsManager` / `@AsGuest` etc. — when testing a specific role
- `@WIP` — scenario is a placeholder (incomplete, needs data)
- `@Skip` — known broken/flaky, to be fixed

### Feature-level tags (before `Feature:`)
Apply to all scenarios: `@UI @BOSLFS-1584` etc.

---

## Naming Rules

### Feature title
- Declarative noun phrase: `"Document Download with VIN Number Support"`
- Not imperative: ~~`"Test the download feature"`~~
- Not vague: ~~`"BOSLFS-1584 Tests"`~~

### Scenario title
- Imperative, specific, outcome-focused
- Format: `[happy] <actor> successfully <action> with <condition>`
- Format: `[negative] <actor> cannot <action> when <invalid condition>`
- Format: `[edge] <system> handles <boundary condition> gracefully`
- **Never** start with "Test" or "Verify" or "Check"
- **Never** include the ticket number in the title (it's in tags)

Examples:
```
✅  Admin successfully generates MACA document with VIN number
✅  System rejects document generation when VIN and Chassis fields are both empty
✅  Form preserves entered data when browser is refreshed during submission
❌  Test that admin can generate document
❌  BOSLFS-1584 - VIN number test
```

---

## Step Rules

### Given (Preconditions)
- Describe system state, not actions the user takes
- Use passive voice: `"the user is logged in as"`, `"a record exists with"`
- Keep to minimum — only state what's necessary to make the scenario unique

```gherkin
Given the user is logged in as "Admin"
Given a vehicle record exists with VIN "1HGBH41JXMN109186"
Given the MACA document template is configured
```

### When (Actions)
- One primary user action per step — never combine two actions
- Use active voice: `"the user clicks"`, `"the user submits"`, `"the API receives"`

```gherkin
When the user clicks the "Generate Document" button
When the user enters "1HGBH41JXMN109186" in the "VIN Number" field
```

### Then (Assertions)
- Observable outcomes only — what the user/system can verify
- One logical assertion per `Then` (use `And` for additional checks)
- Be specific about the expected state, message, or value

```gherkin
Then the system displays the generated MACA document
And the document contains "VIN No: 1HGBH41JXMN109186"
And the "Chassis No" field is hidden in the document
```

### Step language
- Always use the **same phrasing** for the same logical action across all scenarios (enables step definition reuse in Playwright)
- Never mix: `"clicks"` and `"presses"` for the same interaction — pick one and be consistent
- Never include implementation details: ~~`"the CSS class .btn-primary is visible"`~~

---

## Data Rules

### Placeholders (preferred)
```gherkin
When the user enters "<vin_number>" in the "VIN Number" field
Examples:
  | vin_number        |
  | 1HGBH41JXMN109186 |
  | INVALID-VIN       |
```

### Literals (only when the value is business-significant)
```gherkin
When the user enters more than 17 characters in the "VIN Number" field
Then the system displays "VIN must be exactly 17 characters"
```

### Credentials — NEVER hardcode
```gherkin
# ✅ Correct
Given the user logs in with username "${TEST_USERNAME}" and password "${TEST_PASSWORD}"

# ❌ Wrong
Given the user logs in with username "admin@company.com" and password "Admin@123"
```

---

## Scenario Outline Rules

Use `Scenario Outline` when:
- 3+ scenarios differ only in input values
- Boundary value analysis (min, max, min-1, max+1, empty, null)
- Multiple role permission checks

```gherkin
@Negative @Regression @HighPriority @AC-2 @BOSLFS-1584
Scenario Outline: System rejects document generation with invalid VIN input
  Given the user is logged in as "Admin"
  And a vehicle record exists without a VIN number
  When the user enters "<vin_input>" in the "VIN Number" field
  And the user submits the document generation form
  Then the system displays the error "<expected_error>"

  Examples:
    | vin_input            | expected_error                              |
    |                      | VIN Number is required                      |
    | ABC                  | VIN must be exactly 17 characters           |
    | 1HGBH41JXMN1091861   | VIN must be exactly 17 characters           |
    | <script>alert(1)</script> | Invalid characters in VIN Number       |
    | SELECT * FROM users  | Invalid characters in VIN Number            |
```

---

## Background Rules

Use `Background` only when ALL scenarios in the file share the same preconditions. If only half do, don't use Background — repeat steps explicitly.

```gherkin
Background:
  Given the application is accessible at "${APP_URL}"
  And the user is logged in as "Admin"
  And the vehicle database contains at least one record
```

---

## Anti-Pattern Checklist

Before finalizing, check that NO scenario:
- [ ] Tests implementation details (CSS selectors, database calls, internal methods)
- [ ] Has more than one `When` step (split into separate scenarios)
- [ ] Duplicates another scenario exactly
- [ ] Uses vague language ("some data", "appropriate message", "correct result")
- [ ] Hardcodes credentials, PII, or production data
- [ ] Mixes UI and API steps in the same scenario (separate concerns)
- [ ] Is missing any required tag
- [ ] Has an untestable assertion ("the system works correctly")

---

## Accessibility Scenario Rules

Every interactive form/page must have at least one accessibility scenario:

```gherkin
@Accessibility @Regression @MediumPriority @BOSLFS-1584
Scenario: VIN number field is accessible via keyboard navigation
  Given the user is on the document generation form
  When the user navigates using the Tab key
  Then the "VIN Number" field receives focus in logical order
  And the field has an accessible label visible to screen readers
  And the field announces validation errors to screen reader users
```

---

## Security Scenario Rules

Every auth-protected feature must have at least:

```gherkin
@Security @Regression @HighPriority @BOSLFS-1584
Scenario: Unauthenticated user cannot access document generation
  Given the user is not logged in
  When the user navigates directly to the document generation URL
  Then the system redirects the user to the login page
  And the system does not expose any document data

@Security @Regression @HighPriority @BOSLFS-1584
Scenario: Lower-privilege user cannot perform admin-only actions
  Given the user is logged in as "Read-Only User"
  When the user attempts to generate a MACA document
  Then the system displays "You do not have permission to perform this action"
  And the generate button is not visible or is disabled
```
