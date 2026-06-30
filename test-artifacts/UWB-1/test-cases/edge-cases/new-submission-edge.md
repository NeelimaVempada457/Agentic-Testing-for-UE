# Edge Case Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Edge Cases |
| Generated | 2026-05-19 |

---

## TC-EDGE-001: Set Effective Date first — Need By Date auto-populates to −5 days

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | Need By Date field is empty |
| Test Data | Effective Date: 02/10/2027 |

**Steps:**
1. Leave Need By Date empty
2. Set Effective Date to 02/10/2027
3. Observe Need By Date

**Expected Result:**
- Need By Date auto-populates to 02/05/2027 (5 days before)

**Pass Criteria:** Need By Date = Effective Date − 5 days when previously empty.

---

## TC-EDGE-002: Manually override Need By Date after auto-population

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | Need By Date has been auto-populated |
| Test Data | Effective Date: 02/10/2027; Override Need By Date: 01/20/2027 |

**Steps:**
1. Set Effective Date to 02/10/2027 (Need By Date auto-populates to 02/05/2027)
2. Manually change Need By Date to 01/20/2027
3. Proceed to submit

**Expected Result:**
- Manual override is accepted
- Need By Date shows 01/20/2027
- No error since 01/20/2027 is before Effective Date

**Pass Criteria:** Manual Need By Date value is preserved and submission proceeds.

---

## TC-EDGE-003: Manually set Expiration Date to before the auto-default

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | Expiration Date has been auto-populated |
| Test Data | Effective Date: 01/01/2027; Manual Expiration Date: 06/01/2027 |

**Steps:**
1. Set Effective Date to 01/01/2027 (Expiration Date auto-populates to 01/01/2028)
2. Manually change Expiration Date to 06/01/2027
3. Proceed to submit

**Expected Result:**
- Manual override is accepted (confirmed in UWB-1 comments: user CAN modify expiration date)
- No validation error since 06/01/2027 > 01/01/2027

**Pass Criteria:** Manually overridden Expiration Date is accepted if it is still after Effective Date.

---

## TC-EDGE-004: Select ALL available products in the multi-select dropdown

| Property | Value |
|---|---|
| Priority | P2 |
| Category | Edge Case |
| Preconditions | User is on the New Submission form |
| Test Data | All 14 products from the product list |

**Steps:**
1. Open the Product(s) dropdown
2. Select all 14 available products one by one
3. Observe the product cards and UI layout

**Expected Result:**
- All 14 products appear as individual removable cards
- UI does not break or overflow
- Submission summary updates with comma-separated product names

**Pass Criteria:** All products can be selected simultaneously without UI errors.

---

## TC-EDGE-005: Remove a selected product card and verify it returns to dropdown

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | At least one product has been selected |
| Test Data | Product: ELL |

**Steps:**
1. Select "Educators Legal Liability (ELL) - ML" from the dropdown
2. Click the remove (×) button on the ELL product card
3. Re-open the Product(s) dropdown

**Expected Result:**
- ELL card is removed from the selected products area
- ELL reappears as an available option in the dropdown

**Pass Criteria:** Product is deselected and available for re-selection.

---

## TC-EDGE-006: Enter maximum-length text in Internal Notes

| Property | Value |
|---|---|
| Priority | P2 |
| Category | Edge Case |
| Preconditions | User is on the New Submission form |
| Test Data | Text: 5000-character string |

**Steps:**
1. Click the Internal Notes text area
2. Paste a string of 5000 characters
3. Attempt to submit the form with all other mandatory fields filled

**Expected Result:**
- Text is accepted up to the field's maximum character limit
- If a limit exists, a character counter or truncation message is displayed
- Submission succeeds if within limit

**Pass Criteria:** Long text is handled gracefully without UI crash or data loss.

---

## TC-EDGE-007: Leave Internal Notes empty — verify submission succeeds

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | All mandatory fields are filled; Notes field is empty |
| Test Data | None for Notes field |

**Steps:**
1. Fill all mandatory fields
2. Leave Internal Notes completely empty
3. Click "Create Submission"

**Expected Result:**
- Submission is created successfully
- No validation error on the Notes field

**Pass Criteria:** Submission ID is generated; Notes field being empty does not block submission.

---

## TC-EDGE-008: Change Stage to "Declined to Quote" before submission

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | User is on the New Submission form |
| Test Data | Stage: Declined to Quote |

**Steps:**
1. Locate the Current Stage dropdown (default: "Incomplete Submission")
2. Change stage to "Declined to Quote"
3. Fill remaining mandatory fields and submit

**Expected Result:**
- Stage is saved as "Declined to Quote" on submission
- Submission is created successfully with the selected stage

**Pass Criteria:** Non-default stage value is persisted on submission creation.

---

## TC-EDGE-009: Upload multiple documents in a single submission

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | Multiple valid files available |
| Test Data | Files: doc1.pdf, doc2.xlsx, doc3.docx (each < 25 MB) |

**Steps:**
1. Upload doc1.pdf
2. Upload doc2.xlsx
3. Upload doc3.docx
4. Verify all three documents are listed
5. Submit the form

**Expected Result:**
- All 3 documents are listed in the Submission Documents section
- Submission succeeds with all 3 attached

**Pass Criteria:** Multiple documents uploaded and attached to the submission.

---

## TC-EDGE-010: Search Account Name with special characters

| Property | Value |
|---|---|
| Priority | P2 |
| Category | Edge Case |
| Preconditions | User is on the New Submission form |
| Test Data | Search inputs: "&", "'", "%", "<script>" |

**Steps:**
1. Type "&" in the Account Name search field
2. Repeat with "'"
3. Repeat with "%"
4. Repeat with "<script>"

**Expected Result:**
- No JavaScript errors or page crashes
- Either valid results or "No results found" message is shown
- Special characters are handled safely

**Pass Criteria:** Application handles special character input without crashing or XSS execution.

---

## TC-EDGE-011: Verify Submission Summary updates as fields are filled

| Property | Value |
|---|---|
| Priority | P2 |
| Category | Edge Case |
| Preconditions | User is on the New Submission form |
| Test Data | Incremental field filling |

**Steps:**
1. Select Submission Type — observe Summary panel
2. Select Account — observe Summary panel
3. Select Product(s) — observe Summary panel
4. Set Effective Date — observe Summary panel

**Expected Result:**
- Summary panel updates dynamically as each field is filled
- Products shown as comma-separated list in summary

**Pass Criteria:** Summary reflects current form state in real time.

---

## TC-EDGE-012: Rapid double-click on Create Submission (duplicate prevention)

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Edge Case |
| Preconditions | All mandatory fields are filled |
| Test Data | All mandatory fields completed |

**Steps:**
1. Fill all mandatory fields
2. Double-click the "Create Submission" button in rapid succession

**Expected Result:**
- Only one submission is created (not two)
- Button is disabled or loading state shown after first click
- No duplicate Submission ID is generated

**Pass Criteria:** Exactly one submission is created regardless of rapid clicks.
