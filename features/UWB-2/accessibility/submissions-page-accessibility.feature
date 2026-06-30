@accessibility @UWB-2 @wcag-aa
Feature: Submissions Page — Accessibility (WCAG 2.1 AA)
  As a user with accessibility needs
  I want the Submissions page to be fully accessible
  So that I can use assistive technology to navigate the summary bar

  Background:
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page

  @TC-UWB2-ACC-001
  Scenario: Summary bar stat cards are keyboard accessible
    When I navigate to the summary bar using the Tab key
    And I press Enter on a clickable stat card
    Then the filter is applied
    And all clickable cards are reachable by keyboard

  @TC-UWB2-ACC-002
  Scenario: Stat cards have accessible labels for screen readers
    When a screen reader is active
    Then each stat card announces its label and value
    And the context text is included in the announcement

  @TC-UWB2-ACC-003
  Scenario: Export and New Submission buttons have accessible names
    Then the "Export" button has an accessible name "Export"
    And the "New Submission" button has an accessible name "New Submission"

  @TC-UWB2-ACC-004
  Scenario: Page heading hierarchy is correct
    Then the page has an H1 heading "Submissions"
    And heading levels are not skipped

  @TC-UWB2-ACC-005
  Scenario: Colour contrast on stat card values meets WCAG AA standard
    Then the text-to-background contrast ratio of stat card values is at least 4.5:1

  @TC-UWB2-ACC-006
  Scenario: Active filter card state is communicated to screen readers
    When I click a stat card filter
    Then the screen reader announces the pressed/selected state
    And the card has aria-pressed="true" or equivalent
