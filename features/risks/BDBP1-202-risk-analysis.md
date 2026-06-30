# Risk Analysis: BDBP1-202
## Registration Form — Instruction Section

**Generated:** 2026-05-15  
**Ticket Status:** UAT Deployed | QA Task: Done (BDBP1-516)

---

## Risk Register

| # | Risk | Likelihood | Impact | Severity | Mitigation |
|---|------|-----------|--------|----------|------------|
| R1 | Salesforce API unavailable causes blank/crashed instruction section | Medium | High | **High** | Negative scenario covers graceful fallback; confirm fallback message text with product team |
| R2 | Broken FATCA or KYC links fail silently (no user feedback) | Medium | High | **High** | Negative scenario tests broken link behaviour; Definition of Done requires all links verified |
| R3 | Accordion allows multiple sections open simultaneously | Low | Medium | **Medium** | Two edge case scenarios directly test mutual exclusivity invariant |
| R4 | Step navigation guard (BDBP1-408) inactive in test environment allows skipping Instructions | Low | High | **Medium** | Negative scenario guards against this; verify BDBP1-408 is active in QA env before running |
| R5 | Session expiry not handled — partial application data exposed | Low | High | **Medium** | Security/Negative session expiry scenario covers this; critical for banking portal |
| R6 | Product instruction ordering incorrect when multiple products selected | Low | Medium | **Low** | Comment #13 confirms ordering approved by Prachi; manual spot-check recommended |
| R7 | Mobile viewport breaks accordion or navigation button layout | Medium | Medium | **Medium** | Accessibility mobile scenario covers 375px viewport |
| R8 | CSRF vulnerability on Save Progress endpoint | Low | High | **Medium** | Security scenario covers CSRF protection; verify server-side token validation |
| R9 | Minor account KYC note in ECCU section missing or incorrect | Low | Low | **Low** | Informational display — manual verification against KYC Checklist PDF (attached) |
| R10 | Branding inconsistency across Registration Form pages | Low | Medium | **Low** | AC-1/AC-2 positive scenario covers header/footer/left-side component consistency |

---

## Gap Analysis

### Coverage Gaps

| Gap | Reason Not Covered | Recommendation |
|-----|--------------------|----------------|
| Minor account KYC flow | Not an interactive flow — informational text only | Manual verification against `Retail & Corporate KYC Checklist 2025 (1).pdf` (attached to ticket) |
| Exact Salesforce error message | Message not specified in ticket | Confirm with product owner before automation |
| Multi-product instruction ordering | Display order confirmed by PM but no automated order assertion | Add ordering assertion once confirmed stable |
| Disclaimer text content | Comment #13 mentions a disclaimer was added — exact text not in ticket | Locate disclaimer text in Salesforce / Figma and add content assertion |

---

## Dependency Risks

| Dependency | Risk |
|------------|------|
| BDBP1-94 (Header/Footer) | If header/footer story has defects, AC-1 scenarios will fail — not a BDBP1-202 defect |
| BDBP1-95 (Left side component) | Same as above for left-side component |
| BDBP1-408 (Step Navigation) | Step guard must be active for the "cannot skip" negative scenario to pass |
| Salesforce `Product_Instructions__c` field | Changed from Text Area Long to Rich Text Area (Comment #11) — verify QA environment has this schema migration applied |

---

## Notes from Ticket History

- **Bug BDBP1-529** (content/formatting mismatch) was fixed and marked Completed before UAT. The related positive scenarios verify that content matches Salesforce.
- **Comment #7 (Namratha)**: Instructions must be dynamically pulled from Salesforce — not hardcoded. This is the highest-risk integration point.
- **Comment #11 (Arnav)**: `Product_Instructions__c` field changed to Rich Text Area. Ensure the QA environment schema reflects this change.
- **Comment #13 (Arnav)**: Instruction ordering (items 3 and 4) confirmed by Prachi; disclaimer required — verify disclaimer text in the feature before running content assertion tests.
- **Comment #14 (Madhu)**: All products and residency types confirmed working in UAT screenshot evidence — 5 screenshots and 1 video attached as baseline.
