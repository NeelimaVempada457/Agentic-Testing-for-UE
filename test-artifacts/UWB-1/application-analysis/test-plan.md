# UWB-1: New Submission Form — Live App Analysis Test Plan

## Application Overview

Live crawl and discrepancy analysis of the United Educators UW Workbench New Submission form at https://united-educators-application.vercel.app/submissions/new. This test plan covers functional verification of all 18 acceptance criteria (AC-01 through AC-18) for Jira story UWB-1: NB-01 Create New Submission for New Business and Cross Sell. The form allows underwriters to create new insurance submissions by specifying submission type, account, policy dates, products, brokerage, underwriting team, notes, documents, and stage. Analysis was performed on 2026-05-27 against 5 confirmed discrepancies (D-01 through D-05 of original 6; D-04 resolved).

## Test Scenarios

### 1. Submission Type

**Seed:** `tests/seed.spec.ts`

#### 1.1. INSTR-FUNC-001: Submission Type defaults to New Business and renders as card-style buttons

**File:** `tests/UWB-1/functional/INSTR-FUNC-001.spec.ts`

**Steps:**
  1. Navigate to https://united-educators-application.vercel.app and click the 'New Submission' button on the dashboard
    - expect: Page URL becomes /submissions/new
    - expect: Form loads with 'Create New Submission' heading
  2. Observe the Submission Type section
    - expect: Two card-style buttons are present: 'New Business' and 'Cross-Sell'
    - expect: 'New Business' card shows 'Selected' badge indicating it is pre-selected by default
    - expect: No dropdown or standard HTML select is used — cards have icons, names, and descriptions
  3. Click the 'Cross-Sell' card
    - expect: 'Cross-Sell' card shows 'Selected' badge
    - expect: 'New Business' card loses Selected badge
    - expect: Only one card can be selected at a time
  4. Click the 'New Business' card
    - expect: 'New Business' card shows 'Selected' badge again
    - expect: 'Cross-Sell' card is deselected

### 2. Account Search

**Seed:** `tests/seed.spec.ts`

#### 2.1. INSTR-FUNC-002: Account search filters results and shows no-results message (AC-02, AC-04)

**File:** `tests/UWB-1/functional/INSTR-FUNC-002.spec.ts`

**Steps:**
  1. Navigate to /submissions/new
    - expect: Form loads with Account Name field showing 'Search accounts by name, city, or type…'
  2. Click the Account Name search button
    - expect: Inline search panel opens with text input and list of 24 accounts
  3. Type 'Riverside' in the search input
    - expect: Results filter to show only 'Riverside Unified School District'
    - expect: Footer shows '1 account · Type to filter'
  4. Clear the search field and type 'XXXXXXNOTFOUND'
    - expect: 'No accounts found' message appears
    - expect: Footer shows '0 accounts · Type to filter'
  5. Clear the search and type 'Georgetown', then click on 'Georgetown University'
    - expect: Account is selected
    - expect: Account Name field shows 'Georgetown University' with account number
    - expect: Confirmation message: 'Account #XXXX resolved · Brokerage & team auto-populated'

#### 2.2. INSTR-FUNC-003: Brokerage auto-populates as read-only after account selection (AC-09, AC-10)

**File:** `tests/UWB-1/functional/INSTR-FUNC-003.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and select 'Riverside Unified School District' as the account
    - expect: Account selected successfully
  2. Observe the Brokerage section
    - expect: Brokerage field shows an auto-populated value (e.g., 'Gallagher Education, Inc.')
    - expect: Broker Contact field shows a contact name
    - expect: Broker Email field shows an email address
    - expect: Broker Phone field shows a phone number
    - expect: Brokerage section header changes from 'Account Required' to 'Auto-populated'
    - expect: All four fields are read-only — no input or combobox controls
  3. Attempt to click or type in the Brokerage field
    - expect: Field is non-interactive — cannot be edited

### 3. Policy Dates

**Seed:** `tests/seed.spec.ts`

#### 3.1. INSTR-FUNC-004: Expiration Date auto-populates to Effective Date plus 1 year (AC-06)

**File:** `tests/UWB-1/functional/INSTR-FUNC-004.spec.ts`

**Steps:**
  1. Navigate to /submissions/new
    - expect: Policy section shows Need By Date, Effective Date, and Expiration Date fields
  2. Click on the Effective Date input and type '07012025' (representing 2025-07-01)
    - expect: Effective Date field shows 2025-07-01
  3. Observe the Expiration Date field after setting the Effective Date
    - expect: Expiration Date auto-populates to 2026-07-01 (one year after Effective Date)
    - expect: Helper text 'Auto-set to +1 year from effective' appears below Expiration Date
  4. Observe the Need By Date field
    - expect: Need By Date remains empty — auto-population to Effective Date minus 5 days is NOT working (known discrepancy DISC-003)

#### 3.2. INSTR-FUNC-005: Expiration Date is mandatory but lacks asterisk indicator (AC-06, DISC-001)

**File:** `tests/UWB-1/functional/INSTR-FUNC-005.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and observe the Policy section field labels
    - expect: 'Need By Date' label has an asterisk (*) indicating mandatory
    - expect: 'Effective Date' label has an asterisk (*) indicating mandatory
    - expect: 'Expiration Date' label does NOT have an asterisk — known discrepancy DISC-001
  2. Check the required fields notice at the bottom of the form
    - expect: Notice reads: 'Required: Account Name, Product(s), Need By Date, and Effective Date'
    - expect: Expiration Date is NOT listed in the required fields notice despite being mandatory per spec

### 4. Products

**Seed:** `tests/seed.spec.ts`

#### 4.1. INSTR-FUNC-006: Products multi-select shows grouped options and selected items as removable cards (AC-05, AC-18)

**File:** `tests/UWB-1/functional/INSTR-FUNC-006.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and click the 'Select one or more products…' button
    - expect: Dropdown opens showing products grouped by category: GL (General Liability), ML (Management Liability), PL (Professional Liability), AR (Assumed Reinsurance), EL (Excess Liability)
  2. Click on 'Primary General Liability (CGL)'
    - expect: Product is selected (checkmark icon appears)
    - expect: Counter shows '1 selected · click to toggle'
  3. Click on 'Educators Legal Liability (ELL)'
    - expect: Second product is selected
    - expect: Counter shows '2 selected · click to toggle'
  4. Close the dropdown by pressing Escape
    - expect: Both selected products appear as cards in the button display area
    - expect: Each card shows the category code badge (GL, ML) and product name
    - expect: Each card has a remove (×) button
    - expect: Text below shows '2 products selected'
  5. Click the × button on one of the product cards
    - expect: That product is removed from selection
    - expect: Counter updates to '1 products selected'

### 5. Submission Stage

**Seed:** `tests/seed.spec.ts`

#### 5.1. INSTR-FUNC-007: Stage defaults to Incomplete Submission and is editable (AC-07, AC-13, AC-17)

**File:** `tests/UWB-1/functional/INSTR-FUNC-007.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and observe the Submission Stage section
    - expect: Current Stage button shows 'Intake & Triage / Incomplete Submission' as the default value
  2. Click the Current Stage button to open the dropdown
    - expect: Stage options grouped by phase appear: Intake & Triage, Underwriting, Quoting, Decision, Post-Bind
    - expect: 'Incomplete Submission' in Intake & Triage group has a selected indicator
  3. Click 'Quote In Progress' under the Quoting group
    - expect: Stage button updates to show 'Quoting / Quote In Progress'
  4. Click the Stage button again and select 'Incomplete Submission'
    - expect: Stage reverts to 'Intake & Triage / Incomplete Submission'

### 6. Underwriting Team

**Seed:** `tests/seed.spec.ts`

#### 6.1. INSTR-FUNC-008: Underwriting Team auto-populates on account selection but fields are incorrectly editable (AC-09, AC-10 — DISC-002)

**File:** `tests/UWB-1/functional/INSTR-FUNC-008.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and observe the Underwriting Team section before account selection
    - expect: Both Underwriter and Underwriting Specialist show 'Select an account above' placeholder
    - expect: Section header shows 'Account Required' badge
  2. Select 'Riverside Unified School District' as the account
    - expect: Underwriting Team section header changes to 'Auto-populated'
    - expect: Underwriter field auto-populates with a value (e.g., 'Sarah Mitchell — Underwriter')
    - expect: Underwriting Specialist field auto-populates with a value (e.g., 'David Park — UW Specialist')
  3. Attempt to change the Underwriter value by clicking the dropdown and selecting a different option
    - expect: KNOWN DISCREPANCY (DISC-002 / D-01): The field IS editable — user can change the auto-populated value
    - expect: Expected behavior per AC-10: field should be read-only/non-editable after auto-population
  4. Inspect the Underwriter field HTML
    - expect: Field is a <select> element with disabled=false
    - expect: Per AC-10, it should be disabled=true or replaced with a read-only display element

### 7. Documents

**Seed:** `tests/seed.spec.ts`

#### 7.1. INSTR-FUNC-009: Document upload accepts correct file types with .doc missing (DISC-005)

**File:** `tests/UWB-1/functional/INSTR-FUNC-009.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and observe the Submission Documents section
    - expect: Drop zone is present with text 'Drop files here or click to browse'
    - expect: Helper text reads 'PDF, DOCX, XLSX, PNG · Max 25 MB per file'
    - expect: UI text does NOT list JPG despite it being accepted
  2. Inspect the file input accept attribute using browser developer tools
    - expect: accept attribute is '.pdf,.docx,.xlsx,.png,.jpg,.jpeg'
    - expect: .doc extension is ABSENT — known discrepancy DISC-005
    - expect: .jpg/.jpeg are present (fixed since 2026-05-19 run)
  3. Click the 'Add Document' button or click the drop zone
    - expect: File picker opens
    - expect: User can select PDF, DOCX, XLSX, PNG, JPG files
    - expect: User CANNOT select .doc files from the browser file picker due to missing accept attribute

### 8. Cancel Dialog

**Seed:** `tests/seed.spec.ts`

#### 8.1. INSTR-FUNC-010: Cancel dialog shows 3 buttons instead of spec-required 2 (DISC-004 / D-02)

**File:** `tests/UWB-1/functional/INSTR-FUNC-010.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and fill at least one field (e.g., select an account)
    - expect: Form has some data entered
  2. Click the 'Cancel' button at the bottom of the form
    - expect: Dialog appears with title 'Discard this submission?'
    - expect: Dialog contains descriptive text about saving progress as draft or discarding
  3. Count and read the dialog buttons
    - expect: KNOWN DISCREPANCY (DISC-004 / D-02): Dialog has 3 buttons, not 2
    - expect: Button 1: 'Keep Editing' (equivalent to No — returns to form)
    - expect: Button 2: 'Discard' (equivalent to Yes — discards form data)
    - expect: Button 3: 'Save as Draft' (not in original spec — undocumented feature)
  4. Click 'Keep Editing'
    - expect: Dialog closes
    - expect: User is returned to the form with all entered data intact

### 9. Preview and Submission

**Seed:** `tests/seed.spec.ts`

#### 9.1. INSTR-FUNC-011: Preview panel shows key submission details before creation (AC-15, AC-16)

**File:** `tests/UWB-1/functional/INSTR-FUNC-011.spec.ts`

**Steps:**
  1. Navigate to /submissions/new, select Submission Type 'New Business', select an account, set Effective Date, and select at least one product
    - expect: Form is partially filled with required fields
  2. Click the 'Preview' button
    - expect: 'Application Preview' panel appears
    - expect: Panel shows: Kind, Type, Account, Products, Need By, Effective, Expiration, Brokerage, Broker, Broker Email, Broker Phone, Stage, Docs count, Notes, Attached Docs
    - expect: Header shows how many required fields are complete (e.g., '3/4 required fields complete')
  3. Verify the Stage field in the preview
    - expect: Stage shows 'Incomplete Submission' matching the form default
  4. Click 'Close' on the preview panel
    - expect: Preview panel closes
    - expect: User is returned to the editable form with all data intact

#### 9.2. INSTR-FUNC-012: Mandatory field validation blocks submission creation (AC-01, AC-08)

**File:** `tests/UWB-1/functional/INSTR-FUNC-012.spec.ts`

**Steps:**
  1. Navigate to /submissions/new without filling any fields
    - expect: Form shows all fields empty
  2. Click 'Create Submission' button without filling required fields
    - expect: Submission is blocked
    - expect: Inline 'Required' validation messages appear below empty mandatory fields
    - expect: Form does not navigate away
  3. Fill all required fields: select Submission Type, Account Name, Need By Date, Effective Date, and at least one Product, and upload at least one document
    - expect: All required fields are filled
    - expect: Required fields notice no longer shows validation errors
  4. Click 'Create Submission'
    - expect: Submission is created successfully
    - expect: A unique Submission ID is generated
    - expect: User is redirected to the new submission record

### 10. Notes

**Seed:** `tests/seed.spec.ts`

#### 10.1. INSTR-FUNC-013: Internal Notes is optional and has spell-check indicator (AC-14)

**File:** `tests/UWB-1/functional/INSTR-FUNC-013.spec.ts`

**Steps:**
  1. Navigate to /submissions/new and observe the Notes section
    - expect: 'Internal Notes' label has no mandatory asterisk
    - expect: Text area is present with placeholder text
    - expect: Spell-check icon is present in the section
    - expect: Character counter shows '0 characters'
    - expect: Helper text reads 'Notes are visible to all underwriting team members'
  2. Type text into the Internal Notes text area
    - expect: Text is accepted
    - expect: Character counter updates in real-time
  3. Leave Internal Notes empty and attempt to proceed to Preview
    - expect: Preview proceeds without error
    - expect: Notes section does not block form interaction
