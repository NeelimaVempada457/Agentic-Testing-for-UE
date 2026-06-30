# Regression Test Cases — Registration Form: Instruction Section
# Ticket: BDBP1-202 | Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Source: COMBINED (Jira AC + Live App)
# Note: Run this suite after every deployment to /SelfRegister or Salesforce instruction data changes

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | INSTR-REG-001 | End-to-end: Home → New Customer → Ordinary Savings → Instruction Section loads | P0 | Regression | Critical | COMBINED | AC-03, AC-05, AC-07, AC-10 | `@Regression` `@P0` `@BDBP1-202` `@E2E` |
| 2 | INSTR-REG-002 | Instruction Section shows correct product-specific content for Loans product | P0 | Regression | Critical | COMBINED | AC-03 | `@Regression` `@P0` `@BDBP1-202` `@DynamicContent` |
| 3 | INSTR-REG-003 | FATCA link remains functional after application updates | P0 | Regression | Critical | COMBINED | AC-04, DOD-02 | `@Regression` `@P0` `@BDBP1-202` `@FATCA` |
| 4 | INSTR-REG-004 | All 4 accordion buttons display correct content after Salesforce field type change | P0 | Regression | Critical | JIRA-BDBP1-202 | AC-06a–d | `@Regression` `@P0` `@BDBP1-202` `@RichText` |
| 5 | INSTR-REG-005 | Continue button advances to Personal Information and not any other step | P0 | Regression | Critical | COMBINED | AC-10 | `@Regression` `@P0` `@BDBP1-202` `@Navigation` |
| 6 | INSTR-REG-006 | Header and footer are consistent across all registration flow steps | P1 | Regression | High | COMBINED | AC-01 | `@Regression` `@P1` `@BDBP1-202` `@Header` `@Footer` |
| 7 | INSTR-REG-007 | Left sidebar navigation component is consistent with BDBP1-95 specification | P1 | Regression | High | JIRA-BDBP1-202 | AC-02 | `@Regression` `@P1` `@BDBP1-202` `@Sidebar` |

---

### INSTR-REG-001

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-REG-001 |
| **Title** | End-to-end flow: Home → New Customer → Ordinary Savings → Instruction Section loads |
| **Priority** | P0 |
| **Module** | Full Registration Flow |
| **Scenario Type** | Regression |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-03, AC-05, AC-07, AC-10 |
| **Tags** | `@Regression` `@P0` `@BDBP1-202` `@E2E` `@CoreFlow` |
| **Preconditions** | 1. Application is accessible at https://bankofstlucia--digitalqa.sandbox.my.site.com/ |
| **Test Steps** | 1. Navigate to home page<br>2. Click "Start Application"<br>3. Select "New Customer"<br>4. Select "Bank Accounts" → "Ordinary Savings"<br>5. Click "Continue"<br>6. Verify Instruction Section content<br>7. Expand each of the 4 accordion buttons one by one<br>8. Verify FATCA link is present<br>9. Click "Continue" to Personal Information |
| **Expected Results** | 1. Each step transitions correctly without errors<br>2. Instruction Section displays with all required sections<br>3. All 4 accordion buttons expand with correct content<br>4. ECCU accordion auto-closes when CARICOM is opened (and vice versa)<br>5. Continue navigates to Personal Information (Step 3)<br>6. No JS errors in console throughout the flow |

---

### INSTR-REG-002

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-REG-002 |
| **Title** | Instruction Section displays correct product-specific content for Loans product |
| **Priority** | P0 |
| **Module** | Instruction Section — Product Switching |
| **Scenario Type** | Regression |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Regression` `@P0` `@BDBP1-202` `@DynamicContent` `@Loans` |
| **Preconditions** | 1. Application is accessible |
| **Test Steps** | 1. Navigate as New Customer<br>2. Select "Loans" product<br>3. Select a specific loan sub-product<br>4. Click Continue to reach the Instruction Section<br>5. Note the instruction content displayed<br>6. Repeat with "Credit Cards" product and compare |
| **Expected Results** | 1. Instructions differ between product types<br>2. No Ordinary Savings content is shown for Loans or Credit Cards<br>3. Product name in heading matches the selected product<br>4. Salesforce-driven dynamic content loads correctly for each product type |

---

### INSTR-REG-003

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-REG-003 |
| **Title** | FATCA link remains functional after application updates |
| **Priority** | P0 |
| **Module** | Instruction Section — FATCA Link |
| **Scenario Type** | Regression |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-04, DOD-02 |
| **Tags** | `@Regression` `@P0` `@BDBP1-202` `@FATCA` `@LinkIntegrity` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Click the "FATCA (Foreign Account Tax Compliance Act)" link<br>3. Verify the target page loads |
| **Expected Results** | 1. Link points to: https://www.irs.gov/businesses/corporations/fatca-related-forms<br>2. Link opens in a new browser tab<br>3. IRS FATCA page loads without error (not a 404 or broken URL) |

---

### INSTR-REG-004

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-REG-004 |
| **Title** | All 4 accordion buttons display correct rich text content after Salesforce field type change |
| **Priority** | P0 |
| **Module** | Instruction Section — Accordion Content Integrity |
| **Scenario Type** | Regression |
| **Risk Level** | Critical |
| **Source** | JIRA-BDBP1-202 |
| **Jira AC Ref** | AC-06a, AC-06b, AC-06c, AC-06d |
| **Tags** | `@Regression` `@P0` `@BDBP1-202` `@Accordion` `@RichText` `@Salesforce` |
| **Preconditions** | 1. User is on the Instruction Section page<br>2. Note: Salesforce field changed from Text Area Long to Rich Text Area (per Jira comment 11) |
| **Test Steps** | 1. Expand "Individual (National) of ECCU Territories" — verify content renders as formatted text<br>2. Click "Resident Nationals of CARICOM" — verify auto-close of ECCU and content accuracy<br>3. Click "Non-Nationals / Residents Outside CARICOM" — verify content<br>4. Click "Self – Employed Individuals" — verify differentiated ID requirements |
| **Expected Results** | 1. All 4 accordion sections display rich text content correctly (no raw HTML or escaped characters)<br>2. Bullet lists render as proper formatted lists (not literal `<ul><li>` text)<br>3. Bold text renders correctly<br>4. Identification counts are correct per residency type: ECCU=1 ID, CARICOM=2 IDs, Non-Nationals=2 IDs, Self-Employed=1 or 2 IDs based on residency |

---

### INSTR-REG-005

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-REG-005 |
| **Title** | Continue button advances to Personal Information — not to any other step |
| **Priority** | P0 |
| **Module** | Instruction Section — Navigation Integrity |
| **Scenario Type** | Regression |
| **Risk Level** | Critical |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-10 |
| **Tags** | `@Regression` `@P0` `@BDBP1-202` `@Navigation` `@StepOrder` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Click the "Continue" button on the Instruction Section<br>2. Observe which step is loaded next |
| **Expected Results** | 1. User is taken to Step 3: Personal Information<br>2. URL remains /SelfRegister<br>3. Left sidebar now highlights "Personal Information" as the current step<br>4. "Instructions" step in the sidebar shows as completed<br>5. No step is skipped (Validation is NOT loaded next) |

---

### INSTR-REG-006

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-REG-006 |
| **Title** | Header and footer are consistent across all registration flow steps |
| **Priority** | P1 |
| **Module** | Registration Form — Page Consistency |
| **Scenario Type** | Regression |
| **Risk Level** | High |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-01 |
| **Tags** | `@Regression` `@P1` `@BDBP1-202` `@Header` `@Footer` `@Consistency` |
| **Preconditions** | 1. User navigates through the entire registration flow |
| **Test Steps** | 1. Note header/footer on home page<br>2. Navigate to Select Product — note header/footer<br>3. Navigate to Instruction Section — note header/footer<br>4. Navigate to Personal Information — note header/footer<br>5. Compare across all steps |
| **Expected Results** | 1. BOSL Digital Logo is consistent on all pages<br>2. Footer content (contact info, links, copyright) is consistent across all steps<br>3. No header/footer elements appear broken or differently styled across steps<br>4. Navigation elements in the header behave consistently throughout the flow |

---

### INSTR-REG-007

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-REG-007 |
| **Title** | Left sidebar navigation component is consistent with BDBP1-95 specification |
| **Priority** | P1 |
| **Module** | Registration Form — Left Sidebar |
| **Scenario Type** | Regression |
| **Risk Level** | High |
| **Source** | JIRA-BDBP1-202 |
| **Jira AC Ref** | AC-02 |
| **Tags** | `@Regression` `@P1` `@BDBP1-202` `@Sidebar` `@Navigation` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Verify the left sidebar step navigation<br>3. Cross-reference visually with BDBP1-95 acceptance criteria |
| **Expected Results** | 1. Sidebar shows 4 steps: Select Product, Instructions, Personal Information, Validation<br>2. Each step has an associated icon/image<br>3. Current step (Instructions) is visually active/highlighted<br>4. Completed step (Select Product) is visually differentiated from upcoming steps<br>5. Upcoming steps are visually muted/inactive |
