# Application Discrepancies — UWB-1: New Submission Form
# URL: https://united-educators-application.vercel.app/submissions/new
# Analysed: 2026-05-27

---

## Summary

| Total Discrepancies | High Severity | Medium Severity | Low Severity |
|---|---|---|---|
| 5 | 1 | 2 | 2 |

> D-04 (Submission Type as dropdown) is now **RESOLVED** — the form now renders card-style radio buttons as specified.
> D-06 (Missing .jpg) is **PARTIALLY RESOLVED** — `.jpg`/`.jpeg` are now accepted; `.doc` remains missing.

---

## Discrepancy Table

| # | Area / Field | Requirement / Expected | Observed in Live App | Severity | Screenshot | Action Required |
|---|---|---|---|---|---|---|
| 1 | Underwriting Team — Underwriter, Underwriting Specialist | AC-10: Auto-populated fields must be non-editable after account selection | Both fields render as enabled comboboxes (disabled=false); user can change auto-populated values | High | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-002-underwriting-fields-editable.png` | Raise defect / Make fields read-only |
| 2 | Cancel Dialog | Spec: Cancel shows Yes / No only | Dialog presents 3 buttons: "Keep Editing", "Discard", "Save as Draft" | Medium | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-005-cancel-dialog.png` | Confirm with BA whether Save as Draft is approved scope |
| 3 | Need By Date auto-population | Spec: Need By Date auto-populates to Effective Date − 5 days when Effective Date is set | Need By Date remains empty after Effective Date is set via keyboard input; no auto-population occurs | Medium | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-004-need-by-date-no-auto-populate.png` | Raise defect / Implement auto-population logic |
| 4 | Expiration Date — mandatory indicator | Spec table: Expiration Date is mandatory | No asterisk (*) displayed on the Expiration Date label; all other mandatory fields have asterisks | Low | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-001-expiration-date-no-asterisk.png` | Raise defect / Add asterisk to label |
| 5 | Add Document — file type `.doc` | Spec: Accepted types include `.pdf, .doc, .docx, .xlsx, .jpg, .png` | File input accept attribute: `.pdf,.docx,.xlsx,.png,.jpg,.jpeg` — `.doc` is absent. UI hint text also omits `.jpg`/`.jpeg` | Low | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-003-file-picker-accept-types.png` | Add `.doc` to accept attribute; update UI hint text to include JPG |

---

## Detail

### DISC-001: Expiration Date Missing Mandatory Asterisk

| Property | Value |
|---|---|
| **Area** | Policy — Expiration Date label |
| **Requirement Source** | AC-06, Spec field table (Mandatory = Yes) |
| **Expected Behaviour** | An asterisk (*) should appear next to "Expiration Date" to indicate it is mandatory, consistent with other required fields (Need By Date *, Effective Date *, Account Name *, Product(s) *) |
| **Observed Behaviour** | The "Expiration Date" label has no asterisk. The field is present and auto-populates to Effective Date + 1 year, but its mandatory status is not visually indicated |
| **Severity** | Low |
| **Screenshot** | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-001-expiration-date-no-asterisk.png` |
| **Impact on Tests** | Tests verifying mandatory field indicators for Expiration Date will fail; users may be misled about required state |
| **Action Required** | Add mandatory asterisk (*) to Expiration Date label in the form |

---

### DISC-002: Underwriting Team Fields Remain Editable After Account Selection

| Property | Value |
|---|---|
| **Area** | Underwriting Team — Underwriter, Underwriting Specialist |
| **Requirement Source** | AC-09, AC-10 |
| **Expected Behaviour** | After account selection, Underwriter and Underwriting Specialist should auto-populate and be read-only (non-editable). Per AC-10: "Auto-populated fields are non-editable" |
| **Observed Behaviour** | Both fields render as enabled HTML `<select>` comboboxes (disabled=false). After selecting Riverside Unified School District, Underwriter auto-populates to "Sarah Mitchell" and Underwriting Specialist to "David Park", but both remain editable dropdowns allowing user to override the auto-populated values. The Brokerage section fields (Brokerage, Broker Contact, Broker Email, Broker Phone) correctly render as read-only text displays |
| **Severity** | High |
| **Screenshot** | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-002-underwriting-fields-editable.png` |
| **Impact on Tests** | Violates AC-10 directly; data integrity risk — users can override Salesforce data; tests asserting read-only state of underwriting fields will fail |
| **Action Required** | Make Underwriter and Underwriting Specialist fields read-only (disabled or visually locked) after account selection, consistent with Brokerage fields |

---

### DISC-003: Need By Date Does Not Auto-Populate When Effective Date Is Set

| Property | Value |
|---|---|
| **Area** | Policy — Need By Date |
| **Requirement Source** | Spec field table: "Need By Date: Default = Effective Date − 5 days if Effective Date set first" |
| **Expected Behaviour** | When the user sets the Effective Date, the Need By Date field should automatically populate with Effective Date minus 5 days |
| **Observed Behaviour** | After setting Effective Date to 2025-07-01 via keyboard input, Need By Date remains empty. Expiration Date correctly auto-populates to 2026-07-01 (+1 year), confirming the date change event fires, but Need By Date auto-population logic is absent or non-functional |
| **Severity** | Medium |
| **Screenshot** | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-004-need-by-date-no-auto-populate.png` |
| **Impact on Tests** | Tests verifying Need By Date auto-population will fail; users must manually enter Need By Date; form will block submission until Need By Date is filled |
| **Action Required** | Implement auto-population logic: Need By Date = Effective Date − 5 calendar days when Effective Date is set |

---

### DISC-004: Cancel Dialog Has 3 Buttons Instead of 2

| Property | Value |
|---|---|
| **Area** | Cancel Dialog |
| **Requirement Source** | UWB-1 spec: Cancel button should show confirmation with Yes / No only |
| **Expected Behaviour** | Clicking Cancel should show a dialog with two options: "Yes" (confirm cancel) and "No" (return to form) |
| **Observed Behaviour** | The Cancel dialog ("Discard this submission?") presents three buttons: "Keep Editing" (equivalent to No), "Discard" (equivalent to Yes), and "Save as Draft". The button labels have also changed from the previous run (formerly "Yes/No/Save as Draft") |
| **Severity** | Medium |
| **Screenshot** | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-005-cancel-dialog.png` |
| **Impact on Tests** | AC-11: Test assertions on exact button count will fail; "Save as Draft" flow is outside original UWB-1 scope and untested; BA must confirm if this is approved scope creep |
| **Action Required** | Confirm with BA whether Save as Draft is in scope for UWB-1; if not, remove from dialog; update test cases if confirmed in scope |

---

### DISC-005: Add Document Missing `.doc` Extension; UI Hint Omits JPG

| Property | Value |
|---|---|
| **Area** | Submission Documents — file upload control |
| **Requirement Source** | Spec: "Add Document — types: .pdf .doc .docx .xlsx .jpg .png" |
| **Expected Behaviour** | File picker should accept .pdf, .doc, .docx, .xlsx, .jpg, .png. UI helper text should list all accepted types |
| **Observed Behaviour** | File input accept attribute is `.pdf,.docx,.xlsx,.png,.jpg,.jpeg` — `.doc` is absent. UI display text reads "PDF, DOCX, XLSX, PNG · Max 25 MB per file" — omits JPG/JPEG even though they are in the accept attribute. This is a partial fix from previous run D-06 (`.jpg` was added, `.doc` remains missing) |
| **Severity** | Low |
| **Screenshot** | `test-artifacts/UWB-1/application-analysis/screenshots/DISC-003-file-picker-accept-types.png` |
| **Impact on Tests** | Tests verifying .doc file upload will fail; users with .doc files cannot upload them; UI hint text is inconsistent with actual accepted types |
| **Action Required** | Add `.doc` to the file input accept attribute; update UI hint text to "PDF, DOC, DOCX, XLSX, JPG, PNG · Max 25 MB per file" |

---

## Resolved From Previous Run

| Previous ID | Description | Status |
|---|---|---|
| D-04 | Submission Type rendered as dropdown instead of card-style radio buttons | RESOLVED — Now renders as two card-style buttons (New Business / Cross-Sell) |
| D-06 (partial) | .jpg extension missing from file picker | PARTIALLY RESOLVED — .jpg/.jpeg now in accept attribute; .doc still missing; UI hint text not updated |

---

## Consolidated Jira Defect

| Field | Value |
|---|---|
| **Jira Bug Key** | UWB-55 |
| **Jira Summary** | [Early Defect Detection][UWB-1] Consolidated Defect Report - NB-01: Create New Submission for New Business and Cross Sell |
| **Created Date** | 2026-05-24T15:39:47.478Z |
| **Status** | Created |
| **Linked Story** | UWB-1 |
| **Included Findings** | D1, D2, D3 |
| **Review Status** | FINAL_APPROVED |
| **Review Report** | C:\Users\NeelmaVempada\First_Project_Agentic\test-artifacts\UWB-1\reports\EarlyDefectReviewReport.md |
