# Boundary Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Boundary |
| Generated | 2026-05-27 |

---

## TC-BOUND-001: Effective Date equal to Expiration Date (boundary — equal dates)

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Date Validation — Policy Section |
| Jira AC Ref | AC-06: "Effective Date must not exceed Expiration Date" |

**Steps:**
1. Set Effective Date = 2027-01-01
2. Set Expiration Date = 2027-01-01 (same date)
3. Attempt to create submission

**Expected Result:**
- Spec says "must not exceed" — equal dates may be allowed (Effective = Expiration)
- System either accepts or shows a clear validation message defining whether equal dates are permitted

---

## TC-BOUND-002: Effective Date one day before Expiration Date

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Date Validation |
| Jira AC Ref | AC-06 |

**Steps:**
1. Set Effective Date = 2027-01-01
2. Set Expiration Date = 2027-01-02 (1 day apart)
3. Submit form with all mandatory fields

**Expected Result:** Submission created successfully — minimum valid date range.

---

## TC-BOUND-003: Effective Date exceeds Expiration Date by 1 day

| Property | Value |
|---|---|
| Priority | P0 |
| Area | Date Validation |
| Jira AC Ref | AC-06 |

**Steps:**
1. Set Effective Date = 2027-01-02
2. Set Expiration Date = 2027-01-01 (Effective > Expiration)
3. Attempt to submit

**Expected Result:** Field-level validation error prevents submission. Error message references date constraint.

---

## TC-BOUND-004: Need By Date exactly equal to Effective Date (zero days before)

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Date Validation — Need By Date |
| Note | Need By Date auto-populate is broken (DISC-003) — test manually |

**Steps:**
1. Set Effective Date = 2027-03-01
2. Manually set Need By Date = 2027-03-01 (same as Effective Date)
3. Attempt to submit

**Expected Result:** Spec does not explicitly forbid Need By Date = Effective Date. Clarify with BA whether Need By must be strictly before Effective Date.

---

## TC-BOUND-005: Need By Date after Effective Date

| Property | Value |
|---|---|
| Priority | P0 |
| Area | Date Validation — Need By Date |
| Note | Spec says "Validate Need by Date is before effective date" |

**Steps:**
1. Set Effective Date = 2027-03-01
2. Manually set Need By Date = 2027-03-10 (after Effective Date)
3. Attempt to submit

**Expected Result:** Validation error — Need By Date must be before Effective Date.

---

## TC-BOUND-006: Effective Date set to today's date

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Date Validation |

**Steps:**
1. Set Effective Date = today's date
2. Verify Expiration Date auto-populates to today + 1 year
3. Submit form with all mandatory fields

**Expected Result:** Submission accepted — same-day effective date should be valid unless spec restricts it.

---

## TC-BOUND-007: Document at exactly 25 MB size limit

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Document Upload |
| Jira Ref | Spec: "Max file size: 25 MB (TBD)" |

**Steps:**
1. Prepare a .pdf file of exactly 25.0 MB
2. Attempt to upload it via Add Document

**Expected Result:** Upload succeeds at the boundary limit.

---

## TC-BOUND-008: Document at 25 MB + 1 byte (over limit)

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Document Upload |

**Steps:**
1. Prepare a file of 25 MB + 1 byte
2. Attempt to upload via Add Document

**Expected Result:** Upload is rejected with a clear "File size exceeds 25 MB" error message.

---

## TC-BOUND-009: Account search with minimum input (1 character)

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Account Search |

**Steps:**
1. Type exactly 1 character in the Account Name field
2. Observe whether the search fires or waits for more input

**Expected Result:** Either search fires and shows results, or a minimum-character hint is shown (e.g., "Type at least 3 characters"). No crash or unhandled state.

---

## TC-BOUND-010: Account search with exactly 0 characters (cleared field)

| Property | Value |
|---|---|
| Priority | P1 |
| Area | Account Search |

**Steps:**
1. Type 5 characters, wait for results
2. Delete all characters back to empty
3. Observe dropdown state

**Expected Result:** Dropdown closes or shows empty state. No results remain visible. No error thrown.

---

## TC-BOUND-011: Expiration Date 1 day before Effective Date (after override)

| Property | Value |
|---|---|
| Priority | P0 |
| Area | Date Override Validation |
| Jira Ref | Jira Comment 3: "Yes, they can modify the expiration date" — but can it go below Effective? |

**Steps:**
1. Set Effective Date = 2027-01-10
2. Expiration Date auto-populates to 2028-01-10
3. Manually override Expiration Date to 2027-01-09 (1 day before Effective)
4. Attempt to submit

**Expected Result:** Validation error — Expiration Date must be ≥ Effective Date.

---

## TC-BOUND-012: All mandatory fields filled except exactly one (boundary exclusion)

| Property | Value |
|---|---|
| Priority | P0 |
| Area | Form Validation |
| Jira AC Ref | AC-01 |

**Steps (repeat for each mandatory field):**
1. Fill ALL mandatory fields correctly
2. Clear exactly ONE mandatory field
3. Click "Create Submission"
4. Note the validation error(s) shown

**Mandatory fields to test:**
- Submission Type
- Account Name
- Need By Date (manual entry)
- Effective Date
- Expiration Date
- Product(s)
- Add Document

**Expected Result:** Each cleared field triggers a specific validation error. Form does not submit.
