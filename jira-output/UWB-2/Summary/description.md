# Description — UWB-2

**Navigation**:

Homepage/Submissions

**Story:**

| **As a** | Underwriter / BD User |
| --- | --- |
| **I want to** | view the Submissions list page with pipeline summary statistics |
| **So that** | I can quickly assess the overall health and volume of my underwriting pipeline at a glance |

**Fields & Behavior**

| **Field** | **Section** | **Type** | **Behavior** | **Validation** |
| --- | --- | --- | --- | --- |
| Total Submissions | Summary Bar | Read-only Count | Displays total count of all submissions | — |
| In Review | Summary Bar | Read-only Count | Displays count of submissions in Review stage | — |
| Quoted | Summary Bar | Read-only Count | Displays count of quoted submissions | — |
| Bound (YTD) | Summary Bar | Read-only Count | Displays year-to-date bound count | — |
| Bound Premium (YTD) | Summary Bar | Read-only Currency | Displays YTD bound premium in USD; highlighted in gold | — |
| Export | Header | Button | Downloads the current filtered submission list | — |
| + New Submission | Header | Button | Navigates to New Submission form | — |



**Key Rules**

* Metrics are computed in real time from submission records
* Bound Premium (YTD) is displayed in gold/amber to distinguish monetary value
* All metric counts reflect the active tab and filter context

**Acceptance Criteria**

* Page displays header: 'Submissions' with subtitle 'Education insurance underwriting pipeline (TBD) · N total submissions'
* Summary bar shows Total Submissions, In Review, Quoted, Bound (YTD), and Bound Premium (YTD)
* Bound Premium is formatted as currency (e.g., $552,200)
* Export and + New Submission buttons are visible and accessible from the header
* Page loads with the 'All' tab active by default

**Dependencies:**  Live submission data from Workbench database