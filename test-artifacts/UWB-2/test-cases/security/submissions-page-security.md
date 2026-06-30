# Security Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Generated: 2026-05-21

---

## TC-UWB2-SEC-001: Unauthenticated access is blocked
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SEC-001 |
| **Priority** | P0 |
| **Type** | Security |

**Steps:**
1. Clear all cookies and session storage
2. Navigate directly to `/submissions`

**Expected Result:** Redirected to login page; 401/403 response or redirect; no submission data rendered

---

## TC-UWB2-SEC-002: Expired session redirects to login
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SEC-002 |
| **Priority** | P0 |
| **Type** | Security |

**Steps:**
1. Log in and navigate to `/submissions`
2. Expire the session token (delete session cookie or wait for timeout)
3. Click a stat card or the Export button

**Expected Result:** Request fails with 401; user is redirected to login page; no stale data returned

---

## TC-UWB2-SEC-003: Summary bar API does not expose raw data beyond counts
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SEC-003 |
| **Priority** | P1 |
| **Type** | Security |

**Steps:**
1. Open browser DevTools → Network tab
2. Navigate to `/submissions`
3. Inspect the API call that populates the summary bar

**Expected Result:** API response contains only aggregated counts/metrics; no submission-level PII (member names, premium amounts per record) in the summary bar API payload

---

## TC-UWB2-SEC-004: Export API respects role-based access
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SEC-004 |
| **Priority** | P1 |
| **Type** | Security |

**Steps:**
1. Log in as a lower-privileged user
2. Attempt to click Export button
3. Inspect network request to the export endpoint

**Expected Result:** Export returns only records the user is authorized to view; no cross-user data leakage in the exported file

---

## TC-UWB2-SEC-005: CSRF protection on Export download
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SEC-005 |
| **Priority** | P1 |
| **Type** | Security |

**Steps:**
1. Copy the Export API endpoint URL from DevTools
2. Make a direct GET/POST request to the export URL without the session cookie

**Expected Result:** Request returns 401/403; export is not served without valid session credentials

---

## TC-UWB2-SEC-006: Sensitive financial data not exposed in page source
| Field | Value |
|---|---|
| **ID** | TC-UWB2-SEC-006 |
| **Priority** | P1 |
| **Type** | Security |

**Steps:**
1. Navigate to `/submissions`
2. View page source (Ctrl+U)
3. Search for premium amounts, account names, or other PII in the raw HTML

**Expected Result:** No raw PII or financial data embedded in page source HTML; data is loaded via authenticated API calls only

---
