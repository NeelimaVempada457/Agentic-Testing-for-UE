# Scenario Templates — Generate Gherkin Skill

Copy-paste ready templates for common scenario patterns. Replace ALL `<placeholders>` with actual values from the ticket context.

---

## Template 1 — Successful Action (Positive / Smoke)

```gherkin
@Smoke @Positive @HighPriority @AC-<N> @<TICKET-ID>
Scenario: <Actor> successfully <performs action> with valid <data/input>
  Given the user is logged in as "<Role>"
  And <relevant precondition>
  When the user <primary action>
  Then the system <confirms success state>
  And <secondary observable outcome>
```

---

## Template 2 — Required Field Validation (Negative)

```gherkin
@Negative @Regression @HighPriority @AC-<N> @<TICKET-ID>
Scenario Outline: System rejects submission when required field "<field>" is empty
  Given the user is logged in as "<Role>"
  And the user is on the "<Page/Form Name>" page
  When the user leaves the "<field_name>" field empty
  And the user submits the form
  Then the system displays the validation error "<error_message>"
  And the form is not submitted

  Examples:
    | field_name   | error_message              |
    | <Field 1>    | <Field 1> is required      |
    | <Field 2>    | <Field 2> is required      |
```

---

## Template 3 — Boundary Value Analysis (Edge Case)

```gherkin
@EdgeCase @Regression @MediumPriority @AC-<N> @<TICKET-ID>
Scenario Outline: System handles boundary values for "<field>" field
  Given the user is logged in as "<Role>"
  And the user is on the "<Form>" form
  When the user enters "<input_value>" in the "<field>" field
  And the user submits the form
  Then the system <outcome>

  Examples:
    | input_value       | outcome                              |
    |                   | displays "Field is required"         |
    | <min_valid>       | saves successfully                   |
    | <max_valid>       | saves successfully                   |
    | <min_valid - 1>   | displays "Value is too short"        |
    | <max_valid + 1>   | displays "Value is too long"         |
    | <special_chars>   | displays "Invalid characters"        |
```

---

## Template 4 — Role-Based Access Control (Security)

```gherkin
@Security @Regression @HighPriority @<TICKET-ID>
Scenario Outline: Only authorized roles can access "<feature>"
  Given the user is logged in as "<role>"
  When the user navigates to the "<feature URL or section>"
  Then the user <access_outcome>

  Examples:
    | role           | access_outcome                                              |
    | Admin          | can access the feature and all actions are available        |
    | Manager        | can access the feature with limited actions                 |
    | Read-Only User | sees a "Permission Denied" message                          |
    | Guest          | is redirected to the login page                             |
```

---

## Template 5 — Unauthenticated Access (Security)

```gherkin
@Security @Smoke @HighPriority @<TICKET-ID>
Scenario: Unauthenticated user is redirected to login when accessing protected page
  Given the user is not logged in
  When the user navigates directly to "<protected URL>"
  Then the system redirects the user to the login page
  And the URL contains the "returnUrl" parameter pointing to the original page
  And no protected data is exposed in the response
```

---

## Template 6 — Login Success (Positive / Smoke)

```gherkin
@Smoke @Positive @HighPriority @<TICKET-ID>
Scenario: User successfully logs in with valid credentials
  Given the user is on the login page
  And the application is accessible at "${APP_URL}"
  When the user enters "${TEST_USERNAME}" in the "Email" field
  And the user enters "${TEST_PASSWORD}" in the "Password" field
  And the user clicks the "Sign In" button
  Then the user is redirected to the "<dashboard/home>" page
  And the user's name "<User Display Name>" is visible in the navigation bar
```

---

## Template 7 — Login Failure (Negative)

```gherkin
@Negative @Regression @HighPriority @<TICKET-ID>
Scenario Outline: System rejects login with invalid credentials
  Given the user is on the login page
  When the user enters "<username>" in the "Email" field
  And the user enters "<password>" in the "Password" field
  And the user clicks the "Sign In" button
  Then the system displays the error "<error_message>"
  And the user remains on the login page

  Examples:
    | username                    | password      | error_message                        |
    | invalid@example.com         | WrongPass123  | Invalid email or password            |
    | ${TEST_USERNAME}            | wrongpassword | Invalid email or password            |
    |                             | anypassword   | Email is required                    |
    | ${TEST_USERNAME}            |               | Password is required                 |
    | <script>alert(1)</script>   | anything      | Invalid email or password            |
```

---

## Template 8 — Session Timeout (Edge Case)

```gherkin
@EdgeCase @Regression @MediumPriority @<TICKET-ID>
Scenario: System prompts user to re-authenticate after session expires
  Given the user is logged in as "<Role>"
  And the user's session has expired due to inactivity
  When the user attempts to perform any action
  Then the system displays a "Your session has expired. Please log in again." message
  And the user is redirected to the login page
  And any unsaved form data is preserved in session storage
```

---

## Template 9 — File Upload (Positive + Negative)

```gherkin
@Positive @Smoke @HighPriority @<TICKET-ID>
Scenario: User successfully uploads a valid <file_type> file
  Given the user is logged in as "<Role>"
  And the user is on the "<Upload Page>" page
  When the user selects a valid "<file_type>" file of size "<valid_size>"
  And the user clicks the "Upload" button
  Then the system displays "File uploaded successfully"
  And the file appears in the "<file list/table>"

@Negative @Regression @HighPriority @<TICKET-ID>
Scenario Outline: System rejects invalid file uploads
  Given the user is logged in as "<Role>"
  And the user is on the "<Upload Page>" page
  When the user selects a "<file_type>" file of size "<file_size>"
  And the user clicks the "Upload" button
  Then the system displays the error "<error_message>"

  Examples:
    | file_type | file_size    | error_message                         |
    | .exe      | 1 KB         | File type not supported               |
    | .pdf      | 0 bytes      | File cannot be empty                  |
    | .pdf      | 26 MB        | File size exceeds the 25 MB limit     |
    | .pdf      | 25 MB        | (uploaded successfully)               |
```

---

## Template 10 — API Response Validation (API)

```gherkin
@API @Regression @HighPriority @<TICKET-ID>
Scenario: API returns correct response for valid <entity> creation
  Given the API endpoint "<POST /api/v1/resource>" is accessible
  And a valid authentication token is available
  When a POST request is sent with valid payload:
    """
    {
      "field1": "<value1>",
      "field2": "<value2>"
    }
    """
  Then the API returns HTTP status 201
  And the response body contains the created resource ID
  And the response Content-Type is "application/json"

@API @Negative @Regression @MediumPriority @<TICKET-ID>
Scenario Outline: API returns correct error for invalid requests
  Given the API endpoint "<POST /api/v1/resource>" is accessible
  And a valid authentication token is available
  When a POST request is sent with <condition>
  Then the API returns HTTP status <status>
  And the response body contains error code "<error_code>"

  Examples:
    | condition                   | status | error_code         |
    | missing required field      | 422    | VALIDATION_ERROR   |
    | invalid authentication token| 401    | UNAUTHORIZED       |
    | non-existent resource ID    | 404    | NOT_FOUND          |
    | malformed JSON payload      | 400    | BAD_REQUEST        |
```

---

## Template 11 — Accessibility (Accessibility)

```gherkin
@Accessibility @Regression @MediumPriority @<TICKET-ID>
Scenario: <Form/Page> meets basic WCAG 2.1 AA accessibility requirements
  Given the user is on the "<Page>" page
  When the page finishes loading
  Then all form fields have visible and descriptive labels
  And all interactive elements are reachable via keyboard Tab key
  And the Tab order follows a logical reading sequence
  And error messages are announced by screen readers
  And the color contrast ratio meets WCAG AA standard (4.5:1 minimum)
  And all images have descriptive alt text
```

---

## Template 12 — Browser Refresh / Navigation (Edge Case)

```gherkin
@EdgeCase @Regression @MediumPriority @<TICKET-ID>
Scenario: Form data is handled correctly when user refreshes mid-completion
  Given the user is logged in as "<Role>"
  And the user has partially filled in the "<Form>" form
  When the user refreshes the browser page
  Then the system either preserves the entered data or clears it with a warning
  And the user is not unexpectedly logged out
  And no duplicate submission occurs

@EdgeCase @Regression @MediumPriority @<TICKET-ID>
Scenario: System handles browser back button after successful submission
  Given the user successfully submitted the "<Form>"
  When the user clicks the browser Back button
  Then the system does not resubmit the form
  And the system either shows the filled form in read-only mode or redirects to a safe page
```

---

## Template 13 — Duplicate / Concurrent Submission (Edge Case)

```gherkin
@EdgeCase @Regression @HighPriority @<TICKET-ID>
Scenario: System prevents duplicate submission when user double-clicks submit button
  Given the user is logged in as "<Role>"
  And the user has completed the "<Form>" form
  When the user double-clicks the "Submit" button rapidly
  Then only one submission is processed by the system
  And the submit button is disabled after the first click
  And the system displays a single success confirmation message
```
