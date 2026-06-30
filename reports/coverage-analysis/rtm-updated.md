# Requirements Traceability Matrix — Updated
# Jira Story: BDBP1-202 — Registration Form: Instruction Section
# Updated: 2026-05-19 | Reflects full 49-test suite

---

> **Change from previous RTM (2026-05-16):** Original RTM recorded 34 test cases.
> This update reflects the complete 49-test suite across all 7 suites.
> 15 additional test cases added: +2 Functional, +1 Negative, +1 Edge, +1 Regression, +6 Security, +4 Accessibility cross-references.

---

| AC ID | Acceptance Criterion | Test Case IDs | Suites | Status | Coverage Depth |
|---|---|---|---|---|---|
| AC-01 | Header and Footer consistent (BDBP1-94) | INSTR-REG-006 | Regression | COVERED | Thin (1 test) |
| AC-02 | Left Sidebar consistent (BDBP1-95) | INSTR-SMK-006, INSTR-REG-007 | Smoke, Regression | COVERED | Adequate |
| AC-03 | Product-specific instructions from Salesforce | INSTR-SMK-001, INSTR-FUNC-005, INSTR-FUNC-006, INSTR-REG-001, INSTR-REG-002, INSTR-EDGE-006, INSTR-EDGE-007, INSTR-SEC-006 | Smoke, Functional, Regression, Edge, Security | COVERED | Deep (8 tests) |
| AC-04 | FATCA compliance notice displayed | INSTR-SMK-003, INSTR-REG-003, INSTR-A11Y-006 | Smoke, Regression, Accessibility | COVERED | Good |
| AC-05 | Four residency-type accordion buttons present | INSTR-SMK-002 | Smoke | COVERED | Thin (1 test) |
| AC-06a | ECCU: 1 ID, no address proof | INSTR-SMK-005, INSTR-REG-004 | Smoke, Regression | COVERED | Adequate |
| AC-06b | CARICOM: Passport + secondary ID + address | INSTR-FUNC-001, INSTR-REG-004 | Functional, Regression | COVERED | Adequate |
| AC-06c | Non-Nationals: 2 IDs + address proof | INSTR-FUNC-002, INSTR-REG-004 | Functional, Regression | COVERED | Adequate |
| AC-06d | Self-Employed: 1 or 2 IDs by residency | INSTR-FUNC-003, INSTR-REG-004 | Functional, Regression | COVERED | Adequate |
| AC-07 | Collapsible accordion component | INSTR-SMK-005, INSTR-FUNC-001, INSTR-FUNC-002, INSTR-FUNC-003, INSTR-NEG-003, INSTR-NEG-006, INSTR-A11Y-001, INSTR-EDGE-001, INSTR-EDGE-008 | Smoke, Functional, Negative, Accessibility, Edge | COVERED | Deep (9 tests) |
| AC-08 | Only one accordion open at a time | INSTR-NEG-004, INSTR-REG-004, INSTR-EDGE-001, INSTR-A11Y-002 | Negative, Regression, Edge, Accessibility | COVERED | Good |
| AC-09 | Accordion auto-closes when another opens | INSTR-REG-001, INSTR-REG-004, INSTR-NEG-004 | Regression, Negative | COVERED | Good |
| AC-10 | Continue → Personal Information | INSTR-SMK-004, INSTR-REG-005 | Smoke, Regression | COVERED | Adequate |
| AC-11 | BOSL branding consistent | INSTR-FUNC-008, INSTR-A11Y-003 | Functional, Accessibility | COVERED | Adequate |
| AC-12 | Responsive design — desktop and mobile | INSTR-A11Y-007 | Accessibility | **PARTIAL** | Thin — zoom only, no mobile viewport |
| DOD-01 | All hyperlinks open in new tab | INSTR-SEC-001, INSTR-SEC-005 | Security | COVERED | Adequate |
| DOD-02 | FATCA link displayed and opens correctly | INSTR-SMK-003, INSTR-REG-003 | Smoke, Regression | COVERED | Adequate |
| DOD-03 | Save Progress button functions as expected | INSTR-REG-GAP-001 | — | **REQUIREMENT GAP** | Feature absent from live app |
| DOD-04 | Back to Dashboard button | INSTR-REG-GAP-002 | — | **REQUIREMENT GAP** | "Back to Home" found instead |

---

## Coverage Summary

| Status | Count | Percentage |
|---|---|---|
| COVERED | 16 | 84.2% |
| PARTIAL | 1 | 5.3% |
| REQUIREMENT GAP | 2 | 10.5% |
| NOT COVERED | 0 | 0.0% |
| **Total** | **19** | **100%** |

**Effective Coverage Rate (excluding feature gaps): 89.5%**

---

## Requirement Gap Details

### GAP-01: DOD-03 — Save Progress
- **Expected:** Save Progress button on Instruction Section
- **Observed:** Button is NOT present in live app
- **Test:** INSTR-REG-GAP-001 — tagged `@RequirementGap`, expected to FAIL
- **Defect:** BUG-001 — raise as P0

### GAP-02: DOD-04 — Back to Dashboard
- **Expected:** Back to Dashboard button
- **Observed:** "Back to Home" button found instead
- **Test:** INSTR-REG-GAP-002 — tagged `@RequirementGap`, expected to FAIL
- **Defect:** BUG-002 — raise as P1, confirm with BA

---

## Tests Without Direct AC Mapping (App-Observed)

These test cases have no direct Jira AC reference but cover behaviours observed in the live app:

| Test ID | Coverage Rationale |
|---|---|
| INSTR-FUNC-007 | Back to Home navigation — observed in app, not in AC |
| INSTR-NEG-001 | Product validation — observed in app, implied by flow design |
| INSTR-NEG-002 | Sub-product validation — observed in app |
| INSTR-NEG-005 | Step access control — inferred from flow design |
| INSTR-NEG-007 | Existing customer segregation — inferred from flow |
| INSTR-EDGE-002 | Page refresh state — observed behaviour |
| INSTR-EDGE-003 | Browser back navigation — observed behaviour |
| INSTR-EDGE-004 | Forward/back history — observed behaviour |
| INSTR-EDGE-005 | URL sharing — observed behaviour |
| INSTR-A11Y-004 | Heading structure — WCAG best practice |
| INSTR-A11Y-005 | Skip navigation — WCAG best practice |
| INSTR-SEC-002 | Console error disclosure — security baseline |
| INSTR-SEC-003 | URL sensitive state — security baseline |
| INSTR-SEC-004 | History manipulation — security baseline |
