# Negative Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Generated: 2026-05-21

---

## TC-UWB3-NEG-001: Search with no matching results shows empty state
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-001 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Type a non-existent member name in the search bar (e.g. "ZZZZNONEXISTENT")

**Expected Result:** Table shows 0 rows; empty state message displayed (e.g. "No submissions found"); pagination footer reflects "0 results"

---

## TC-UWB3-NEG-002: Previous button is disabled on page 1
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-002 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Verify page 1 is active
3. Inspect "Previous" button state

**Expected Result:** "Previous" button is disabled; clicking it has no effect; no error thrown

---

## TC-UWB3-NEG-003: Next button is disabled on last page
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-003 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Click through to the last page (page 4)
3. Inspect "Next" button state

**Expected Result:** "Next" button is disabled; clicking it has no effect

---

## TC-UWB3-NEG-004: Non-sortable columns do not respond to sort click
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-004 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Click "Member / Institution" column header
3. Click "Stage" column header
4. Click "Products" column header

**Expected Result:** No sort arrow appears; row order does not change; no error

---

## TC-UWB3-NEG-005: Unauthenticated direct URL access redirects to login
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-005 |
| **Priority** | P0 |
| **Type** | Negative |

**Steps:**
1. Clear session/cookies
2. Navigate directly to `https://united-educators-application.vercel.app/submissions`

**Expected Result:** Redirected to login page; table data is not exposed

---

## TC-UWB3-NEG-006: Direct URL to submission detail with invalid SUB-ID shows error
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-006 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `https://united-educators-application.vercel.app/submission/SUB-0000`

**Expected Result:** 404 or "Not Found" error page shown; no application crash; no sensitive data leaked

---

## TC-UWB3-NEG-007: Search with special characters does not cause errors
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-007 |
| **Priority** | P1 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Type `<script>alert(1)</script>` in the search bar

**Expected Result:** Search treats input as literal text; no XSS execution; table shows 0 results or unmatched state; no script executes

---

## TC-UWB3-NEG-008: Products column overflow does not break layout
| Field | Value |
|---|---|
| **ID** | TC-UWB3-NEG-008 |
| **Priority** | P2 |
| **Type** | Negative |

**Steps:**
1. Navigate to `/submissions`
2. Find a row with "+N" overflow indicator in Products column
3. Inspect table layout

**Expected Result:** Table layout is not broken; row height is consistent; overflow indicator "+N" is shown without truncating other cells

---
