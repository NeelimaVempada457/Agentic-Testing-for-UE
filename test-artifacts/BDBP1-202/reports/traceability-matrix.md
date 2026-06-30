# Requirements Traceability Matrix
# Jira Ticket: BDBP1-202 — Registration Form: Instruction Section
# Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16

---

| AC ID | Acceptance Criterion | Test Case IDs | Feature File | Status |
|---|---|---|---|---|
| AC-01 | Header and Footer consistent on Registration Page (per BDBP1-94) | INSTR-REG-006 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-02 | Left Side component consistent on Registration Page (per BDBP1-95) | INSTR-SMK-006, INSTR-REG-007 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-03 | Product-specific instructions appear based on selected product | INSTR-SMK-001, INSTR-FUNC-006, INSTR-REG-002, INSTR-REG-004 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-04 | FATCA compliance notice displayed for U.S. citizens/residents | INSTR-SMK-003, INSTR-REG-003 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-05 | Four residency-type buttons presented | INSTR-SMK-002 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-06a | ECCU button shows 1 ID + no address proof for Saint Lucian nationals | INSTR-SMK-005, INSTR-REG-004 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-06b | CARICOM button shows Passport + secondary ID + address proof | INSTR-FUNC-001, INSTR-REG-004 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-06c | Non-Nationals button shows 2 IDs + address proof | INSTR-FUNC-002, INSTR-REG-004 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-06d | Self-Employed shows 1 ID (ECCU/CARICOM) or 2 IDs (non-nationals) + address proof | INSTR-FUNC-003, INSTR-REG-004 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-07 | Collapsible accordion component for document requirement categories | INSTR-SMK-005, INSTR-FUNC-001–003, INSTR-NEG-003 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-08 | Only one accordion section expanded at a time | INSTR-NEG-004 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-09 | Accordion auto-closes when another is opened | INSTR-REG-004, INSTR-REG-001 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-10 | Continue button navigates to Personal Information | INSTR-SMK-004, INSTR-REG-005 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-11 | BOSL branding applied consistently | INSTR-FUNC-008 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| AC-12 | Responsive design verified across desktop and mobile | INSTR-A11Y-007 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| DOD-01 | All hyperlinks open in a new tab | INSTR-SEC-001, INSTR-SEC-005 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| DOD-02 | FATCA link displayed and opens correctly | INSTR-SMK-003, INSTR-REG-003 | features/regression/BDBP1-202-instruction-section.feature | COVERED |
| DOD-03 | Save Progress button functions as expected | INSTR-REG-GAP-001 | features/regression/BDBP1-202-instruction-section.feature | **REQUIREMENT GAP** |
| DOD-04 | Back to Dashboard button functions as expected | INSTR-REG-GAP-002 | features/regression/BDBP1-202-instruction-section.feature | **REQUIREMENT GAP** |

---

## Status Legend

| Status | Meaning |
|---|---|
| COVERED | At least one test case traces to this requirement |
| NOT COVERED | No test case generated — needs attention |
| **REQUIREMENT GAP** | Requirement exists in Jira but feature was NOT found in the live app |

---

## Requirement Gaps — Action Required

### GAP-01: Save Progress Button (DOD-03)
- **Expected per Jira:** "Save Progress" button on the Instruction Section
- **Observed in app:** Button NOT present — only "Continue" and "Back to Home" found
- **Impact:** Users cannot save their application progress mid-flow
- **Action:** Raise with development team — confirm if deferred or missing implementation
- **Test:** INSTR-REG-GAP-001 tagged `@RequirementGap` — expected to FAIL until fixed

### GAP-02: Back to Dashboard Button (DOD-04)
- **Expected per Jira:** "Back to Dashboard" button on the Instruction Section
- **Observed in app:** "Back to Home" button found instead — "Back to Dashboard" NOT present
- **Impact:** Users cannot return to a personal dashboard from the Instruction Section
- **Action:** Confirm with BA whether "Back to Home" satisfies this requirement or if a Dashboard exists
- **Test:** INSTR-REG-GAP-002 tagged `@RequirementGap` — expected to FAIL until resolved

---

## Coverage Summary

| Metric | Value |
|---|---|
| Total AC Items | 19 |
| Fully Covered | 17 (89%) |
| Requirement Gaps | 2 (11%) |
| Not Covered | 0 |
| Total Test Cases Generated | 34 |
| Total Gherkin Scenarios | 22 |
