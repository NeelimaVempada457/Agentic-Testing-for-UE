# Negative Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Negative |
| Generated | 2026-05-19 |

---

## TC-NEG-001: Submit with no fields filled — verify all mandatory field errors

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | User is on the New Submission form, no fields filled |
| Test Data | None |

**Steps:**
1. Navigate to New Submission form
2. Do not fill in any fields
3. Click "Create Submission"

**Expected Result:**
- Validation errors appear for all mandatory fields: Submission Type, Account Name, Effective Date, Expiration Date, Need By Date, Product(s), Add Document
- Form is not submitted
- Each error message is displayed adjacent to the relevant field

**Pass Criteria:** At least 7 mandatory field validation errors are displayed.

---

## TC-NEG-002: Submit without selecting Submission Type

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | All other mandatory fields are filled |
| Test Data | Skip Submission Type only |

**Steps:**
1. Fill all mandatory fields except Submission Type
2. Click "Create Submission"

**Expected Result:**
- Validation error displayed for Submission Type field
- Submission is blocked

**Pass Criteria:** Error message shown on Submission Type field; submission does not proceed.

---

## TC-NEG-003: Submit without selecting Account Name

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | All other mandatory fields are filled |
| Test Data | Skip Account Name only |

**Steps:**
1. Fill all mandatory fields except Account Name
2. Click "Create Submission"

**Expected Result:**
- Validation error displayed for Account Name field
- Brokerage fields remain empty
- Submission is blocked

**Pass Criteria:** Error message shown on Account Name field; submission does not proceed.

---

## TC-NEG-004: Submit without selecting any Product(s)

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | All other mandatory fields are filled |
| Test Data | Skip Product(s) only |

**Steps:**
1. Fill all mandatory fields except Product(s)
2. Click "Create Submission"

**Expected Result:**
- Validation error displayed for Product(s) field
- Submission is blocked

**Pass Criteria:** Error message shown on Product(s) field; submission does not proceed.

---

## TC-NEG-005: Submit without uploading a document

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | All other mandatory fields are filled |
| Test Data | Skip document upload only |

**Steps:**
1. Fill all mandatory fields except Add Document
2. Click "Create Submission"

**Expected Result:**
- Validation error displayed for Add Document field: "At least one document is required"
- Submission is blocked

**Pass Criteria:** Document upload error shown; submission does not proceed.

---

## TC-NEG-006: Set Effective Date after Expiration Date — verify validation error

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | User is on the New Submission form |
| Test Data | Effective Date: 06/01/2027; Expiration Date: 01/01/2027 |

**Steps:**
1. Set Expiration Date to 01/01/2027
2. Set Effective Date to 06/01/2027 (after expiration)
3. Click "Create Submission" or tab away from the date field

**Expected Result:**
- Validation error: "Effective Date must not exceed Expiration Date"
- Submission is blocked

**Pass Criteria:** Date validation error is shown; submission is blocked.

---

## TC-NEG-007: Upload a file with a disallowed extension

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Negative |
| Preconditions | User is on the New Submission form |
| Test Data | File: test-file.exe |

**Steps:**
1. Click the Add Document upload area
2. Attempt to upload a .exe file

**Expected Result:**
- Upload is rejected
- Error message states allowed file types: .pdf, .doc, .docx, .xlsx, .jpg, .png

**Pass Criteria:** .exe file is rejected with a clear error message.

---

## TC-NEG-008: Upload a file exceeding 25 MB

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Negative |
| Preconditions | User is on the New Submission form |
| Test Data | File: large-file.pdf (> 25 MB) |

**Steps:**
1. Click the Add Document upload area
2. Attempt to upload a file larger than 25 MB

**Expected Result:**
- Upload is rejected
- Error message: "File size must not exceed 25 MB"

**Pass Criteria:** Oversized file is rejected with a clear error message.

---

## TC-NEG-009: Search Account with text that returns no results

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Negative |
| Preconditions | User is on the New Submission form |
| Test Data | Search text: "ZZZZNONEXISTENT99999" |

**Steps:**
1. Click the Account Name search field
2. Type "ZZZZNONEXISTENT99999"
3. Wait for search results

**Expected Result:**
- No results are found
- A "No results found" or equivalent message is displayed in the dropdown
- Brokerage fields remain empty

**Pass Criteria:** "No results" message is shown; no account is selected.

---

## TC-NEG-010: Verify Brokerage and Underwriting fields are non-editable

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | An account has been selected, Brokerage fields auto-populated |
| Test Data | Any valid account with brokerage data |

**Steps:**
1. Select a valid Account Name
2. Attempt to click and type in the Brokerage field
3. Attempt to click and type in Broker Contact, Broker Email, Broker Phone
4. Attempt to click and type in Underwriter and Underwriting Specialist

**Expected Result:**
- All 6 fields are read-only and do not accept user input
- Fields display auto-populated values from Salesforce

**Pass Criteria:** No text can be entered in any of the 6 auto-populated fields.

---

## TC-NEG-011: Click Cancel after modifying fields — verify warning dialog

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Negative |
| Preconditions | User has modified at least one field |
| Test Data | Submission Type: New Business (any modification) |

**Steps:**
1. Select "New Business" for Submission Type (modify the form)
2. Click the "Cancel" button

**Expected Result:**
- Warning dialog appears: "Are you sure you want to cancel this submission? All entered data will be lost."
- Dialog contains "Yes" and "No" options
- Clicking "No" returns user to the form with data intact

**Pass Criteria:** Warning dialog appears with correct message and two action buttons.

---

## TC-NEG-012: Confirm cancel warning — verify data is lost on "Yes"

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Negative |
| Preconditions | User has modified fields and warning dialog is open |
| Test Data | Submission Type: New Business; Account: any |

**Steps:**
1. Fill in Submission Type and Account Name
2. Click "Cancel"
3. When warning dialog appears, click "Yes"

**Expected Result:**
- Form is closed / user is navigated away
- All entered data is cleared
- Submission is not created

**Pass Criteria:** After clicking Yes, form data is lost and no submission is created.
