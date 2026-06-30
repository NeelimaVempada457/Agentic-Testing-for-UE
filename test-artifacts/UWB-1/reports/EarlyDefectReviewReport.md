# Early Defect Review Report

**Story Key:** UWB-1
**Story Summary:** NB-01: Create New Submission for New Business and Cross Sell
**Generated:** 2026-05-24
**Status:** FINAL_APPROVED
**Approved At:** 2026-05-24T00:00:00.000Z

---

## Executive Summary

| Metric | Count |
|---|---|
| Total Discrepancies Identified | 6 |
| Valid Findings (after validation) | 5 |
| False Positives Removed | 1 (RAW-003: Need By Date — Playwright automation limitation, not confirmed product defect) |
| Duplicates Removed | 0 |
| Consolidated Defects in This Report | 3 |

---

## Severity Distribution

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 1 |
| Medium | 1 |
| Low | 1 |

---

## Requirement Traceability Matrix

| Acceptance Criterion | Consolidated Defect | Severity | Status |
|---|---|---|---|
| AC-01 — All mandatory fields must be completed before submission creation | — | — | No defect found |
| AC-02 — Account supports search and selection from Salesforce | — | — | No defect found |
| AC-03 — User must select an account to proceed | — | — | No defect found |
| AC-04 — System shows message when no results are found | — | — | No defect found |
| AC-05 — Product and Underwriting Team allow multiple selections | — | — | No defect found |
| AC-06 — Date fields must be valid (Effective Date ≤ Expiration Date) | — | — | No defect found |
| AC-07 — Stage defaults to "Incomplete Submission" and is editable | — | — | No defect found |
| AC-08 — Submission is created only after validations pass with a unique Submission ID | — | — | No defect found |
| AC-09 — Notes field is optional and does not block submission creation | — | — | No defect found |
| AC-10 — Summary displays key submission details for review before final submission | — | — | No defect found |
| AC-11 — Auto-populated fields are non-editable | **D1** | High | **Violated** |
| Story Desc — Cancel dialog must show "Yes" / "No" only | **D2** | Medium | **Violated** |
| Story Desc — Submission Type must be card-style radio button | **D3** | Low | **Violated** |
| Story Desc — Expiration Date is a mandatory field | **D3** | Low | **Violated** |
| Story Desc — Add Document accepts .pdf .doc .docx .xlsx .jpg .png | **D3** | Low | **Violated** |

---

## Consolidated Findings

---

### D1 — Underwriting Team Fields Remain Editable After Auto-Population

| Field | Details |
|---|---|
| **Defect ID** | D1 |
| **Category** | Functional Defect / Data Integrity Issue |
| **Requirement Violated** | AC-11 — Auto-populated fields are non-editable; Story Description — Underwriter and Underwriting Specialist listed as Read-only |
| **Severity** | High |
| **Priority** | High |
| **Business Impact** | Users can override Salesforce-sourced underwriting assignments, breaking data integrity and potentially routing submissions to incorrect underwriters. All other auto-populated fields (Brokerage, Broker Contact, Broker Email, Broker Phone) are correctly read-only — this is an isolated gap in the Underwriting Team section. |

**Description:**
After an account is selected and Salesforce data auto-populates the Underwriting Team section, the Underwriter and Underwriting Specialist fields remain interactive comboboxes. Users can clear or modify the auto-populated values. AC-11 requires all auto-populated fields to be non-editable, and the story description explicitly marks both fields as Read-only. This is inconsistent with the Brokerage section, where all four auto-populated fields are correctly locked.

**Expected Result:**
After account selection triggers Salesforce auto-population, the Underwriter and Underwriting Specialist fields must be rendered as read-only — no user input accepted. Consistent with how Brokerage, Broker Contact, Broker Email, and Broker Phone behave.

**Actual Result:**
Underwriter and Underwriting Specialist fields render as editable comboboxes after auto-population. Users can type into, clear, or select different values, overriding the Salesforce-assigned underwriting team.

**Traceability:**
- Jira AC Reference: AC-11 — "Auto-populated fields are non-editable"
- Story Description: Underwriter field — "Read-only"; Underwriting Specialist field — "Read-only"
- Business Rule: N/A (covered by AC-11 and field-level spec)
- Jira Comment Reference: Comment 3 (Ziad Elharaoui, 06/05/2026) refers to Expiration Date only — does not override this requirement
- Related Test Cases: TC-NEG-010, TC-SMOKE-004

**Evidence:**
- Source file: `test-artifacts/UWB-1/application-analysis/discrepancies.md` — D-01
- Requirements vs App: `test-artifacts/UWB-1/application-analysis/requirements-vs-app.md` — AC-10 row (Fail), Fields table (Underwriter row: "Editable — violates AC-10")

**Source Findings:** RAW-001

---

### D2 — Cancel Dialog Contains Undocumented "Save as Draft" Option

| Field | Details |
|---|---|
| **Defect ID** | D2 |
| **Category** | UI Inconsistency / Missing Requirement |
| **Requirement Violated** | Story Description — Cancel dialog spec is explicit: "Select Yes to continue or No to return to the submission" (two options only) |
| **Severity** | Medium |
| **Priority** | Medium |
| **Business Impact** | The "Save as Draft" option implies an undocumented draft persistence capability. This flow is completely untested, has no AC coverage, and could leave submissions in an unmanaged state. BA/PO must decide whether draft saving is intentional, in scope, or an erroneous implementation. TC-NEG-011 cancel assertions will fail if testing for a two-button dialog. |

**Description:**
The Cancel button confirmation dialog displays three options: "Yes", "No", and "Save as Draft". The UWB-1 requirements are explicit — the dialog must present exactly: *"Are you sure you want to cancel this submission? All entered data will be lost. Select Yes to continue or No to return to the submission."* The "Save as Draft" option is not mentioned anywhere in the story, acceptance criteria, or Jira comments. It implies backend draft state management exists but is entirely unspecified and unverified.

**Expected Result:**
Cancel dialog shows exactly two options:
- **Yes** — cancel the action, all data lost
- **No** — return to the submission form

**Actual Result:**
Cancel dialog shows three options:
- **Yes**
- **No**
- **Save as Draft** (undocumented)

**Traceability:**
- Jira AC Reference: N/A (cancel dialog not in AC list)
- Story Description: "The display message should be: Are you sure you want to cancel this submission? All entered data will be lost. Select Yes to continue or No to return to the submission."
- Business Rule: N/A
- Jira Comment Reference: No comment confirms or denies "Save as Draft" intent
- Related Test Cases: TC-NEG-011

**Evidence:**
- Source file: `test-artifacts/UWB-1/application-analysis/discrepancies.md` — D-02
- Requirements vs App: `test-artifacts/UWB-1/application-analysis/requirements-vs-app.md` — Cancel button row: "dialog has 3 options including 'Save as Draft' — Undocumented third option"

**Source Findings:** RAW-002

---

### D3 — Form Field UI Implementation Gaps (3 items)

| Field | Details |
|---|---|
| **Defect ID** | D3 |
| **Category** | UI Inconsistency / Validation Defect |
| **Requirement Violated** | Story Description — Submission Type field spec; Expiration Date mandatory field spec; Add Document accepted file types spec |
| **Severity** | Low |
| **Priority** | Low |
| **Business Impact** | Minor UX and data entry inconsistencies. None block core workflow. The missing mandatory asterisk on Expiration Date misleads users. The missing file types in the document uploader may prevent users from selecting `.doc` or `.jpg` files via the browser picker. |

**Description:**
Three separate low-severity frontend implementation gaps were identified, all sharing the same root category — the live UI does not match the documented field specifications in UWB-1. Grouped under one consolidated defect for efficient resolution:

**D3a — Submission Type: Dropdown instead of Card-Style Radio Buttons**
The story specifies Submission Type as a "Radio Button (Card Type)" presenting New Business and Cross-sell as selectable cards. The live application renders this as a standard HTML `<select>` dropdown. Functionally equivalent in terms of value selection, but the visual treatment differs from the design specification. Requires confirmation from the design team whether the dropdown is an intentional simplification.

**D3b — Expiration Date: Missing Mandatory Asterisk**
The story field table marks Expiration Date as Mandatory. All other mandatory fields on the form (Account Name, Need By Date, Effective Date, Products) correctly display an asterisk (*). Expiration Date does not. This creates a UX inconsistency that may cause users to believe the field is optional, increasing validation error rates.

**D3c — Add Document: Missing .doc and .jpg from File Picker Accept Attribute**
The story specifies accepted document types as: `.pdf, .doc, .docx, .xlsx, .jpg, .png`. The live file picker's `accept` attribute contains: `.pdf, .docx, .xlsx, .png` — omitting `.doc` and `.jpg`. The browser will not surface these file types in the file picker dialog. Backend acceptance of these types is unconfirmed and should be verified — if the backend also rejects them, users cannot upload `.doc` or `.jpg` files at all.

**Expected Results:**
- D3a: Submission Type renders as two selectable card-style radio buttons labeled "New Business" and "Cross-sell"
- D3b: Expiration Date label displays a mandatory asterisk (*) consistent with all other mandatory fields
- D3c: File picker `accept` attribute includes: `.pdf, .doc, .docx, .xlsx, .jpg, .png`

**Actual Results:**
- D3a: Submission Type renders as a standard `<select>` dropdown
- D3b: No asterisk next to Expiration Date label
- D3c: File picker `accept` includes `.pdf, .docx, .xlsx, .png` only

**Traceability:**
- Jira AC Reference: N/A for D3a and D3b (field-level spec in story description); N/A for D3c (file type spec in story description)
- Story Description: Submission Type — "Radio Button (Card Type)"; Expiration Date — "Mandatory"; Add Document — "Allowed extensions: .pdf, .doc, .docx, .xlsx, .jpg, .png"
- Business Rule: N/A
- Jira Comment Reference: No comments override these specifications
- Related Test Cases: TC-SMOKE-003 (Submission Type), TC-NEG-005 (Expiration Date), TC-EDGE-006 (file upload)

**Evidence:**
- Source file: `test-artifacts/UWB-1/application-analysis/discrepancies.md` — D-04, D-05, D-06
- Requirements vs App: `test-artifacts/UWB-1/application-analysis/requirements-vs-app.md` — Submission Type row, Expiration Date row, Add Document row

**Source Findings:** RAW-004, RAW-005, RAW-006

---

## Recommended Jira Bug Summary

[Early Defect Detection][UWB-1] Consolidated Defect Report - NB-01: Create New Submission for New Business and Cross Sell

---

## Recommended Jira Bug Description

**Story Reference:** UWB-1 — NB-01: Create New Submission for New Business and Cross Sell

**Detection Method:** Agentic Playwright crawl and test generation — Early Defect Detection (pre-QA phase)

**Consolidated Findings:**

**D1 (High) — Underwriting Team Fields Editable After Auto-Population:** The Underwriter and Underwriting Specialist fields remain as editable comboboxes after Salesforce auto-population, directly violating AC-11 ("Auto-populated fields are non-editable") and the story's field-level read-only specification. All other auto-populated Brokerage fields are correctly locked. This is an isolated gap in the Underwriting Team section and poses a data integrity risk.

**D2 (Medium) — Cancel Dialog Undocumented "Save as Draft" Option:** The Cancel confirmation dialog presents three options (Yes, No, Save as Draft) instead of the two explicitly specified in the story description. The "Save as Draft" functionality is undocumented, untested, and implies backend draft persistence that has no acceptance criteria or story coverage. BA clarification is required on whether this is intentional.

**D3 (Low) — Form Field UI Implementation Gaps:** Three minor frontend gaps: (a) Submission Type rendered as a dropdown instead of the specified card-style radio buttons; (b) Expiration Date missing the mandatory field asterisk indicator; (c) Add Document file picker missing `.doc` and `.jpg` from the `accept` attribute.

**Environment:** QA — https://united-educators-application.vercel.app/submissions/new

**Steps to Reproduce:**

D1:
1. Navigate to Submissions > New Submission
2. Search and select any Account in the Account Name field
3. Observe Brokerage and Underwriting Team auto-populate
4. Attempt to type in the Underwriter or Underwriting Specialist field
5. Observe: field accepts input (should be read-only)

D2:
1. Navigate to Submissions > New Submission
2. Enter any data in any field
3. Click the Cancel button
4. Observe: dialog shows "Yes", "No", and "Save as Draft" (should show "Yes" and "No" only)

D3a:
1. Navigate to Submissions > New Submission
2. Observe the Submission Type field — rendered as a dropdown, not card-style radio buttons

D3b:
1. Navigate to Submissions > New Submission
2. Observe field labels — Expiration Date has no mandatory asterisk (*) while all other mandatory fields do

D3c:
1. Navigate to Submissions > New Submission
2. Click Add Document
3. Observe file picker — `.doc` and `.jpg` files are not surfaced (not in accept attribute)

**Expected Behaviour:**
- Underwriter and Underwriting Specialist fields locked to read-only after account selection (D1)
- Cancel dialog shows exactly "Yes" and "No" with the specified warning message (D2)
- Submission Type renders as two card-style radio buttons (D3a)
- Expiration Date displays a mandatory asterisk (*) (D3b)
- Add Document file picker accepts `.pdf, .doc, .docx, .xlsx, .jpg, .png` (D3c)

**Actual Behaviour:**
- Underwriter and Underwriting Specialist remain editable comboboxes after auto-population (D1)
- Cancel dialog has a third "Save as Draft" button not in requirements (D2)
- Submission Type is a standard `<select>` dropdown (D3a)
- Expiration Date has no asterisk despite being mandatory (D3b)
- File picker accept attribute omits `.doc` and `.jpg` (D3c)

**Acceptance Criteria Violated:**
- AC-11 — Auto-populated fields are non-editable (D1)
- Story Description — Cancel dialog two-option specification (D2)
- Story Description — Field-level specifications for Submission Type, Expiration Date, and Add Document (D3)

---

## Risks and Recommendations

**D1 (High — fix before QA sign-off):** The editable Underwriting Team fields represent a data integrity risk. If a user overrides the auto-populated underwriter, submissions may be routed incorrectly. This should be fixed in the current sprint before functional testing begins. Frontend fix: apply the same `disabled`/`readOnly` attribute pattern used for Brokerage fields.

**D2 (Medium — BA clarification required):** Before raising a defect or requesting a fix, the BA/PO must confirm whether "Save as Draft" is intentional. If it is a planned feature, UWB-1 needs a new acceptance criterion and the draft flow needs test coverage. If it is an erroneous implementation, it should be removed.

**D3 (Low — address in current sprint):** These are straightforward frontend fixes. D3b (missing asterisk) is the most user-facing and should be prioritised. D3c (file types) requires backend confirmation before the frontend fix is made — if the backend accepts `.doc` and `.jpg`, update only the `accept` attribute; if not, backend must also be updated.

**Dropped Finding Note:** RAW-003 (Need By Date auto-population) was classified as a test automation limitation, not a confirmed product defect. The auto-population may function correctly in real browser sessions. Manual verification of this field behavior is recommended before raising a separate defect.

---

## Reviewer Actions

To proceed, respond with one of the following commands:

| Command | Effect |
|---|---|
| `APPROVE` | Accept all findings. Advances to final approval stage. Does NOT create Jira bug yet. |
| `REJECT` | Reject the report. No Jira bug will be created. |
| `EXCLUDE D2` | Remove a specific defect ID from the report. |
| `MERGE D2,D3` | Combine findings into one root-cause defect. |
| `UPDATE D1 Severity=Critical` | Adjust Severity, Priority, Description, BusinessImpact, ExpectedResult, or ActualResult. |
| `COMMENT D2 = Save as Draft is intentional — confirmed by PO` | Add a reviewer comment to a defect. |
| `FINAL_APPROVE` | **Only this command triggers Jira bug creation.** |

*After APPROVE + any edits, type `FINAL_APPROVE` to create the Jira bug.*


---

## Created Jira Bug

| Field | Value |
|---|---|
| **Bug Key** | UWB-55 |
| **Created At** | 2026-05-24T15:39:47.461Z |
