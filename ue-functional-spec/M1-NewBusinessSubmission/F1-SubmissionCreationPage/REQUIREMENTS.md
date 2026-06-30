# Feature: Submission Creation Page

**Feature ID:** M1-F1
**Module:** New Business Submission (M1)
**Feature Name:** Submission Creation Page
**Description:** Enables users to create a new submission by entering all required submission information, uploading supporting documents, and assigning underwriting details. The page is organized into multiple sections to improve usability and data entry efficiency. Upon successful completion and validation of required fields, users can create a new Submission record.
**Priority:** TBD
**Status:** Draft
**Source:** Prompt

---

## Actors

| Actor | Role |
|---|---|
| User | Creates a new business submission by filling in form sections and uploading documents |

---

## Page Structure

The Submission Creation Page consists of the following sections in order:

| # | Section |
|---|---|
| 1 | Submission Documents |
| 2 | Submission Type |
| 3 | Account |
| 4 | Policy |
| 5 | Brokerage |
| 6 | Underwriting Team |
| 7 | Notes |
| 8 | Submission Stage |

**Page Footer — Action Buttons (in order):**
- Cancel
- Preview
- Create Submission

---

## Functional Requirements

### FR-001 — Page Access

**Description:** Users can navigate to and access the Submission Creation Page.
**Trigger:** User initiates creation of a new submission.
**Input:** Navigation action.
**Expected Output / Behaviour:** Submission Creation Page loads with all eight sections displayed in the correct order.

---

### FR-002 — Section 1: Submission Documents

**Description:** Allows users to upload documents associated with the submission.
**Trigger:** User interacts with the document upload area.
**Input:** One or more files selected via drag-and-drop or file browser.
**Expected Output / Behaviour:** Files are uploaded and associated with the submission.

**UI Components:**
- Drag-and-drop upload area
- File browser upload option
- Add Document button

**Display Text:**
- `"Drop files here or click to browse"` — shown in the upload area
- `"PDF, DOCX, XLSX, PNG · Max 25 MB per file"` — shown as file type/size guidance
- `"No documents attached yet · Drag & drop or click above to add"` — shown when no documents have been uploaded

**Supported File Types:**

| Format | Extension |
|---|---|
| PDF | .pdf |
| Word Document | .docx |
| Excel Spreadsheet | .xlsx |
| Image | .png |

**Business Rules:**
- Maximum file size: **25 MB per file**.
- Files can be uploaded via drag-and-drop or file browser.
- Additional documents can be added using the Add Document button.
- Uploaded documents must be associated with the Submission record on creation.

---

### FR-003 — Section 2: Submission Type

**Description:** Users select the type of submission.
**Trigger:** User views Section 2.
**Input:** Radio button selection.
**Expected Output / Behaviour:** Selected type is recorded against the submission.

**Fields:**

| Field | Type | Required | Options |
|---|---|---|---|
| Type | Radio button | Yes | New Business, Cross-sell |

**Business Rules:**
- Exactly one option must be selected.

---

### FR-004 — Section 3: Account

**Description:** Users search and select an existing Salesforce Account record for the submission.
**Trigger:** User interacts with the Account Name field.
**Input:** Search term entered by the user.
**Expected Output / Behaviour:** Matching Salesforce Account records are returned and the user selects one.

**Fields:**

| Field | Type | Required | Data Source |
|---|---|---|---|
| Account Name | Lookup | Yes | Salesforce Account records |

**Business Rules:**
- Account Name must retrieve records from Salesforce Account data.
- User must select from existing Salesforce records; free-text entry is not permitted.

---

### FR-005 — Section 4: Policy

**Description:** Users enter policy-related date and product information.
**Trigger:** User interacts with Section 4 fields.
**Input:** Date selections and product selection(s).
**Expected Output / Behaviour:** Policy details are recorded against the submission.

**Fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Need By Date | Date picker | Yes | — |
| Effective Date | Date picker | Yes | — |
| Expiration Date | Date picker | No | — |
| Product(s) | Select | Yes | Single-select or multi-select based on business requirements |

---

### FR-006 — Section 5: Brokerage

**Description:** Users enter brokerage and broker contact details.
**Trigger:** User interacts with Section 5 fields.
**Input:** Text entry for brokerage and broker fields.
**Expected Output / Behaviour:** Brokerage details are recorded against the submission.

**Fields:**

| Field | Type | Required |
|---|---|---|
| Brokerage | Text | No |
| Broker Contact | Text / Lookup | No |
| Broker Email | Email | No |
| Broker Phone | Phone | No |

---

### FR-007 — Section 6: Underwriting Team

**Description:** Users assign underwriting team members to the submission.
**Trigger:** User interacts with Section 6 fields.
**Input:** Selection of underwriter and specialist.
**Expected Output / Behaviour:** Underwriting team is recorded against the submission.

**Fields:**

| Field | Type | Required |
|---|---|---|
| Underwriter | Lookup / Select | No |
| Underwriting Specialist | Lookup / Select | No |

---

### FR-008 — Section 7: Notes

**Description:** Users can enter internal notes related to the submission.
**Trigger:** User interacts with the Notes field.
**Input:** Free-text entry.
**Expected Output / Behaviour:** Notes are saved against the Submission record.

**Fields:**

| Field | Type | Required |
|---|---|---|
| Internal Notes | Multi-line text area | No |

---

### FR-009 — Section 8: Submission Stage

**Description:** Displays or allows selection of the current submission stage.
**Trigger:** User views or interacts with Section 8.
**Input:** Stage selection.
**Expected Output / Behaviour:** Current stage is recorded against the submission.

**Fields:**

| Field | Type | Required |
|---|---|---|
| Current Stage | Display / Select | No |

---

### FR-010 — Field Validation

**Description:** Required fields must be completed before a submission can be created.
**Trigger:** User attempts to click Create Submission with missing required fields.
**Input:** Incomplete form state.
**Expected Output / Behaviour:** Submission creation is blocked and a validation message is displayed.

**Required Fields:**
- Account Name
- Product(s)
- Need By Date
- Effective Date

**Validation Message displayed on page:**
> *"Required: Account Name, Product(s), Need By Date, and Effective Date."*

**Business Rules:**
- Validation message is visible on the page during submission creation (not only on submit attempt).
- Submission creation is prevented until all required fields are completed.
- Users are informed clearly when required fields are missing.

---

### FR-011 — Cancel Button

**Description:** Allows users to cancel the submission creation process.
**Trigger:** User clicks the Cancel button in the page footer.
**Input:** User action.
**Expected Output / Behaviour:** User is returned to the previous page or submission listing page. No Submission record is created.
**Business Rules:**
- No data is saved when Cancel is used.
- No submission record is created.

---

### FR-012 — Preview Button

**Description:** Opens the Submission Preview modal showing a consolidated, read-only view of all entered information.
**Trigger:** User clicks the Preview button in the page footer.
**Input:** Current state of all form fields.
**Expected Output / Behaviour:** Submission Preview modal opens displaying the latest values entered on the Submission Creation Page.
**Business Rules:**
- Preview data must reflect the latest values at the time Preview is opened.
- See [M1-F3 Preview Button requirements](../F3-PreviewButton/REQUIREMENTS.md) for full Preview behaviour.

---

### FR-013 — Create Submission Button

**Description:** Validates all required fields and creates a new Submission record.
**Trigger:** User clicks the Create Submission button in the page footer.
**Input:** Completed form data, uploaded documents, selected values.
**Expected Output / Behaviour:** A new Submission record is created with all entered data saved. User is redirected per the application's post-creation workflow.
**Business Rules:**
- All required fields must pass validation before the record is created.
- All entered data, uploaded documents, and selected values are persisted to the Submission record.
- Uploaded documents are linked to the created Submission record.
- On success, user is redirected according to the application's post-creation workflow.

---

## Data Sources

| Data | Source |
|---|---|
| Account Name | Salesforce Account records |
| Submission data (all fields) | Persisted to Submission record on creation |
| Uploaded documents | Associated with the created Submission record |

---

## Non-Functional Requirements

| NFR ID | Type | Requirement |
|---|---|---|
| NFR-001 | Usability | Page sections must be displayed in the defined order (Documents → Type → Account → Policy → Brokerage → Underwriting Team → Notes → Stage) |
| NFR-002 | Usability | Validation message must be visible on the page during submission creation, not only on submit attempt |
| NFR-003 | Integration | Account Name lookup must integrate with Salesforce Account data in real time |
| NFR-004 | Data Integrity | All entered data and uploaded documents must be persisted to the Submission record on creation |
| NFR-005 | File Upload | Unsupported file types or files exceeding 25 MB must be rejected |

---

## Acceptance Criteria

- [ ] AC-001: User can access the Submission Creation Page.
- [ ] AC-002: All eight sections are displayed in the correct order.
- [ ] AC-003: Users can upload supported document types (PDF, DOCX, XLSX, PNG) up to 25 MB per file.
- [ ] AC-004: Type field displays New Business and Cross-sell as radio button options.
- [ ] AC-005: Account Name field retrieves data from Salesforce.
- [ ] AC-006: Users can enter all Policy, Brokerage, Underwriting Team, Notes, and Stage information.
- [ ] AC-007: Validation message `"Required: Account Name, Product(s), Need By Date, and Effective Date."` is visible during submission creation.
- [ ] AC-008: Submission cannot be created if required fields (Account Name, Product(s), Need By Date, Effective Date) are missing.
- [ ] AC-009: Preview button opens the Submission Preview modal with current form values.
- [ ] AC-010: Cancel button exits the creation process without creating a record.
- [ ] AC-011: Create Submission button successfully creates a Submission record when validation passes.
- [ ] AC-012: Uploaded documents are linked to the created Submission record.
- [ ] AC-013: All entered data is saved to the Submission record.

---

## Out of Scope

- Editing an existing Submission record (covered separately).
- Submission approval workflow post-creation.
- Role-based visibility of sections or fields on the creation page.

---

## Open Questions

| # | Question | Raised By | Status |
|---|---|---|---|
| 1 | Should Product(s) be single-select or multi-select? (noted as "based on business requirements") | QA | Open |
| 2 | What is the post-creation redirect destination? | QA | Open |
| 3 | Are there file count limits (max number of documents per submission)? | QA | Open |
| 4 | Is Broker Contact a free-text field or a Salesforce lookup? | QA | Open |
