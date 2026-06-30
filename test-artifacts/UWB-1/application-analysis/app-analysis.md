# Application Analysis — UWB-1: New Submission Form
# URL: https://united-educators-application.vercel.app/
# Analysed: 2026-05-19

---

## Pages / Routes Found

| Route | Description |
|---|---|
| `/` | Landing / Dashboard |
| `/submissions/new` | New Submission form (primary scope) |
| `/submissions` | Submissions list view |

---

## Fields Observed in Live Application

| Field | Observed Type | Required Indicator | Notes |
|---|---|---|---|
| Submission Type | Dropdown (select) | Yes | Requirements specify Radio Button (Card Type) — see Discrepancy #1 |
| Account Name | Searchable Dropdown / Combobox | Yes | Matches requirements |
| Need By Date | Date Picker | Yes | Matches requirements |
| Effective Date | Date Picker | Yes | Matches requirements |
| Expiration Date | Date Picker | No asterisk | See Discrepancy #4 |
| Product(s) | Multi-select Dropdown | Yes | Matches requirements |
| Current Stage | Dropdown | Yes (pre-filled) | Defaults to "Incomplete Submission" — matches |
| Brokerage | Text input (auto-filled) | Read-only | See Discrepancy #2 |
| Broker Contact | Combobox (auto-filled) | Read-only | See Discrepancy #2 |
| Broker Email | Text input (auto-filled) | Read-only | Matches requirements |
| Broker Phone | Text input (auto-filled) | Read-only | Matches requirements |
| Underwriter | Combobox (editable after account selection) | — | See Discrepancy #2 |
| Underwriting Specialist | Combobox (editable after account selection) | — | See Discrepancy #2 |
| Internal Notes | Text Area | No (optional) | Matches requirements |
| Add Document | File Uploader | Yes | See Discrepancy #6 |
| Create Submission | Button | — | Matches requirements |
| Cancel | Button | — | See Discrepancy #3 |

---

## Key Discrepancies Found During Live App Crawl

| # | Field / Area | Requirement | Observed in Live App | Severity |
|---|---|---|---|---|
| 1 | Submission Type | Radio Button (Card Type) with New Business / Cross-sell | Rendered as a standard **dropdown select** — not card-style radio buttons | Low — functionally equivalent, but visual/UX differs from spec |
| 2 | Underwriting Team fields (Underwriter, Underwriting Specialist) | Should be **read-only** after account selection (auto-populated from Salesforce) | Fields appear as **editable comboboxes** after account selection — user can modify values | High — functional gap, violates AC-08 and AC-11 |
| 3 | Cancel dialog | Warning message with "Yes" / "No" only | Cancel dialog includes a **"Save as Draft"** third option not documented in UWB-1 requirements | Medium — undocumented feature, may affect test assertions for TC-NEG-011 |
| 4 | Expiration Date | Listed as **Mandatory** in requirements table | No mandatory asterisk (*) displayed next to the Expiration Date label in the live form | Low — validation may still block submission, but field is not visually marked as required |
| 5 | Need By Date auto-population | Should auto-populate to Effective Date − 5 days when Effective Date is set first | Auto-population **did not trigger** via standard Playwright `.fill()` interaction — may require React synthetic events or a keyboard blur event | Medium — automation risk; may require special handling in test scripts |
| 6 | Add Document — allowed file types | Requirements: `.pdf, .doc, .docx, .xlsx, .jpg, .png` | Live UI file picker shows: `.pdf, .docx, .xlsx, .png` — `.doc` and `.jpg` appear absent from the accept attribute | Low — backend may still accept them; needs confirmation from dev team |

---

## UI Patterns Observed

| Pattern | Details |
|---|---|
| Form layout | Multi-section vertical form with labeled section headers (Submission Type, Account, Policy, Submission Stage, Brokerage, Underwriting Team, Notes, Documents) |
| Submission Summary | Right-side or bottom panel that previews key fields as the form is filled |
| Product cards | Selected products render as dismissible chips/cards below the dropdown |
| Date pickers | Calendar-style date pickers with month/year navigation |
| File upload | Drag-and-drop zone with click-to-browse fallback |
| Cancel dialog | Modal dialog with three options: "Yes", "No", "Save as Draft" |
| Validation | Inline field-level error messages below each field on submit attempt |

---

## Issues / Bugs Found During Analysis

| # | Description | Impact | Recommended Action |
|---|---|---|---|
| BUG-01 | Underwriting Team fields are editable post-account-selection | High — violates requirements | Raise defect; fields must be set to `readonly` or `disabled` after Salesforce auto-population |
| BUG-02 | Need By Date auto-population not triggering via standard input | Medium — automation risk | Investigate React event binding; may need `.dispatchEvent` or keyboard interaction to trigger |
| BUG-03 | "Save as Draft" in Cancel dialog is undocumented | Medium — feature creep | Clarify with BA whether this is intentional; update UWB-1 requirements if so |
| BUG-04 | Expiration Date missing mandatory indicator | Low — UX inconsistency | Add asterisk to match other mandatory fields |
| BUG-05 | Submission Type rendered as dropdown instead of card-style radio | Low — UX mismatch | Confirm with design team if dropdown is intentional or a frontend gap |
| BUG-06 | `.doc` and `.jpg` extensions absent from file picker accept attribute | Low — possible backend gap | Confirm with dev team whether these extensions are accepted at the API level |

---

*Generated by generate-test-cases skill during live app crawl · 2026-05-19*
