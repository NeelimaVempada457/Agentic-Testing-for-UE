# Risk Analysis Report
# Ticket: BDBP1-202 — Registration Form: Instruction Section
# Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16

---

## Risk Summary

| Level | Count |
|---|---|
| Critical | 3 |
| High | 6 |
| Medium | 4 |
| Low | 1 |

---

## Critical Risks

### RISK-01: Dynamic Instructions Fetch Failure (Salesforce)
- **Area:** Instruction Section — Product Instructions
- **Risk:** If Salesforce API fails, users see blank/broken instruction content
- **Impact:** Users cannot understand application requirements; drop-off increases; regulatory compliance risk
- **AC Ref:** AC-03
- **Test Coverage:** INSTR-EDGE-007
- **Recommendation:** Implement graceful error handling + fallback message; add API health monitoring

### RISK-02: Accordion Simultaneous Expansion
- **Area:** Accordion Component — Mutual Exclusion Logic
- **Risk:** Race conditions or JS errors could allow multiple accordions open simultaneously
- **Impact:** Users see contradictory document requirements; could cause incorrect application submissions
- **AC Ref:** AC-08, AC-09
- **Test Coverage:** INSTR-NEG-004, INSTR-EDGE-001
- **Recommendation:** Test across all browser engines (not just Chrome); add automated regression test

### RISK-03: Save Progress Gap — User Loses Application Data
- **Area:** Navigation — Save Progress (DOD-03)
- **Risk:** "Save Progress" button is NOT present in the live app per observation
- **Impact:** Users who need to pause cannot save state; high drop-off risk for multi-product applicants; regulatory expectation that application progress is not lost
- **AC Ref:** DOD-03
- **Test Coverage:** INSTR-REG-GAP-001 (@RequirementGap — expected to FAIL)
- **Recommendation:** Raise as P0 defect immediately; confirm with development team

---

## High Risks

### RISK-04: FATCA Link Broken or Pointing to Wrong URL
- **Area:** Important Compliance Notice
- **Risk:** FATCA link URL changes at IRS or is incorrectly configured
- **Impact:** Regulatory non-compliance; U.S. customers cannot access required forms; legal risk for BOSL
- **AC Ref:** AC-04, DOD-02
- **Test Coverage:** INSTR-SMK-003, INSTR-REG-003
- **Recommendation:** Add automated link-health check to CI pipeline

### RISK-05: Product Instructions Show Wrong Content After Salesforce Field Type Change
- **Area:** Instruction Section — Rich Text Rendering
- **Risk:** Rich Text Area field type change (comment 11) may render HTML tags as literal text
- **Impact:** Users see malformed content; poor user experience; potential data integrity issue
- **AC Ref:** AC-03
- **Test Coverage:** INSTR-REG-004
- **Recommendation:** Verify Rich Text renders correctly across all products, not just Ordinary Savings

### RISK-06: External Links Not Opening in New Tab (Tab Hijacking)
- **Area:** All external hyperlinks
- **Risk:** If `target="_blank"` is missing `rel="noopener noreferrer"`, malicious pages could hijack the BOSL tab
- **Impact:** Security vulnerability; user trust risk; banking application credibility
- **AC Ref:** DOD-01
- **Test Coverage:** INSTR-SEC-001, INSTR-SEC-005
- **Recommendation:** Automated HTML audit of all anchor tags on deployment

### RISK-07: Back to Dashboard Gap — Navigation Dead End
- **Area:** Navigation — Back to Dashboard (DOD-04)
- **Risk:** "Back to Dashboard" button not present; "Back to Home" found instead
- **Impact:** If users have a dashboard, they cannot return to it mid-application; UX friction
- **AC Ref:** DOD-04
- **Test Coverage:** INSTR-REG-GAP-002 (@RequirementGap)
- **Recommendation:** Clarify with BA — is "Back to Home" the intended behaviour or is a Dashboard planned?

### RISK-08: Console Errors on Page Load
- **Area:** Application-wide
- **Risk:** 2 console errors detected during analysis (non-blocking but present)
- **Impact:** Could indicate underlying JS failures; may surface as user-visible errors under certain conditions
- **Test Coverage:** INSTR-SEC-002
- **Recommendation:** Dev team to investigate and resolve before production release

### RISK-09: Step Skipping via Direct URL Access
- **Area:** Registration Flow — Step Access Control
- **Risk:** Users could attempt to skip the Instruction Section by directly accessing Personal Information step
- **Impact:** Compliance risk — users bypass required instruction review before submitting application
- **AC Ref:** N/A (inferred from flow design)
- **Test Coverage:** INSTR-NEG-005
- **Recommendation:** Enforce server-side step validation; do not rely on client-side state alone

---

## Medium Risks

| # | Risk | Area | AC | Test |
|---|---|---|---|---|
| RISK-10 | Page refresh loses selected product state | Session Management | N/A | INSTR-EDGE-002 |
| RISK-11 | Accordion animation race condition on rapid clicks | Accordion Component | AC-07 | INSTR-EDGE-001 |
| RISK-12 | Instructions not tested for all product types (only Ordinary Savings tested) | Dynamic Content | AC-03 | INSTR-FUNC-006, INSTR-REG-002 |
| RISK-13 | Mobile/responsive not tested — required by AC-12 | Responsive Design | AC-12 | Not in current scope |

---

## Low Risks

| # | Risk | Area | Test |
|---|---|---|---|
| RISK-14 | Footer contact information outdated (phone/email changes) | Footer Content | Not generated |

---

## Defects Recommended for Immediate Raise

| ID | Title | Priority | Type |
|---|---|---|---|
| BUG-001 | "Save Progress" button missing from Instruction Section | P0 | Requirement Gap |
| BUG-002 | "Back to Dashboard" button missing — "Back to Home" found instead | P1 | Requirement Gap |
| BUG-003 | 2 console errors on /SelfRegister page load | P1 | Bug |
