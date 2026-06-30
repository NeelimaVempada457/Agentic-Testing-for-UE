@negative @UWB-3
Feature: Submissions Table — Negative Scenarios
  As a tester
  I want to verify the table handles invalid inputs and states gracefully
  So that users are not exposed to errors or data leaks

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB3-NEG-001
  Scenario: Search with no matching results shows empty state
    When I type "ZZZZNONEXISTENT" in the search bar
    Then the table shows 0 rows
    And an empty state message is displayed
    And the pagination footer reflects 0 results

  @TC-UWB3-NEG-002
  Scenario: Previous button is disabled on page 1
    Given the table is on page 1
    Then the "Previous" button is disabled
    And clicking "Previous" has no effect

  @TC-UWB3-NEG-003
  Scenario: Next button is disabled on the last page
    Given the table is on the last page
    Then the "Next" button is disabled
    And clicking "Next" has no effect

  @TC-UWB3-NEG-004
  Scenario: Non-sortable columns do not respond to sort click
    When I click the "Member / Institution" column header
    Then no sort arrow appears
    And the row order does not change

  @TC-UWB3-NEG-005
  Scenario: Unauthenticated user cannot access submissions page
    Given I am not logged in
    When I navigate directly to "/submissions"
    Then I am redirected to the login page

  @TC-UWB3-NEG-007
  Scenario: XSS in search bar is sanitised
    When I type '<script>alert("xss")</script>' in the search bar
    Then no alert dialog appears
    And the input is treated as literal search text
    And the table shows 0 matching results
