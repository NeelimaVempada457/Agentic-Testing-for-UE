# Edge Case Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Generated: 2026-05-21

---

## TC-UWB2-EDGE-001: Summary bar with zero open submissions
| Field | Value |
|---|---|
| **ID** | TC-UWB2-EDGE-001 |
| **Priority** | P1 |
| **Type** | Edge Case |

**Steps:**
1. In a test environment, close/archive all open submissions
2. Navigate to `/submissions`
3. Check summary bar

**Expected Result:** "Open Submissions" card shows "0"; other stats update accordingly; page does not crash

---

## TC-UWB2-EDGE-002: Summary bar with very large submission count
| Field | Value |
|---|---|
| **ID** | TC-UWB2-EDGE-002 |
| **Priority** | P2 |
| **Type** | Edge Case |

**Steps:**
1. In a test environment, create 10,000+ submissions
2. Navigate to `/submissions`
3. Inspect summary bar card rendering

**Expected Result:** Large numbers display without layout overflow (e.g. using "10K" abbreviation or full number without clipping card bounds)

---

## TC-UWB2-EDGE-003: Multiple active filters — only one can be selected at a time
| Field | Value |
|---|---|
| **ID** | TC-UWB2-EDGE-003 |
| **Priority** | P1 |
| **Type** | Edge Case |

**Steps:**
1. Click "Open Submissions" stat card (applies filter)
2. Click "Awaiting Info" stat card

**Expected Result:** "Awaiting Info" filter becomes active; "Open Submissions" filter deactivates; only one card shows pressed state at a time — OR — both filters combine (cumulative); behaviour documented and consistent

---

## TC-UWB2-EDGE-004: Page refresh retains filter state
| Field | Value |
|---|---|
| **ID** | TC-UWB2-EDGE-004 |
| **Priority** | P2 |
| **Type** | Edge Case |

**Steps:**
1. Click "Ready for Review" stat card
2. Refresh the browser

**Expected Result:** Either filter state is preserved (if persisted in URL params) or table resets to default view — behaviour is defined and consistent; no error on refresh

---

## TC-UWB2-EDGE-005: Stat card value changes while user is viewing page
| Field | Value |
|---|---|
| **ID** | TC-UWB2-EDGE-005 |
| **Priority** | P2 |
| **Type** | Edge Case |

**Steps:**
1. Open `/submissions` in browser
2. In another session, create a new submission
3. Wait for polling interval (or trigger refresh)
4. Observe stat card values

**Expected Result:** Updated counts appear without requiring a full page reload (if real-time) or after page refresh; no stale data lock-in

---

## TC-UWB2-EDGE-006: Summary bar renders correctly when BD User role accesses page
| Field | Value |
|---|---|
| **ID** | TC-UWB2-EDGE-006 |
| **Priority** | P1 |
| **Type** | Edge Case |

**Steps:**
1. Log in as a BD User (non-Underwriter role)
2. Navigate to `/submissions`

**Expected Result:** Page and summary bar render correctly for BD User; metrics reflect BD User's portfolio or all submissions per role configuration

---
