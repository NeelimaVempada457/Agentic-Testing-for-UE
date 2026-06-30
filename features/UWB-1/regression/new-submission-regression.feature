@regression @UWB-1 @new-submission
Feature: New Submission — Regression Tests
  Verify previously fixed items remain fixed and track known open defects

  Background:
    Given I am logged in as an Underwriting User
    And I navigate to "Submissions > New Submission"

  # ─── RESOLVED: D-04 — Submission Type card-style ──────────────────────────

  @P0 @regression-pass @D04-resolved
  Scenario: Submission Type renders as card-style radio buttons (D-04 fix)
    Then the Submission Type section contains card-style radio button controls
    And the control is NOT a select dropdown element
    # D-04 RESOLVED: Previously rendered as <select>, now card-style

  # ─── RESOLVED: D-06 partial — .jpg accepted ───────────────────────────────

  @P1 @regression-pass @D06-partial
  Scenario: .jpg and .jpeg files are accepted in the file picker
    When I inspect the file input accept attribute
    Then the accept attribute includes ".jpg"
    And the accept attribute includes ".jpeg"
    # D-06 PARTIALLY RESOLVED: .jpg added; .doc still missing (DISC-005)

  # ─── OPEN DEFECT: DISC-002 — Underwriting fields editable ─────────────────

  @P0 @regression-fail @DISC-002 @known-defect
  Scenario: Underwriting fields are read-only after account selection (DISC-002 — OPEN)
    When I select a valid account
    Then the Underwriter field should be disabled
    And the Underwriting Specialist field should be disabled
    # OPEN DEFECT: DISC-002 — Fields remain editable. This scenario FAILS.
    # Screenshot: DISC-002-underwriting-fields-editable.png

  # ─── OPEN DEFECT: DISC-003 — Need By Date auto-populate ───────────────────

  @P0 @regression-fail @DISC-003 @known-defect
  Scenario: Need By Date auto-populates when Effective Date is set (DISC-003 — OPEN)
    When I set Effective Date to "2027-06-15"
    Then the Need By Date field should show "2027-06-10"
    # OPEN DEFECT: DISC-003 — Need By Date stays empty. This scenario FAILS.
    # Screenshot: DISC-004-need-by-date-no-auto-populate.png

  # ─── OPEN DEFECT: DISC-001 — Expiration Date asterisk ─────────────────────

  @P1 @regression-fail @DISC-001 @known-defect
  Scenario: Expiration Date label displays mandatory asterisk (DISC-001 — OPEN)
    Then the Expiration Date label contains an asterisk "*"
    # OPEN DEFECT: DISC-001 — Asterisk absent. This scenario FAILS.
    # Screenshot: DISC-001-expiration-date-no-asterisk.png

  # ─── OPEN DEFECT: DISC-004 — Cancel dialog buttons ────────────────────────

  @P1 @regression-fail @DISC-004 @known-defect
  Scenario: Cancel dialog has exactly two buttons per spec (DISC-004 — OPEN)
    Given I have modified at least one field
    When I click "Cancel"
    Then the dialog contains exactly 2 buttons
    # OPEN DEFECT: DISC-004 — 3 buttons present (Keep Editing, Discard, Save as Draft)
    # Screenshot: DISC-005-cancel-dialog.png

  # ─── OPEN DEFECT: DISC-005 — .doc missing from file picker ────────────────

  @P1 @regression-fail @DISC-005 @known-defect
  Scenario: .doc extension is accepted in the file picker (DISC-005 — OPEN)
    When I inspect the file input accept attribute
    Then the accept attribute includes ".doc"
    # OPEN DEFECT: DISC-005 — .doc absent from accept attribute. This scenario FAILS.
    # Screenshot: DISC-003-file-picker-accept-types.png

  # ─── CORE FUNCTIONALITY: Must remain passing ──────────────────────────────

  @P0 @regression-pass @core
  Scenario: Expiration Date auto-populates to Effective Date + 1 year
    When I set Effective Date to "2027-06-01"
    Then the Expiration Date auto-populates to "2028-06-01"

  @P0 @regression-pass @core
  Scenario: Products multi-select displays cards with remove buttons
    When I select products "ELL" and "CGL"
    Then two removable product cards are displayed
    And each card has a remove (×) button

  @P0 @regression-pass @core
  Scenario: Stage defaults to "Incomplete Submission" on form load
    Then the Current Stage field value is "Incomplete Submission"

  @P0 @regression-pass @core
  Scenario: Submission creation generates a unique Submission ID
    Given all mandatory fields are filled
    When I submit the form
    Then a unique Submission ID is returned
    And the form is cleared or redirected
