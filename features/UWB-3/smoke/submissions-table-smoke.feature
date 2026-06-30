@smoke @UWB-3
Feature: Submissions Table — Tabular List View (Smoke)
  As an Underwriter or BD User
  I want to see all submissions in a paginated table
  So that I can view, sort, and navigate submissions efficiently

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB3-SMOKE-001
  Scenario: Submissions table renders on page load
    Then the submissions table is visible
    And at least one row of submission data is displayed

  @TC-UWB3-SMOKE-002
  Scenario: All required columns are present
    Then the table has the following column headers:
      | Column              |
      | Member / Institution |
      | Type                |
      | Products            |
      | Stage               |
      | Underwriter         |
      | Appetite            |
      | Premium             |
      | Need By             |
      | Effective           |

  @TC-UWB3-SMOKE-003
  Scenario: Member/Institution cell shows sub-details
    Then the first row's Member/Institution cell contains:
      | Detail      |
      | Account name |
      | SUB-ID       |
      | State code   |
      | Brokerage    |

  @TC-UWB3-SMOKE-004
  Scenario: Clicking a row navigates to submission detail
    When I click on the first submission row
    Then I am navigated to "/submission/<SUB-ID>"
    And the detail page is displayed

  @TC-UWB3-SMOKE-005
  Scenario: Pagination controls are visible
    Then the pagination footer is visible
    And it shows "Showing X – Y of N submissions"
    And "Previous" and "Next" buttons are present

  @TC-UWB3-SMOKE-006
  Scenario: Products column shows pill badges
    Then the Products column in the first row shows pill badges
    And overflow products are shown as "+N"
