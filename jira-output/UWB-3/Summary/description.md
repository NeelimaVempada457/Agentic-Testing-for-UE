# Description — UWB-3

**Navigation**:

Homepage/Submissions

**Story:**

| **As a** | Underwriter or BD User |
| --- | --- |
| **I want to** | view all submissions in a paginated table with key details per row |
| **So that** | I can view, sort, and navigate submissions efficiently without opening each record |

**Fields & Behavior**

“**+ New Submission**”: button to create new submission. Uses the same universal new submission creation page.

| **Field** | **Section** | **Type** | **Behavior** | **Validation** |
| --- | --- | --- | --- | --- |
| Member/Institution | Table | Hyperlink + Sub ID | Account name as hyperlink; shows SUB-ID, state, brokerage below | — |
| Type | Table | Badge | Displays submission type (e.g., New Business, Cross-sell, Renewal) | — |
| Products | Table | Tag Pills | Selected products codes shown as pill badges (EPL, ELL, GL, Cyber, ML, etc.) | — |
| Stage | Table | Colored Badge | ~~Grey = New, Amber = In Review, Green = Bound, etc. (Color Coding TBD)~~ This should show the stage in the same colors as the stage from [https://unitededucators.atlassian.net/browse/UWB-1 | https://unitededucators.atlassian.net/browse/UWB-1 | smart-link] | — |
| Premium | Table | Currency -+- ~~Enrolled~~ | Shows premium amount ~~and enrolled count (Enrolled Logic TBD)~~ | — |
| Underwriter | Table | ~~Avatar +~~ Name | ~~Shows initials avatar +~~ name; 'Unassigned' with warning icon if empty | — |
| Appetite | Table | Percentage ~~Progress Bar + %~~ | Displays appetite score as a percentage ~~with visual bar (logic TBD)~~ | A Seperate Story written for the same [UWB-13 | https://unitededucators.atlassian.net/browse/UWB-13] |
| ~~Age~~ | ~~Table~~ | ~~Elapsed Time~~ | ~~Time since creation (e.g., ‘3d’, '1hr'~~ | ~~If age is less than a day show in hrs else days.~~ |
| Need By | Table | Date | Target date for completion | — |
| Effective | Table | Date | Policy effective date | — |

**Key Rules**

* Default sort is by most recently ~~active or~~ created

* Columns with ↑↓ arrows are sortable (**-Age-***, Need By and Effective)* clicking toggles ascending/descending

* Pagination footer shows: Showing X–Y of N submissions · Page Z of M

* Previous/Next and numbered page controls are available

* Clicking a row or account name navigates to the Submission Detail page

**Acceptance Criteria**

* Table displays all 10 columns: Member/Institution, Type, Products, Stage, Premium, Underwriter, Appetite, Age, Need By, Effective

* Each row shows account name as a hyperlink, SUB-ID, state abbreviation, and brokerage

* Stage badges are color-coded consistently across the list

* Unassigned submissions show a warning icon in the Underwriter column

* Pagination controls are visible and functional

* Clicking a row navigates to the Submission Detail page; URL updates to /submissions/{SUB-ID}

**Dependencies:**  Live submission data from Workbench database