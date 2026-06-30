@regression @UWB-2
Feature: Submissions Page — Regression Scenarios
  As a tester
  I want to verify the Submissions page does not regress after changes

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB2-REG-001
  Scenario: Submissions page reloads correctly after navigating away and back
    When I navigate to the Dashboard
    And I navigate back to the Submissions page
    Then the page heading "Submissions" is visible
    And the summary bar displays current stat values

  @TC-UWB2-REG-002
  Scenario: New Submission button works after applying a filter
    When I click the "Ready for Review" stat card
    And I click the "New Submission" button
    Then I am navigated to the new submission form
    And no filter error is thrown

  @TC-UWB2-REG-004
  Scenario: Summary bar updates after creating a new submission
    Given the "Open Submissions" count is noted
    When I create a new submission
    And I return to the Submissions page
    Then the "Open Submissions" count has increased by 1
