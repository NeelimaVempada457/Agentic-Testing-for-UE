# Smoke Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Generated: 2026-05-21

---

## TC-UWB2-SMOKE-001: Submissions page loads successfully
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SMOKE-001 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-01 |

**Preconditions:** User is authenticated as Underwriter (Admin / KSG@2026UE)

**Steps:**
1. Navigate to `https://united-educators-application.vercel.app/`
2. Click "Submissions" in the sidebar navigation

**Expected Result:** Page loads at `/submissions`; H1 heading "Submissions" is visible; no error state shown

---

## TC-UWB2-SMOKE-002: Header subtitle shows total submissions count
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SMOKE-002 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-01 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Read the subtitle text below the "Submissions" heading

**Expected Result:** Subtitle contains "Total Submissions" count (e.g. "Underwriting Pipeline · 18 Total Submissions"); count is a positive integer

---

## TC-UWB2-SMOKE-003: Summary bar renders with stat cards
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SMOKE-003 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-02 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Locate the summary bar below the header
2. Count the visible stat cards

**Expected Result:** At least 4 stat cards are visible; each card shows a label and a numeric or currency value

---

## TC-UWB2-SMOKE-004: Export button is visible
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SMOKE-004 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-04 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Locate the header action area (top-right of page header)
2. Verify "Export" button is present

**Expected Result:** "Export" button is visible and enabled

---

## TC-UWB2-SMOKE-005: New Submission button is visible
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SMOKE-005 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-04 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Locate the header action area
2. Verify "New Submission" button is present

**Expected Result:** "New Submission" button is visible and enabled

---

## TC-UWB2-SMOKE-006: New Submission button navigates to submission form
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SMOKE-006 |
| **Priority** | P0 |
| **Type** | Smoke |
| **AC** | AC-04 |

**Preconditions:** User is on `/submissions`

**Steps:**
1. Click the "New Submission" button

**Expected Result:** User is navigated to the new submission form page; URL changes to `/submissions/new`

---
