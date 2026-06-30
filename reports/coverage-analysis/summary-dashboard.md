# Coverage Analysis — Summary Dashboard
# Jira Story: BDBP1-202 | Date: 2026-05-19

---

## Quick Stats

| KPI | Value |
|---|---|
| Total Test Cases | **49** |
| AC Coverage | **89.5%** (17/19) |
| Requirement Gaps | **2** (DOD-03, DOD-04) |
| Duplicates / Redundant | **4 pairs** (8.2%) |
| Missing Scenarios | **6** |
| Risk Gaps | **2** (RISK-13, RISK-14) |
| **Efficiency Score** | **90.4 / 100 — Grade A-** |

---

## Coverage by Suite

| Suite | Tests | P0 | P1 | P2 |
|---|---|---|---|---|
| Smoke | 6 | 6 | 0 | 0 |
| Functional | 8 | 4 | 4 | 0 |
| Accessibility | 7 | 0 | 7 | 0 |
| Negative | 7 | 3 | 4 | 0 |
| Edge Cases | 8 | 0 | 4 | 4 |
| Regression | 7 | 5 | 2 | 0 |
| Security | 6 | 1 | 5 | 0 |
| **Total** | **49** | **19** | **26** | **4** |

---

## AC Coverage Heat Map

| AC | Tests | Depth |
|---|---|---|
| AC-07 (Accordion component) | 9 | ██████████ DEEP |
| AC-03 (Product instructions) | 8 | █████████ DEEP |
| AC-06a–d (Accordion content) | 8 | █████████ DEEP |
| AC-08/09 (Accordion mutual exclusion) | 5 | ██████ GOOD |
| AC-04 / DOD-02 (FATCA) | 4 | █████ GOOD |
| AC-10 (Continue button) | 2 | ███ ADEQUATE |
| AC-02 (Left sidebar) | 2 | ███ ADEQUATE |
| AC-11 (Branding) | 2 | ███ ADEQUATE |
| AC-01 (Header/footer) | 1 | ██ THIN |
| AC-05 (4 accordion buttons) | 1 | ██ THIN |
| AC-12 (Responsive) | 1 | █ PARTIAL |
| DOD-03 (Save Progress) | 0 | ░ GAP |
| DOD-04 (Back to Dashboard) | 0 | ░ GAP |

---

## Top 3 Actions to Reach A+

1. **Add mobile viewport test** — resolves MISS-01, RISK-13, upgrades AC-12 from PARTIAL to COVERED
2. **Merge INSTR-NEG-005 + INSTR-SEC-004** — eliminates highest-overlap duplicate, cleans up suite
3. **Expand INSTR-REG-002 to cover Credit Cards** — resolves MISS-05, RISK-12

---

## Defects Recommended for Immediate Raise

| ID | Title | Priority |
|---|---|---|
| BUG-001 | "Save Progress" button missing from Instruction Section | P0 |
| BUG-002 | "Back to Dashboard" not present — "Back to Home" found instead | P1 |
| BUG-003 | 2 console errors on /SelfRegister page load | P1 |

---

*Full analysis: [coverage-analysis-report.md](coverage-analysis-report.md)*
*Updated RTM: [rtm-updated.md](rtm-updated.md)*
