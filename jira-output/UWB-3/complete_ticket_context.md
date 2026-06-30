# Complete Ticket Context: UWB-3

> **Generated:** 2026-05-21T09:12:24.504Z
> **Jira URL:** https://unitededucators.atlassian.net/browse/UWB-3

---

## Summary

**SUB-02: View Submissions in Tabular List**

| Field | Value |
|---|---|
| Status | IN BA |
| Priority | Medium |
| Type | Story |
| Assignee | Naresh Kotha |
| Reporter | Mythili T |
| Story Points | N/A |
| Labels | None |
| Components | None |
| Created | 27/04/2026, 09:08:22 |
| Updated | 20/05/2026, 21:15:25 |

---

## Description

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

---

## Acceptance Criteria

**

* Table displays all 10 columns: Member/Institution, Type, Products, Stage, Premium, Underwriter, Appetite, Age, Need By, Effective

* Each row shows account name as a hyperlink, SUB-ID, state abbreviation, and brokerage

* Stage badges are color-coded consistently across the list

* Unassigned submissions show a warning icon in the Underwriter column

* Pagination controls are visible and functional

* Clicking a row navigates to the Submission Detail page; URL updates to /submissions/{SUB-ID}

---

## Comments (3)

### 1. Mythili T — 06/05/2026, 11:52:55

@Milica Kosic @Sahitya Muppireddy  @Ziad Elharaoui- Could you please review and provide your signoff?
CC: @annapurna.rudrabhatla @Rahul Dube @Abdul Adnan @Akhelaaditya

### 2. Ziad Elharaoui — 06/05/2026, 18:32:23

@Mythili T  We reviewed this ticket. We made some changes. We also did a strikethrough some words. Here is a summary:

Added New Submission button to create the new submission below the fields and behavior
Field - Changed to Institution from Member/Institution
Type- New Business, Renewal- Added these
Products- 3rd column Selected products codes
Stage- 3rd column change-
Premium- we do not need enrolled- currency is default USD

Added Filters section

### 3. Mythili T — 20/05/2026, 21:15:25

A new [Story ](Story )(https://unitededucators.atlassian.net/browse/UWB-13)created for Appetite Scoring

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

- ℹ️ **No labels** set
- ℹ️ **No components** assigned

---

*Auto-generated by fetch-jira-details skill · 2026-05-21T09:12:24.504Z*