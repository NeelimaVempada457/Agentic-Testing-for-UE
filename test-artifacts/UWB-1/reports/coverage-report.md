# Test Coverage Report — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | NB-01: Create New Submission for New Business and Cross Sell |
| Generated | 2026-05-27 (re-run) |
| Previous Run | 2026-05-19 |

---

## Coverage Summary

| Suite | Test Cases | Status |
|---|---|---|
| Smoke | 13 | Updated — defect notes added |
| Functional | 22 | Updated — defect tracking added |
| Positive | 11 | Updated |
| Negative | (see file) | From 2026-05-19 |
| Edge Cases | (see file) | From 2026-05-19 |
| Boundary | 12 | NEW — 2026-05-27 |
| Security | (see file) | From 2026-05-19 |
| Accessibility | (see file) | From 2026-05-19 |
| Regression | 10 | NEW — 2026-05-27 |
| **Total (est.)** | **~100** | |

---

## Defect Impact on Coverage

| Defect | Severity | Test Cases Affected | Expected Test Result |
|---|---|---|---|
| DISC-001 — Expiration Date missing asterisk | Low | TC-SMOKE-003, NEWSUB-FUNC-018, REG-005 | FAIL (known) |
| DISC-002 — Underwriting fields editable | High | TC-SMOKE-004, NEWSUB-FUNC-005, REG-003 | FAIL (known) |
| DISC-003 — Need By Date no auto-populate | Medium | TC-SMOKE-007, NEWSUB-FUNC-008, REG-004, TC-BOUND-004 | FAIL (known) |
| DISC-004 — Cancel dialog 3 buttons | Medium | NEWSUB-FUNC-020, REG-006, TC-SMOKE-013 | FAIL (known) |
| DISC-005 — .doc missing from picker | Low | NEWSUB-FUNC-013, REG-007 | FAIL (known) |

---

## Resolved Defects

| Previous Defect | Description | Resolved In |
|---|---|---|
| D-04 | Submission Type rendered as dropdown — now card-style | Before 2026-05-27 |
| D-06 (partial) | .jpg/.jpeg now accepted in file picker | Before 2026-05-27 |

---

## AC Coverage

| AC | Description | Coverage |
|---|---|---|
| AC-01 | All mandatory fields required for submission | COVERED — NEWSUB-FUNC-001, FUNC-016, BOUND-012 |
| AC-02 | Account supports Salesforce search | COVERED — NEWSUB-FUNC-002 |
| AC-03 | User must select account to proceed | COVERED — NEWSUB-FUNC-002 |
| AC-04 | No-results message shown | COVERED — NEWSUB-FUNC-017 |
| AC-05 | Products multi-select | COVERED — NEWSUB-FUNC-006 |
| AC-06 | Date validation (Effective ≤ Expiration) | COVERED — NEWSUB-FUNC-007, BOUND-001 through BOUND-005 |
| AC-07 | Stage defaults to Incomplete Submission | COVERED — NEWSUB-FUNC-009, FUNC-010, SMOKE-008 |
| AC-08 | Unique Submission ID generated | COVERED — NEWSUB-FUNC-011, SMOKE-011 |
| AC-09 | Auto-populate on account selection | COVERED — NEWSUB-FUNC-003, FUNC-004 |
| AC-10 | Auto-populated fields non-editable | COVERED (DEFECT) — NEWSUB-FUNC-005 — DISC-002 |
| AC-11 | Changes stored in Workbench | COVERED — NEWSUB-FUNC-021 |
| AC-12 | Fresh Salesforce data per submission | COVERED — NEWSUB-FUNC-021 |
| AC-13 | User can modify stage | COVERED — NEWSUB-FUNC-009 |
| AC-14 | Notes optional | COVERED — NEWSUB-FUNC-014 |
| AC-15 | Summary displays key fields | COVERED — NEWSUB-FUNC-012 |
| AC-16 | User can review before final submission | COVERED — NEWSUB-FUNC-012 |
| AC-17 | Stage default | COVERED — see AC-07 |
| AC-18 | Products/Underwriting multi-select | COVERED — see AC-05 |

---

## Screenshots Captured (2026-05-27)

| Screenshot | Purpose |
|---|---|
| `FULL-PAGE-new-submission-form.png` | Full-page reference of the New Submission form |
| `DISC-001-expiration-date-no-asterisk.png` | Missing mandatory asterisk on Expiration Date |
| `DISC-002-underwriting-fields-editable.png` | Underwriting Team fields editable after account selection |
| `DISC-003-file-picker-accept-types.png` | File picker accept attribute and UI hint text |
| `DISC-004-need-by-date-no-auto-populate.png` | Need By Date empty after Effective Date is set |
| `DISC-005-cancel-dialog.png` | Cancel dialog with 3 buttons |
| `SECTION-A-submission-type.png` | Card-style Submission Type (D-04 fix verified) |
| `SECTION-H-notes.png` | Internal Notes section |
| `SECTION-I-documents.png` | Document upload section |
| `SECTION-K-preview-panel.png` | Submission Summary preview panel |
