# Detected Modules — UWB-1: New Submission Form
# URL: https://united-educators-application.vercel.app/submissions/new
# Analysed: 2026-05-27

---

## Modules Detected on /submissions/new

| Module | Type | In Scope (UWB-1) | Status vs Previous Run | Notes |
|---|---|---|---|---|
| Page Header | Static UI | Yes | Unchanged | H1 "Create New Submission"; breadcrumb: Dashboard / Submissions / New Submission |
| Submission Type | Card-style buttons | Yes | CHANGED (was dropdown in 2026-05-19) | Now renders as two card buttons: "New Business" (pre-selected) / "Cross-Sell" — D-04 RESOLVED |
| Account Name | Searchable inline dropdown | Yes | Unchanged | Click-to-open inline search panel; 24 accounts in dataset; type-ahead filter; "No accounts found" on no match |
| Need By Date | Date picker (type=date) | Yes | Unchanged | Mandatory (asterisk present); auto-populate NOT working — DISC-003 |
| Effective Date | Date picker (type=date) | Yes | Unchanged | Mandatory (asterisk present); sets Expiration Date on change |
| Expiration Date | Date picker (type=date) | Yes | Unchanged | No asterisk despite being mandatory per spec — DISC-001; auto-sets to +1 year from Effective |
| Product(s) | Multi-select grouped dropdown | Yes | Unchanged | 11 products across 5 categories; selected products show as removable cards with category badge |
| Current Stage | Custom dropdown | Yes | Unchanged | Defaults to "Intake & Triage / Incomplete Submission"; 15 stage options across 5 phases |
| Brokerage | Read-only text display | Yes | Unchanged | Auto-populated on account selection; correctly non-editable (generic text display, not input) |
| Broker Contact | Read-only text display | Yes | Unchanged | Auto-populated on account selection; correctly non-editable |
| Broker Email | Read-only text display | Yes | Unchanged | Auto-populated on account selection; correctly non-editable |
| Broker Phone | Read-only text display | Yes | Unchanged | Auto-populated on account selection; correctly non-editable |
| Underwriter | HTML select (combobox) | Yes | Unchanged — still editable | Auto-populated on account selection but NOT read-only; DISC-002 persists |
| Underwriting Specialist | HTML select (combobox) | Yes | Unchanged — still editable | Auto-populated on account selection but NOT read-only; DISC-002 persists |
| Internal Notes | Text area | Yes | Unchanged | Optional; character counter present; spell-check icon in UI |
| Add Document | Drag & drop file uploader | Yes | PARTIALLY CHANGED | accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"; .doc still missing; UI hint text omits JPG — DISC-005 |
| Application Preview Panel | Overlay preview | Yes | Unchanged | Triggered by "Preview" button; shows 12+ fields including Kind, Type, Account, Products, Dates, Brokerage, Stage, Docs, Notes |
| Cancel Dialog | Confirmation dialog | Yes | Label change | Now: "Keep Editing / Discard / Save as Draft" (previously "Yes/No/Save as Draft"); 3 buttons — DISC-004 |
| Create Submission Button | Action trigger | Yes | Unchanged | Primary action; runs validation before creating |
| Preview Button | Action trigger | Yes | New observation | Opens Application Preview overlay panel |
| Cancel Button | Action trigger | Yes | Unchanged | Opens "Discard this submission?" dialog |
| Required Fields Notice | Static footer text | Yes | Unchanged | "Required: Account Name, Product(s), Need By Date, and Effective Date" — does not list Expiration Date or Documents |
| Dashboard | Navigation destination | Out of scope | N/A | Entry point via "New Submission" button |
| Sidebar Navigation | Navigation | Out of scope | N/A | Dashboard, Submissions, Renewals, Inbox, Tasks, Approvals, Notifications, Activity, Portfolio |
| AI Companion Panel | Chat sidebar | Out of scope | N/A | Context-aware agentic assistant; updates suggestions based on form state |

---

## Brokerage Section — Auto-Fill Detail

| Field | Source | Editable After Auto-Fill | Verified |
|---|---|---|---|
| Brokerage | Account-linked data | No — correctly read-only | Yes — renders as generic text (not input) |
| Broker Contact | Account-linked data | No — correctly read-only | Yes — renders as generic text (not input) |
| Broker Email | Account-linked data | No — correctly read-only | Yes — renders as generic text (not input) |
| Broker Phone | Account-linked data | No — correctly read-only | Yes — renders as generic text (not input) |

---

## Underwriting Team Section — Auto-Fill Detail

| Field | Source | Editable After Auto-Fill | Expected per AC-10 |
|---|---|---|---|
| Underwriter | Account-linked data | YES — HTML select, disabled=false | No — should be read-only |
| Underwriting Specialist | Account-linked data | YES — HTML select, disabled=false | No — should be read-only |

---

## Product Dropdown — Category Structure

| Category Code | Category Name | Product Count |
|---|---|---|
| GL | General Liability | 4 |
| ML | Management Liability | 5 |
| PL | Professional Liability | 1 |
| AR | Assumed Reinsurance | 2 |
| EL | Excess Liability | 2 |
| **Total** | | **14** |

---

## File Upload — Accepted Types

| Type | In accept attribute | In UI hint text | In spec |
|---|---|---|---|
| .pdf | Yes | Yes | Yes |
| .doc | **No** | **No** | Yes |
| .docx | Yes | Yes | Yes |
| .xlsx | Yes | Yes | Yes |
| .jpg | Yes | **No** | Yes |
| .jpeg | Yes | **No** | Not explicitly listed (same as .jpg) |
| .png | Yes | Yes | Yes |

---

*Generated by generate-test-cases skill during live app crawl — 2026-05-27*
