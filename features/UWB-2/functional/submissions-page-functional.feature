@functional @UWB-2
Feature: Submissions Page — Functional Behaviour
  As an Underwriter or BD User
  I want the summary bar to show accurate live metrics and allow filtering
  So that I can quickly understand my pipeline state

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB2-FUNC-001
  Scenario: Open Submissions count matches live data
    Then the "Open Submissions" stat card value matches the count of non-closed submissions in the database

  @TC-UWB2-FUNC-003
  Scenario: Clicking a stat card filters the submissions table
    When I click the "Awaiting Info" stat card
    Then the table filters to show only submissions with "Awaiting Info" status
    And the "Awaiting Info" card is in a pressed/active state

  @TC-UWB2-FUNC-004
  Scenario: Export button triggers a file download
    When I click the "Export" button
    Then a file download is triggered
    And the download contains submission data

  @TC-UWB2-FUNC-007
  Scenario: Disabled stat cards do not filter the table
    When I click the "Avg. Time in Queue" stat card
    Then the table is not filtered
    And the card does not show a pressed state

  @TC-UWB2-FUNC-008
  Scenario: Submissions page is accessible to Underwriter role
    Given I am logged in as an Underwriter
    When I navigate to the Submissions page
    Then the page loads fully
    And all summary bar cards are visible
    And no access-denied error is shown

  Scenario Outline: Stat card filter updates table contents
    When I click the "<card>" stat card
    Then the table shows only submissions matching "<filter_status>"
    And the row count matches the value shown on the "<card>" card

    Examples:
      | card              | filter_status  |
      | Open Submissions  | open           |
      | Awaiting Info     | awaiting info  |
      | Ready for Review  | ready          |
      | New This Week     | new this week  |
