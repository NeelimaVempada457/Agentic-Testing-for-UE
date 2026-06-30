Feature: Create New Submission - Security Tests
  As a security tester
  I want to verify the New Submission form is protected against common attacks
  So that the application is safe from XSS, injection, and file-based exploits

  Background:
    Given the user navigates to the New Submission form
    And the application is loaded successfully

  @security @P0
  Scenario: XSS payload in Internal Notes is not executed
    When the user enters "<script>alert('XSS')</script>" in the Internal Notes field
    And fills all other mandatory fields
    And clicks "Create Submission"
    Then no JavaScript alert is triggered
    And the input is stored or displayed as plain text

  @security @P0
  Scenario: XSS payload in Account Name search is not executed
    When the user types "<img src=x onerror=alert('XSS')>" in the Account Name field
    Then no JavaScript executes
    And the page remains stable

  @security @P0
  Scenario: SQL injection payload in Account Name search is rejected safely
    When the user types "' OR '1'='1" in the Account Name field
    Then no unauthorized data is returned
    And no database error is exposed in the UI
    And the application handles the input gracefully

  @security @P1
  Scenario: File with double extension is rejected
    When the user attempts to upload a file named "malicious.pdf.exe"
    Then the upload is rejected
    And an error message lists the allowed file extensions

  @security @P1
  Scenario: HTML file disguised as PDF is rejected by MIME type validation
    When the user attempts to upload an HTML file with a .pdf extension
    Then the upload is rejected based on MIME type
    And an error message is displayed

  @security @P1
  Scenario: Page source does not contain sensitive credentials or tokens
    When the user views the page source of the New Submission form
    Then no API tokens are found in the HTML or JavaScript source
    And no passwords or credentials are embedded in client-side code

  @security @P1
  Scenario: HTTP requests are redirected to HTTPS
    When the user navigates to the HTTP version of the application URL
    Then the browser is automatically redirected to HTTPS
    And no mixed content warnings appear in the console

  @security @P1
  Scenario: Sensitive data is not stored in browser local or session storage
    Given the user fills in Submission Type, Account, and Product fields
    When the user inspects localStorage and sessionStorage
    Then no passwords, API tokens, or PII are found in browser storage
