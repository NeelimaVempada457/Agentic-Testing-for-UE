# Requirements Traceability Matrix — UWB-1
# Jira Story: UWB-1 — NB-01: Create New Submission for New Business and Cross Sell
# Generated: 2026-05-27 (re-run)

---

## Traceability Matrix

| AC ID | Acceptance Criterion | Test Case IDs | Suites | App Status (2026-05-27) | Coverage |
|---|---|---|---|---|---|
| AC-01 | All mandatory fields required before submission creation | NEWSUB-FUNC-001, FUNC-016, TC-SMOKE-001, BOUND-012 | Functional, Smoke, Boundary | VERIFIED IN APP | FULL |
| AC-02 | Account supports search from Salesforce | NEWSUB-FUNC-002, TC-SMOKE-004 | Functional, Smoke | VERIFIED IN APP | FULL |
| AC-03 | User must select account to proceed | NEWSUB-FUNC-002, FUNC-016 | Functional | VERIFIED IN APP | FULL |
| AC-04 | No-results message shown when search yields nothing | NEWSUB-FUNC-017 | Functional | VERIFIED IN APP | FULL |
| AC-05 | Products multi-select with removable cards | NEWSUB-FUNC-006, TC-SMOKE-005, TC-POS-003 | Functional, Smoke, Positive | VERIFIED IN APP | FULL |
| AC-06 | Date validation: Effective Date ≤ Expiration Date | NEWSUB-FUNC-007, FUNC-015, BOUND-001 through BOUND-011 | Functional, Boundary | VERIFIED IN APP (Expiration auto-populate works) | FULL |
| AC-07 | Stage defaults to "Incomplete Submission" and is editable | NEWSUB-FUNC-009, FUNC-010, TC-SMOKE-008 | Functional, Smoke | VERIFIED IN APP | FULL |
| AC-08 | Submission created with unique Submission ID after validation | NEWSUB-FUNC-011, TC-SMOKE-011 | Functional, Smoke | VERIFIED IN APP | FULL |
| AC-09 | Brokerage, Broker, Underwriting Team auto-populate on account selection | NEWSUB-FUNC-003, FUNC-004, TC-SMOKE-004 | Functional, Smoke | VERIFIED IN APP (auto-populate works) | FULL |
| AC-10 | Auto-populated fields are non-editable | NEWSUB-FUNC-005 | Functional | **DIFFERS FROM SPEC — DISC-002** (Underwriting fields editable) | DEFECT |
| AC-11 | Changes stored only in Workbench | NEWSUB-FUNC-021 | Functional | VERIFIED IN APP | PARTIAL |
| AC-12 | Each new submission fetches fresh Salesforce data | NEWSUB-FUNC-021 | Functional | VERIFIED IN APP | PARTIAL |
| AC-13 | User can modify stage before submission creation | NEWSUB-FUNC-009, TC-POS-006 | Functional, Positive | VERIFIED IN APP | FULL |
| AC-14 | Notes optional; does not block creation | NEWSUB-FUNC-014, TC-POS-004 | Functional, Positive | VERIFIED IN APP | FULL |
| AC-15 | Summary displays key submission details | NEWSUB-FUNC-012, TC-SMOKE-010 | Functional, Smoke | VERIFIED IN APP | FULL |
| AC-16 | User can review details before final submission | NEWSUB-FUNC-012 | Functional | VERIFIED IN APP | FULL |
| AC-17 | Stage defaults to "Incomplete Submission" | NEWSUB-FUNC-009, TC-SMOKE-008 | Functional, Smoke | VERIFIED IN APP | FULL (dup of AC-07) |
| AC-18 | Products and Underwriting Team allow multiple selections | NEWSUB-FUNC-006, TC-POS-003 | Functional, Positive | VERIFIED IN APP | FULL |

---

## Spec Requirements Not Covered by ACs

| Requirement | Source | Test Case(s) | App Status |
|---|---|---|---|
| Need By Date auto-populates to Effective Date − 5 days | Spec field table | NEWSUB-FUNC-008, TC-SMOKE-007 | **DIFFERS FROM SPEC — DISC-003** (no auto-populate) |
| Submission Type rendered as card-style radio buttons | Spec field table | NEWSUB-FUNC-001, TC-SMOKE-003 | **RESOLVED** — D-04 fixed |
| Expiration Date is mandatory (asterisk indicator) | Spec field table | NEWSUB-FUNC-018, REG-005 | **DIFFERS FROM SPEC — DISC-001** (asterisk missing) |
| Cancel dialog: Yes/No only | Spec Cancel row | NEWSUB-FUNC-020, TC-SMOKE-013 | **DIFFERS FROM SPEC — DISC-004** (3 buttons) |
| File types: .pdf .doc .docx .xlsx .jpg .png | Spec field table | NEWSUB-FUNC-013, REG-007 | **DIFFERS FROM SPEC — DISC-005** (.doc missing) |
| Expiration Date defaults to Effective + 1 year | Spec key rules | TC-SMOKE-006, NEWSUB-FUNC-007 | VERIFIED IN APP |
| Cancel without modification: no dialog | Spec Cancel note | TC-SMOKE-012, TC-POS-009 | VERIFIED IN APP |
| Products listed at bottom of ticket | Spec products list | NEWSUB-FUNC-022, TC-POS-010 | VERIFIED IN APP |
| Internal Notes spell checker | Spec field table | (Exploratory only) | NOT CONFIRMED IN APP |
| Max file size 25 MB | Spec document upload | TC-BOUND-007, TC-BOUND-008 | NOT TESTED (TBD in spec) |

---

## Summary

| Metric | Count |
|---|---|
| Total ACs | 18 |
| ACs Fully Covered | 16 |
| ACs with Defects | 1 (AC-10 — DISC-002) |
| ACs Partially Covered | 2 (AC-11, AC-12) |
| Spec Requirements with Defects | 4 (DISC-001, DISC-003, DISC-004, DISC-005) |
| Spec Requirements Resolved | 1 (D-04 — Submission Type card-style) |
