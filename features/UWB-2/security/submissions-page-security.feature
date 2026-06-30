@security @UWB-2
Feature: Submissions Page — Security Scenarios
  As a security tester
  I want to verify the Submissions page does not expose data without authorisation

  @TC-UWB2-SEC-001
  Scenario: Unauthenticated access is blocked
    Given I am not logged in
    When I navigate directly to "/submissions"
    Then I am redirected to the login page
    And no submission data is rendered

  @TC-UWB2-SEC-002
  Scenario: Expired session redirects to login
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page
    When my session token expires
    And I click a stat card
    Then I am redirected to the login page
    And no stale data is returned

  @TC-UWB2-SEC-003
  Scenario: Summary bar API does not expose PII in payload
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page
    When I inspect the network request that populates the summary bar
    Then the API response contains only aggregated count/metric data
    And no per-record PII or premium amounts are exposed

  @TC-UWB2-SEC-004
  Scenario: Export API respects RBAC
    Given I am logged in as a limited-access user
    When I click the "Export" button
    Then the downloaded file contains only records the user is authorised to view
    And no cross-user data is present
