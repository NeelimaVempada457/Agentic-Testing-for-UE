# Functional Test Cases — UWB-1: New Submission Form
# Ticket: UWB-1 | Feature: Create New Submission (New Business & Cross-sell)
# Generated: 2026-05-27 (re-run) | Source: COMBINED (Jira AC + Requirements + Live App Analysis)

> **Open Defects Tracked:**
> - DISC-001: Expiration Date missing mandatory asterisk
> - DISC-002: Underwriting Team fields editable after account selection (AC-10 violated)
> - DISC-003: Need By Date does not auto-populate when Effective Date is set
> - DISC-004: Cancel dialog has 3 buttons (Keep Editing / Discard / Save as Draft) — spec says Yes/No
> - DISC-005: .doc extension absent from file picker; UI hint text incomplete

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | AC Ref | Status |
|---|---|---|---|---|---|---|
| 1 | NEWSUB-FUNC-001 | Submission Type renders as card-style radio buttons (New Business / Cross-sell) | P0 | Positive | AC-01 | PASS |
| 2 | NEWSUB-FUNC-002 | Account Name search retrieves Salesforce results and enables account selection | P0 | Positive | AC-02, AC-03 | PASS |
| 3 | NEWSUB-FUNC-003 | Account selection auto-populates Brokerage fields (read-only) | P0 | Positive | AC-09, AC-10 | PASS (partial) |
| 4 | NEWSUB-FUNC-004 | Underwriting fields auto-populate after account selection | P0 | Positive | AC-09 | PASS |
| 5 | NEWSUB-FUNC-005 | Underwriting fields are read-only after auto-population | P0 | Defect | AC-10 | FAIL — DISC-002 |
| 6 | NEWSUB-FUNC-006 | Products multi-select renders selected items as removable cards | P0 | Positive | AC-05 | PASS |
| 7 | NEWSUB-FUNC-007 | Expiration Date auto-defaults to Effective Date + 1 year | P0 | Positive | AC-06 | PASS |
| 8 | NEWSUB-FUNC-008 | Need By Date auto-defaults to Effective Date − 5 days | P0 | Defect | Spec | FAIL — DISC-003 |
| 9 | NEWSUB-FUNC-009 | Current Stage defaults to "Incomplete Submission" and is editable | P0 | Positive | AC-07, AC-13 | PASS |
| 10 | NEWSUB-FUNC-010 | Stage LOV contains all 17 defined Submission Stage values | P1 | Positive | AC-07 | PASS |
| 11 | NEWSUB-FUNC-011 | Create Submission generates unique auto-incremented Submission ID | P0 | Positive | AC-08 | PASS |
| 12 | NEWSUB-FUNC-012 | Submission Summary preview displays all 8 required fields | P1 | Positive | AC-15, AC-16 | PASS |
| 13 | NEWSUB-FUNC-013 | Document upload accepts all allowed extensions | P0 | Positive | Spec | PARTIAL — .doc absent (DISC-005) |
| 14 | NEWSUB-FUNC-014 | Internal Notes field is optional and does not block submission | P1 | Positive | AC-14 | PASS |
| 15 | NEWSUB-FUNC-015 | Expiration Date auto-populated value can be manually overridden | P1 | Positive | AC-06 | PASS |
| 16 | NEWSUB-FUNC-016 | Submission creation blocked when any mandatory field is empty | P0 | Negative | AC-01 | PASS |
| 17 | NEWSUB-FUNC-017 | Account "no results found" message appears for invalid search | P1 | Negative | AC-04 | PASS |
| 18 | NEWSUB-FUNC-018 | Expiration Date field missing mandatory asterisk indicator | P1 | Defect | Spec | FAIL — DISC-001 |
| 19 | NEWSUB-FUNC-019 | Cancel with unsaved changes shows warning dialog | P1 | Positive | Spec | PASS (dialog exists) |
| 20 | NEWSUB-FUNC-020 | Cancel dialog button labels match specification | P1 | Defect | Spec | FAIL — DISC-004 |
| 21 | NEWSUB-FUNC-021 | Fresh Salesforce data is fetched for each new submission | P1 | Positive | AC-12 | PASS |
| 22 | NEWSUB-FUNC-022 | Product format displays as "Name (Code) - Line of Business Code" | P1 | Positive | Spec | PASS |

---

### NEWSUB-FUNC-001: Submission Type renders as card-style radio buttons

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-001 |
| **Priority** | P0 |
| **Module** | New Submission Form — Submission Type |
| **Scenario Type** | Positive |
| **AC Ref** | AC-01 |
| **Status** | PASS (D-04 resolved — was dropdown, now card-style) |
| **Preconditions** | User on New Submission form |

**Steps:**
1. Navigate to Submissions > New Submission
2. Locate the Submission Type section
3. Inspect the control type
4. Select "New Business"
5. Select "Cross-sell" — verify only one can be selected at a time

**Expected Result:**
- Two card-style radio buttons: "New Business" and "Cross-sell"
- Only one selectable at a time
- Selected card visually distinguishes itself

---

### NEWSUB-FUNC-002: Account Name search retrieves Salesforce results

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-002 |
| **Priority** | P0 |
| **AC Ref** | AC-02, AC-03 |
| **Status** | PASS |

**Steps:**
1. Type 3+ characters in Account Name field
2. Wait for dropdown
3. Verify results list appears
4. Select an account
5. Verify Account Name field populates with the selected account

**Expected Result:** Typeahead search shows matching Salesforce accounts. Selection populates the field.

---

### NEWSUB-FUNC-003: Account selection auto-populates Brokerage fields (read-only)

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-003 |
| **Priority** | P0 |
| **AC Ref** | AC-09, AC-10 |
| **Status** | PASS |

**Steps:**
1. Select a valid Account with associated brokerage
2. Verify Brokerage section populates: Brokerage, Broker Contact, Broker Email, Broker Phone
3. Attempt to edit any of these fields

**Expected Result:** All 4 brokerage fields auto-populate and are read-only (non-editable).

---

### NEWSUB-FUNC-004: Underwriting fields auto-populate after account selection

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-004 |
| **Priority** | P0 |
| **AC Ref** | AC-09 |
| **Status** | PASS |

**Steps:**
1. Select a valid Account
2. Verify Underwriter field auto-populates
3. Verify Underwriting Specialist field auto-populates

**Expected Result:** Both Underwriting Team fields populate with data from Salesforce.

---

### NEWSUB-FUNC-005: Underwriting fields are read-only after auto-population

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-005 |
| **Priority** | P0 |
| **AC Ref** | AC-10 |
| **Status** | **FAIL — DISC-002** |
| **Defect** | `DISC-002-underwriting-fields-editable.png` |

**Steps:**
1. Select a valid Account
2. Wait for Underwriter and Underwriting Specialist to auto-populate
3. Attempt to change the Underwriter value via the dropdown
4. Attempt to change the Underwriting Specialist value via the dropdown

**Expected Result:** Both fields are disabled/read-only after auto-population (matching Brokerage fields behaviour).
**Actual Result (DISC-002):** Fields remain editable `<select>` comboboxes. Values can be overridden.

---

### NEWSUB-FUNC-006: Products multi-select renders selected items as removable cards

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-006 |
| **Priority** | P0 |
| **AC Ref** | AC-05 |
| **Status** | PASS |

**Steps:**
1. Click Product(s) dropdown
2. Select "Educators Legal Liability (ELL) - ML"
3. Select "Primary General Liability (CGL) - GL"
4. Select a third product
5. Verify each selected product appears as a card
6. Remove one product using the × button
7. Verify removal works and dropdown still accessible

**Expected Result:** Products render as removable cards; format is "Name (Code) - LOB"; cards can be added/removed independently.

---

### NEWSUB-FUNC-007: Expiration Date auto-defaults to Effective Date + 1 year

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-007 |
| **Priority** | P0 |
| **AC Ref** | AC-06 |
| **Status** | PASS |

**Steps:**
1. Set Effective Date to 2027-06-15
2. Immediately observe Expiration Date

**Expected Result:** Expiration Date = 2028-06-15 (auto-populated within ~1 second of Effective Date change).

---

### NEWSUB-FUNC-008: Need By Date auto-defaults to Effective Date − 5 days

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-008 |
| **Priority** | P0 |
| **Status** | **FAIL — DISC-003** |
| **Defect** | `DISC-004-need-by-date-no-auto-populate.png` |

**Steps:**
1. Set Effective Date to 2027-06-15
2. Observe Need By Date field

**Expected Result:** Need By Date auto-populates to 2027-06-10.
**Actual Result:** Need By Date remains empty. Auto-population logic not triggered.

---

### NEWSUB-FUNC-009: Current Stage defaults to "Incomplete Submission" and is editable

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-009 |
| **Priority** | P0 |
| **AC Ref** | AC-07, AC-13 |
| **Status** | PASS |

**Steps:**
1. Navigate to New Submission form
2. Verify Stage field default
3. Click Stage dropdown and change to "Information Gathering"
4. Verify change is accepted

**Expected Result:** Default = "Incomplete Submission". User can select any other stage before submission.

---

### NEWSUB-FUNC-010: Stage LOV contains all 17 defined values

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-010 |
| **Priority** | P1 |
| **AC Ref** | AC-07 |
| **Status** | PASS |

**Steps:**
1. Click the Current Stage dropdown
2. List all available options

**Expected Result:** Exactly 17 stages present across 5 categories:
- Intake & Triage: Incomplete Submission, Complete Submission, Declined to Quote
- Underwriting: Information Gathering, Review In Progress, Referred
- Quoting: Quote In Progress, Quote Sent, Quote Negotiation, Revised Quote
- Decision: Bound, UE Non-Renewed, Member Declined, Member No Response
- Post-Bind: Pending Issuance, Issued, Cancelled, Endorsed

---

### NEWSUB-FUNC-011: Create Submission generates unique auto-incremented ID

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-011 |
| **Priority** | P0 |
| **AC Ref** | AC-08 |
| **Status** | PASS |

**Steps:**
1. Complete all mandatory fields for Submission #1; submit
2. Note Submission ID returned
3. Complete all mandatory fields for Submission #2; submit
4. Compare IDs

**Expected Result:** Each Submission ID is unique and auto-incremented. IDs do not repeat.

---

### NEWSUB-FUNC-012: Submission Summary preview displays 8 required fields

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-012 |
| **Priority** | P1 |
| **AC Ref** | AC-15, AC-16 |
| **Status** | PASS |

**Steps:**
1. Fill Submission Type, Account, Effective Date, Product(s)
2. Locate the Submission Summary panel (right side / preview area)
3. Verify each expected field is present and displays correct value

**Expected Result:** TYPE, ACCOUNT, PRODUCTS (comma-separated), NEED BY, EFFECTIVE, BROKERAGE, BROKER, STAGE all visible and accurate.

---

### NEWSUB-FUNC-013: Document upload accepts all required extensions

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-013 |
| **Priority** | P0 |
| **Status** | PARTIAL FAIL — DISC-005 (.doc absent) |

**Steps:**
Upload one file of each type: .pdf ✓, .doc (FAIL), .docx ✓, .xlsx ✓, .jpg ✓, .png ✓

**Expected Result:** All 6 types upload successfully.
**Actual Result:** .doc rejected or not presented in file picker (DISC-005).

---

### NEWSUB-FUNC-014: Internal Notes is optional and does not block submission

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-014 |
| **Priority** | P1 |
| **AC Ref** | AC-14 |
| **Status** | PASS |

**Steps:**
1. Fill all mandatory fields; leave Internal Notes empty
2. Click Create Submission

**Expected Result:** Submission created without Internal Notes. No validation error.

---

### NEWSUB-FUNC-015: Expiration Date auto-populated value can be overridden

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-015 |
| **Priority** | P1 |
| **AC Ref** | AC-06 |
| **Status** | PASS |
| **Jira Ref** | Comment 3 (Ziad Elharaoui): "yes, they can modify the expiration date" |

**Steps:**
1. Set Effective Date = 2027-01-01 (Expiration auto-populates to 2028-01-01)
2. Manually set Expiration Date = 2027-06-01
3. Submit the form

**Expected Result:** Modified Expiration Date is saved. No error (as long as Expiration ≥ Effective).

---

### NEWSUB-FUNC-016: Submission blocked when any mandatory field is empty

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-016 |
| **Priority** | P0 |
| **AC Ref** | AC-01 |
| **Status** | PASS |

**Steps:**
1. Fill all mandatory fields
2. Clear Submission Type — click Create Submission → verify error
3. Restore; clear Account Name → verify error
4. Continue for each mandatory field

**Expected Result:** Each empty mandatory field produces a visible field-level validation error. Form does not submit.

---

### NEWSUB-FUNC-017: Account "no results found" for invalid search

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-017 |
| **Priority** | P1 |
| **AC Ref** | AC-04 |
| **Status** | PASS |

**Steps:**
1. Type a nonsense string in Account Name (e.g., "ZZZZINVALIDXXX")
2. Wait for search results

**Expected Result:** Message shown such as "No results found" or "No accounts match your search".

---

### NEWSUB-FUNC-018: Expiration Date missing mandatory asterisk

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-018 |
| **Priority** | P1 |
| **Status** | **FAIL — DISC-001** |
| **Defect** | `DISC-001-expiration-date-no-asterisk.png` |

**Steps:**
1. Navigate to New Submission form
2. Look at the Policy section labels

**Expected Result:** Expiration Date label has asterisk (*).
**Actual Result:** No asterisk on Expiration Date. Other mandatory fields (Account Name *, Need By Date *, Effective Date *) display asterisks correctly.

---

### NEWSUB-FUNC-019: Cancel with unsaved changes shows warning dialog

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-019 |
| **Priority** | P1 |
| **Status** | PASS |

**Steps:**
1. Fill one or more fields
2. Click Cancel
3. Verify a dialog appears

**Expected Result:** Warning dialog appears before navigating away.

---

### NEWSUB-FUNC-020: Cancel dialog button labels match specification

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-020 |
| **Priority** | P1 |
| **Status** | **FAIL — DISC-004** |
| **Defect** | `DISC-005-cancel-dialog.png` |

**Steps:**
1. Modify a field, click Cancel
2. Count and read all dialog button labels

**Expected Result (spec):** Two buttons — "Yes" and "No".
**Actual Result (DISC-004):** Three buttons — "Keep Editing", "Discard", "Save as Draft".

---

### NEWSUB-FUNC-021: Fresh Salesforce data fetched for each new submission

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-021 |
| **Priority** | P1 |
| **AC Ref** | AC-12 |
| **Status** | PASS |

**Steps:**
1. Create Submission #1 with Account A
2. Return to New Submission form
3. Search for Account A again

**Expected Result:** Account data is re-fetched from Salesforce (not cached from previous session).

---

### NEWSUB-FUNC-022: Product format displays as "Name (Code) - LOB Code"

| Field | Details |
|---|---|
| **Test Case ID** | NEWSUB-FUNC-022 |
| **Priority** | P1 |
| **Status** | PASS |

**Steps:**
1. Click Product(s) dropdown
2. Read the format of options listed

**Expected Result:** Each product option displays as "Product Name (Product Code) - Line of Business Code"
Example: "Educators Legal Liability (ELL) - ML"
