@edge-cases @UWB-3
Feature: Submissions Table — Edge Cases
  As a tester
  I want to verify the table behaves correctly in boundary conditions
  So that edge state scenarios do not break the user experience

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB3-EDGE-001
  Scenario: Last page shows partial set of rows
    When I navigate to the last page of submissions
    Then the table shows the remaining rows (less than 5 if 18 total)
    And the "Next" button is disabled
    And the footer shows "Page 4 of 4"

  @TC-UWB3-EDGE-005
  Scenario: Sort then paginate preserves sort order
    When I sort the table by "Need By" ascending
    And I navigate to page 2
    Then all rows on page 2 have a later "Need By" date than rows on page 1

  @TC-UWB3-EDGE-006
  Scenario: Exactly 5 submissions — single page only
    Given there are exactly 5 submissions in the system
    When I navigate to the Submissions page
    Then the table shows 5 rows
    And the footer shows "Showing 1 – 5 of 5 submissions · Page 1 of 1"
    And both "Previous" and "Next" buttons are disabled

  @TC-UWB3-EDGE-007
  Scenario: Switching tabs loads different data
    When I click the "All" tab
    Then the table reloads with submissions from all users
    And the total count may differ from the "My Queue" view
    And the column structure remains the same
