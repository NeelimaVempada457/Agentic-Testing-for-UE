@edge-cases @UWB-2
Feature: Submissions Page — Edge Cases
  As a tester
  I want to verify the Submissions page behaves correctly in boundary conditions
  So that edge state scenarios do not break the user experience

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"

  @TC-UWB2-EDGE-001
  Scenario: Summary bar handles zero open submissions
    Given there are no open submissions in the system
    When I navigate to the Submissions page
    Then the "Open Submissions" card shows "0"
    And the page does not crash or show a loading spinner indefinitely

  @TC-UWB2-EDGE-003
  Scenario: Clicking a second stat card deactivates the first
    Given I navigate to the Submissions page
    When I click the "Open Submissions" stat card
    And I click the "Awaiting Info" stat card
    Then only one stat card is in a pressed/active state at a time

  @TC-UWB2-EDGE-004
  Scenario: Refreshing page while filter is active
    Given I navigate to the Submissions page
    And I click the "Ready for Review" stat card
    When I refresh the browser
    Then the page loads without error
    And either the filter is preserved or the table resets to the default view

  @TC-UWB2-EDGE-006
  Scenario: Summary bar renders correctly for BD User role
    Given I am logged in as a BD User
    When I navigate to the Submissions page
    Then the summary bar renders all stat cards without error
    And the metrics reflect the BD User's authorised data scope
