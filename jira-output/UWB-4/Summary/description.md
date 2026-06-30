# Description — UWB-4

**Navigation**:

Homepage/Submissions

**Story:**

| **As a** | Underwriter / BD User |
| --- | --- |
| **I want to** | switch between 'My Queue', 'My Team', and 'All' tab views on the Submissions list |
| **So that** | I can focus on submissions relevant to me, my team, or view the entire pipeline |

**Fields & Behavior**



| **Field** | **Section** | **Type** | **Behavior** | **Validation** |
| --- | --- | --- | --- | --- |
| My Queue | Tab Bar | Tab | Shows submissions assigned to the logged-in user only | — |
| My Team | Tab Bar | Tab | ~~Shows submissions assigned to any member of the user's underwriting team~~ Shows only for managers. It shows submissions for all direct reports | -(TBD) - need confirmation - whether this tab is intended only for underwriting managers or should be accessible to all members within the user’s underwriting team- Only visible to managers |
| All | Tab Bar | Tab | Shows all submissions regardless of assignment; active by default | — |
| Result Count | Tab Bar | Read-only Label | Updates to reflect the number of results for the active tab | — |



**Key Rules**

* Active tab is visually distinguished with an underline or highlight

* Tab selection persists during the session unless the user navigates away

* Result count updates immediately on tab switch

**Acceptance Criteria**

* Three tabs are displayed: My Queue, My Team, All

* My Queue shows only submissions assigned to the logged-in user

* My Team shows submissions assigned to any team member (TBD)

* All shows every submission in the system

* Active tab is visually highlighted

* Result count (e.g., '18 results') updates to reflect the active tab



**Dependencies:**  User identity and team membership from authentication/HR system or a centralized User Master.