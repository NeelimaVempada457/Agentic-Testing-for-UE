@boundary @UWB-3
Feature: Submissions Table — Boundary Conditions
  As a tester
  I want to verify the table handles data boundary values correctly

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB3-BNDRY-001
  Scenario: Page size boundary — exactly 5 rows on first page
    Then exactly 5 rows are visible on page 1
    And the footer shows "Showing 1 – 5 of N submissions"
    And the "Next" button is enabled

  @TC-UWB3-BNDRY-002
  Scenario: Single submission — entire table on one page
    Given there is exactly 1 submission in the system
    When I navigate to the Submissions page
    Then the table shows 1 row
    And the footer shows "Showing 1 – 1 of 1 submissions · Page 1 of 1"
    And both "Previous" and "Next" buttons are disabled

  @TC-UWB3-BNDRY-004
  Scenario: Need By date set to today
    Given there is a submission with Need By date equal to today
    When I sort by "Need By" ascending
    Then the today-dated submission appears in the correct sorted position
    And its date cell displays today's date in the correct format

  @TC-UWB3-BNDRY-006
  Scenario Outline: Appetite percentage at boundary values
    Given there is a submission with appetite score of <score>%
    Then the Appetite cell in that row displays "<score>%"

    Examples:
      | score |
      | 0     |
      | 50    |
      | 100   |
