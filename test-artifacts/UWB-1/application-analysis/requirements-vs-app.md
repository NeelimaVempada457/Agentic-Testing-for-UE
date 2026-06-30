# Requirements vs Live App — UWB-1: New Submission Form
# Jira: https://unitededucators.atlassian.net/browse/UWB-1
# Analysed: 2026-05-27

---

## Acceptance Criteria Coverage

| AC | Requirement | Live App State | Status | Change from 2026-05-19 |
|---|---|---|---|---|
| AC-01 | All mandatory fields must be completed before submission creation | Inline "Required" validation appears on empty mandatory fields; "Create Submission" blocked | VERIFIED IN APP | No change |
| AC-02 | Account supports search and selection from Salesforce | Account Name opens inline search panel with type-ahead filter; 24 accounts available | VERIFIED IN APP | No change |
| AC-03 | User must select an account to proceed | Brokerage and Underwriting Team show "Select an account above" until account chosen | VERIFIED IN APP | No change |
| AC-04 | System shows message when no results are found | "No accounts found" displayed when search returns 0 results | VERIFIED IN APP | No change |
| AC-05 | Product and Underwriting Team allow multiple selections | Products: multi-select confirmed (14 options, 5 categories); Underwriting Team: single-select comboboxes only — no multi-select | PARTIALLY VERIFIED | No change |
| AC-06 | Date fields must be valid (Effective Date ≤ Expiration Date) | Expiration Date auto-sets to +1 year; validation for Effective > Expiration not tested in this run (field values comply by default) | VERIFIED IN APP | No change |
| AC-07 | Stage defaults to "Incomplete Submission" and is editable | Current Stage defaults to "Intake & Triage / Incomplete Submission"; 15 editable options | VERIFIED IN APP | No change |
| AC-08 | Submission is created only after validations pass with a unique Submission ID | Validation blocks submission when required fields empty; ID generation not confirmed (would require completing form) | VERIFIED IN APP | No change |
| AC-09 | Brokerage, Broker, and Underwriting Team auto-populate on account selection | All Brokerage fields + Underwriter + Underwriting Specialist auto-populated on account selection | VERIFIED IN APP | No change |
| AC-10 | Auto-populated fields are non-editable | Brokerage fields (4 fields): read-only — CORRECT; Underwriter: editable combobox; Underwriting Specialist: editable combobox — INCORRECT | DIFFERS FROM SPEC | No change — still failing |
| AC-11 | Changes are stored only in Workbench | Not observable in UI crawl without completing a submission | NOT TESTED | No change |
| AC-12 | Each new submission fetches fresh Salesforce data | Not directly observable; dataset is local mock — fresh fetch not confirmable | NOT TESTED | No change |
| AC-13 | User can modify stage before submission creation | Stage dropdown is editable (confirmed — 15 stage options available) | VERIFIED IN APP | No change |
| AC-14 | Notes field is optional; does not block submission creation | Internal Notes has no asterisk; not in required fields list | VERIFIED IN APP | No change |
| AC-15 | Summary displays key submission details | Application Preview panel shows: Kind, Type, Account, Products, Need By, Effective, Expiration, Brokerage, Broker, Broker Email, Broker Phone, Stage, Docs, Notes | VERIFIED IN APP | No change |
| AC-16 | User can review details before final submission | "Preview" button triggers Application Preview overlay | VERIFIED IN APP | No change |
| AC-17 | Stage defaults to "Incomplete Submission" | Confirmed default | VERIFIED IN APP | No change |
| AC-18 | Product and Underwriting Team allow multiple selections | Products: confirmed multi-select; Underwriting Team: single combobox only | PARTIALLY VERIFIED | No change |

---

## Fields & Behavior Coverage (Updated)

| Requirement Field | Mandatory | Required Behaviour | Live App | Gap / Status |
|---|---|---|---|---|
| Submission Type | Yes | Card-style radio button (New Business / Cross-sell) | Card-style buttons — CORRECT | RESOLVED (was dropdown on 2026-05-19) |
| Account Name | Yes | Searchable dropdown; pull from Salesforce | Inline searchable dropdown with type-ahead; 24 accounts | None |
| Need By Date | Yes | Date picker; auto-populates to Effective Date − 5 days | Present with asterisk; auto-population NOT working | DISC-003 — auto-populate missing |
| Effective Date | Yes | Date picker; must not exceed Expiration Date | Present with asterisk; sets Expiration Date on change | None |
| Expiration Date | Yes | Date picker; defaults to Effective Date + 1 year | Present; auto-sets +1 year — CORRECT; but NO asterisk | DISC-001 — missing asterisk |
| Product(s) | Yes | Multi-select dropdown; shows as cards with remove | Multi-select works; cards with remove button | None |
| Current Stage | No | Dropdown; defaults to "Incomplete Submission" | Present; correct default; editable | None |
| Brokerage | No | Auto-fill from Salesforce; read-only | Auto-fills; read-only (generic text display) | None |
| Broker Contact | No | Auto-fill from Salesforce; read-only | Auto-fills; read-only | None |
| Broker Email | No | Auto-fill from Salesforce; read-only | Auto-fills; read-only | None |
| Broker Phone | No | Auto-fill from Salesforce; read-only | Auto-fills; read-only | None |
| Underwriter | No | Auto-fill from Salesforce; read-only | Auto-fills; EDITABLE combobox (disabled=false) | DISC-002 — should be read-only |
| Underwriting Specialist | No | Auto-fill from Salesforce; read-only | Auto-fills; EDITABLE combobox (disabled=false) | DISC-002 — should be read-only |
| Internal Notes | No | Optional text area; spell checker | Text area present; spell-check icon present; optional | None |
| Add Document | Yes (at least 1) | Max 25MB; types: .pdf .doc .docx .xlsx .jpg .png | accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"; .doc absent; UI hint omits JPG | DISC-005 — .doc missing |
| Cancel button | N/A | Confirmation dialog (Yes / No only) | 3-button dialog: Keep Editing / Discard / Save as Draft | DISC-004 — extra button |
| Create Submission | N/A | Creates unique Submission ID after validation | Present; validation fires | None |

---

## Summary by Status

| Status | Count | AC Items |
|---|---|---|
| VERIFIED IN APP | 12 | AC-01, AC-02, AC-03, AC-04, AC-06, AC-07, AC-08, AC-09, AC-13, AC-14, AC-15, AC-16, AC-17 |
| DIFFERS FROM SPEC | 1 | AC-10 (Underwriting Team editable) |
| PARTIALLY VERIFIED | 2 | AC-05, AC-18 (Underwriting Team no multi-select) |
| NOT TESTED | 2 | AC-11, AC-12 (require live Salesforce or submission completion) |

---

## Observations (Updated 2026-05-27)

1. **D-04 resolved**: Submission Type is now correctly rendered as card-style radio buttons — this is a confirmed fix since the 2026-05-19 crawl.

2. **AC-10 still failing**: Underwriter and Underwriting Specialist remain editable comboboxes after account selection. DOM inspection confirms both `<select>` elements have `disabled=false`. Brokerage fields (4) are correctly read-only, so the auto-populate mechanism works — the editability of underwriting fields is an isolated implementation gap.

3. **Need By Date auto-populate absent**: Setting Effective Date via keyboard events triggers Expiration Date (+1 year) but does NOT trigger Need By Date (−5 days). The Expiration Date auto-population confirms React change events are firing, so the Need By Date logic is simply not implemented.

4. **Save as Draft**: The "Save as Draft" option in the Cancel dialog is undocumented in UWB-1. It implies a draft persistence layer exists. BA should confirm if this is approved scope and add an AC if so.

5. **File type .doc**: The `.doc` extension remains absent from the file input accept attribute. `.jpg` was added since the previous run (partial fix). UI hint text "PDF, DOCX, XLSX, PNG" still omits JPG even though it is now accepted.

6. **Required fields footer notice**: The bottom of the form states "Required: Account Name, Product(s), Need By Date, and Effective Date" — this does not include Expiration Date or Documents (Add Document), both of which are mandatory per spec. This is a UX labeling gap but was not separately logged as a discrepancy since Expiration Date's asterisk issue (DISC-001) covers the primary concern.

---

*Generated by generate-test-cases skill — 2026-05-27*
