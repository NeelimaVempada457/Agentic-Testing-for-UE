# Functional Test Cases — Registration Form: Instruction Section
# Ticket: BDBP1-202 | Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Source: COMBINED (Jira AC + Live App)

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | INSTR-FUNC-001 | CARICOM accordion shows correct identification and address requirements | P0 | Positive | Critical | COMBINED | AC-06b, AC-07 | `@Functional` `@P0` `@BDBP1-202` `@CARICOM` |
| 2 | INSTR-FUNC-002 | Non-Nationals accordion shows 2 government IDs and address proof requirements | P0 | Positive | Critical | COMBINED | AC-06c, AC-07 | `@Functional` `@P0` `@BDBP1-202` `@NonNationals` |
| 3 | INSTR-FUNC-003 | Self-Employed accordion shows differentiated ID requirements | P0 | Positive | Critical | COMBINED | AC-06d, AC-07 | `@Functional` `@P0` `@BDBP1-202` `@SelfEmployed` |
| 4 | INSTR-FUNC-004 | General Instructions section displays all 4 mandatory bullet points | P1 | Positive | High | COMBINED | AC-03 | `@Functional` `@P1` `@BDBP1-202` `@GeneralInstructions` |
| 5 | INSTR-FUNC-005 | Product description shows correct Ordinary Savings features and benefits | P1 | Positive | High | APP-ANALYSIS | AC-03 | `@Functional` `@P1` `@BDBP1-202` `@ProductDescription` |
| 6 | INSTR-FUNC-006 | Instructions displayed are specific to the selected product (Loans) | P0 | Positive | Critical | COMBINED | AC-03 | `@Functional` `@P0` `@BDBP1-202` `@DynamicInstructions` |
| 7 | INSTR-FUNC-007 | Back to Home button returns user to the home page | P1 | Positive | High | APP-ANALYSIS | N/A | `@Functional` `@P1` `@BDBP1-202` `@Navigation` |
| 8 | INSTR-FUNC-008 | BOSL branding is consistent on the Instruction Section page | P1 | Positive | Medium | COMBINED | AC-11 | `@Functional` `@P1` `@BDBP1-202` `@Branding` |

---

### INSTR-FUNC-001

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-001 |
| **Title** | CARICOM accordion shows correct identification and address requirements |
| **Priority** | P0 |
| **Module** | Instruction Section — CARICOM Accordion |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-06b, AC-07 |
| **Tags** | `@Functional` `@P0` `@BDBP1-202` `@Accordion` `@CARICOM` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Click "Resident Nationals of CARICOM (except ECCU territories)" accordion button<br>2. Observe the expanded content |
| **Expected Results** | 1. Accordion expands successfully<br>2. "Identification" section shows: Passport AND Driver's License or National Identification Card (2 forms)<br>3. "Residential Address" section shows all 6 valid document options: utility bill (3 months), tenancy agreement, reference letter (financial institution 1yr+), employer letter, combined living arrangement letter, bank statement (3 months)<br>4. "Additional Notes" section is NOT present (N/A per spec)<br>5. All other 3 accordion sections remain collapsed |

---

### INSTR-FUNC-002

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-002 |
| **Title** | Non-Nationals/Outside CARICOM accordion shows 2 government IDs and address proof requirements |
| **Priority** | P0 |
| **Module** | Instruction Section — Non-Nationals Accordion |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-06c, AC-07 |
| **Tags** | `@Functional` `@P0` `@BDBP1-202` `@Accordion` `@NonNationals` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Click "Non-Nationals / Residents Outside CARICOM" accordion button<br>2. Observe the expanded content |
| **Expected Results** | 1. Accordion expands successfully<br>2. "Identification" section specifies TWO forms of valid government-issued ID<br>3. Accepted IDs listed: Passport, National ID Card, Social Security Card, Driver's License, Voter's Card<br>4. "Residential Address" section shows all 6 valid proof-of-address options (same as CARICOM)<br>5. "Additional Notes" section is NOT present (N/A per spec) |

---

### INSTR-FUNC-003

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-003 |
| **Title** | Self-Employed accordion shows differentiated ID requirements for ECCU vs non-nationals |
| **Priority** | P0 |
| **Module** | Instruction Section — Self-Employed Accordion |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-06d, AC-07 |
| **Tags** | `@Functional` `@P0` `@BDBP1-202` `@Accordion` `@SelfEmployed` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Click "Self – Employed Individuals" accordion button<br>2. Observe the expanded content |
| **Expected Results** | 1. Accordion expands successfully<br>2. "Identification" section clearly shows: 1 form of Government-Issued Picture ID for ECCU and CARICOM nationals<br>3. "Identification" section clearly shows: 2 forms of Government-Issued Picture ID for Non-Nationals outside CARICOM<br>4. "Residential Address" section shows the same 6 proof-of-address options<br>5. No "Additional Notes" section (N/A per spec) |

---

### INSTR-FUNC-004

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-004 |
| **Title** | General Instructions section displays all 4 mandatory bullet points and DISCLAIMER |
| **Priority** | P1 |
| **Module** | Instruction Section — General Instructions |
| **Scenario Type** | Positive |
| **Risk Level** | High |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Functional` `@P1` `@BDBP1-202` `@GeneralInstructions` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Locate the "General Instructions" / "Instructions for completing the form" heading<br>3. Verify all 4 bullet points are present<br>4. Verify the DISCLAIMER paragraph |
| **Expected Results** | 1. Bullet 1: "Application document MUST be completed in its entirety."<br>2. Bullet 2: "No more than four (4) persons can be included on an account."<br>3. Bullet 3: AML policy statement about existing customers' information remaining up to date<br>4. Bullet 4: "A Personal Information Form to be completed and signed by each signatory to the account."<br>5. DISCLAIMER paragraph is present with bold "DISCLAIMER:" label |

---

### INSTR-FUNC-005

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-005 |
| **Title** | Product description displays correct Ordinary Savings features and benefits |
| **Priority** | P1 |
| **Module** | Instruction Section — Product Description |
| **Scenario Type** | Positive |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Functional` `@P1` `@BDBP1-202` `@ProductDescription` |
| **Preconditions** | 1. User selected "Ordinary Savings" and is on the Instruction Section |
| **Test Steps** | 1. Navigate to the Instruction Section for Ordinary Savings<br>2. Locate the product description block<br>3. Verify Features section content<br>4. Verify Benefits section content |
| **Expected Results** | 1. Product name "Ordinary Savings" is displayed with icon<br>2. Features lists: Must be 18 years and over; Minimum opening balance of $50 (Plus $10.00 Government Stamp Duty)<br>3. Benefits lists 6 items: Interest paid quarterly, Unlimited ATM deposits/withdrawals, Standing order facility, Utility bill payment, Complete Online Banking, Visa debit card access<br>4. Footnote: "* We reserve the right to review our product features, rates and fees in accordance with market conditions." |

---

### INSTR-FUNC-006

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-006 |
| **Title** | Instructions displayed are specific to the selected product (Loans product) |
| **Priority** | P0 |
| **Module** | Instruction Section — Dynamic Product Instructions |
| **Scenario Type** | Positive |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Functional` `@P0` `@BDBP1-202` `@DynamicInstructions` `@Loans` |
| **Preconditions** | 1. User navigates through the registration flow selecting "Loans" product |
| **Test Steps** | 1. Navigate to /SelfRegister as New Customer<br>2. Select "Loans" from the product list<br>3. Select a specific loan sub-product<br>4. Click Continue to reach the Instruction Section<br>5. Compare instructions vs Ordinary Savings instructions |
| **Expected Results** | 1. Instructions shown are specific to the selected Loans product<br>2. Content differs from Ordinary Savings instructions<br>3. Product name in heading reflects the selected loan type<br>4. Content is dynamically pulled from Salesforce (not hardcoded Savings content) |

---

### INSTR-FUNC-007

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-007 |
| **Title** | Back to Home button returns user to the home page |
| **Priority** | P1 |
| **Module** | Registration Form — Navigation |
| **Scenario Type** | Positive |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Functional` `@P1` `@BDBP1-202` `@Navigation` `@BackToHome` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Click "Back to Home" button (top of form area) |
| **Expected Results** | 1. User is navigated back to the home page (/)<br>2. Application state is cleared (or user is warned about losing progress)<br>3. Home page loads correctly with no errors |

---

### INSTR-FUNC-008

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-FUNC-008 |
| **Title** | BOSL branding (logo, colors, fonts) is consistent on the Instruction Section page |
| **Priority** | P1 |
| **Module** | Instruction Section — Branding |
| **Scenario Type** | Positive |
| **Risk Level** | Medium |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-11 |
| **Tags** | `@Functional` `@P1` `@BDBP1-202` `@Branding` `@UIConsistency` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Verify BOSL Digital Logo is present<br>3. Verify color scheme matches BOSL brand guidelines<br>4. Verify font styling is consistent<br>5. Compare with Home page branding |
| **Expected Results** | 1. BOSL Digital Logo visible in the form header area<br>2. Brand colors applied consistently (buttons, headings, accents)<br>3. Font family and sizes match BOSL branding standards across all steps<br>4. No broken images or placeholder assets visible<br>5. Styling is consistent between Instruction Section and Home page |
