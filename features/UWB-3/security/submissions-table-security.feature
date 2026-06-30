@security @UWB-3
Feature: Submissions Table — Security Scenarios
  As a security tester
  I want to verify the table does not expose submission data without authorisation

  @TC-UWB3-SEC-001
  Scenario: Unauthenticated direct URL to submission detail is blocked
    Given I am not logged in
    When I navigate to "/submission/SUB-7842"
    Then I am redirected to the login page
    And no submission detail data is rendered

  @TC-UWB3-SEC-002
  Scenario: XSS attempt in search bar is sanitised
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page
    When I type '<script>alert("xss")</script>' in the search bar
    Then no alert dialog is triggered
    And the input is treated as literal text

  @TC-UWB3-SEC-003
  Scenario: SQL injection in search is neutralised
    Given I am logged in as "Admin" with password "KSG@2026UE"
    And I navigate to the Submissions page
    When I type "' OR '1'='1" in the search bar
    Then the table does not return all records
    And no server error is shown

  @TC-UWB3-SEC-004
  Scenario: Submissions API requires authentication
    Given I obtain the submissions API endpoint URL
    When I make a direct API call without session credentials
    Then the API returns a 401 or 403 status
    And no submission data is returned

  @TC-UWB3-SEC-005
  Scenario: Row URL cannot expose another user's submission
    Given I am logged in as a restricted user
    When I navigate to a submission detail URL belonging to another team
    Then access is denied with a 403 or "Not Found" page
    And no submission data is displayed
