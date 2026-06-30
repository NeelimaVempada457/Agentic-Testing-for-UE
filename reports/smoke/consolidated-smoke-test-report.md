# Consolidated Smoke Test Report

**Project:** Bank of St. Lucia Digital Portal / UE Submissions Portal  
**Report Date:** 2026-05-29  
**Prepared By:** QA Automation — Claude Code  
**Environment:** Chromium / https://united-educators-application.vercel.app  
**Playwright Report:** [`playwright-report/index.html`](../../playwright-report/index.html)

---

## Executive Summary

| Metric | Value |
|---|---|
| Total Smoke Test Cases (across all features) | 31 |
| Executed (UWB-1) | 13 |
| Passed | 2 |
| Failed | 11 |
| Not Executed (BDBP1-202, UWB-2, UWB-3) | 18 |
| **Pass Rate (executed tests)** | **15.4%** |
| **Overall Status** | **FAILED** |

> **Root Cause of Majority Failures:** Test locators use `getByRole('radio')` but the application renders Submission Type as `<button>` elements. This single mismatch accounts for cascading failures across 11 of 13 test cases.

---

## 1. UWB-1 — New Submission Form (Executed)

**Spec files:** [`tests/UWB-1/smoke/`](../../tests/UWB-1/smoke/)  
**Test cases source:** [`test-artifacts/UWB-1/test-cases/smoke/new-submission-smoke.md`](../../test-artifacts/UWB-1/test-cases/smoke/new-submission-smoke.md)

| Test ID | Title | Priority | Status | Known Defect |
|---|---|---|---|---|
| TC-SMOKE-001 | Create New Business submission with all mandatory fields | P0 | FAILED | DISC-003 |
| TC-SMOKE-002 | Create Cross-sell submission with all mandatory fields | P0 | FAILED | DISC-003 |
| TC-SMOKE-003 | Submission Type renders as card-style radio buttons | P0 | FAILED | D-04 (RESOLVED) |
| TC-SMOKE-004 | Account Name search populates Brokerage and Underwriting fields | P0 | FAILED | DISC-002 |
| TC-SMOKE-005 | Product(s) multi-select allows multiple selections | P0 | FAILED | — |
| TC-SMOKE-006 | Expiration Date defaults to Effective Date + 1 year | P0 | FAILED | — |
| TC-SMOKE-007 | Need By Date auto-populates to Effective Date − 5 days | P0 | FAILED | DISC-003 |
| TC-SMOKE-008 | Current Stage defaults to "Incomplete Submission" | P0 | FAILED | — |
| TC-SMOKE-009 | Document upload succeeds with valid file types | P0 | **PASSED** | — |
| TC-SMOKE-010 | Submission Summary preview displays correct fields | P1 | FAILED | — |
| TC-SMOKE-011 | Unique Submission ID is generated on creation | P0 | FAILED | — |
| TC-SMOKE-012 | Cancel without modifications does not show warning dialog | P1 | **PASSED** | — |
| TC-SMOKE-013 | Cancel with modifications shows warning dialog | P1 | FAILED | DISC-004 |

**Result: 2 Passed / 11 Failed**

---

## 2. BDBP1-202 — Registration Form: Instruction Section (Not Executed)

**Test cases source:** [`test-artifacts/BDBP1-202/test-cases/smoke/BDBP1-202-smoke.md`](../../test-artifacts/BDBP1-202/test-cases/smoke/BDBP1-202-smoke.md)

| Test ID | Title | Priority | Risk | Status |
|---|---|---|---|---|
| INSTR-SMK-001 | Instruction Section loads with all required content after product selection | P0 | Critical | NOT EXECUTED |
| INSTR-SMK-002 | All four residency-type accordion buttons present and labelled correctly | P0 | Critical | NOT EXECUTED |
| INSTR-SMK-003 | FATCA compliance notice displayed with working hyperlink | P0 | Critical | NOT EXECUTED |
| INSTR-SMK-004 | Continue button navigates from Instruction Section to Personal Information | P0 | Critical | NOT EXECUTED |
| INSTR-SMK-005 | ECCU Territories accordion expands with correct identification requirements | P0 | Critical | NOT EXECUTED |
| INSTR-SMK-006 | Left sidebar shows all 4 steps with Instructions highlighted | P0 | High | NOT EXECUTED |

**Result: 0 Executed — Spec files not yet created**

---

## 3. UWB-2 — Submissions Page (Not Executed)

**Test cases source:** [`test-artifacts/UWB-2/test-cases/smoke/submissions-page-smoke.md`](../../test-artifacts/UWB-2/test-cases/smoke/submissions-page-smoke.md)

| Test ID | Title | Priority | Status |
|---|---|---|---|
| TC-UWB2-SMOKE-001 | Submissions page loads successfully | P0 | NOT EXECUTED |
| TC-UWB2-SMOKE-002 | Header subtitle shows total submissions count | P0 | NOT EXECUTED |
| TC-UWB2-SMOKE-003 | Summary bar renders with stat cards | P0 | NOT EXECUTED |
| TC-UWB2-SMOKE-004 | Export button is visible | P0 | NOT EXECUTED |
| TC-UWB2-SMOKE-005 | New Submission button is visible | P0 | NOT EXECUTED |
| TC-UWB2-SMOKE-006 | New Submission button navigates to submission form | P0 | NOT EXECUTED |

**Result: 0 Executed — Spec files not yet created**

---

## 4. UWB-3 — View Submissions in Tabular List (Not Executed)

**Test cases source:** [`test-artifacts/UWB-3/test-cases/smoke/submissions-table-smoke.md`](../../test-artifacts/UWB-3/test-cases/smoke/submissions-table-smoke.md)

| Test ID | Title | Priority | Status |
|---|---|---|---|
| TC-UWB3-SMOKE-001 | Submissions table renders on page load | P0 | NOT EXECUTED |
| TC-UWB3-SMOKE-002 | All required columns are present | P0 | NOT EXECUTED |
| TC-UWB3-SMOKE-003 | Member/Institution cell shows sub-details | P0 | NOT EXECUTED |
| TC-UWB3-SMOKE-004 | Clicking a row navigates to submission detail | P0 | NOT EXECUTED |
| TC-UWB3-SMOKE-005 | Pagination controls are visible | P0 | NOT EXECUTED |
| TC-UWB3-SMOKE-006 | Products column shows pill badges | P1 | NOT EXECUTED |

**Result: 0 Executed — Spec files not yet created**

---

## 5. Failure Analysis

### Root Cause: Locator Strategy Mismatch (11 failures)

The Submission Type field is rendered as `<button>` elements in the live application, but tests target `getByRole('radio', { name: 'New Business' })`. Since no native `<input type="radio">` exists, every test that reaches this interaction times out.

**Failing locator:**
```typescript
getByRole('radio', { name: 'New Business' })
```

**Actual DOM element:**
```
button "New Business First-time submission from a new member account Selected" [ref=e112]
```

**Fix:**
```typescript
getByRole('button', { name: /New Business/i })
```

---

## 6. Known Defects Impacting Smoke Tests

| Defect ID | Description | Affected Tests | Severity | Status |
|---|---|---|---|---|
| DISC-002 | Underwriter/Underwriting Specialist remain editable after account selection — violates AC-10 | TC-SMOKE-004 | High | Open |
| DISC-003 | Need By Date does NOT auto-populate when Effective Date is set | TC-SMOKE-001, -002, -007 | High | Open |
| DISC-004 | Cancel dialog shows 3 buttons (Keep Editing / Discard / Save as Draft) — spec requires 2 (Yes / No) | TC-SMOKE-013 | Medium | Open |
| D-04 | Submission Type rendered as card-style buttons instead of radio inputs | TC-SMOKE-003 | Resolved | Fixed |
| DISC-001 | Expiration Date field missing mandatory asterisk (*) | TC-SMOKE-003 | Minor | Open |

---

## 7. Artifact Locations

| Artifact | Path |
|---|---|
| Playwright HTML Report | [`playwright-report/index.html`](../../playwright-report/index.html) |
| Failure screenshots | [`test-results/*/test-failed-1.png`](../../test-results/) |
| Failure videos | [`test-results/*/video.webm`](../../test-results/) |
| Error context files | [`test-results/*/error-context.md`](../../test-results/) |
| UWB-1 smoke specs | [`tests/UWB-1/smoke/`](../../tests/UWB-1/smoke/) |
| UWB-1 smoke test cases | [`test-artifacts/UWB-1/test-cases/smoke/`](../../test-artifacts/UWB-1/test-cases/smoke/) |
| UWB-2 smoke test cases | [`test-artifacts/UWB-2/test-cases/smoke/`](../../test-artifacts/UWB-2/test-cases/smoke/) |
| UWB-3 smoke test cases | [`test-artifacts/UWB-3/test-cases/smoke/`](../../test-artifacts/UWB-3/test-cases/smoke/) |
| BDBP1-202 smoke test cases | [`test-artifacts/BDBP1-202/test-cases/smoke/`](../../test-artifacts/BDBP1-202/test-cases/smoke/) |

---

## 8. Action Items

| Priority | Action | Owner | Notes |
|---|---|---|---|
| P0 | Fix locator strategy — replace `getByRole('radio')` with `getByRole('button')` for Submission Type | QA | Unblocks 11 failing tests |
| P0 | Re-run full UWB-1 smoke suite after locator fix | QA | Establish true pass/fail baseline |
| P0 | Create and execute spec files for UWB-2 smoke tests | QA | 6 test cases ready in test-artifacts |
| P0 | Create and execute spec files for UWB-3 smoke tests | QA | 6 test cases ready in test-artifacts |
| P0 | Create and execute spec files for BDBP1-202 smoke tests | QA | 6 test cases ready in test-artifacts |
| P1 | Investigate and resolve DISC-002 (Underwriter field editable) | Dev | High-severity defect |
| P1 | Investigate and resolve DISC-003 (Need By Date not auto-populated) | Dev | High-severity defect |
| P2 | Resolve DISC-004 (Cancel dialog button count mismatch) | Dev | Medium-severity defect |
