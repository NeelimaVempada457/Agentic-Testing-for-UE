# Regression Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Generated: 2026-05-21

---

## TC-UWB3-REG-001: Table data reloads after navigating away and back
| Field | Value |
|---|---|
| **ID** | TC-UWB3-REG-001 |
| **Priority** | P0 |
| **Type** | Regression |

**Steps:**
1. Navigate to `/submissions`
2. Navigate to a submission detail page (click a row)
3. Use browser back button to return to `/submissions`

**Expected Result:** Table renders correct data; pagination resets to page 1 or returns to the previously viewed page; no blank rows

---

## TC-UWB3-REG-002: Sort state resets between sessions
| Field | Value |
|---|---|
| **ID** | TC-UWB3-REG-002 |
| **Priority** | P2 |
| **Type** | Regression |

**Steps:**
1. Sort by "Need By" descending
2. Close browser tab; reopen `/submissions` in a new tab

**Expected Result:** Table loads with default sort order (most recently created); no persisted sort from previous session unless session storage is intentionally used

---

## TC-UWB3-REG-003: After creating a new submission, it appears in the table
| Field | Value |
|---|---|
| **ID** | TC-UWB3-REG-003 |
| **Priority** | P0 |
| **Type** | Regression |

**Steps:**
1. Note total submission count on `/submissions`
2. Create a new submission
3. Return to `/submissions`

**Expected Result:** New submission appears in the table (on page 1 if sorted by most recently created); total count increases by 1 in pagination footer

---

## TC-UWB3-REG-004: Pagination remains functional after search and clear
| Field | Value |
|---|---|
| **ID** | TC-UWB3-REG-004 |
| **Priority** | P1 |
| **Type** | Regression |

**Steps:**
1. Type a partial name in search bar
2. Clear the search bar
3. Check pagination controls

**Expected Result:** Pagination returns to original page count and controls after clearing search; no stale filter state

---

## TC-UWB3-REG-005: Stage badges still render after sorting
| Field | Value |
|---|---|
| **ID** | TC-UWB3-REG-005 |
| **Priority** | P1 |
| **Type** | Regression |

**Steps:**
1. Sort by "Effective" column
2. Inspect Stage badges in the reordered rows

**Expected Result:** Stage badges retain correct colour and text after sort re-renders; no blank badges

---

## TC-UWB3-REG-006: Table column order is unchanged after tab switch
| Field | Value |
|---|---|
| **ID** | TC-UWB3-REG-006 |
| **Priority** | P1 |
| **Type** | Regression |

**Steps:**
1. Note column order on "My Queue" tab
2. Switch to "All" tab
3. Compare column order

**Expected Result:** Column order is identical across tabs (Member/Institution, Type, Products, Stage, Underwriter, Appetite, Premium, Need By, Effective)

---
