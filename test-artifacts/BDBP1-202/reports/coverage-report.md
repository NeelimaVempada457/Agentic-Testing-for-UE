# Test Coverage Report
# Ticket: BDBP1-202 — Registration Form: Instruction Section
# Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Mode: JIRA_AND_URL

---

## Executive Summary

| Metric | Value |
|---|---|
| **Jira Ticket** | BDBP1-202 — Registration Form: Instruction Section |
| **Application URL** | https://bankofstlucia--digitalqa.sandbox.my.site.com/ |
| **Environment** | Digital QA (Salesforce Sandbox) |
| **Acceptance Criteria Found** | 19 |
| **AC Covered** | 17 (89%) |
| **Requirement Gaps** | 2 (Save Progress, Back to Dashboard) |
| **Total Test Cases** | 34 |
| **Total Gherkin Scenarios** | 22 |
| **Feature Files** | 1 |
| **Browser Coverage** | Chrome (Chromium) |
| **Mobile Coverage** | Not in scope for this run |

---

## Test Cases by Type

| Type | Count | Files |
|---|---|---|
| Smoke | 6 | test-cases/smoke/BDBP1-202-smoke.md |
| Functional | 8 | test-cases/functional/BDBP1-202-functional.md |
| Negative | 7 | test-cases/negative/BDBP1-202-negative.md |
| Edge Cases | 8 | test-cases/edge-cases/BDBP1-202-edge-cases.md |
| Regression | 7 | test-cases/regression/BDBP1-202-regression.md |
| Security | 6 | test-cases/security/BDBP1-202-security.md |
| Accessibility | 7 | test-cases/accessibility/BDBP1-202-accessibility.md |
| **TOTAL** | **34** | |

---

## Test Cases by Source

| Source | Count | Description |
|---|---|---|
| JIRA-BDBP1-202 | 14 | Directly derived from Jira acceptance criteria |
| APP-ANALYSIS | 10 | Derived from live app crawl |
| COMBINED | 10 | AC validated against live app behaviour |

---

## Priority Distribution

| Priority | Count | Description |
|---|---|---|
| **P0 — Critical** | 18 | Must pass for release |
| **P1 — High** | 14 | Important flows and quality gates |
| **P2 — Medium** | 2 | Edge cases and secondary flows |
| **P3 — Low** | 0 | — |

---

## Modules Detected

| Module | Coverage |
|---|---|
| Home Page | Navigational only — out of scope |
| Customer Type Modal | Covered in negative TC-NEG-007 |
| Select Product | Covered (TC-NEG-001, TC-NEG-002) |
| **Instruction Section** | **89% AC coverage — 2 requirement gaps** |
| Personal Information | Out of scope for BDBP1-202 |
| Validation | Out of scope for BDBP1-202 |

---

## AC Coverage Detail

| AC | Description | Status |
|---|---|---|
| AC-01 | Header/Footer consistency | COVERED |
| AC-02 | Left sidebar consistency | COVERED |
| AC-03 | Dynamic product-specific instructions | COVERED |
| AC-04 | FATCA compliance notice | COVERED |
| AC-05 | 4 residency-type buttons present | COVERED |
| AC-06a | ECCU accordion content | COVERED |
| AC-06b | CARICOM accordion content | COVERED |
| AC-06c | Non-Nationals accordion content | COVERED |
| AC-06d | Self-Employed accordion content | COVERED |
| AC-07 | Collapsible accordion | COVERED |
| AC-08 | Single-expand accordion | COVERED |
| AC-09 | Auto-close accordion | COVERED |
| AC-10 | Continue navigation | COVERED |
| AC-11 | BOSL branding | COVERED |
| AC-12 | Responsive design | COVERED (Accessibility TC) |
| DOD-01 | Links open in new tab | COVERED |
| DOD-02 | FATCA link works | COVERED |
| DOD-03 | Save Progress button | **REQUIREMENT GAP** |
| DOD-04 | Back to Dashboard button | **REQUIREMENT GAP** |

---

## Gherkin Feature Files

| File | Scenarios |
|---|---|
| features/regression/BDBP1-202-instruction-section.feature | 22 |

---

## Recommendations

1. **Resolve Requirement Gaps** — Confirm with dev team if "Save Progress" and "Back to Dashboard" are deferred or missing
2. **Investigate console errors** — 2 console errors detected during analysis; dev team should triage
3. **Expand to other products** — Test dynamic instructions for Loans, Credit Cards, Debit Cards, A+ Club, HomeStart
4. **Add mobile coverage** — Jira AC-12 requires responsive verification; re-run with mobile scope enabled
5. **Verify all external links open in new tab** — Requires automated link-check or manual verification
