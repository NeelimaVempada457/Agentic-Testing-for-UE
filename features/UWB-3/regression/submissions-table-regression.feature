@regression @UWB-3
Feature: Submissions Table — Regression Scenarios
  As a tester
  I want to verify the table does not regress after changes

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB3-REG-001
  Scenario: Table data reloads after navigating to detail and back
    When I click the first submission row
    And I press the browser back button
    Then the submissions table is visible
    And the table data is correct

  @TC-UWB3-REG-003
  Scenario: Newly created submission appears in the table
    Given the current total submission count is noted
    When I create a new submission
    And I return to the Submissions page
    Then the total submission count has increased by 1
    And the new submission appears at the top of the table

  @TC-UWB3-REG-004
  Scenario: Pagination remains functional after search and clear
    When I type a partial name in the search bar
    And I clear the search bar
    Then the pagination controls show the original page count
    And the table shows all submissions again

  @TC-UWB3-REG-006
  Scenario: Column order is unchanged after tab switch
    Given the column order is noted on the "My Queue" tab
    When I switch to the "All" tab
    Then the column order is identical to the noted order
