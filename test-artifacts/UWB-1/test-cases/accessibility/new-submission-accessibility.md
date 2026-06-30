# Accessibility Test Cases — UWB-1: New Submission Form

| Property | Value |
|---|---|
| Jira Ticket | UWB-1 |
| Feature | Create New Submission |
| Type | Accessibility (WCAG 2.1) |
| Generated | 2026-05-19 |

---

## TC-ACC-001: All form fields have visible labels or aria-label attributes

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded |
| Test Data | None |

**Steps:**
1. Inspect each form field in DevTools
2. Verify each input has an associated `<label>`, `aria-label`, or `aria-labelledby`

**Expected Result:**
- Every field (Submission Type, Account Name, Dates, Product, Stage, Notes, Upload) has a programmatic label
- No unlabeled form controls

**Pass Criteria:** All fields have accessible labels per WCAG 1.3.1.

---

## TC-ACC-002: Tab order follows logical top-to-bottom sequence

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded |
| Test Data | None |

**Steps:**
1. Place focus on the first form element
2. Press Tab repeatedly through the entire form
3. Note the order fields receive focus

**Expected Result:**
- Focus moves top-to-bottom, left-to-right following the visual layout
- No fields are skipped or visited out of logical order
- Focus never becomes trapped unexpectedly

**Pass Criteria:** Tab order matches visual form layout per WCAG 1.3.2 and 2.4.3.

---

## TC-ACC-003: All interactive elements are operable via keyboard only

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded |
| Test Data | None |

**Steps:**
1. Disconnect mouse
2. Using only keyboard: Tab to each field, interact with dropdowns (Enter/Space/Arrow keys), upload a document, and click Create Submission
3. Verify each action completes

**Expected Result:**
- Every field is operable without a mouse
- Dropdowns open with Enter/Space, navigate with Arrow keys
- File upload dialog opens via keyboard
- Form submits via keyboard

**Pass Criteria:** Full form completion is possible using keyboard only per WCAG 2.1.1.

---

## TC-ACC-004: Mandatory field errors are announced to screen readers

| Property | Value |
|---|---|
| Priority | P0 |
| Category | Accessibility |
| Preconditions | Screen reader (NVDA/VoiceOver) enabled |
| Test Data | Submit form with no fields filled |

**Steps:**
1. Enable a screen reader
2. Navigate to the New Submission form
3. Click "Create Submission" without filling any fields
4. Listen for error announcements

**Expected Result:**
- Error messages are announced by the screen reader
- Error areas use `aria-live="polite"` or `role="alert"`
- Focus moves to the first error field automatically

**Pass Criteria:** Validation errors are announced by screen reader per WCAG 3.3.1.

---

## TC-ACC-005: Submission Type options are keyboard navigable

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded |
| Test Data | None |

**Steps:**
1. Tab to the Submission Type field
2. Use Arrow keys to move between options (New Business / Cross-sell)
3. Press Enter or Space to select an option

**Expected Result:**
- Arrow keys cycle through Submission Type options
- Selected state is visually and programmatically communicated

**Pass Criteria:** Submission Type is fully operable via keyboard per WCAG 2.1.1.

---

## TC-ACC-006: Date picker fields are keyboard accessible

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded |
| Test Data | Date: any future date |

**Steps:**
1. Tab to the Need By Date field
2. Open the date picker using keyboard (Enter/Space)
3. Navigate months and select a date using keyboard
4. Repeat for Effective Date and Expiration Date

**Expected Result:**
- Date picker opens via keyboard
- Dates are selectable using keyboard navigation
- Selected date is reflected in the input field

**Pass Criteria:** All three date pickers are fully keyboard accessible per WCAG 2.1.1.

---

## TC-ACC-007: Product(s) multi-select dropdown is keyboard accessible

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded |
| Test Data | None |

**Steps:**
1. Tab to the Product(s) field
2. Open dropdown with Enter/Space
3. Navigate options with Arrow keys
4. Select a product with Enter
5. Verify product card appears and focus is managed correctly

**Expected Result:**
- Dropdown opens, closes, and navigates via keyboard
- Selected product card is announced by screen reader
- Remove (×) button on card is keyboard reachable

**Pass Criteria:** Full multi-select interaction via keyboard per WCAG 2.1.1.

---

## TC-ACC-008: Cancel warning dialog is focus-trapped and announced

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Accessibility |
| Preconditions | User has modified at least one field |
| Test Data | Submission Type: New Business |

**Steps:**
1. Modify a field and click Cancel
2. Observe the warning dialog
3. Tab through dialog elements
4. Verify focus does not escape the dialog
5. Listen with screen reader for dialog announcement

**Expected Result:**
- Focus is trapped within the dialog (can't Tab outside)
- Dialog title/message is announced by screen reader on open
- Both Yes and No buttons are keyboard reachable

**Pass Criteria:** Dialog is focus-trapped and screen-reader announced per WCAG 2.1.2 and 4.1.3.

---

## TC-ACC-009: Color contrast meets WCAG 2.1 AA minimum ratio

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded |
| Test Data | None |

**Steps:**
1. Use a contrast checker tool (e.g. browser axe plugin or Colour Contrast Analyser)
2. Check contrast ratio of all form labels against background
3. Check contrast ratio of placeholder text
4. Check contrast of error messages
5. Check contrast of button text on button background

**Expected Result:**
- Normal text: contrast ratio ≥ 4.5:1
- Large text (18pt+): contrast ratio ≥ 3:1
- UI components and state indicators: ≥ 3:1

**Pass Criteria:** All text and interactive elements meet WCAG 2.1 AA contrast ratios (1.4.3).

---

## TC-ACC-010: Form is functional at 200% browser zoom

| Property | Value |
|---|---|
| Priority | P1 |
| Category | Accessibility |
| Preconditions | New Submission form is loaded at 100% zoom |
| Test Data | None |

**Steps:**
1. Zoom browser to 200% (Ctrl + zoom in)
2. Scroll through the New Submission form
3. Interact with all fields at 200% zoom
4. Attempt to complete and submit the form

**Expected Result:**
- No content is hidden, clipped, or overlapping at 200% zoom
- All fields and buttons remain accessible
- Form is fully functional and submittable

**Pass Criteria:** Form is usable at 200% zoom with no loss of functionality per WCAG 1.4.4.
