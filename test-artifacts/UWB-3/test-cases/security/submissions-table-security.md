# Security Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Generated: 2026-05-21

---

## TC-UWB3-SEC-001: Unauthenticated direct URL to submission detail is blocked
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SEC-001 |
| **Priority** | P0 |
| **Type** | Security |

**Steps:**
1. Clear session
2. Navigate to `https://united-educators-application.vercel.app/submission/SUB-7842`

**Expected Result:** Redirected to login; no submission detail data rendered; 401/403 returned

---

## TC-UWB3-SEC-002: XSS in search bar is sanitised
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SEC-002 |
| **Priority** | P0 |
| **Type** | Security |

**Steps:**
1. Navigate to `/submissions`
2. Type `<script>alert('xss')</script>` in the search bar
3. Observe browser behaviour

**Expected Result:** No alert dialog appears; input is treated as literal text; search returns 0 results or unmatched state; no script is executed

---

## TC-UWB3-SEC-003: SQL injection attempt in search
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SEC-003 |
| **Priority** | P1 |
| **Type** | Security |

**Steps:**
1. Navigate to `/submissions`
2. Type `' OR '1'='1` in the search bar

**Expected Result:** Table does not return all records; query is parameterised; application shows 0 results or normal search behaviour; no server error

---

## TC-UWB3-SEC-004: Submission data not accessible via direct API call without auth
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SEC-004 |
| **Priority** | P0 |
| **Type** | Security |

**Steps:**
1. Open DevTools, note the submissions API endpoint URL
2. Log out
3. Make the API call directly (without session credentials)

**Expected Result:** API returns 401/403; submission data is not returned

---

## TC-UWB3-SEC-005: Row click URL cannot be manipulated to access other users' data
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SEC-005 |
| **Priority** | P1 |
| **Type** | Security |

**Steps:**
1. Log in as User A
2. Navigate to `/submission/SUB-XXXX` where SUB-XXXX belongs to a different user/team
3. Observe whether the page loads or access is denied

**Expected Result:** If RBAC restricts access by ownership, page returns 403 or "Not Found"; User A cannot view submissions they don't own

---

## TC-UWB3-SEC-006: Sort parameter is not injectable via URL manipulation
| Field | Value |
|---|---|
| **ID** | TC-UWB3-SEC-006 |
| **Priority** | P1 |
| **Type** | Security |

**Steps:**
1. Note the URL when sorting by a column (if sort is in query params)
2. Manually edit the sort param to an unexpected value: `?sort='; DROP TABLE submissions--`

**Expected Result:** Application ignores invalid sort param or applies default sort; no database error; no 500 response

---
