# Functional Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Generated: 2026-05-21

---

## TC-UWB2-FUNC-001: Summary bar Open Submissions count is correct
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-001 |
| **Priority** | P0 |
| **Type** | Functional |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`; known count of open submissions in database

**Steps:**
1. Read the "Open Submissions" card value in the summary bar
2. Compare to total count of non-closed submissions in the database

**Expected Result:** Card value matches the live count of open (non-closed) submissions

---

## TC-UWB2-FUNC-002: Summary bar metrics update in real time
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-002 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`; a second user can create a new submission

**Steps:**
1. Note current "Open Submissions" count
2. Create a new submission in another session
3. Refresh the submissions page
4. Check the "Open Submissions" count

**Expected Result:** Count reflects the newly added submission

---

## TC-UWB2-FUNC-003: Clicking a clickable stat card filters the table
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-003 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Note current table row count
2. Click the "Awaiting Info" stat card in the summary bar
3. Observe table row count and content

**Expected Result:** Table filters to show only submissions with "Awaiting Info" status; card shows pressed state; row count decreases accordingly

---

## TC-UWB2-FUNC-004: Export button triggers download
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-004 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-04 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Click the "Export" button
2. Monitor browser download behaviour

**Expected Result:** A file download is triggered; file contains submission data from the current view/filter context

---

## TC-UWB2-FUNC-005: "New This Week" stat reflects current week submissions
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-005 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`; known count of submissions created this calendar week

**Steps:**
1. Read the "New This Week" card value
2. Compare to count of submissions with created_date >= start of current week

**Expected Result:** Card value matches current-week submission count

---

## TC-UWB2-FUNC-006: "Ready for Review" count matches complete submissions
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-006 |
| **Priority** | P1 |
| **Type** | Functional |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Click the "Ready for Review" stat card
2. Count rows in the filtered table

**Expected Result:** Filtered row count matches the number shown on the "Ready for Review" card

---

## TC-UWB2-FUNC-007: Non-interactive stats do not filter table
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-007 |
| **Priority** | P2 |
| **Type** | Functional |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Click the "Avg. Time in Queue" stat card (disabled state)
2. Observe table and card state

**Expected Result:** Table does not filter; card does not show pressed state; disabled cards are non-interactive

---

## TC-UWB2-FUNC-008: Submissions page accessible to Underwriter role
| Field | Value |
|---|---|
| **ID** | TC-UWB2-FUNC-008 |
| **Priority** | P0 |
| **Type** | Functional |
| **AC** | AC-01 |

**Preconditions:** User has Underwriter role

**Steps:**
1. Log in as Underwriter
2. Click Submissions in sidebar navigation

**Expected Result:** Submissions page loads fully; all summary bar cards visible; no access-denied error

---
