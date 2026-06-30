# Complete Ticket Context: BOSLFS-1626

> **Generated:** 2026-05-15T10:40:13.350Z
> **Jira URL:** https://theksquaregroupglobal.atlassian.net/browse/BOSLFS-1626

---

## Summary

**After SOW: Credit Administrator Role**

| Field | Value |
|---|---|
| Status | UAT Deployed |
| Priority | Medium |
| Type | Story |
| Assignee | Marcia George |
| Reporter | jean.lopez |
| Story Points | N/A |
| Labels | AprilRelease |
| Components | None |
| Created | 24/02/2026, 19:44:11 |
| Updated | 30/04/2026, 20:01:03 |

---

## Description

*As a* System Administrator,

*I want to* configure a specific " Credit Administrator" Role and Permission Set,

*So that* external users can audit Disbursed loan applications without accessing sensitive "New" or "Proposed" data.

h3. *Business Context*

Currently, Credit Risk require a view that mimics the Boarding perspective but with restricted scope. They must be nested within the *Credit and Risk Department* hierarchy to ensure proper data visibility and reporting alignment.

----

h3. *Technical Requirements*

# *Role Hierarchy:* Create a new Role: {{ Credit Administrator}}. Parent Role must be {{Credit and Risk Department}}.
# *Permission Set:* Create {{Credit_Administrator_Read_Only}}.
#* *Clone Source:* Use {{Boarding}} as a base template  and update the fields to be (Read-Only).
#* *Object Permissions:* Read-only access to Loan Applications and related objects.
#** Loan Package
#** Loan 
#** Party Involveld in Trasanction
#** Party Liabilities
#** Party Monthly Commitments
#** Party Monthly Income
#** Party Additional Income
#** Other Liabilities
#** Pay off Assigments
#** Cash Configurations 
#** Collateral Loan Application
#** Collaterals
#** Disbursement Conditions
#** Disbursement Transactions
#** Special Condisitions
#** Recommendations
#** Approval
#** Fee
#** Loan Terms and Conditions
#** Commitment Letter Statements
# *Data Filtering:*  Auditors must *only* see Loan Applications where {{Status = Completed}}. 
#* Exclude all records where {{Status}} is  {{In progress}}, {{Declined, Amenmdment, Cancelled}}.
#* _Note: This may require a Sharing Rule or a Scoping Rule depending on your Org's OWD (Org-Wide Defaults)._

---

## Acceptance Criteria

_No explicit acceptance criteria found_

---

## Comments (2)

### 1. Veera Sai Prakash Devu — 12/03/2026, 18:12:39

Hi @Neelima Vempada , Please use ‘Credit Administrator Test’ user to validate the requirement in Staging.

### 2. Shivaji Gundabattina — 13/03/2026, 11:22:17

Hi @jean.lopez / @Veera Sai Prakash Devu , Now I see '*Credit Administrator Test*' have right permissions to all objects. Please review the below test cases.

*Test Cases:*

# As a System Administrator, I want to see {{Credit Administrator}} role under {{Credit and Risk Department}} parent role. {color:#36b37e}*-PASS*{color}
!image-20260313-152815.png|width=501,alt="image-20260313-152815.png"!
# As a System Administrator, I want to see {{Credit_Administrator_Read_Only}} permission set assigned to *Credit Administrator Test*. {color:#36b37e}*-PASS*{color}
!image-20260313-153313.png|width=501,alt="image-20260313-153313.png"!
# As a *Credit Administrator Test*, I want to see only the Loans that have Status as *Completed*. {color:#36b37e}*-PASS*{color}
!image-20260313-153529.png|width=501,alt="image-20260313-153529.png"!
As a System Admin when I put a filter with Status = ‘Completed’, 52 items got displayed
!image-20260316-082827.png|width=501,alt="image-20260316-082827.png"!
52 records were displayed to *Credit Administrator Test* without any filter applied
!image-20260316-083012.png|width=501,alt="image-20260316-083012.png"!
# As a *Credit Administrator Test*, I want to have *read-only* access to the below objects. {color:#36b37e}*-PASS*{color}
*Loan Package* - Edit Pencil Icon is not displayed for the fields of Loan Package
!image-20260316-083127.png|width=501,alt="image-20260316-083127.png"!
!image-20260316-083225.png|width=501,alt="image-20260316-083225.png"!
!image-20260316-083309.png|width=501,alt="image-20260316-083309.png"!
*Loan* - Edit Pencil Icon is not displayed for the fields of Loan
!image-20260316-083407.png|width=501,alt="image-20260316-083407.png"!
!image-20260316-083616.png|width=501,alt="image-20260316-083616.png"!
*Party Involved in Transaction* - Edit Pencil Icon is not displayed for the fields of Party Involved in Transaction.
!image-20260316-083905.png|width=501,alt="image-20260316-083905.png"!
*Party Liabilities* - Edit Pencil Icon is not displayed for the fields of Party Liabilities.
!image-20260316-083943.png|width=501,alt="image-20260316-083943.png"!
*Party Monthly Commitments* - Edit Pencil Icon is not displayed for the fields of Party Monthly Commitment
!image-20260316-084035.png|width=501,alt="image-20260316-084035.png"!
*Party Monthly Income* - Edit Pencil Icon is not displayed for the fields of Party Monthly Income
!image-20260316-084112.png|width=501,alt="image-20260316-084112.png"!
*Party Additional Income* - Edit Pencil Icon is not displayed for the fields of Party Additional Income
!image-20260316-084148.png|width=501,alt="image-20260316-084148.png"!
*Other Liabilities* - Edit Pencil Icon is not displayed for the fields of Other Liabilities
!image-20260316-084228.png|width=501,alt="image-20260316-084228.png"!
*Pay off Assignments* - Edit Pencil Icon is not displayed for the fields of Pay off Assignments.
!image-20260316-084832.png|width=501,alt="image-20260316-084832.png"!
*Cash Configurations* - Edit Pencil Icon is not displayed for the fields of Cash Configurations
!image-20260316-084928.png|width=501,alt="image-20260316-084928.png"!
*Collateral Loan Application* - Edit Pencil Icon is not displayed for the fields of Collateral Loan Application.
!image-20260316-085020.png|width=501,alt="image-20260316-085020.png"!
*Collaterals* - Edit Pencil Icon is not displayed for the fields of Collaterals
!image-20260316-085213.png|width=501,alt="image-20260316-085213.png"!
!image-20260316-085301.png|width=501,alt="image-20260316-085301.png"!
*Disbursement Conditions* - Edit Pencil Icon is not displayed for the fields of Disbursement Conditions
!image-20260316-085401.png|width=501,alt="image-20260316-085401.png"!
*Disbursement Transactions* - Edit Pencil Icon is not displayed for the fields of Disbursement Transactions.
!image-20260316-085645.png|width=501,alt="image-20260316-085645.png"!
*Special Conditions* - Edit Pencil Icon is not displayed for the fields of Special Conditions
!image-20260316-085936.png|width=501,alt="image-20260316-085936.png"!
*Recommendations* - Edit Pencil Icon is not displayed for the fields of Recommendations.
!image-20260316-090035.png|width=501,alt="image-20260316-090035.png"!
*Approval* - Edit Pencil Icon is not displayed for the fields of Approval Request
!image-20260316-090119.png|width=501,alt="image-20260316-090119.png"!
*Fee* - Edit Pencil Icon is not displayed for the fields of Fees.
!image-20260316-090231.png|width=501,alt="image-20260316-090231.png"!
*Loan Terms and Conditions* - Edit Pencil Icon is not displayed for the fields of Loan Terms and Conditions
!image-20260316-090613.png|width=501,alt="image-20260316-090613.png"!
*Commitment Letter Statements* - Edit Pencil Icon is not displayed for the fields of Commitment Letter Statements
!image-20260316-091153.png|width=501,alt="image-20260316-091153.png"!

---

## Linked Issues

_No linked issues_

---

## Subtasks (0)

_No subtasks_

---

## Attachments (0)

_No attachments_

---

## Important Observations

- ℹ️ **No components** assigned
- ⏰ **Stale** — last comment was 62 days ago

---

*Auto-generated by fetch-jira-details skill · 2026-05-15T10:40:13.350Z*