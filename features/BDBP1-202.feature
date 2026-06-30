@UI @Web @BDBP1-202
Feature: Registration Form - Instruction Section
  As a Customer
  I want to view and interact with the Instruction section on the Registration Form
  So that I can understand the required KYC documents for my residency type,
  review compliance obligations, and navigate confidently to complete my application

  Background:
    Given the BOSL Digital Portal is accessible at "https://bankofstlucia--digitalqa.sandbox.my.site.com"
    And the customer is logged in with valid credentials

    And the customer has completed the "Select Product" step
    And the customer is on the "Registration Form - Instructions" page

  # ── Positive Scenarios ──────────────────────────────────────────────────────

  @Smoke @Positive @HighPriority @AC-3 @BDBP1-202
  Scenario: Instruction section loads with all four residency type buttons visible
    Given the customer navigates to the Registration Form Instructions page
    When the page fully loads
    Then the "Instruction Section" is visible on the page
    And the following residency type buttons are displayed:
      | Button Label                                     |
      | Individual (National) of ECCU Territories        |
      | Resident Nationals of CARICOM (except ECCU)      |
      | Non-Nationals/Residents Outside CARICOM          |
      | Self-Employed Individuals                        |
    And the FATCA compliance notice is visible on the page
    And the "Continue" navigation button is visible
    And the "Save Progress" navigation button is visible
    And the "Back to Dashboard" navigation button is visible

  @Smoke @Positive @HighPriority @AC-3 @BDBP1-202
  Scenario: Product-specific instructions are dynamically loaded from Salesforce
    Given the customer selected "Savings Account" on the Select Product screen
    When the Instructions page loads
    Then the instruction content displayed matches the product-specific instructions stored in Salesforce for "Savings Account"
    And the content is rendered as formatted rich text

  @Regression @Positive @HighPriority @AC-4 @BDBP1-202
  Scenario: ECCU Territories button reveals correct KYC identification requirements
    Given all residency accordion sections are collapsed
    When the customer clicks the "Individual (National) of ECCU Territories" button
    Then the accordion section expands and displays the KYC requirements
    And the "Identification" column shows "One form of Valid (Unexpired) Government-Issued Picture Identification"
    And the accepted ID types listed include:
      | Passport                  |
      | National Identification Card |
      | Social Security card      |
      | Driver's license          |
      | Voter's card              |
    And the "Residential Address" column shows "NO PROOF OF ADDRESS REQUIRED" for Saint Lucian Nationals
    And the "Additional Notes" section mentions minor account requirements and birth certificate

  @Regression @Positive @HighPriority @AC-4 @BDBP1-202
  Scenario: CARICOM button reveals correct KYC identification and address requirements
    Given all residency accordion sections are collapsed
    When the customer clicks the "Resident Nationals of CARICOM (except ECCU)" button
    Then the accordion section expands and displays the KYC requirements
    And the "Identification" column shows that a Passport is required
    And the "Identification" column shows that a Driver's License or National ID Card is also required
    And the "Residential Address" column indicates that proof of address is required
    And the accepted address documents listed include:
      | Original utility bill dated within the last 3 months |
      | Tenancy agreement in the Customer's Name             |
      | Reference Letter from a Regulated Financial Institution |
      | Letter from Employer Confirming Address              |
      | Bank statement issued within the last three months   |

  @Regression @Positive @HighPriority @AC-4 @BDBP1-202
  Scenario: Non-CARICOM button reveals two-ID and address proof requirements
    Given all residency accordion sections are collapsed
    When the customer clicks the "Non-Nationals/Residents Outside CARICOM" button
    Then the accordion section expands and displays the KYC requirements
    And the "Identification" column shows "Two forms of valid (unexpired) Government Issued Identification"
    And the "Residential Address" column indicates that address confirmation is required
    And the "Additional Notes" column shows "N/A"

  @Regression @Positive @HighPriority @AC-4 @BDBP1-202
  Scenario: Self-Employed button reveals residency-dependent ID count requirements
    Given all residency accordion sections are collapsed
    When the customer clicks the "Self-Employed Individuals" button
    Then the accordion section expands and displays the KYC requirements
    And the "Identification" column shows that ECCU/CARICOM nationals need 1 form of Government-Issued Picture ID
    And the "Identification" column shows that Non-Nationals/Residents outside CARICOM need 2 forms of ID
    And the "Residential Address" column indicates that address confirmation documents are required

  @Regression @Positive @MediumPriority @AC-3 @BDBP1-202
  Scenario: FATCA compliance notice is displayed with correct link
    When the Instructions page loads
    Then the FATCA compliance notice is visible with a reference for U.S. citizens and residents
    And the FATCA notice contains a clickable link
    And clicking the FATCA link opens the compliance information in a new browser tab

  @Regression @Positive @HighPriority @AC-6 @BDBP1-202
  Scenario: Continue button navigates to the Personal Information section
    When the customer clicks the "Continue" button
    Then the customer is navigated to the "Personal Information" section of the registration form
    And the page URL changes to reflect the Personal Information step

  @Regression @Positive @MediumPriority @AC-6 @BDBP1-202
  Scenario: Save Progress button persists the current state
    Given the customer has reviewed the instructions
    When the customer clicks the "Save Progress" button
    Then the system saves the customer's current progress
    And a success confirmation message is displayed to the customer
    And the customer remains on the Instructions page

  @Regression @Positive @MediumPriority @AC-6 @BDBP1-202
  Scenario: Back to Dashboard button returns the customer to the main dashboard
    When the customer clicks the "Back to Dashboard" button
    Then the customer is navigated back to the main customer dashboard
    And the in-progress application is preserved for later resumption

  @Regression @Positive @MediumPriority @AC-1 @AC-2 @BDBP1-202
  Scenario: Header, footer, and left-side component are consistent with Registration Page design
    When the Instructions page loads
    Then the page header matches the BOSL branding defined in BDBP1-94
    And the page footer matches the BOSL branding defined in BDBP1-94
    And the left-side component is displayed as defined in BDBP1-95
    And BOSL brand colors, fonts, and logo are applied consistently

  # ── Negative Scenarios ──────────────────────────────────────────────────────

  @Negative @Regression @HighPriority @BDBP1-202
  Scenario: Expired session redirects the customer to the login page
    Given the customer's session has expired due to inactivity
    When the customer attempts to interact with the Instructions page
    Then the system redirects the customer to the login page
    And the session expiry message "Your session has expired. Please log in again." is displayed
    And no registration form data is exposed to the unauthenticated state

  @Negative @Regression @HighPriority @BDBP1-202
  Scenario: Salesforce API unavailable shows a graceful fallback message
    Given the Salesforce API is unavailable
    When the Instructions page attempts to load product-specific instructions
    Then the page does not throw an unhandled error
    And a user-friendly message is displayed such as "Instructions are temporarily unavailable. Please try again later."
    And the four residency type buttons are still visible and functional
    And the FATCA notice is still displayed

  @Negative @Regression @MediumPriority @BDBP1-202
  Scenario: Broken FATCA link displays appropriate user feedback
    Given the FATCA compliance link URL is broken or returns a 404 error
    When the customer clicks the FATCA link
    Then the customer is not shown a blank or crashed page
    And an appropriate browser or in-app error message is shown

  @Negative @Regression @MediumPriority @BDBP1-202
  Scenario: Customer cannot proceed without reaching the instruction section
    Given the customer attempts to navigate directly to the "Personal Information" URL
    And the customer has not yet passed the Instructions step
    Then the system redirects the customer to the Instructions page
    And the step guard prevents skipping the Instructions step

  # ── Edge Cases ──────────────────────────────────────────────────────────────

  @EdgeCase @Regression @HighPriority @AC-5 @BDBP1-202
  Scenario: Opening a second accordion section auto-closes the first
    Given the customer has expanded the "Individual (National) of ECCU Territories" section
    When the customer clicks the "Resident Nationals of CARICOM (except ECCU)" button
    Then the "Resident Nationals of CARICOM (except ECCU)" section expands
    And the "Individual (National) of ECCU Territories" section is automatically collapsed
    And only one accordion section is open at any time

  @EdgeCase @Regression @HighPriority @AC-5 @BDBP1-202
  Scenario: Clicking the already-open accordion section collapses it
    Given the customer has expanded the "Self-Employed Individuals" section
    When the customer clicks the "Self-Employed Individuals" button again
    Then the section collapses
    And no accordion section is open

  @EdgeCase @Regression @MediumPriority @BDBP1-202
  Scenario Outline: Instructions display correctly for multiple product types from Salesforce
    Given the customer selected "<product>" on the Select Product screen
    When the Instructions page loads
    Then the instruction content for "<product>" is fetched from Salesforce and displayed
    And the content is non-empty and rendered as formatted text

    Examples:
      | product          |
      | Savings Account  |
      | Personal Loan    |
      | Credit Card      |
      | Mortgage         |

  @EdgeCase @Regression @MediumPriority @BDBP1-202
  Scenario: Rapid double-click on accordion button does not toggle section twice
    Given all accordion sections are collapsed
    When the customer double-clicks the "Non-Nationals/Residents Outside CARICOM" button rapidly
    Then the section is expanded exactly once
    And the section does not flicker or toggle to a collapsed state

  @EdgeCase @Regression @MediumPriority @BDBP1-202
  Scenario: Returning to Instructions via Save Progress restores the saved state
    Given the customer has expanded the "ECCU Territories" accordion section
    And the customer clicked "Save Progress" and exited the application
    When the customer logs back in and resumes the saved application
    Then the Instructions page is displayed with the application progress restored
    And the customer can continue from where they left off

  @EdgeCase @Regression @LowPriority @BDBP1-202
  Scenario: Long Salesforce instruction content does not overflow the page layout
    Given the Salesforce API returns an unusually long instruction text for a product
    When the Instructions page loads
    Then the instruction content is contained within the instruction section boundaries
    And no horizontal scrollbar appears at standard desktop viewport (1280px)
    And the page layout is not broken

  # ── Security Scenarios ──────────────────────────────────────────────────────

  @Security @Regression @HighPriority @BDBP1-202
  Scenario: Unauthenticated user cannot access the Registration Form Instructions page
    Given the customer is not logged in
    When the customer navigates directly to the Registration Form Instructions URL
    Then the system redirects the customer to the login page
    And no instruction content or customer data is exposed in the HTTP response body

  @Security @Regression @HighPriority @BDBP1-202
  Scenario: Another authenticated customer cannot access a different customer's application
    Given Customer A has a saved registration application in progress
    And Customer B is logged in with a different account
    When Customer B attempts to access Customer A's application URL directly
    Then the system returns HTTP 403 Forbidden
    And Customer A's application data is not exposed to Customer B

  @Security @Regression @HighPriority @BDBP1-202
  Scenario: Save Progress endpoint is protected against CSRF attacks
    Given the customer is on the Instructions page
    When a forged cross-site request is sent to the "Save Progress" endpoint
    Then the server rejects the request with HTTP 403 or 401
    And no data is saved from the forged request

  # ── Accessibility Scenarios ─────────────────────────────────────────────────

  @Accessibility @Regression @HighPriority @AC-5 @BDBP1-202
  Scenario: Accordion residency type buttons are fully keyboard accessible
    Given the customer is on the Instructions page
    When the customer navigates the page using the Tab key only
    Then each of the four residency type accordion buttons receives focus in logical order
    And pressing Enter or Space on a focused accordion button expands or collapses the section
    And the expanded/collapsed state is visually indicated with focus ring visible

  @Accessibility @Regression @HighPriority @BDBP1-202
  Scenario: Screen reader announces accordion expanded and collapsed states
    Given the customer is using a screen reader
    When the customer activates the "ECCU Territories" accordion button
    Then the button has an aria-expanded="true" attribute when open
    And the button has an aria-expanded="false" attribute when closed
    And the associated content panel has the correct aria-controls relationship
    And the screen reader announces the state change to the user

  @Accessibility @Regression @MediumPriority @BDBP1-202
  Scenario: Navigation buttons are keyboard accessible and reachable
    Given the customer is on the Instructions page
    When the customer navigates the page using the Tab key only
    Then the "Continue", "Save Progress", and "Back to Dashboard" buttons all receive keyboard focus
    And each button can be activated via the Enter key
    And the tab order is logical and follows the visual reading order

  @Accessibility @Regression @MediumPriority @BDBP1-202
  Scenario: Instructions page meets WCAG 2.1 AA color contrast requirements
    Given the customer is on the Instructions page
    When the page is inspected for color contrast compliance
    Then all body text elements have a contrast ratio of at least 4.5:1 against their background
    And all large text elements have a contrast ratio of at least 3:1
    And all interactive elements (buttons, accordion controls) have a visible focus ring at 3:1 contrast

  @Accessibility @Regression @LowPriority @BDBP1-202
  Scenario: Instruction section is readable on mobile viewport
    Given the BOSL portal is accessed on a mobile device with viewport width 375px
    When the customer navigates to the Instructions page
    Then all four residency type buttons are visible without horizontal scrolling
    And the accordion content is fully readable within the mobile viewport
    And the "Continue", "Save Progress", and "Back to Dashboard" buttons are accessible and usable
