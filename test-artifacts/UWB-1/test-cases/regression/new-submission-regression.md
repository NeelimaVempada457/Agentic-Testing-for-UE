# Regression Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Regression |
| Generated | 2026-05-27 |
| Purpose | Verify previously-fixed items remain fixed; track known open defects |

---

## Summary

| # | Test Case ID | Title | Priority | Regression Target | Expected Status |
|---|---|---|---|---|---|
| 1 | REG-001 | Submission Type renders as card-style radio buttons | P0 | D-04 fix (was dropdown → cards) | PASS |
| 2 | REG-002 | .jpg/.jpeg accepted in file picker | P1 | D-06 partial fix | PASS |
| 3 | REG-003 | Underwriting fields remain editable (open defect DISC-002) | P0 | DISC-002 open | FAIL (known) |
| 4 | REG-004 | Need By Date does not auto-populate (open defect DISC-003) | P0 | DISC-003 open | FAIL (known) |
| 5 | REG-005 | Expiration Date missing asterisk (open defect DISC-001) | P1 | DISC-001 open | FAIL (known) |
| 6 | REG-006 | Cancel dialog has 3 buttons (open defect DISC-004) | P1 | DISC-004 open | FAIL (known) |
| 7 | REG-007 | .doc still absent from file picker (open defect DISC-005) | P1 | DISC-005 open | FAIL (known) |
| 8 | REG-008 | Expiration Date auto-populates to Effective + 1 year | P0 | Core date logic | PASS |
| 9 | REG-009 | Products multi-select displays cards with remove button | P0 | Core product logic | PASS |
| 10 | REG-010 | Stage defaults to "Incomplete Submission" | P0 | Core stage logic | PASS |

---

### REG-001: Submission Type renders as card-style radio buttons

| Field | Details |
|---|---|
| **Test Case ID** | REG-001 |
| **Priority** | P0 |
| **Regression Target** | D-04 — previously rendered as `<select>` dropdown; fix applied before 2026-05-27 |
| **Expected Status** | PASS |
| **Preconditions** | User navigated to New Submission form |

**Steps:**
1. Navigate to Submissions > New Submission
2. Inspect the Submission Type section at the top of the form
3. Verify the control type

**Expected Result:**
- Submission Type renders as two card-style radio buttons ("New Business" / "Cross-sell")
- NOT a `<select>` dropdown element

**Regression Evidence:** Screenshot `SECTION-A-submission-type.png` confirms card-style rendering.

---

### REG-002: .jpg/.jpeg accepted in file picker

| Field | Details |
|---|---|
| **Test Case ID** | REG-002 |
| **Priority** | P1 |
| **Regression Target** | D-06 partial fix — .jpg/.jpeg added to accept attribute |
| **Expected Status** | PASS |
| **Preconditions** | User is on New Submission form |

**Steps:**
1. Click the document upload area
2. Inspect the file input `accept` attribute
3. Attempt to upload a .jpg file

**Expected Result:**
- File input accept attribute includes `.jpg` and `.jpeg`
- .jpg files are selectable and upload successfully

**Note:** .doc is still absent (DISC-005 — separate regression target).

---

### REG-003: Underwriting fields remain editable after account selection (KNOWN DEFECT)

| Field | Details |
|---|---|
| **Test Case ID** | REG-003 |
| **Priority** | P0 |
| **Regression Target** | DISC-002 — open defect, not yet fixed |
| **Expected Status** | FAIL (known) |
| **Defect Reference** | DISC-002 / UWB-55 |

**Steps:**
1. Select a valid Account from the Account Name field
2. Wait for Underwriting Team section to auto-populate
3. Attempt to change the Underwriter dropdown value
4. Attempt to change the Underwriting Specialist dropdown value

**Expected Result (per spec AC-10):** Both fields should be non-editable (disabled) after auto-population.
**Actual Result:** Both fields remain editable `<select>` comboboxes. User can override auto-populated values.

**Screenshot Evidence:** `DISC-002-underwriting-fields-editable.png`

---

### REG-004: Need By Date does not auto-populate when Effective Date is set (KNOWN DEFECT)

| Field | Details |
|---|---|
| **Test Case ID** | REG-004 |
| **Priority** | P0 |
| **Regression Target** | DISC-003 — open defect, not yet fixed |
| **Expected Status** | FAIL (known) |
| **Defect Reference** | DISC-003 / UWB-55 |

**Steps:**
1. Navigate to New Submission form
2. Set Effective Date to 2027-03-15
3. Observe Need By Date field immediately after setting Effective Date
4. Observe Expiration Date field (should auto-populate to 2028-03-15 — this works)

**Expected Result (per spec):** Need By Date auto-populates to Effective Date − 5 days = 2027-03-10.
**Actual Result:** Need By Date remains empty. Expiration Date correctly auto-populates.

**Screenshot Evidence:** `DISC-004-need-by-date-no-auto-populate.png`

---

### REG-005: Expiration Date missing mandatory asterisk (KNOWN DEFECT)

| Field | Details |
|---|---|
| **Test Case ID** | REG-005 |
| **Priority** | P1 |
| **Regression Target** | DISC-001 — open defect, not yet fixed |
| **Expected Status** | FAIL (known) |
| **Defect Reference** | DISC-001 / UWB-55 |

**Steps:**
1. Navigate to New Submission form
2. Inspect the Policy section
3. Check each date field label for a mandatory asterisk (*)

**Expected Result:** Expiration Date label shows asterisk (*) consistent with other mandatory fields.
**Actual Result:** Expiration Date has no asterisk. Account Name *, Need By Date *, Effective Date * — all correct.

**Screenshot Evidence:** `DISC-001-expiration-date-no-asterisk.png`

---

### REG-006: Cancel dialog has 3 buttons instead of 2 (KNOWN DEFECT)

| Field | Details |
|---|---|
| **Test Case ID** | REG-006 |
| **Priority** | P1 |
| **Regression Target** | DISC-004 — open defect, BA confirmation pending |
| **Expected Status** | FAIL (known) |
| **Defect Reference** | DISC-004 / UWB-55 |

**Steps:**
1. Navigate to New Submission form
2. Enter a value in any field
3. Click Cancel
4. Count and note button labels in the dialog

**Expected Result (spec):** Two buttons — "Yes" (confirm) and "No" (cancel).
**Actual Result:** Three buttons — "Keep Editing", "Discard", "Save as Draft". Button labels differ from spec.

**Screenshot Evidence:** `DISC-005-cancel-dialog.png`

---

### REG-007: .doc extension still absent from file picker (KNOWN DEFECT)

| Field | Details |
|---|---|
| **Test Case ID** | REG-007 |
| **Priority** | P1 |
| **Regression Target** | DISC-005 — partially fixed; .doc still missing |
| **Expected Status** | FAIL (known) |
| **Defect Reference** | DISC-005 / UWB-55 |

**Steps:**
1. Navigate to New Submission form
2. Click the document upload area
3. Inspect `accept` attribute of the file input
4. Attempt to upload a .doc file

**Expected Result (spec):** .doc is accepted alongside .pdf, .docx, .xlsx, .jpg, .png.
**Actual Result:** accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg" — `.doc` absent.

**Screenshot Evidence:** `DISC-003-file-picker-accept-types.png`

---

### REG-008: Expiration Date auto-populates to Effective Date + 1 year

| Field | Details |
|---|---|
| **Test Case ID** | REG-008 |
| **Priority** | P0 |
| **Regression Target** | Core date auto-populate logic |
| **Expected Status** | PASS |

**Steps:**
1. Set Effective Date to 2027-06-01
2. Observe Expiration Date

**Expected Result:** Expiration Date = 2028-06-01.

---

### REG-009: Products multi-select displays cards with remove button

| Field | Details |
|---|---|
| **Test Case ID** | REG-009 |
| **Priority** | P0 |
| **Regression Target** | Core product card UI |
| **Expected Status** | PASS |

**Steps:**
1. Click Product(s) dropdown
2. Select two products (e.g., ELL, CGL)
3. Verify rendered cards

**Expected Result:** Two product cards displayed with × remove buttons and correct label format.

---

### REG-010: Stage defaults to "Incomplete Submission"

| Field | Details |
|---|---|
| **Test Case ID** | REG-010 |
| **Priority** | P0 |
| **Regression Target** | Core stage default |
| **Expected Status** | PASS |

**Steps:**
1. Navigate to New Submission form
2. Read the Current Stage field value on load

**Expected Result:** Current Stage = "Incomplete Submission" (no user interaction required).
