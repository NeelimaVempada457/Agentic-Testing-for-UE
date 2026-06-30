@boundary @UWB-2
Feature: Submissions Page — Boundary Conditions
  As a tester
  I want to verify the summary bar handles boundary values correctly

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"

  @TC-UWB2-BNDRY-001
  Scenario: Summary bar with exactly 1 open submission
    Given there is exactly 1 open submission
    When I navigate to the Submissions page
    Then the "Open Submissions" card shows "1"

  @TC-UWB2-BNDRY-002
  Scenario: Summary bar with zero total submissions
    Given there are no submissions in the system
    When I navigate to the Submissions page
    Then all stat cards show "0"
    And the subtitle shows "0 Total Submissions"
    And the page does not crash

  @TC-UWB2-BNDRY-003
  Scenario Outline: Stat card value at numerical boundaries
    Given there are <count> submissions matching a filter
    When I navigate to the Submissions page
    Then the stat card displays "<displayed_value>"

    Examples:
      | count | displayed_value |
      | 1     | 1               |
      | 999   | 999             |
      | 1000  | 1000            |
      | 9999  | 9999            |
