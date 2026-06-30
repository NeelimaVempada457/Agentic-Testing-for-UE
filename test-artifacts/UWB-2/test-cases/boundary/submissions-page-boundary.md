# Boundary Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Generated: 2026-05-21

---

## TC-UWB2-BNDRY-001: Summary bar with exactly 1 open submission
| Field | Value |
|---|---|
| **ID** | TC-UWB2-BNDRY-001 |
| **Priority** | P2 |
| **Type** | Boundary |

**Steps:**
1. In a test environment, set up exactly 1 open submission
2. Navigate to `/submissions`

**Expected Result:** "Open Submissions" card shows "1"; singular/plural label handled correctly if applicable

---

## TC-UWB2-BNDRY-002: Total submissions count at boundary — 0
| Field | Value |
|---|---|
| **ID** | TC-UWB2-BNDRY-002 |
| **Priority** | P1 |
| **Type** | Boundary |

**Steps:**
1. In a test environment, archive all submissions
2. Navigate to `/submissions`

**Expected Result:** All stat cards show "0"; subtitle shows "0 Total Submissions"; no crash or infinite loading

---

## TC-UWB2-BNDRY-003: Stat card value at 999 vs 1000
| Field | Value |
|---|---|
| **ID** | TC-UWB2-BNDRY-003 |
| **Priority** | P2 |
| **Type** | Boundary |

**Steps:**
1. Set up exactly 999 submissions matching a stat card filter
2. Navigate to `/submissions`; observe card value
3. Add 1 more; refresh; observe card value

**Expected Result:** At 999, card shows "999"; at 1000, card shows "1000" or "1K" — no display truncation or overflow at this boundary

---

## TC-UWB2-BNDRY-004: "New This Week" resets at week boundary
| Field | Value |
|---|---|
| **ID** | TC-UWB2-BNDRY-004 |
| **Priority** | P2 |
| **Type** | Boundary |

**Steps:**
1. Create a submission at 11:59 PM on Sunday
2. View the "New This Week" card on Monday 12:01 AM

**Expected Result:** The Sunday submission either: (a) falls out of "this week" window and count decreases, or (b) counts in last-week total — consistent with the "vs. last week" comparison text

---
