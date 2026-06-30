# Smoke Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Smoke / Positive |
| Generated | 2026-05-27 (re-run with defect tracking) |

> **Known Defects Affecting Smoke Tests (2026-05-27):**
> - DISC-002: Underwriting Team fields (Underwriter, Underwriting Specialist) remain editable after account selection — violates AC-10. TC-SMOKE-004 will FAIL on the non-editable assertion.
> - DISC-003: Need By Date does NOT auto-populate when Effective Date is set. TC-SMOKE-007 will FAIL.
> - DISC-001: Expiration Date missing mandatory asterisk (*). TC-SMOKE-003 asterisk check will FAIL for Expiration Date.
> - D-04 RESOLVED: Submission Type now renders as card-style radio buttons. TC-SMOKE-003 passes.

---

## TC-SMOKE-001: Successfully create a New Business submission with all mandatory fields

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | User is on the New Submission form |
| Test Data | Account: valid Salesforce account; Product: ELL; Effective Date: future date |
| Known Defect | Need By Date must be set manually (DISC-003) |

**Steps:**
1. Navigate to Submissions > New Submission
2. Select "New Business" card as Submission Type
3. Search and select a valid Account Name
4. Set a future Effective Date
5. Verify Expiration Date auto-populates to Effective Date + 1 year
6. Manually enter Need By Date (auto-populate known broken — DISC-003)
7. Select at least one Product from the dropdown
8. Upload a valid document (.pdf)
9. Click "Create Submission"

**Expected Result:**
- Submission is created successfully
- A unique auto-incremented Submission ID is displayed
- No error messages are shown

**Pass Criteria:** Submission ID is generated and form is cleared/redirected post-submission.

---

## TC-SMOKE-002: Successfully create a Cross-sell submission with all mandatory fields

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | User is on the New Submission form |
| Test Data | Account: valid Salesforce account; Product: CGL; Effective Date: future date |

**Steps:**
1. Navigate to Submissions > New Submission
2. Select "Cross-sell" card as Submission Type
3. Search and select a valid Account Name
4. Set a future Effective Date
5. Manually set Need By Date (auto-populate not working — DISC-003)
6. Select at least one Product
7. Upload a valid document (.docx)
8. Click "Create Submission"

**Expected Result:**
- Submission is created successfully with Cross-sell type
- Unique Submission ID is generated

**Pass Criteria:** Submission ID is generated with type "Cross-sell".

---

## TC-SMOKE-003: Verify Submission Type field renders as card-style radio buttons

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | User is on the New Submission form |
| Test Data | None |
| Status | PASS EXPECTED — D-04 RESOLVED (card-style buttons now implemented) |

**Steps:**
1. Navigate to New Submission form
2. Locate the Submission Type field
3. Inspect available options

**Expected Result:**
- Submission Type section shows card-style radio button controls
- Exactly two cards: "New Business" and "Cross-sell"
- Only one can be selected at a time

**Pass Criteria:** Both submission type options are rendered as card-style radio buttons and are selectable.

---

## TC-SMOKE-004: Verify Account Name search populates Brokerage and Underwriting fields

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | Valid Salesforce account exists with brokerage data |
| Test Data | Account: any account with associated brokerage |
| Known Defect | DISC-002: Underwriter + Underwriting Specialist remain editable — assertion for non-editable state will FAIL |

**Steps:**
1. Type at least 3 characters in the Account Name field
2. Wait for dropdown suggestions to appear
3. Select an account from the results
4. Observe the Brokerage section and Underwriting Team section

**Expected Result:**
- Brokerage, Broker Contact, Broker Email, Broker Phone auto-populate and are read-only ✓
- Underwriter and Underwriting Specialist auto-populate
- ~~Underwriter and Underwriting Specialist are read-only~~ ← FAILS (DISC-002)

**Pass Criteria (adjusted for known defect):** All 6 auto-populated fields fill. Brokerage fields are read-only. Underwriting fields editable state is tracked as DISC-002.

---

## TC-SMOKE-005: Verify Product(s) multi-select allows multiple selections

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | User is on the New Submission form |
| Test Data | Products: ELL and CGL |

**Steps:**
1. Click the Product(s) dropdown
2. Select "Educators Legal Liability (ELL) - ML"
3. Select "Primary General Liability (CGL) - GL"
4. Observe the selected products

**Expected Result:**
- Both products appear as individual removable cards
- Each card has a remove (×) button
- Format: "Product Name (Code) - Line of Business Code"

**Pass Criteria:** Two product cards are displayed simultaneously with remove buttons.

---

## TC-SMOKE-006: Verify Expiration Date defaults to Effective Date + 1 year

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | User is on the New Submission form |
| Test Data | Effective Date: 01/01/2027 |

**Steps:**
1. Set Effective Date to 01/01/2027
2. Observe the Expiration Date field

**Expected Result:**
- Expiration Date automatically populates to 01/01/2028

**Pass Criteria:** Expiration Date = Effective Date + 1 year.

---

## TC-SMOKE-007: Verify Need By Date auto-population to Effective Date − 5 days

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | User is on the New Submission form |
| Test Data | Effective Date: 01/15/2027 |
| Known Defect | DISC-003: Need By Date does NOT auto-populate. This test will FAIL. |

**Steps:**
1. Set Effective Date to 01/15/2027
2. Leave Need By Date empty
3. Observe the Need By Date field

**Expected Result:**
- Need By Date auto-populates to 01/10/2027 (5 days before)

**Known Failure Behaviour:** Need By Date stays empty. Expiration Date correctly auto-populates (+1 year).

**Pass Criteria:** Need By Date = Effective Date − 5 days. (FAIL — DISC-003)

---

## TC-SMOKE-008: Verify Current Stage defaults to "Incomplete Submission"

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | User is on the New Submission form |
| Test Data | None |

**Steps:**
1. Navigate to the New Submission form
2. Locate the Current Stage field in the Submission Stage section
3. Observe the default value

**Expected Result:**
- Current Stage shows "Incomplete Submission" as the default selected option

**Pass Criteria:** Stage field displays "Incomplete Submission" without any user interaction.

---

## TC-SMOKE-009: Verify document upload succeeds with valid file types

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | Valid test file available locally |
| Test Data | File: test-document.pdf (< 1 MB) |

**Steps:**
1. Click "Add Document" / file upload area
2. Select a valid .pdf file under 25 MB
3. Observe the upload result

**Expected Result:**
- File uploads successfully
- File name appears in the uploaded documents list
- No error message

**Pass Criteria:** Document is listed in the Submission Documents section.

---

## TC-SMOKE-010: Verify Submission Summary preview displays correct fields

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Smoke |
| Preconditions | User has filled in mandatory fields |
| Test Data | All mandatory fields completed |

**Steps:**
1. Fill in: Submission Type, Account, Effective Date, Product(s)
2. Locate the Submission Summary / preview section
3. Verify displayed fields

**Expected Result:**
- Summary shows: TYPE, ACCOUNT, PRODUCTS (comma-separated), NEED BY, EFFECTIVE, BROKERAGE, BROKER, STAGE

**Pass Criteria:** All 8 summary fields display correctly with the entered values.

---

## TC-SMOKE-011: Verify unique Submission ID is generated on creation

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Smoke |
| Preconditions | All mandatory fields are filled |
| Test Data | Two separate complete submissions |

**Steps:**
1. Complete and submit Submission #1 — note the Submission ID
2. Complete and submit Submission #2 — note the Submission ID

**Expected Result:**
- Each submission receives a unique, auto-incremented ID
- IDs are different from each other

**Pass Criteria:** Submission ID 2 ≠ Submission ID 1; both are non-null numeric values.

---

## TC-SMOKE-012: Verify Cancel without modifications does not show warning dialog

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Smoke |
| Preconditions | User is on the New Submission form, no fields touched |
| Test Data | None |

**Steps:**
1. Navigate to New Submission form
2. Do not modify any fields
3. Click the "Cancel" button

**Expected Result:**
- No warning dialog appears
- User is navigated away from the form immediately

**Pass Criteria:** Form closes/navigates without any confirmation dialog.

---

## TC-SMOKE-013: Verify Cancel with modifications shows warning dialog

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Smoke |
| Preconditions | User has modified at least one field |
| Test Data | Fill Account Name with any text |
| Known Defect | DISC-004: Dialog has 3 buttons (Keep Editing / Discard / Save as Draft) — spec says Yes/No only |

**Steps:**
1. Navigate to New Submission form
2. Modify at least one field (e.g., type in Account Name)
3. Click the "Cancel" button
4. Observe the dialog

**Expected Result (spec):** Warning dialog with "Yes" and "No" buttons only.
**Actual Behaviour (DISC-004):** Dialog shows "Keep Editing", "Discard", and "Save as Draft".

**Pass Criteria (adjusted):** Warning dialog appears. Content of buttons tracked as DISC-004.
