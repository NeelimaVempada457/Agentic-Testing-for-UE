# Complete Ticket Context: UWB-1

> **Generated:** 2026-05-19T13:56:47.616Z
> **Jira URL:** https://unitededucators.atlassian.net/browse/UWB-1

---

## Summary

**NB-01: Create New Submission for New Business and Cross Sell**

| Field | Value |
|---|---|
| Status | IN BA |
| Priority | Medium |
| Type | Story |
| Assignee | Naresh Kotha |
| Reporter | Zain Ibrahim |
| Story Points | N/A |
| Labels | None |
| Components | None |
| Created | 14/04/2026, 15:46:47 |
| Updated | 19/05/2026, 09:56:52 |

---

## Description

**Navigation**:

Submissions/**New Submission**

**Story:**
As an Underwriting or BD User
I want to create a new submission
So that I can initiate underwriting for a cross-sell or new business opportunity

**Fields & Behavior:**

| **Field** | **Section** | **Type** | **Behavior** | **Validation** |
| --- | --- | --- | --- | --- |
| Submission Type | Submission Type | Radio Button (Card Type) | New Business / Cross-sell | Mandatory |
| Account Name | Account | Searchable Dropdown | Pull from Salesforce | Mandatory |
| Need By Date | Policy | Date Picker | Selectable | Mandatory, Default to 5 days before Effective date if effective date is selected first and Need By Date field is empty |
| Effective Date | Policy | Date Picker | Selectable | Mandatory, Effective Date must not exceed Expiration Date |
| Expiration Date | Policy | Date Picker | Selectable | Mandatory, Effective Date must not exceed Expiration Date Default to Effective Date + 1 year. Example, 1/1/2026 to 1/1/2027 |
| Product(s) | Policy | Multi-select Dropdown | Multiple products allowed | Mandatory, Selected product to show as multiple cards with one click remove option. The drop down will show the product in the following formal: Product Name (Product Code) - Line of Business Code. For example, Educators Legal Liability (ELL) - ML. Product list will be listed at the bottom of the ticket. |
| Current Stage | Submission Stage | Dropdown | Default = "Incomplete Submission" Other LOVs to be fetched from a Master Data | # Stage defaults to “Incomplete Submission” # User can modify stage before submission creation Stages list will be listed at the bottom of the ticket. |
| Brokerage | Brokerage | Searchable Dropdown | Pull from Salesforce | Read-only |
| Broker Contact | Brokerage | Searchable Dropdown | Pull from Salesforce | Read-only |
| Broker Email | Brokerage | Email | Pull from Salesforce | Read-only |
| Broker Phone | Brokerage | Phone | Pull from Salesforce | Read-only |
| Underwriter | Underwriting Team | Searchable Dropdown | Pull from Salesforce | Read-only |
| Underwriting Specialist | Underwriting Team | Searchable Dropdown | Pull from Salesforce | Read-only |
| Internal Notes | Notes | Text Area | Free text | Optional, but should include a spell checker |
| Add Document | Submission Documents | Document Uploader | File Uploader | Atleast one document is mandatory Max file size: 25 MB (TBD) Allowed extensions: .pdf, .doc, .docx, .xlsx, .jpg, .png (TBD) Max files: No Limits (TBD) |
| Create Submission |  | Button | Creates a Submission | Display Field level validation errors wherever applicable. Generates an auto-incrementing submission id value on submission creation. |
| Cancel |  | Button | Cancel the Action | Display a warning message of data loss upon canceling the action. The display message should be: Are you sure you want to cancel this submission? All entered data will be lost. Select Yes to continue or No to return to the submission. _Cancel button shows warning only if any field has been modified. If all fields are default/empty, cancel without warning._ |

**Submission Summary - Summary Preview Section to display the following list of fields:**

# TYPE
# ACCOUNT
# PRODUCTS (Summary displays selected products as comma-separated list)
# NEED BY
# EFFECTIVE
# BROKERAGE
# BROKER
# STAGE
# ~~DOCS I think this may be too much in the small review section~~

**Key Rules**

* The account field will accept an account from Salesforce, regardless of it is an institution of group
* Submission ID generated after creation
* Cannot proceed without mandatory fields
* Products allow multi-selection
* Validate Need by Date is before effective date. If effective date is not empty and need by date is empty, default need by date to effective date - 5 days.
* Expiration date defaults to effective date + 1 year
* Internal notes field should include a spell checker

---

**Submission Stage LOVs:** (Can be handled as a Master)

| **Stage Category** | **Stage Name** |
| --- | --- |
| Intake & Triage | Incomplete Submission |
| Intake & Triage | Complete Submission |
| Intake & Triage | Declined to Quote |
| Underwriting | Information Gathering |
| Underwriting | Review In Progress |
| Underwriting | Referred |
| Quoting | Quote In Progress |
| Quoting | Quote Sent |
| Quoting | Quote Negotiation |
| Quoting | Revised Quote |
| Decision | Bound |
| Decision | UE Non-Renewed |
| Decision | Member Declined |
| Decision | Member No Response |
| Post-Bind | Pending Issuance |
| Post-Bind | Issued |
| Post-Bind | Cancelled |
| Post-Bind | Endorsed |

**Products List:**

Primary General Liability (CGL) - GL
Buffer Excess Liability (BLX) - GL
General Liability Excess (GLX) - GL
Public School Liability (PSL) - GL

Educators Legal Liability (ELL) - ML
Excess Educators Legal Liability (ELX) - ML
Fiduciary Liability (FDL) - ML
Excess Fiduciary Liability (FDX) - ML
School Board Legal (SBL) - ML

Internships and Professional Services Liability (IPL) - PL

Assumed Public School (RPS) - AR
Assumed Higher Education (RPH) - AR
Excess Following Form (XFF) - EL
Excess Liability Following Form - Shared Aggregate Limit of Liability (XPG) - EL

## Acceptance Criteria

* All mandatory fields must be completed before submission creation
* Account supports search and selection from Salesforce
* Account field supports search from Salesforce
* User must select an account to proceed
* System shows message when no results are found
* Product and Underwriting Team allow multiple selections
* Date fields must be valid (Effective Date ≤ Expiration Date)
* Stage defaults to “Incomplete Submission” and is editable
* Submission is created only after validations pass with a unique Submission ID
* Brokerage, Broker, and Underwriting Team auto-populate on account selection
* Auto-populated fields are non-editable
* Changes are stored only in Workbench
* Each new submission fetches fresh Salesforce data
* Stage defaults to “Incomplete Submission”
* User can modify stage before submission creation
* Notes field is optional
* Notes do not block submission creation
* Summary displays key submission details
* User can review details before final submission



**Dependencies:** Salesforce API access for Account/Contact search

---

## Acceptance Criteria

* All mandatory fields must be completed before submission creation
* Account supports search and selection from Salesforce
* Account field supports search from Salesforce
* User must select an account to proceed
* System shows message when no results are found
* Product and Underwriting Team allow multiple selections
* Date fields must be valid (Effective Date ≤ Expiration Date)
* Stage defaults to “Incomplete Submission” and is editable
* Submission is created only after validations pass with a unique Submission ID
* Brokerage, Broker, and Underwriting Team auto-populate on account selection
* Auto-populated fields are non-editable
* Changes are stored only in Workbench
* Each new submission fetches fresh Salesforce data
* Stage defaults to “Incomplete Submission”
* User can modify stage before submission creation
* Notes field is optional
* Notes do not block submission creation
* Summary displays key submission details
* User can review details before final submission

---

## Comments (5)

### 1. Mythili T — 06/05/2026, 06:37:51

@Milica Kosic @Sahitya Muppireddy  @Ziad Elharaoui- Could you please review and provide your signoff?
CC: @annapurna.rudrabhatla @Rahul Dube @Abdul Adnan @Akhelaaditya

### 2. Mythili T — 06/05/2026, 13:40:19

@Ziad Elharaoui - Can they modify the date to something else?
e.g. 1/1/2026 is the effective date, Expiration date we will be defaulting to 1/1/2027, can they modify the expiration date to 6/6/2025 and submit?

!image-20260506-133759.png|width=765,alt="image-20260506-133759.png"!

### 3. Ziad Elharaoui — 06/05/2026, 15:42:28

@Mythili T  yes, they can modify the expiration date.

Also, can you please convert this ticket from task to story

### 4. Ziad Elharaoui — 06/05/2026, 18:11:48

@Mythili T  this is for both new business and cross-sell

### 5. Mythili T — 06/05/2026, 18:23:36

@Ziad Elharaoui - Converted as Story

---

## Linked Issues

_No linked issues_

---

## Subtasks (9)

- 🔲 `UWB-45` Frontend Creation — *In Progress*
- 🔲 `UWB-46` Submission API Backend Implementation — *To Do*
- 🔲 `UWB-47` Database Creation — *To Do*
- 🔲 `UWB-48` Salesforce API Integration — *To Do*
- ✅ `UWB-49` Pluggable Components Implementation - Blob Storage — *Done*
- ✅ `UWB-50` Pluggable Components Implementation - Azure Event Bus — *Done*
- 🔲 `UWB-51` Build Core Infrastructure and Communication Pluggable Components — *In Progress*
- 🔲 `UWB-52` Build Business Logic & Integration Related Pluggable Components — *In Progress*
- 🔲 `UWB-53` Build AI & Python Related Pluggable Components — *IN CODE REVIEW*

---

## Attachments (1)

- ✅ **image-20260506-133759.png** (image/png, 22.2 KB) uploaded by Mythili T on 06/05/2026, 13:40:18

---

## Important Observations

- ℹ️ **No labels** set
- ℹ️ **No components** assigned
- 📋 **7 open subtask(s)** remaining
- 📸 **1 screenshot(s)** attached

---

*Auto-generated by fetch-jira-details skill · 2026-05-19T13:56:47.616Z*