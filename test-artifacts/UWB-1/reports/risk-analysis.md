# Risk Analysis — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | NB-01: Create New Submission |
| Generated | 2026-05-19 |
| Total Risks Identified | 10 |

---

## Risk Summary

| Risk ID | Description | Likelihood | Impact | Risk Level | Mitigation |
|---|---|---|---|---|---|
| RISK-01 | Salesforce API unavailable in test env | High | High | Critical | Use mock Salesforce API or dedicated QA sandbox |
| RISK-02 | Date auto-population logic fails silently | Medium | High | High | Add explicit assertions for Need By Date and Expiration Date values |
| RISK-03 | File upload MIME validation bypass | Medium | High | High | Test MIME type server-side validation, not just extension check |
| RISK-04 | Duplicate submissions on rapid clicks | Medium | High | High | Test idempotency; verify single Submission ID per submit attempt |
| RISK-05 | Read-only fields can be bypassed via DevTools | Low | High | Medium | Server-side enforcement of read-only fields must be verified |
| RISK-06 | Cancel warning not shown on all modified states | Medium | Medium | Medium | Test cancel after each individual field modification |
| RISK-07 | Submission ID not unique under concurrent users | Low | High | Medium | Load test or verify database sequence/UUID generation |
| RISK-08 | Accessibility failures block assistive tech users | Medium | High | High | Run axe-core or Lighthouse audit on every build |
| RISK-09 | Product dropdown renders incorrectly with 14 selections | Low | Medium | Low | Test with full product list selected |
| RISK-10 | XSS vulnerability in Internal Notes on display | Low | High | Medium | Verify output encoding when notes are rendered back to users |

---

## Detailed Risk Analysis

### RISK-01: Salesforce API Unavailable in Test Environment
**Description:** The Account Name, Brokerage, Broker, and Underwriting Team fields all depend on live Salesforce API calls. If the QA environment doesn't have Salesforce connectivity, these fields cannot be tested end-to-end.

**Likelihood:** High — Salesforce sandboxes often have data sync delays or connectivity issues.

**Impact:** High — 4 out of 10 acceptance criteria directly depend on Salesforce integration.

**Mitigation:**
- Set up a dedicated Salesforce QA sandbox with representative test accounts
- Create mock API interceptors for automation tests
- Maintain a list of known test account names for use in test runs

---

### RISK-02: Date Auto-Population Logic Fails Silently
**Description:** Need By Date (Effective Date − 5 days) and Expiration Date (Effective Date + 1 year) are auto-populated via JavaScript. A React state update bug could cause these to not trigger, causing users to manually enter dates and potentially submit incorrect values.

**Likelihood:** Medium — React synthetic event timing issues are common.

**Impact:** High — Incorrect dates could lead to compliance or underwriting schedule violations.

**Mitigation:**
- Add explicit automated assertions for date auto-population
- Test with both keyboard input and programmatic date picker interactions
- Log a defect if auto-population fails to trigger within 500ms of date selection

---

### RISK-03: File Upload MIME Type Validation Bypass
**Description:** If file type validation is only performed client-side based on file extension, an attacker can rename a malicious file to a valid extension and upload it. Server-side MIME type validation must be enforced.

**Likelihood:** Medium — Client-only validation is a common oversight.

**Impact:** High — Malicious files could be stored in the system and executed or downloaded by other users.

**Mitigation:**
- Test by renaming an HTML file to .pdf and attempting upload
- Verify server returns a 400 error for MIME mismatch, not just client rejection
- Require security team sign-off on file upload implementation

---

### RISK-04: Duplicate Submissions on Rapid Clicks
**Description:** If the Create Submission button is not disabled after the first click, rapid double-clicking could submit the form twice, creating two submissions with different IDs for the same data.

**Likelihood:** Medium — Common in forms without optimistic UI locking.

**Impact:** High — Duplicate submissions cause data integrity issues and downstream workflow problems.

**Mitigation:**
- Button must enter a loading/disabled state after first click (TC-EDGE-012)
- Implement server-side idempotency key or deduplication check

---

### RISK-05: Read-Only Fields Editable via Browser DevTools
**Description:** Brokerage and Underwriting Team fields are marked read-only in the UI. However, a user could remove the `readonly` or `disabled` attribute via browser DevTools and inject different values.

**Likelihood:** Low — Requires technical knowledge and intentional manipulation.

**Impact:** High — Injecting false brokerage data could cause mis-routing of submissions.

**Mitigation:**
- Server must validate that brokerage data matches the Salesforce account record, not accept user-provided values
- Include server-side validation test in API test suite

---

### RISK-06: Cancel Warning Not Shown for All Modified States
**Description:** The Cancel warning should appear "only if any field has been modified." Edge cases may exist where a field is touched but reset to its default (e.g., a date is set then cleared) — the system may not correctly detect this as "modified."

**Likelihood:** Medium — State management for "dirty form" detection varies in complexity.

**Impact:** Medium — Users could lose data unexpectedly without a warning.

**Mitigation:**
- Test cancel after modifying and then clearing each field type
- Define "modified" explicitly in requirements (dirty = any user interaction, not just non-default values)

---

### RISK-07: Submission ID Not Unique Under Concurrent Users
**Description:** If Submission ID is generated using a non-atomic counter (e.g., MAX(id) + 1 in application code), concurrent submissions could receive the same ID.

**Likelihood:** Low — Likely using database sequence, but not confirmed.

**Impact:** High — Duplicate Submission IDs would cause data corruption.

**Mitigation:**
- Verify Submission ID uses a database-level SEQUENCE or UUID
- Perform basic concurrency test with 2–3 simultaneous submissions

---

### RISK-08: Accessibility Failures Block Assistive Technology Users
**Description:** If form fields lack proper ARIA labels, keyboard focus management is broken, or error messages are not announced, users relying on screen readers or keyboard-only navigation cannot complete submissions.

**Likelihood:** Medium — Accessibility is often not tested during development.

**Impact:** High — Legal compliance risk (ADA/Section 508) and exclusion of users with disabilities.

**Mitigation:**
- Run axe-core accessibility audit on every PR via CI
- Include TC-ACC-001 through TC-ACC-004 (P0 cases) in every regression run

---

### RISK-09: Product Dropdown Breaks with Full Product List Selected
**Description:** With 14 products available, selecting all of them creates 14 product cards. The UI layout may overflow, overlap, or become non-functional with a large number of cards.

**Likelihood:** Low — Most users will select 1–3 products.

**Impact:** Medium — UI breakage would prevent submission for users with unusual product combinations.

**Mitigation:**
- TC-EDGE-004 covers this scenario
- Ensure product card container scrolls or wraps gracefully

---

### RISK-10: XSS Vulnerability When Internal Notes Are Displayed
**Description:** If Internal Notes are saved and later displayed to other users (e.g., in a submission detail view), and if the notes content is not HTML-encoded on output, a stored XSS attack is possible.

**Likelihood:** Low — Modern frameworks (React) auto-escape by default.

**Impact:** High — Stored XSS could compromise other users' sessions.

**Mitigation:**
- TC-SEC-001 covers input-time testing
- Separately test the submission detail view to verify notes are HTML-escaped on output
- Conduct code review of the component that renders Internal Notes

---

## Risk Priority Matrix

```
         HIGH IMPACT
              │
RISK-01 ──── │ ──── RISK-02, RISK-03
RISK-04       │      RISK-05
RISK-08 ──── │
              │
─────────────┼────────────
              │
RISK-06       │ RISK-07
RISK-09 ──── │ RISK-10
              │
         LOW IMPACT

   LOW LIKELIHOOD ←──→ HIGH LIKELIHOOD
```

**Critical (Act Immediately):** RISK-01
**High (Address Before Release):** RISK-02, RISK-03, RISK-04, RISK-08
**Medium (Address Before GA):** RISK-05, RISK-06, RISK-07, RISK-10
**Low (Monitor):** RISK-09
