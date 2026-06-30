# Negative Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Generated: 2026-05-21

---

## TC-UWB2-NEG-001: Unauthenticated user cannot access submissions page
| Field | Value |
|---|---|
| **ID** | TC-UWB2-NEG-001 |
| **Priority** | P0 |
| **Type** | Negative |

**Steps:**
1. Clear session/cookies
2. Navigate directly to `https://united-educators-application.vercel.app/submissions`

**Expected Result:** User is redirected to login page; submissions page content is not visible

---

## TC-UWB2-NEG-002: Summary bar does not show negative counts
| Field | Value |
|---|---|
| **ID** | TC-UWB2-NEG-002 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Inspect all stat card values

**Expected Result:** No stat card shows a negative number; minimum displayed is "0"

---

## TC-UWB2-NEG-003: Disabled stat cards do not respond to click
| Field | Value |
|---|---|
| **ID** | TC-UWB2-NEG-003 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Click "Avg. Time in Queue" card (disabled)
3. Click "SLA At Risk" card (disabled)

**Expected Result:** No filter applied; no state change; no error thrown; cards remain in non-pressed state

---

## TC-UWB2-NEG-004: Export with no results does not crash
| Field | Value |
|---|---|
| **ID** | TC-UWB2-NEG-004 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Apply a filter that results in 0 matching submissions (e.g. search for non-existent broker)
2. Click the Export button

**Expected Result:** Application handles empty export gracefully — either shows a message ("No data to export") or downloads an empty/header-only file; no crash or 500 error

---

## TC-UWB2-NEG-005: Summary bar stat cards handle zero counts gracefully
| Field | Value |
|---|---|
| **ID** | TC-UWB2-NEG-005 |
| **Priority** | P2 |
| **Type** | Negative |

**Steps:**
1. In a test environment, ensure "Awaiting Info" count is 0
2. Navigate to `/submissions`
3. Inspect the "Awaiting Info" card

**Expected Result:** Card shows "0" — no blank value, no null, no NaN; clicking it filters to empty table with "No submissions found" message

---

## TC-UWB2-NEG-006: Back navigation after New Submission cancellation returns to submissions page
| Field | Value |
|---|---|
| **ID** | TC-UWB2-NEG-006 |
| **Priority** | P2 |
| **Type** | Negative |

**Steps:**
1. Click "New Submission" button
2. On the new submission form, click Cancel
3. Confirm cancellation

**Expected Result:** User is returned to `/submissions`; summary bar and table still display correct data

---
