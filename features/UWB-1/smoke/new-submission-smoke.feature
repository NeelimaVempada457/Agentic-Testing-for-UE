Feature: Create New Submission - Smoke Tests
  As an Underwriting or BD User
  I want to create a new submission
  So that I can initiate underwriting for a cross-sell or new business opportunity

  Background:
    Given the user navigates to the New Submission form
    And the application is loaded successfully

  @smoke @P0
  Scenario: Successfully create a New Business submission with all mandatory fields
    Given the user selects "New Business" as the Submission Type
    And the user searches and selects a valid Account Name
    And the user sets a future Effective Date
    And the user selects at least one Product
    And the user uploads a valid PDF document
    When the user clicks "Create Submission"
    Then a unique Submission ID is generated
    And no validation errors are displayed

  @smoke @P0
  Scenario: Successfully create a Cross-sell submission with all mandatory fields
    Given the user selects "Cross-sell" as the Submission Type
    And the user searches and selects a valid Account Name
    And the user sets a future Effective Date
    And the user selects at least one Product
    And the user uploads a valid DOCX document
    When the user clicks "Create Submission"
    Then a unique Submission ID is generated
    And the submission type is recorded as "Cross-sell"

  @smoke @P0
  Scenario: Submission Type field renders with correct options
    When the user views the Submission Type field
    Then the option "New Business" is available
    And the option "Cross-sell" is available

  @smoke @P0
  Scenario: Account Name search auto-populates Brokerage fields
    Given the user types at least 3 characters in the Account Name field
    And the user selects an account from the dropdown results
    Then the Brokerage field is auto-populated
    And the Broker Contact field is auto-populated
    And the Broker Email field is auto-populated
    And the Broker Phone field is auto-populated
    And all Brokerage fields are read-only

  @smoke @P0
  Scenario: Product multi-select allows selecting multiple products
    When the user opens the Product dropdown
    And the user selects "Educators Legal Liability (ELL) - ML"
    And the user selects "Primary General Liability (CGL) - GL"
    Then two product cards are displayed
    And each card has a remove button

  @smoke @P0
  Scenario Outline: Date auto-population rules
    Given the user sets Effective Date to "<effective_date>"
    Then the Expiration Date auto-populates to "<expected_expiration>"
    And the Need By Date auto-populates to "<expected_need_by>"

    Examples:
      | effective_date | expected_expiration | expected_need_by |
      | 01/01/2027     | 01/01/2028          | 12/27/2026       |
      | 06/15/2027     | 06/15/2028          | 06/10/2027       |

  @smoke @P0
  Scenario: Current Stage defaults to Incomplete Submission
    When the user views the Current Stage field
    Then the default value is "Incomplete Submission"

  @smoke @P0
  Scenario: Document upload succeeds with valid file type
    When the user uploads a PDF file under 25 MB
    Then the file appears in the Submission Documents list
    And no error message is displayed

  @smoke @P1
  Scenario: Submission Summary displays correct fields after form is filled
    Given the user fills in Submission Type, Account, Effective Date, and Products
    When the user views the Submission Summary panel
    Then the summary displays TYPE, ACCOUNT, PRODUCTS, NEED BY, EFFECTIVE, BROKERAGE, BROKER, and STAGE

  @smoke @P0
  Scenario: Unique Submission ID is generated on creation
    Given two submissions are created sequentially with valid data
    Then each submission has a different Submission ID
    And the IDs are auto-incremented

  @smoke @P1
  Scenario: Cancel without modifications does not show warning dialog
    Given the user has not modified any form fields
    When the user clicks "Cancel"
    Then no warning dialog appears
    And the user is navigated away from the form
