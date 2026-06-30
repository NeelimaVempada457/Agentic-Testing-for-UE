@negative @UWB-2
Feature: Submissions Page — Negative Scenarios
  As a tester
  I want to verify the Submissions page handles invalid states gracefully
  So that users are not exposed to errors or data leaks

  @TC-UWB2-NEG-001
  Scenario: Unauthenticated user is redirected from Submissions page
    Given I am not logged in
    When I navigate directly to "/submissions"
    Then I am redirected to the login page
    And no submission data is visible

  @TC-UWB2-NEG-002
  Scenario: Summary bar stat values are never negative
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page
    Then no stat card displays a negative number

  @TC-UWB2-NEG-003
  Scenario: Clicking disabled stat cards has no effect
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page
    When I click the "Avg. Time in Queue" stat card
    And I click the "SLA At Risk" stat card
    Then the table is not filtered
    And no pressed state is shown on either card

  @TC-UWB2-NEG-004
  Scenario: Export with no matching results handles gracefully
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I apply a filter that results in 0 submissions
    When I click the "Export" button
    Then no error or crash occurs
    And either a message "No data to export" is shown or an empty file downloads

  @TC-UWB2-NEG-005
  Scenario: Zero-count stat card still renders correctly
    Given the "Awaiting Info" submission count is 0
    When I navigate to the Submissions page
    Then the "Awaiting Info" card shows "0"
    And clicking it shows an empty table with a "No submissions" message
