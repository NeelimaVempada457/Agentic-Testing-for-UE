# Smoke Test Cases — Registration Form: Instruction Section
# Ticket: BDBP1-202 | Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Source: COMBINED (Jira AC + Live App)

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | INSTR-SMK-001 | Instruction Section loads with all required content after product selection | P0 | Positive | Critical | COMBINED | AC-03 | `@Smoke` `@P0` `@BDBP1-202` `@PageLoad` |
| 2 | INSTR-SMK-002 | All four residency-type accordion buttons are present and labelled correctly | P0 | Positive | Critical | COMBINED | AC-05 | `@Smoke` `@P0` `@BDBP1-202` `@Accordion` |
| 3 | INSTR-SMK-003 | FATCA compliance notice is displayed with a working hyperlink | P0 | Positive | Critical | COMBINED | AC-04, DOD-02 | `@Smoke` `@P0` `@BDBP1-202` `@FATCA` |
| 4 | INSTR-SMK-004 | Continue button navigates from Instruction Section to Personal Information | P0 | Positive | Critical | COMBINED | AC-10 | `@Smoke` `@P0` `@BDBP1-202` `@Navigation` |
| 5 | INSTR-SMK-005 | ECCU Territories accordion expands with correct identification requirements | P0 | Positive | Critical | COMBINED | AC-06a, AC-07 | `@Smoke` `@P0` `@BDBP1-202` `@Accordion` `@ECCU` |
| 6 | INSTR-SMK-006 | Left sidebar shows all 4 steps with Instructions highlighted as active | P0 | Positive | High | APP-ANALYSIS | AC-02 | `@Smoke` `@P0` `@BDBP1-202` `@Sidebar` |

---

### INSTR-SMK-001

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SMK-001 |
| **Title** | Instruction Section loads with all required content after selecting Ordinary Savings product |
| **Priority** | P0 |
| **Module** | Registration Form — Instruction Section |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Smoke` `@P0` `@BDBP1-202` `@Instructions` `@PageLoad` |
| **Preconditions** | 1. Application is accessible at https://bankofstlucia--digitalqa.sandbox.my.site.com/<br>2. User has navigated to /SelfRegister as New Customer<br>3. "Ordinary Savings" product has been selected |
| **Test Steps** | 1. Navigate to https://bankofstlucia--digitalqa.sandbox.my.site.com/<br>2. Click "Start Application"<br>3. Select "New Customer"<br>4. Select "Bank Accounts" → "Ordinary Savings"<br>5. Click "Continue"<br>6. Observe the Instruction Section page |
| **Expected Results** | 1. Page heading shows "Ordinary Savings Application"<br>2. "General Instructions" section is visible<br>3. DISCLAIMER text is visible<br>4. Product description for "Ordinary Savings" is displayed<br>5. "Important Compliance Notice" with FATCA link is visible<br>6. 4 residency-type accordion buttons are visible<br>7. "Continue" button is present and enabled<br>8. Left sidebar shows "Instructions" as the active step |

---

### INSTR-SMK-002

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SMK-002 |
| **Title** | All four residency-type accordion buttons are present and labelled correctly |
| **Priority** | P0 |
| **Module** | Registration Form — Instruction Section — Accordions |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-05 |
| **Tags** | `@Smoke` `@P0` `@BDBP1-202` `@Accordion` `@Buttons` |
| **Preconditions** | 1. User is on the Instruction Section page (post product selection) |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Scroll to "What documents do you need?" section<br>3. Verify all 4 buttons are visible and correctly labelled |
| **Expected Results** | 1. Button 1 label: "Individual (National) of ECCU Territories"<br>2. Button 2 label: "Resident Nationals of CARICOM (except ECCU territories)"<br>3. Button 3 label: "Non-Nationals / Residents Outside CARICOM"<br>4. Button 4 label: "Self – Employed Individuals"<br>5. All 4 buttons are clickable<br>6. No button is pre-expanded on page load |

---

### INSTR-SMK-003

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SMK-003 |
| **Title** | FATCA compliance notice is displayed with a working hyperlink to IRS.gov |
| **Priority** | P0 |
| **Module** | Registration Form — Instruction Section — Compliance Notice |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-04, DOD-02 |
| **Tags** | `@Smoke` `@P0` `@BDBP1-202` `@FATCA` `@ComplianceNotice` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Locate the "Important Compliance Notice" section<br>3. Verify the FATCA link text and URL<br>4. Click the FATCA link |
| **Expected Results** | 1. "Important Compliance Notice" heading (H3) is visible<br>2. Compliance text begins: "If you are a U.S. citizen or U.S. resident..."<br>3. "FATCA (Foreign Account Tax Compliance Act)" is a clickable hyperlink<br>4. Link URL is: https://www.irs.gov/businesses/corporations/fatca-related-forms<br>5. Link opens in a new browser tab<br>6. The IRS FATCA page loads successfully |

---

### INSTR-SMK-004

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SMK-004 |
| **Title** | Continue button navigates from Instruction Section to Personal Information |
| **Priority** | P0 |
| **Module** | Registration Form — Navigation |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-10 |
| **Tags** | `@Smoke` `@P0` `@BDBP1-202` `@Navigation` `@Continue` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Scroll to the bottom of the page<br>3. Click the "Continue" button |
| **Expected Results** | 1. User is advanced to the "Personal Information" section (Step 3)<br>2. Left sidebar updates to highlight "Personal Information" as the current step<br>3. "Instructions" step appears as completed in the sidebar<br>4. URL remains /SelfRegister<br>5. No error is displayed |

---

### INSTR-SMK-005

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SMK-005 |
| **Title** | ECCU Territories accordion expands and shows correct identification requirements |
| **Priority** | P0 |
| **Module** | Registration Form — Instruction Section — ECCU Accordion |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-06a, AC-07 |
| **Tags** | `@Smoke` `@P0` `@BDBP1-202` `@Accordion` `@ECCU` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Click "Individual (National) of ECCU Territories" button<br>2. Observe the expanded content |
| **Expected Results** | 1. Accordion expands to reveal content<br>2. "Identification" heading visible with: Passport, National Identification Card, Social Security Card, Driver's License, Voter's Card<br>3. "Residential Address" heading visible with "NO PROOF OF ADDRESS REQUIRED" for Saint Lucian Nationals<br>4. "Additional Notes" heading visible with Minors requirements<br>5. All other 3 accordions remain collapsed |

---

### INSTR-SMK-006

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SMK-006 |
| **Title** | Left sidebar step navigation displays all 4 steps with Instructions highlighted as active |
| **Priority** | P0 |
| **Module** | Registration Form — Step Navigation |
| **Scenario Type** | Positive |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-02 |
| **Tags** | `@Smoke` `@P0` `@BDBP1-202` `@Navigation` `@Sidebar` |
| **Preconditions** | 1. User is on the Instruction Section page (Step 2) |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Observe the left sidebar navigation |
| **Expected Results** | 1. 4 steps visible: Select Product, Instructions, Personal Information, Validation<br>2. Each step has an associated icon/image<br>3. "Instructions" step is visually highlighted as the current active step<br>4. Completed step (Select Product) is visually distinguishable from upcoming steps<br>5. Upcoming steps (Personal Information, Validation) are visually muted/inactive |
