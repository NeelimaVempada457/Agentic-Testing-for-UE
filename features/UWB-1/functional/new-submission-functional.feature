@functional @UWB-1 @new-submission
Feature: New Submission — Functional Tests
  As an Underwriting or BD User
  I want to create a new submission with all form sections working correctly
  So that I can initiate underwriting for a cross-sell or new business opportunity

  Background:
    Given I am logged in as an Underwriting User
    And I navigate to "Submissions > New Submission"

  # ─── Submission Type ───────────────────────────────────────────────────────

  @P0 @submission-type @AC-01
  Scenario: Submission Type renders as card-style radio buttons with New Business and Cross-sell
    Then the Submission Type section contains exactly 2 card-style radio buttons
    And the first card is labelled "New Business"
    And the second card is labelled "Cross-sell"
    And no card is pre-selected

  @P0 @submission-type
  Scenario Outline: Selecting a Submission Type card highlights it exclusively
    When I select the "<type>" card
    Then the "<type>" card is highlighted as selected
    And the "<other>" card is not selected

    Examples:
      | type         | other        |
      | New Business | Cross-sell   |
      | Cross-sell   | New Business |

  # ─── Account Search ────────────────────────────────────────────────────────

  @P0 @account-search @AC-02 @AC-03 @salesforce
  Scenario: Account search returns Salesforce results after typing 3 characters
    When I type "Rive" in the Account Name field
    Then a dropdown appears with matching Salesforce accounts
    And I can select an account from the list
    And the Account Name field is populated with the selected account

  @P1 @account-search @AC-04
  Scenario: Account search shows no-results message for invalid input
    When I type "ZZZZINVALIDXXX" in the Account Name field
    Then a "no results found" message is displayed
    And no account is auto-selected

  # ─── Auto-population ───────────────────────────────────────────────────────

  @P0 @auto-populate @AC-09 @AC-10
  Scenario: Account selection auto-populates Brokerage fields as read-only
    When I select account "Riverside Unified School District"
    Then the Brokerage field is populated and read-only
    And the Broker Contact field is populated and read-only
    And the Broker Email field is populated and read-only
    And the Broker Phone field is populated and read-only

  @P0 @auto-populate @AC-09
  Scenario: Account selection auto-populates Underwriting Team fields
    When I select account "Riverside Unified School District"
    Then the Underwriter field is populated with a value
    And the Underwriting Specialist field is populated with a value

  @P0 @auto-populate @AC-10 @known-defect @DISC-002
  Scenario: Underwriting Team fields are non-editable after auto-population
    When I select account "Riverside Unified School District"
    Then the Underwriter field should be read-only
    And the Underwriting Specialist field should be read-only
    # KNOWN DEFECT: DISC-002 — Both fields remain editable. This scenario currently FAILS.

  # ─── Date Fields ───────────────────────────────────────────────────────────

  @P0 @date-logic @AC-06
  Scenario: Expiration Date auto-populates to Effective Date plus one year
    When I set Effective Date to "2027-03-15"
    Then the Expiration Date auto-populates to "2028-03-15"

  @P0 @date-logic @known-defect @DISC-003
  Scenario: Need By Date auto-populates to Effective Date minus 5 days
    When I set Effective Date to "2027-03-15"
    Then the Need By Date should auto-populate to "2027-03-10"
    # KNOWN DEFECT: DISC-003 — Need By Date does not auto-populate. This scenario currently FAILS.

  @P1 @date-logic
  Scenario: Expiration Date auto-populated value can be manually overridden
    When I set Effective Date to "2027-01-01"
    And I override Expiration Date to "2027-06-30"
    Then the Expiration Date shows "2027-06-30"

  @P0 @date-validation @AC-06
  Scenario: Effective Date exceeding Expiration Date triggers validation error
    When I set Effective Date to "2027-06-01"
    And I set Expiration Date to "2027-01-01"
    And I click "Create Submission"
    Then a date validation error is displayed
    And the submission is not created

  # ─── Products ──────────────────────────────────────────────────────────────

  @P0 @products @AC-05
  Scenario: Products multi-select allows multiple products and renders as removable cards
    When I click the Product(s) dropdown
    And I select "Educators Legal Liability (ELL) - ML"
    And I select "Primary General Liability (CGL) - GL"
    Then both products appear as removable cards
    And each card displays format "Name (Code) - LOB"
    And each card has a remove (×) button

  @P1 @products
  Scenario: Removing a product card removes it from the selection
    Given I have selected products "ELL" and "CGL"
    When I click the remove button on the "ELL" card
    Then only "CGL" product card remains

  # ─── Submission Stage ──────────────────────────────────────────────────────

  @P0 @stage @AC-07 @AC-13
  Scenario: Current Stage defaults to "Incomplete Submission" and is editable
    Then the Current Stage field shows "Incomplete Submission"
    When I change the stage to "Information Gathering"
    Then the stage shows "Information Gathering"

  @P1 @stage @AC-07
  Scenario: Stage LOV contains all required submission stages
    When I open the Current Stage dropdown
    Then the dropdown contains "Incomplete Submission"
    And the dropdown contains "Complete Submission"
    And the dropdown contains "Declined to Quote"
    And the dropdown contains "Information Gathering"
    And the dropdown contains "Review In Progress"
    And the dropdown contains "Quote In Progress"
    And the dropdown contains "Quote Sent"
    And the dropdown contains "Bound"
    And the dropdown contains "Issued"

  # ─── Documents ─────────────────────────────────────────────────────────────

  @P0 @documents @AC-01
  Scenario Outline: Document upload accepts allowed file types
    When I upload a file with extension "<extension>"
    Then the file appears in the Submission Documents list
    And no error is shown

    Examples:
      | extension |
      | pdf       |
      | docx      |
      | xlsx      |
      | png       |
      | jpg       |

  @P1 @documents @known-defect @DISC-005
  Scenario: Document upload accepts .doc files
    When I upload a file with extension "doc"
    Then the file is accepted
    # KNOWN DEFECT: DISC-005 — .doc absent from file picker accept attribute. This scenario currently FAILS.

  # ─── Internal Notes ────────────────────────────────────────────────────────

  @P1 @notes @AC-14
  Scenario: Submission can be created without Internal Notes
    Given all mandatory fields are filled
    And the Internal Notes field is empty
    When I click "Create Submission"
    Then the submission is created successfully

  # ─── Mandatory Field Validation ────────────────────────────────────────────

  @P0 @validation @AC-01
  Scenario Outline: Missing mandatory field blocks submission creation
    Given all mandatory fields are filled
    When I clear the "<field>" field
    And I click "Create Submission"
    Then a field-level validation error is shown for "<field>"
    And the submission is not created

    Examples:
      | field             |
      | Submission Type   |
      | Account Name      |
      | Need By Date      |
      | Effective Date    |
      | Expiration Date   |
      | Products          |
      | Add Document      |

  # ─── Summary Preview ───────────────────────────────────────────────────────

  @P1 @summary @AC-15 @AC-16
  Scenario: Submission Summary preview displays all required fields
    Given I have filled: Submission Type, Account, Effective Date, Product(s)
    Then the Summary panel displays "TYPE"
    And the Summary panel displays "ACCOUNT"
    And the Summary panel displays "PRODUCTS"
    And the Summary panel displays "NEED BY"
    And the Summary panel displays "EFFECTIVE"
    And the Summary panel displays "BROKERAGE"
    And the Summary panel displays "BROKER"
    And the Summary panel displays "STAGE"

  # ─── Cancel Behaviour ──────────────────────────────────────────────────────

  @P1 @cancel
  Scenario: Cancel with unsaved changes shows confirmation dialog
    Given I have filled at least one field
    When I click "Cancel"
    Then a confirmation dialog appears

  @P1 @cancel @known-defect @DISC-004
  Scenario: Cancel dialog shows two buttons — Yes and No
    Given I have filled at least one field
    When I click "Cancel"
    Then the dialog has exactly 2 buttons
    And the buttons are labelled "Yes" and "No"
    # KNOWN DEFECT: DISC-004 — Dialog has 3 buttons: Keep Editing, Discard, Save as Draft

  # ─── Mandatory Indicators ──────────────────────────────────────────────────

  @P1 @known-defect @DISC-001
  Scenario: Expiration Date field shows mandatory asterisk indicator
    Then the "Expiration Date" label has an asterisk (*)
    # KNOWN DEFECT: DISC-001 — Asterisk missing from Expiration Date label
