# Positive Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Positive (Happy Path) |
| Generated | 2026-05-27 |

---

## TC-POS-001: Create New Business submission — all mandatory fields only

| Property | Value |
|---|---|
| Priority | P0 |
| Preconditions | Valid Salesforce account exists; valid .pdf test file available |
| Test Data | Submission Type: New Business; Account: Riverside Unified School District; Effective Date: 2027-07-01; Product: ELL |

**Steps:**
1. Navigate to Submissions > New Submission
2. Select "New Business" card
3. Search and select "Riverside Unified School District"
4. Set Effective Date to 2027-07-01 (Expiration auto-fills to 2028-07-01)
5. Manually enter Need By Date = 2027-06-26 (workaround for DISC-003)
6. Select "Educators Legal Liability (ELL) - ML"
7. Upload test.pdf
8. Click "Create Submission"

**Expected Result:** Submission created; unique Submission ID displayed; no errors.

---

## TC-POS-002: Create Cross-sell submission — all mandatory fields

| Property | Value |
|---|---|
| Priority | P0 |
| Test Data | Submission Type: Cross-sell; Account: valid account; Product: CGL |

**Steps:**
1. Select "Cross-sell" card
2. Select a valid Account
3. Set all required dates
4. Select "Primary General Liability (CGL) - GL"
5. Upload document
6. Submit

**Expected Result:** Cross-sell submission created with unique ID.

---

## TC-POS-003: Create submission with multiple products selected

| Property | Value |
|---|---|
| Priority | P0 |
| Test Data | Products: ELL + CGL + SBL (3 products) |

**Steps:**
1. Fill all mandatory fields
2. Select 3 products: ELL, CGL, SBL
3. Verify all 3 display as removable cards
4. Submit

**Expected Result:** Submission created with all 3 products recorded. Summary shows comma-separated product list.

---

## TC-POS-004: Create submission with Internal Notes populated

| Property | Value |
|---|---|
| Priority | P1 |
| Test Data | Internal Notes: "Initial submission for annual renewal review" |

**Steps:**
1. Fill all mandatory fields
2. Enter text in Internal Notes
3. Submit

**Expected Result:** Submission created with notes saved. Notes field did not block submission.

---

## TC-POS-005: Create submission with Expiration Date overridden

| Property | Value |
|---|---|
| Priority | P1 |
| Test Data | Effective Date: 2027-01-01; Expiration Date override: 2027-06-30 |

**Steps:**
1. Set Effective Date to 2027-01-01
2. Override auto-populated Expiration Date to 2027-06-30
3. Complete remaining mandatory fields and submit

**Expected Result:** Submission created with overridden Expiration Date = 2027-06-30.

---

## TC-POS-006: Create submission with a non-default Stage

| Property | Value |
|---|---|
| Priority | P1 |
| Test Data | Stage: "Complete Submission" |

**Steps:**
1. Fill mandatory fields
2. Change Current Stage from "Incomplete Submission" to "Complete Submission"
3. Submit

**Expected Result:** Submission created with Stage = "Complete Submission" (not default).

---

## TC-POS-007: Create submission with multiple documents uploaded

| Property | Value |
|---|---|
| Priority | P1 |
| Test Data | Files: test.pdf + test.docx |

**Steps:**
1. Fill mandatory fields
2. Upload test.pdf
3. Upload test.docx (second document)
4. Verify both appear in the documents list
5. Submit

**Expected Result:** Submission created with both documents attached.

---

## TC-POS-008: Verify Submission Summary updates in real-time as fields are filled

| Property | Value |
|---|---|
| Priority | P1 |

**Steps:**
1. Select "New Business" — verify TYPE updates in summary
2. Select Account — verify ACCOUNT and BROKERAGE update
3. Set Effective Date — verify EFFECTIVE and EXPIRATION update
4. Select Product — verify PRODUCTS updates in summary

**Expected Result:** Summary panel reflects each change in real-time without needing to submit.

---

## TC-POS-009: Verify Cancel without modifications skips warning dialog

| Property | Value |
|---|---|
| Priority | P1 |

**Steps:**
1. Navigate to New Submission form
2. Do NOT touch any field
3. Click Cancel

**Expected Result:** No dialog shown. User navigated away immediately.

---

## TC-POS-010: Verify Products dropdown lists all 14 products with correct format

| Property | Value |
|---|---|
| Priority | P1 |

**Steps:**
1. Click Product(s) dropdown
2. Verify all products listed:
   - CGL, BLX, GLX, PSL (GL)
   - ELL, ELX, FDL, FDX, SBL (ML)
   - IPL (PL)
   - RPS, RPH (AR)
   - XFF, XPG (EL)

**Expected Result:** All 14 products present in format "Name (Code) - LOB".

---

## TC-POS-011: Verify Brokerage data correctly reflects selected account

| Property | Value |
|---|---|
| Priority | P0 |

**Steps:**
1. Select Account with known brokerage data
2. Verify Brokerage, Broker Contact, Broker Email, Broker Phone populate correctly
3. Verify all 4 are read-only

**Expected Result:** All 4 Brokerage fields match the account's Salesforce data and are non-editable.
