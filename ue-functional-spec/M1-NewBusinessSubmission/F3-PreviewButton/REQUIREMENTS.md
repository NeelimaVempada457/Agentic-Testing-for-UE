# Feature: Preview Button

**Feature ID:** M1-F3
**Module:** New Business Submission (M1)
**Feature Name:** Submission Preview
**Description:** Allows users to review all entered submission details in a consolidated, read-only view before final submission. Serves as a final verification step to ensure data accuracy and completeness.
**Priority:** TBD
**Status:** Draft
**Source:** Prompt

---

## Actors

| Actor | Role |
|---|---|
| User | Initiates and reviews a new business submission |

---

## Functional Requirements

### FR-001 — Preview Access

**Description:** Users can open the Preview screen before submitting a submission.
**Trigger:** User clicks the Preview button on the Submission Creation page.
**Input:** Current state of all fields on the Submission Creation page.
**Expected Output / Behaviour:** A read-only **modal overlay** is displayed on top of the Submission Creation page, showing all relevant submission information in a structured and easy-to-read format.
**Business Rules:**
- Preview must be accessible before final submission.
- Preview renders as a modal overlay — the Submission Creation page remains loaded in the background.
- Preview screen is read-only; no editing is permitted within the modal.

---

### FR-002 — Displayed Fields

**Description:** The Preview view must display all the following submission fields.
**Trigger:** Preview screen is opened.
**Input:** Data from the Submission Creation page.
**Expected Output / Behaviour:** All listed fields are rendered with their current values.

| # | Field |
|---|---|
| 1 | Kind |
| 2 | Type |
| 3 | Account |
| 4 | Products |
| 5 | Need By |
| 6 | Effective Date |
| 7 | Expiration Date |
| 8 | Brokerage |
| 9 | Broker |
| 10 | Broker Email |
| 11 | Broker Phone |
| 12 | Stage |
| 13 | Document Count |
| 14 | Notes |
| 15 | Attached Documents |

---

### FR-003 — Data Source

**Description:** All previewed information must be fetched directly from the current Submission Creation page — no duplicate data entry or separate data storage is required.
**Trigger:** Preview screen is opened.
**Input:** Latest field values from the Submission Creation page.
**Expected Output / Behaviour:** Preview always reflects the most current values entered by the user.
**Business Rules:**
- Preview must not cache or independently store submission data.
- If the user edits a field and reopens Preview, the updated value must be reflected.
- Preview can be opened at any point during submission creation, even if mandatory fields are incomplete.
- Empty mandatory fields display as blank in the Preview modal — no blocking or error is shown.

---

### FR-004 — Attached Documents Display

**Description:** All documents attached during submission creation must be visible in the Preview.
**Trigger:** Preview screen is opened with one or more attached documents.
**Input:** Documents attached on the Submission Creation page.
**Expected Output / Behaviour:** Document names and total document count are displayed.
**Business Rules:**
- Document count must match the actual number of attached documents.

---

### FR-005 — Close Button

**Description:** A Close button must be available on the Preview screen to dismiss it and return to the Submission Creation page.
**Trigger:** User clicks the Close button.
**Input:** User action.
**Expected Output / Behaviour:** Preview screen closes and the user is returned to the Submission Creation page with all previously entered data fully preserved.
**Business Rules:**
- No data loss must occur when closing the Preview.
- No submission action is triggered by closing.

---

## Non-Functional Requirements

| NFR ID | Type | Requirement |
|---|---|---|
| NFR-001 | Usability | Preview renders as a modal overlay on top of the Submission Creation page |
| NFR-002 | Usability | Modal must be structured and easy to read with clear field labels |
| NFR-003 | Data Integrity | Closing the modal must not modify or reset any field on the Submission Creation page |
| NFR-004 | Accessibility | All 15 fields are displayed to all users — no role-based field hiding applies |

---

## Acceptance Criteria

- [ ] AC-001: User can open a Preview screen before submitting.
- [ ] AC-002: All 15 specified fields (Kind, Type, Account, Products, Need By, Effective Date, Expiration Date, Brokerage, Broker, Broker Email, Broker Phone, Stage, Document Count, Notes, Attached Documents) are displayed correctly.
- [ ] AC-003: Preview data matches the latest values entered on the Submission Creation page.
- [ ] AC-004: Attached documents and document count are visible in the Preview.
- [ ] AC-005: A Close button is present and functional on the Preview screen.
- [ ] AC-006: Closing the Preview returns the user to the Submission Creation page with all entered data preserved.

---

## Out of Scope

- Editing submission data from within the Preview screen.
- Saving a draft from the Preview screen.
- Printing or exporting the Preview.

---

## Open Questions

| # | Question | Raised By | Status |
|---|---|---|---|
| 1 | Should the Preview screen be a modal overlay or a full page? | QA | **Closed — Modal overlay confirmed** |
| 2 | Are there any fields that should be hidden in Preview based on user role? | QA | **Closed — All fields are visible to all users; no role-based field hiding** |
| 3 | What is the expected behaviour if mandatory fields are empty when Preview is opened? | QA | **Closed — Preview is allowed regardless of mandatory field completion; empty fields display as blank** |
