# Requirements vs Application Analysis
# Ticket: BDBP1-202 — Registration Form: Instruction Section
# Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16

---

## Parsed Acceptance Criteria

| AC ID | Requirement | Source | Test Priority |
|---|---|---|---|
| AC-01 | Header and Footer are consistent on the Registration Page (per BDBP1-94) | Jira Description | P1 |
| AC-02 | Left Side component is consistent on the Registration Page (per BDBP1-95) | Jira Description | P1 |
| AC-03 | Product-specific instructions displayed based on product selected in prior screen | Jira Description | P0 |
| AC-04 | Important FATCA compliance notice displayed for U.S. citizens/residents | Jira Description | P0 |
| AC-05 | Four residency-type buttons presented: ECCU Nationals, CARICOM Residents, Non-Nationals/Outside CARICOM, Self-Employed | Jira Description | P0 |
| AC-06a | ECCU National button → shows: 1 government ID; No proof of address for Saint Lucian nationals | Jira Description | P0 |
| AC-06b | CARICOM Resident button → shows: Passport + Driver's License or National ID; proof of address required | Jira Description | P0 |
| AC-06c | Non-National/Outside CARICOM button → shows: 2 government IDs; proof of address required | Jira Description | P0 |
| AC-06d | Self-Employed button → shows: 1 ID (ECCU/CARICOM) or 2 IDs (non-nationals); proof of address required | Jira Description | P0 |
| AC-07 | Collapsible accordion component for document requirement categories | Jira Description | P0 |
| AC-08 | Only one accordion section expanded at a time | Jira Description | P0 |
| AC-09 | Accordion auto-closes when another is opened | Jira Description | P0 |
| AC-10 | Continue button navigates to Personal Information section | Jira Description | P0 |
| AC-11 | BOSL branding (colors, fonts, logo) applied consistently | Jira Description | P1 |
| AC-12 | Responsive design verified across desktop and mobile | Jira Description | P1 |
| DOD-01 | All hyperlinks and buttons open in a new tab | Definition of Done | P1 |
| DOD-02 | FATCA link displayed and opens correctly | Definition of Done | P0 |
| DOD-03 | Save Progress button functions as expected | Definition of Done | P1 |
| DOD-04 | Back to Dashboard button functions as expected | Definition of Done | P1 |

---

## Ambiguities Identified

| # | Ambiguity | Impact |
|---|---|---|
| AMB-01 | Acceptance Criteria section in Jira shows only "*" — full AC is embedded in description body | Risk: some criteria may be missed |
| AMB-02 | "Product-specific instructions dynamically pulled from Salesforce" — exact field names and product list not specified in ticket | Risk: cannot enumerate all products without Salesforce access |
| AMB-03 | Minor account requirements (no picture ID) — unclear how the UI handles this edge case | Risk: edge case may be untested |
| AMB-04 | FATCA notice — exact trigger condition (U.S. citizenship checkbox?) not described in UI terms | Risk: cannot verify trigger without Figma/app access |
| AMB-05 | "Disclaimer" mentioned in comment 13 — not formally documented in AC | Risk: disclaimer content/placement not in scope |

---

## App vs Requirements Cross-Reference
*(Populated after live app analysis in STEP 4)*

| AC ID | Status | Notes |
|---|---|---|
| AC-01 | PENDING VERIFICATION | — |
| AC-02 | PENDING VERIFICATION | — |
| AC-03 | PENDING VERIFICATION | — |
| AC-04 | PENDING VERIFICATION | — |
| AC-05 | PENDING VERIFICATION | — |
| AC-06a | PENDING VERIFICATION | — |
| AC-06b | PENDING VERIFICATION | — |
| AC-06c | PENDING VERIFICATION | — |
| AC-06d | PENDING VERIFICATION | — |
| AC-07 | PENDING VERIFICATION | — |
| AC-08 | PENDING VERIFICATION | — |
| AC-09 | PENDING VERIFICATION | — |
| AC-10 | PENDING VERIFICATION | — |
| AC-11 | PENDING VERIFICATION | — |
| AC-12 | PENDING VERIFICATION | — |
| DOD-01 | PENDING VERIFICATION | — |
| DOD-02 | PENDING VERIFICATION | — |
| DOD-03 | PENDING VERIFICATION | — |
| DOD-04 | PENDING VERIFICATION | — |
