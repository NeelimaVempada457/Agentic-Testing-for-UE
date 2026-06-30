# Security Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Security |
| Generated | 2026-05-19 |

---

## TC-SEC-001: XSS — Script tag in Internal Notes field

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Security |
| Preconditions | User is on the New Submission form |
| Test Data | Input: `<script>alert('XSS')</script>` |

**Steps:**
1. Enter `<script>alert('XSS')</script>` in the Internal Notes field
2. Fill remaining mandatory fields
3. Click "Create Submission"
4. Observe whether any alert dialog appears

**Expected Result:**
- No JavaScript alert is executed
- Input is either sanitized, escaped, or rejected
- Page remains stable

**Pass Criteria:** No XSS execution; input stored/displayed as plain text.

---

## TC-SEC-002: XSS — Script tag in Account Name search field

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Security |
| Preconditions | User is on the New Submission form |
| Test Data | Input: `<img src=x onerror=alert('XSS')>` |

**Steps:**
1. Type `<img src=x onerror=alert('XSS')>` in the Account Name search field
2. Observe the search results and page behavior

**Expected Result:**
- No JavaScript executes
- Input is treated as a search string, returning no results
- Page remains stable

**Pass Criteria:** No XSS execution in the search field.

---

## TC-SEC-003: SQL Injection — Inject payload in searchable fields

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Security |
| Preconditions | User is on the New Submission form |
| Test Data | Input: `' OR '1'='1`; `'; DROP TABLE submissions; --` |

**Steps:**
1. Type `' OR '1'='1` in the Account Name search field
2. Observe results and any errors
3. Repeat with `'; DROP TABLE submissions; --`

**Expected Result:**
- No database errors exposed in the UI
- No unauthorized data returned
- Application handles input gracefully

**Pass Criteria:** SQL injection payloads return no results or safe error messages only.

---

## TC-SEC-004: File upload — Double extension disguise

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Security |
| Preconditions | User is on the New Submission form |
| Test Data | File: `malicious.pdf.exe` |

**Steps:**
1. Attempt to upload a file named `malicious.pdf.exe`
2. Observe whether the upload is accepted or rejected

**Expected Result:**
- File is rejected based on true extension (.exe)
- Error message displayed with allowed extensions

**Pass Criteria:** Double-extension file is rejected; true extension validation is enforced.

---

## TC-SEC-005: File upload — HTML file disguised as PDF

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Security |
| Preconditions | User is on the New Submission form |
| Test Data | File: `document.html` renamed to `document.pdf` (MIME type: text/html) |

**Steps:**
1. Rename an HTML file to have a .pdf extension
2. Attempt to upload it via the Add Document field
3. Observe the upload result

**Expected Result:**
- File is rejected based on MIME type validation (not just extension)
- Error message is shown

**Pass Criteria:** MIME-type mismatch is detected and upload rejected.

---

## TC-SEC-006: Verify page source does not expose sensitive data

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Security |
| Preconditions | User is on the New Submission form |
| Test Data | None |

**Steps:**
1. Open the New Submission form
2. View page source (Ctrl+U)
3. Search for patterns: API keys, tokens, passwords, credentials, secret

**Expected Result:**
- No API tokens, credentials, or sensitive keys are present in the page source
- Environment variables are not embedded in client-side code

**Pass Criteria:** No sensitive data patterns found in page HTML/JS source.

---

## TC-SEC-007: Verify HTTPS is enforced

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Security |
| Preconditions | Application is loaded |
| Test Data | URL: http://united-educators-application.vercel.app/ (HTTP) |

**Steps:**
1. Attempt to navigate to the HTTP version of the application URL
2. Observe redirect behavior and browser security indicators

**Expected Result:**
- HTTP redirects to HTTPS automatically
- Browser shows secure padlock
- No mixed content warnings in browser console

**Pass Criteria:** All traffic is served over HTTPS; HTTP is redirected.

---

## TC-SEC-008: Verify no sensitive data in localStorage or sessionStorage

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Security |
| Preconditions | User has interacted with the form |
| Test Data | Fill Submission Type, Account, and at least one other field |

**Steps:**
1. Fill in several form fields
2. Open browser DevTools > Application > Local Storage and Session Storage
3. Inspect all stored key-value pairs

**Expected Result:**
- No passwords, API tokens, or personally identifiable data stored in browser storage
- Form data is not cached in localStorage

**Pass Criteria:** No sensitive values found in browser client-side storage.
