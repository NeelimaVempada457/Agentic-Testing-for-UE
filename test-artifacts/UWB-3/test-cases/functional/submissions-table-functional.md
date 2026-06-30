# Functional Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Generated: 2026-05-21

---

## TC-UWB3-FUNC-001: Table shows correct total submission count
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-001 |
| **Priority** | P0 |
| **Type** | Functional |
| **AC** | AC-01 |

**Preconditions:** User is on `/submissions`; known total of 18 submissions in the database

**Steps:**
1. Read pagination footer text: "Showing X–Y of N submissions"
2. Compare N to the database total

**Expected Result:** N matches the total submission count in the database

---

## TC-UWB3-FUNC-002: Account name is a clickable link to detail page
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-002 |
| **Priority** | P0 |
| **Type** | Functional |
| **AC** | AC-02, AC-06 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Locate account name text in a row (e.g. "Montgomery County Public Schools")
2. Click the account name

**Expected Result:** Browser navigates to `/submission/{SUB-ID}` for that submission

---

## TC-UWB3-FUNC-003: Premium column sorts ascending on first click
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-003 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-01 (sortable columns rule) |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Click the "Premium" column header
2. Observe row order

**Expected Result:** Rows re-order with lowest premium first (ascending); sort arrow changes to up-arrow

---

## TC-UWB3-FUNC-004: Premium column sorts descending on second click
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-004 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-01 (sortable columns rule) |

**Preconditions:** User is on `/submissions`; Premium column sorted ascending

**Steps:**
1. Click the "Premium" column header a second time
2. Observe row order

**Expected Result:** Rows re-order with highest premium first (descending); sort arrow changes to down-arrow

---

## TC-UWB3-FUNC-005: Need By column is sortable
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-005 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-01 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Click the "Need By" column header
2. Observe sort order

**Expected Result:** Rows sort by Need By date; sort indicator appears on the column header

---

## TC-UWB3-FUNC-006: Effective column is sortable
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-006 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-01 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Click the "Effective" column header
2. Observe sort order

**Expected Result:** Rows sort by effective date; sort indicator appears

---

## TC-UWB3-FUNC-007: Unassigned submissions show "Unassigned" in Underwriter column
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-007 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-04 |

**Preconditions:** User is on `/submissions`; at least one submission with no assigned underwriter

**Steps:**
1. Locate a row where the Underwriter cell shows "?" placeholder
2. Read the text in the Underwriter cell

**Expected Result:** Cell shows "?" initials placeholder and "Unassigned" text

---

## TC-UWB3-FUNC-008: Pagination Next button loads next page
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-008 |
| **Priority** | P0 |
| **Type** | Functional |
| **AC** | AC-05 |

**Preconditions:** User is on `/submissions`; total submissions > 5 (18 observed)

**Steps:**
1. Verify current page shows "Page 1 of 4"
2. Click "Next" button
3. Verify table and footer update

**Expected Result:** Table shows rows 6–10; footer shows "Showing 6 – 10 of 18 submissions · Page 2 of 4"; "Previous" button becomes enabled

---

## TC-UWB3-FUNC-009: Pagination numbered page buttons work
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-009 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-05 |

**Preconditions:** User is on `/submissions` page 1

**Steps:**
1. Click page number "3"
2. Observe table and footer

**Expected Result:** Table shows rows 11–15; footer shows "Showing 11 – 15 of 18 submissions · Page 3 of 4"

---

## TC-UWB3-FUNC-010: Stage badges render with colour coding
| Field | Value |
|---|---|
| **ID** | TC-UWB3-FUNC-010 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-03 |

**Preconditions:** User is on `/submissions`; rows with different stage values visible

**Steps:**
1. Locate rows with different Stage values (New, In Review, Pending Info)
2. Compare badge colours across rows

**Expected Result:** Each stage has a consistent, distinct colour; same stage always displays same colour

---
