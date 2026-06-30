@functional @UWB-3
Feature: Submissions Table — Column Sorting, Pagination, Row Navigation
  As an Underwriter or BD User
  I want the table to support sorting and pagination
  So that I can find and navigate submissions efficiently

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB3-FUNC-001
  Scenario: Total submission count matches database
    Then the pagination footer shows the correct total submission count
    And it matches the count stored in the database

  @TC-UWB3-FUNC-002
  Scenario: Clicking account name navigates to submission detail
    When I click the account name in the first row
    Then I am navigated to the submission detail page
    And the URL matches "/submission/<SUB-ID>"

  @TC-UWB3-FUNC-003
  Scenario: Premium column sorts ascending on first click
    When I click the "Premium" column header
    Then the rows are sorted by premium in ascending order
    And the sort arrow indicates ascending

  @TC-UWB3-FUNC-004
  Scenario: Premium column sorts descending on second click
    Given the "Premium" column is sorted ascending
    When I click the "Premium" column header again
    Then the rows are sorted by premium in descending order
    And the sort arrow indicates descending

  @TC-UWB3-FUNC-007
  Scenario: Unassigned submissions show "Unassigned" in Underwriter column
    Given there is at least one submission with no assigned underwriter
    Then that row's Underwriter cell shows "?" and "Unassigned"

  @TC-UWB3-FUNC-008
  Scenario: Next button loads the next page
    Given the table is on page 1
    When I click the "Next" button
    Then the table shows rows 6 to 10
    And the footer shows "Page 2 of 4"
    And the "Previous" button is enabled

  Scenario Outline: Sortable columns sort correctly
    When I click the "<column>" column header
    Then the rows are sorted by "<column>" in ascending order
    When I click the "<column>" column header again
    Then the rows are sorted by "<column>" in descending order

    Examples:
      | column    |
      | Premium   |
      | Need By   |
      | Effective |
