Feature: Create New Submission - Edge Cases
  As an Underwriting or BD User
  I want the system to handle boundary and edge conditions correctly
  So that data integrity and usability are maintained in unusual scenarios

  Background:
    Given the user navigates to the New Submission form
    And the application is loaded successfully

  @edge @P1
  Scenario: Need By Date auto-populates when Effective Date is set first
    Given the Need By Date field is empty
    When the user sets Effective Date to "02/10/2027"
    Then the Need By Date auto-populates to "02/05/2027"

  @edge @P1
  Scenario: Manual override of Need By Date is accepted
    Given the user sets Effective Date to "02/10/2027"
    And the Need By Date auto-populates to "02/05/2027"
    When the user manually changes Need By Date to "01/20/2027"
    Then the Need By Date shows "01/20/2027"
    And no validation error is displayed

  @edge @P1
  Scenario: Expiration Date can be manually changed to before the auto-default
    Given the user sets Effective Date to "01/01/2027"
    And the Expiration Date auto-populates to "01/01/2028"
    When the user manually changes Expiration Date to "06/01/2027"
    Then the Expiration Date shows "06/01/2027"
    And no validation error is displayed since 06/01/2027 is after 01/01/2027

  @edge @P2
  Scenario: All available products can be selected simultaneously
    When the user selects all 14 products from the dropdown
    Then 14 product cards are displayed
    And the UI does not break or overflow
    And the Submission Summary shows all products as a comma-separated list

  @edge @P1
  Scenario: Removing a product card returns it to the dropdown
    Given the user has selected "Educators Legal Liability (ELL) - ML"
    When the user clicks the remove button on the ELL product card
    Then the ELL card is removed from the selected products
    And ELL is available again in the Product dropdown

  @edge @P2
  Scenario: Maximum length text in Internal Notes is handled gracefully
    When the user enters 5000 characters in the Internal Notes field
    Then the text is accepted up to the maximum character limit
    And the form does not crash
    And if a limit exists a character counter or message is shown

  @edge @P1
  Scenario: Empty Internal Notes field does not block submission
    Given all mandatory fields are filled
    And the Internal Notes field is empty
    When the user clicks "Create Submission"
    Then the submission is created successfully
    And no validation error is shown for Internal Notes

  @edge @P1
  Scenario Outline: Non-default stage values are persisted on submission
    Given all mandatory fields are filled
    And the user changes Current Stage to "<stage>"
    When the user clicks "Create Submission"
    Then the submission is created with stage "<stage>"

    Examples:
      | stage                  |
      | Declined to Quote      |
      | Information Gathering  |
      | Quote In Progress      |

  @edge @P1
  Scenario: Multiple documents can be uploaded in one submission
    When the user uploads "document1.pdf"
    And the user uploads "document2.xlsx"
    And the user uploads "document3.docx"
    Then all three documents appear in the Submission Documents section
    And the submission is created successfully with all three attached

  @edge @P2
  Scenario: Special characters in Account search are handled safely
    When the user types "<script>alert('xss')</script>" in the Account Name field
    Then no JavaScript executes
    And the application remains stable
    And a "No results found" message or safe error is displayed

  @edge @P2
  Scenario: Submission Summary updates dynamically as fields are filled
    When the user selects a Submission Type
    And the user selects an Account
    And the user selects Products
    And the user sets an Effective Date
    Then the Submission Summary panel updates in real time for each field change

  @edge @P1
  Scenario: Rapid double-click on Create Submission creates only one submission
    Given all mandatory fields are filled
    When the user double-clicks "Create Submission" rapidly
    Then exactly one submission is created
    And the button is disabled or enters a loading state after the first click
