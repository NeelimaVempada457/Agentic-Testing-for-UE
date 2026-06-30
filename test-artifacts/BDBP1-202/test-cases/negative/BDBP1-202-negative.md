# Negative Test Cases — Registration Form: Instruction Section
# Ticket: BDBP1-202 | Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Source: COMBINED (Jira AC + Live App)

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | INSTR-NEG-001 | Clicking Continue without selecting a product shows validation error | P0 | Negative | Critical | APP-ANALYSIS | N/A | `@Negative` `@P0` `@BDBP1-202` `@Validation` |
| 2 | INSTR-NEG-002 | Clicking Continue on Bank Accounts without sub-product shows validation | P0 | Negative | Critical | APP-ANALYSIS | N/A | `@Negative` `@P0` `@BDBP1-202` `@Validation` |
| 3 | INSTR-NEG-003 | Accordion content is not visible before a button is clicked | P1 | Negative | High | COMBINED | AC-07, AC-08 | `@Negative` `@P1` `@BDBP1-202` `@Accordion` |
| 4 | INSTR-NEG-004 | Two accordion sections cannot be open simultaneously | P0 | Negative | Critical | COMBINED | AC-08 | `@Negative` `@P0` `@BDBP1-202` `@Accordion` |
| 5 | INSTR-NEG-005 | Direct URL access to Instruction Section without product selection redirects | P1 | Negative | High | APP-ANALYSIS | N/A | `@Negative` `@P1` `@BDBP1-202` `@AccessControl` |
| 6 | INSTR-NEG-006 | Clicking an already-open accordion collapses it | P1 | Negative | Medium | APP-ANALYSIS | AC-07 | `@Negative` `@P1` `@BDBP1-202` `@Accordion` |
| 7 | INSTR-NEG-007 | Existing Customer flow does not lead to the new registration Instruction Section | P1 | Negative | High | APP-ANALYSIS | N/A | `@Negative` `@P1` `@BDBP1-202` `@CustomerType` |

---

### INSTR-NEG-001

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-NEG-001 |
| **Title** | Clicking Continue on Select Product without selecting a product shows validation error |
| **Priority** | P0 |
| **Module** | Select Product — Validation |
| **Scenario Type** | Negative |
| **Risk Level** | Critical |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Negative` `@P0` `@BDBP1-202` `@Validation` `@ProductSelection` |
| **Preconditions** | 1. User is on the Select Product screen (Step 1)<br>2. No product has been selected |
| **Test Steps** | 1. Navigate to /SelfRegister as New Customer<br>2. Do NOT select any product category<br>3. Click the "Continue" button |
| **Expected Results** | 1. Form does not advance to the Instruction Section<br>2. Validation message displayed: "Please select a product to continue." (or equivalent)<br>3. User remains on Step 1 — Select Product<br>4. No API or navigation call is made |

---

### INSTR-NEG-002

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-NEG-002 |
| **Title** | Clicking Continue on Bank Accounts without selecting a sub-product shows validation |
| **Priority** | P0 |
| **Module** | Select Product — Sub-Product Validation |
| **Scenario Type** | Negative |
| **Risk Level** | Critical |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Negative` `@P0` `@BDBP1-202` `@Validation` `@SubProductSelection` |
| **Preconditions** | 1. User selected "Bank Accounts" category but no sub-product |
| **Test Steps** | 1. Navigate to /SelfRegister as New Customer<br>2. Click "Bank Accounts" (category level only)<br>3. Do NOT select any sub-product (A+ Club / HomeStart / Ordinary Savings)<br>4. Click "Continue" |
| **Expected Results** | 1. Validation error shown: "Please select a product to continue."<br>2. User remains on the product selection screen<br>3. No navigation to the Instruction Section occurs |

---

### INSTR-NEG-003

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-NEG-003 |
| **Title** | Accordion content is not visible before any button is clicked (default collapsed state) |
| **Priority** | P1 |
| **Module** | Instruction Section — Accordion Default State |
| **Scenario Type** | Negative |
| **Risk Level** | High |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-07, AC-08 |
| **Tags** | `@Negative` `@P1` `@BDBP1-202` `@Accordion` `@DefaultState` |
| **Preconditions** | 1. User has just arrived on the Instruction Section page (no accordion clicked) |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Observe all 4 accordion buttons without clicking any |
| **Expected Results** | 1. All 4 accordion panels are collapsed/hidden by default<br>2. No document requirement content is visible without user interaction<br>3. Accordion toggle arrows/icons indicate "closed" state<br>4. No aria-expanded="true" on any accordion button |

---

### INSTR-NEG-004

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-NEG-004 |
| **Title** | Two accordion sections cannot be open simultaneously |
| **Priority** | P0 |
| **Module** | Instruction Section — Accordion Mutual Exclusion |
| **Scenario Type** | Negative |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-08 |
| **Tags** | `@Negative` `@P0` `@BDBP1-202` `@Accordion` `@MutualExclusion` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Click "Individual (National) of ECCU Territories" — verify it opens<br>2. Click "Resident Nationals of CARICOM" — verify it opens<br>3. Verify ECCU accordion state (should be closed)<br>4. Click "Non-Nationals / Residents Outside CARICOM" — verify it opens<br>5. Verify CARICOM accordion state (should be closed) |
| **Expected Results** | 1. When CARICOM is clicked, ECCU automatically closes<br>2. When Non-Nationals is clicked, CARICOM automatically closes<br>3. At NO point are 2 or more accordions simultaneously open<br>4. This mutual exclusion holds for all 4 button combinations |

---

### INSTR-NEG-005

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-NEG-005 |
| **Title** | Direct URL access to Instruction Section without product selection redirects or shows error |
| **Priority** | P1 |
| **Module** | Registration Form — Step Access Control |
| **Scenario Type** | Negative |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Negative` `@P1` `@BDBP1-202` `@Navigation` `@DirectAccess` |
| **Preconditions** | 1. User has NOT completed product selection |
| **Test Steps** | 1. Open a fresh browser session<br>2. Navigate directly to https://bankofstlucia--digitalqa.sandbox.my.site.com/SelfRegister<br>3. Attempt to access the Instructions step without completing Step 1 |
| **Expected Results** | 1. User is redirected to Step 1 (Select Product) OR Instructions content is not accessible without prior step completion<br>2. Application enforces the step order<br>3. No blank, broken, or error page is shown |

---

### INSTR-NEG-006

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-NEG-006 |
| **Title** | Clicking an already-open accordion collapses it |
| **Priority** | P1 |
| **Module** | Instruction Section — Accordion Toggle |
| **Scenario Type** | Negative |
| **Risk Level** | Medium |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-07 |
| **Tags** | `@Negative` `@P1` `@BDBP1-202` `@Accordion` `@Toggle` |
| **Preconditions** | 1. User is on the Instruction Section page<br>2. One accordion is already open |
| **Test Steps** | 1. Click "Individual (National) of ECCU Territories" to expand it<br>2. Click the same "Individual (National) of ECCU Territories" button again |
| **Expected Results** | 1. The accordion collapses/closes on the second click<br>2. Content is hidden<br>3. Toggle icon returns to the "closed" state<br>4. No error is thrown |

---

### INSTR-NEG-007

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-NEG-007 |
| **Title** | Existing Customer flow does not lead to the new registration Instruction Section |
| **Priority** | P1 |
| **Module** | Customer Type Selection |
| **Scenario Type** | Negative |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Negative` `@P1` `@BDBP1-202` `@CustomerType` `@ExistingCustomer` |
| **Preconditions** | 1. User is on the home page |
| **Test Steps** | 1. Click "Start Application"<br>2. Select "Existing Customer"<br>3. Observe the resulting flow |
| **Expected Results** | 1. User is NOT taken to /SelfRegister (new customer registration flow)<br>2. User is directed to an existing customer journey (login or different form)<br>3. The new customer Instruction Section is not accessible via the existing customer path |
