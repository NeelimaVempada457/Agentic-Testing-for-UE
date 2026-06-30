# Regression Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Generated: 2026-05-21

---

## TC-UWB2-REG-001: Submissions page loads after navigating away and back
| Field | Value |
|---|---|
| **ID** | TC-UWB2-REG-001 |
| **Priority** | P0 |
| **Type** | Regression |

**Steps:**
1. Navigate to `/submissions`; note summary bar values
2. Navigate to Dashboard
3. Navigate back to `/submissions`

**Expected Result:** Submissions page loads correctly; summary bar values are current; no blank/stale state

---

## TC-UWB2-REG-002: New Submission button still works after applying a summary bar filter
| Field | Value |
|---|---|
| **ID** | TC-UWB2-REG-002 |
| **Priority** | P1 |
| **Type** | Regression |

**Steps:**
1. Click "Ready for Review" filter card
2. Click "New Submission" button

**Expected Result:** Navigation to new submission form works regardless of active filter state

---

## TC-UWB2-REG-003: Export works after tab switch
| Field | Value |
|---|---|
| **ID** | TC-UWB2-REG-003 |
| **Priority** | P1 |
| **Type** | Regression |

**Steps:**
1. Switch to "My Team" tab
2. Click Export button

**Expected Result:** Export downloads data for the "My Team" tab context — not stale data from a previous tab

---

## TC-UWB2-REG-004: Summary bar still correct after creating a new submission
| Field | Value |
|---|---|
| **ID** | TC-UWB2-REG-004 |
| **Priority** | P0 |
| **Type** | Regression |

**Steps:**
1. Note "Open Submissions" count
2. Create a new submission (via New Submission form)
3. Return to `/submissions`

**Expected Result:** "Open Submissions" count increases by 1; other stats are consistent

---

## TC-UWB2-REG-005: Page header remains visible while scrolling
| Field | Value |
|---|---|
| **ID** | TC-UWB2-REG-005 |
| **Priority** | P2 |
| **Type** | Regression |

**Steps:**
1. Navigate to `/submissions`
2. Scroll down past the summary bar to the table

**Expected Result:** Page header (Submissions heading, Export, New Submission) remains accessible — either sticky or the page scrolls as a unit without layout break

---
