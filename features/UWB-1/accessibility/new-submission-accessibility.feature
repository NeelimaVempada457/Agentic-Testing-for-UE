Feature: Create New Submission - Accessibility Tests (WCAG 2.1)
  As a user with a disability
  I want to complete the New Submission form using assistive technology
  So that the application is inclusive and accessible to all users

  Background:
    Given the user navigates to the New Submission form
    And the application is loaded successfully

  @accessibility @P0
  Scenario: All form fields have accessible labels
    When the user inspects each form field for accessible labels
    Then every field has an associated label, aria-label, or aria-labelledby attribute
    And no unlabeled form controls exist on the page

  @accessibility @P0
  Scenario: Tab order follows logical top-to-bottom sequence
    When the user presses Tab repeatedly through the New Submission form
    Then focus moves in a logical top-to-bottom left-to-right sequence
    And no fields are skipped unexpectedly
    And focus does not become trapped outside of intended modal dialogs

  @accessibility @P0
  Scenario: Full form can be completed using keyboard only
    Given the user disconnects the mouse
    When the user completes all form fields using only keyboard navigation
    And the user submits the form using the keyboard
    Then the submission is created successfully
    And no interaction requires mouse usage

  @accessibility @P0
  Scenario: Validation errors are announced by screen reader
    Given a screen reader is enabled
    When the user submits the form without filling any fields
    Then the screen reader announces the validation error messages
    And the error regions use aria-live or role="alert"
    And focus moves to the first error field

  @accessibility @P1
  Scenario: Submission Type options are navigable with keyboard
    When the user tabs to the Submission Type field
    And uses Arrow keys to move between options
    Then each option receives focus in sequence
    And pressing Enter or Space selects the focused option

  @accessibility @P1
  Scenario: Date pickers are keyboard accessible
    When the user tabs to the Need By Date field
    And opens the date picker with Enter or Space
    Then the calendar opens and is navigable using Arrow keys
    And the user can select a date using the keyboard
    And the selected date is reflected in the input field

  @accessibility @P1
  Scenario: Product multi-select dropdown is keyboard accessible
    When the user tabs to the Product field
    And opens the dropdown with Enter or Space
    And navigates options with Arrow keys
    And selects a product with Enter
    Then the product card appears
    And the remove button on the card is reachable via Tab

  @accessibility @P1
  Scenario: Cancel warning dialog is focus-trapped and announced
    Given the user has modified at least one field
    When the user clicks Cancel and the warning dialog appears
    Then the screen reader announces the dialog
    And Tab key cycles only through dialog elements
    And focus does not escape to the background form

  @accessibility @P1
  Scenario: All text and interactive elements meet WCAG 2.1 AA contrast ratio
    When the user runs a contrast analysis on the New Submission form
    Then all normal text has a contrast ratio of at least 4.5 to 1
    And all large text has a contrast ratio of at least 3 to 1
    And all UI component boundaries have a contrast ratio of at least 3 to 1

  @accessibility @P1
  Scenario: Form is fully usable at 200% browser zoom
    When the user sets browser zoom to 200%
    And scrolls through the New Submission form
    Then no content is hidden, clipped, or overlapping
    And all fields and buttons remain accessible
    And the form can be completed and submitted successfully
