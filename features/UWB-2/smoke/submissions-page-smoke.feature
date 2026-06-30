@smoke @UWB-2
Feature: Submissions Page — Summary Bar and Header (Smoke)
  As an Underwriter or BD User
  I want the Submissions page to load with a summary bar and key action buttons
  So that I can quickly assess my pipeline at a glance

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB2-SMOKE-001
  Scenario: Submissions page loads successfully
    Then the page heading "Submissions" is visible
    And no error state is displayed

  @TC-UWB2-SMOKE-002
  Scenario: Header subtitle shows total submissions count
    Then the subtitle contains a total submissions count
    And the count is a positive integer

  @TC-UWB2-SMOKE-003
  Scenario: Summary bar renders with stat cards
    Then the summary bar is visible
    And at least 4 stat cards are displayed
    And each stat card shows a label and a value

  @TC-UWB2-SMOKE-004
  Scenario: Export button is visible
    Then the "Export" button is visible and enabled

  @TC-UWB2-SMOKE-005
  Scenario: New Submission button is visible
    Then the "New Submission" button is visible and enabled

  @TC-UWB2-SMOKE-006
  Scenario: New Submission button navigates to submission form
    When I click the "New Submission" button
    Then I am navigated to the new submission form
    And the URL contains "/submissions/new"
