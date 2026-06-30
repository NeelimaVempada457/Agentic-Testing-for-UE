Feature: Create New Submission - Negative Tests
  As an Underwriting or BD User
  I want the system to prevent invalid submissions
  So that data integrity is maintained

  Background:
    Given the user navigates to the New Submission form
    And the application is loaded successfully

  @negative @P0
  Scenario: Submit with no fields filled shows all mandatory errors
    When the user clicks "Create Submission" without filling any fields
    Then validation errors appear for Submission Type
    And validation errors appear for Account Name
    And validation errors appear for Effective Date
    And validation errors appear for Expiration Date
    And validation errors appear for Need By Date
    And validation errors appear for Product
    And validation errors appear for Add Document
    And the form is not submitted

  @negative @P0
  Scenario Outline: Submit with one mandatory field missing shows field error
    Given the user fills all mandatory fields except "<missing_field>"
    When the user clicks "Create Submission"
    Then a validation error is shown for "<missing_field>"
    And the submission is blocked

    Examples:
      | missing_field    |
      | Submission Type  |
      | Account Name     |
      | Product(s)       |
      | Add Document     |

  @negative @P0
  Scenario: Effective Date after Expiration Date shows validation error
    Given the user sets Expiration Date to "01/01/2027"
    And the user sets Effective Date to "06/01/2027"
    When the user clicks "Create Submission"
    Then a date validation error is displayed
    And the error message states "Effective Date must not exceed Expiration Date"

  @negative @P1
  Scenario: Upload file with disallowed extension is rejected
    When the user attempts to upload a file with extension ".exe"
    Then the upload is rejected
    And an error message lists the allowed file types

  @negative @P1
  Scenario: Upload file exceeding 25 MB is rejected
    When the user attempts to upload a file larger than 25 MB
    Then the upload is rejected
    And an error message states the maximum allowed file size is 25 MB

  @negative @P1
  Scenario: Account search with no matching results shows no-results message
    When the user types "ZZZZNONEXISTENT99999" in the Account Name field
    Then a "No results found" message appears in the dropdown
    And no account is selected
    And Brokerage fields remain empty

  @negative @P0
  Scenario: Brokerage and Underwriting fields are non-editable after account selection
    Given the user has selected a valid Account Name
    When the user attempts to type in the Brokerage field
    And the user attempts to type in the Broker Email field
    And the user attempts to type in the Underwriter field
    Then none of the fields accept input
    And the fields display auto-populated Salesforce values

  @negative @P0
  Scenario: Cancel after modifying fields shows warning dialog
    Given the user selects "New Business" as the Submission Type
    When the user clicks "Cancel"
    Then a warning dialog appears with the message "Are you sure you want to cancel this submission? All entered data will be lost."
    And the dialog contains a "Yes" button
    And the dialog contains a "No" button

  @negative @P1
  Scenario: Confirm cancel clears form data
    Given the user has filled in Submission Type and Account Name
    And the user has clicked "Cancel" and a warning dialog appears
    When the user clicks "Yes" on the warning dialog
    Then the form is closed
    And no submission is created
    And all entered data is cleared
