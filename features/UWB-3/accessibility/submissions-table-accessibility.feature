@accessibility @UWB-3 @wcag-aa
Feature: Submissions Table — Accessibility (WCAG 2.1 AA)
  As a user with accessibility needs
  I want the Submissions table to be fully accessible
  So that I can use assistive technology to navigate and interact with submissions

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB3-ACC-001
  Scenario: Table is navigable by keyboard
    When I reach the table using the Tab key
    Then I can navigate between rows and cells using arrow keys
    And there is no keyboard trap

  @TC-UWB3-ACC-002
  Scenario: Column headers have correct semantic role
    Then the table column headers have role="columnheader" or use <th scope="col">
    And a screen reader announces column names when navigating cells

  @TC-UWB3-ACC-003
  Scenario: Sortable column headers announce sort state
    When I focus on the "Premium" column header
    Then the screen reader announces the current sort state
    When I activate the sort
    Then the screen reader announces the new sort direction
    And the column header uses the aria-sort attribute

  @TC-UWB3-ACC-004
  Scenario: Pagination controls are keyboard accessible
    When I Tab to the pagination footer
    Then all pagination buttons receive keyboard focus
    And Enter activates each button
    And disabled buttons are communicated as disabled

  @TC-UWB3-ACC-005
  Scenario: Stage badges communicate status beyond colour
    When I navigate to a stage badge cell with a screen reader
    Then the stage label text is announced (e.g. "In Review")
    And the status is not conveyed by colour alone

  @TC-UWB3-ACC-006
  Scenario: Unassigned underwriter is announced descriptively
    Given there is a row with an unassigned underwriter
    When I navigate to that row's Underwriter cell with a screen reader
    Then the cell announces "Unassigned"
    And the "?" placeholder is not the only content

  @TC-UWB3-ACC-007
  Scenario: All interactive elements have visible focus indicators
    When I Tab through all interactive elements on the table page
    Then a visible focus ring is present on each focused element
    And no element has outline:none without an alternative focus indicator

  @TC-UWB3-ACC-008
  Scenario: Table has an accessible name
    Then the submissions table has an accessible name or caption
    And a screen reader announces the table name before the user enters it
