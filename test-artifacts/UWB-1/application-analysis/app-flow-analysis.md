# App Flow Analysis — UWB-1: New Submission Form
# URL: https://united-educators-application.vercel.app
# Analysed: 2026-05-27

---

## Pages Visited

| # | URL | Page Title | How Reached |
|---|---|---|---|
| 1 | `/` | UW Workbench — Dashboard | Direct navigation (application auto-authenticated as John Michaels, Sr. Underwriter) |
| 2 | `/submissions/new` | UW Workbench — Create New Submission | Clicked "New Submission" button on Dashboard |

---

## Authentication

The application does not present a login screen at the root URL. It auto-loads as "John Michaels — Sr. Underwriter". No username/password prompt was encountered at `https://united-educators-application.vercel.app`.

---

## Dashboard Observations

- Navigation bar: Dashboard, Submissions, Renewals, Inbox, Tasks, Approvals, Notifications, Activity, Portfolio
- "New Submission" button is prominently placed in the top-right area of dashboard content
- Dashboard widgets: Open Tasks, Alerts & Flags, Correspondence, Submissions table (3 records), Portfolio Snapshot
- AI Companion panel ("Live · agentic") is on the right side with contextual suggestions

---

## New Submission Form — Page Structure

```
/submissions/new
├── Page Header: "Create New Submission" + breadcrumb
├── Submission Documents section (file upload — drag & drop or click to browse)
├── Submission Type section (card-style buttons: New Business / Cross-Sell)
├── Account section (searchable dropdown — 24 accounts, type-ahead filter)
├── Policy section
│   ├── Need By Date (date picker — mandatory, NO auto-populate — DISC-003)
│   ├── Effective Date (date picker — mandatory)
│   ├── Expiration Date (date picker — mandatory per spec, NO asterisk — DISC-001)
│   └── Product(s) (multi-select grouped dropdown — shown as removable cards)
├── Brokerage section (read-only after account selection)
│   ├── Brokerage
│   ├── Broker Contact
│   ├── Broker Email
│   └── Broker Phone
├── Underwriting Team section (auto-populated, incorrectly editable — DISC-002)
│   ├── Underwriter (combobox — enabled, should be read-only)
│   └── Underwriting Specialist (combobox — enabled, should be read-only)
├── Notes section (optional text area with character counter)
├── Submission Stage section (dropdown — defaults to "Incomplete Submission")
├── Required fields notice (footer)
└── Action buttons: Cancel | Preview | Create Submission
```

---

## User Flows Observed

### Flow 1: Create New Submission (Happy Path)
1. User navigates to `/submissions/new` from Dashboard via "New Submission" button
2. **Submission Type**: User clicks a card — "New Business" is pre-selected by default
3. **Account Name**: User clicks the search button → types to filter by name, city, state, or type → selects account
   - Brokerage, Broker Contact, Broker Email, Broker Phone auto-populate as read-only fields
   - Underwriter and Underwriting Specialist auto-populate but remain editable (discrepancy)
   - Confirmation message: "Account #XXXX resolved · Brokerage & team auto-populated"
4. **Need By Date**: User must manually enter (auto-population not functional)
5. **Effective Date**: User types date; Expiration Date auto-populates to +1 year
6. **Products**: User opens dropdown → selects one or more → each appears as a card with remove button
7. **Stage**: Defaults to "Intake & Triage / Incomplete Submission"; user can change
8. **Notes**: Optional text entry
9. **Preview**: User clicks Preview → "Application Preview" panel shows all entered values
10. **Create Submission**: User clicks → validation runs → submission created with unique ID

### Flow 2: Account Search — No Results (AC-04)
1. User types a term that matches no account (e.g., "XXXXXXNOTFOUND")
2. Dropdown shows "No accounts found" message
3. Brokerage and Underwriting Team sections retain "Select an account above" placeholder

### Flow 3: Account Search — Results Found (AC-02, AC-03)
1. User types partial name (e.g., "Riverside")
2. Filtered results appear in real-time (1 account · Type to filter)
3. User clicks on result to select it
4. Account is displayed in field with account number and type
5. Auto-population cascade fires for Brokerage and Underwriting Team sections

### Flow 4: Date Behavior
1. User sets Effective Date via keyboard → Expiration Date auto-populates to +1 year (working)
2. Need By Date does NOT auto-populate to Effective Date − 5 days (discrepancy DISC-003)

### Flow 5: Cancel Flow
1. User clicks "Cancel" with form partially filled
2. Dialog appears: "Discard this submission?"
3. Three buttons: "Keep Editing" | "Discard" | "Save as Draft"
4. (Spec expects only Yes/No — DISC-004)

### Flow 6: Preview
1. User clicks "Preview" button
2. "Application Preview" panel overlays on the right
3. Shows: Kind, Type, Account, Products, Need By, Effective, Expiration, Brokerage, Broker, Broker Email, Broker Phone, Stage, Docs count, Notes, Attached Docs
4. Header shows how many of 4 required fields are complete (e.g., "3/4 required fields complete")
5. User can click "Close" to dismiss and continue editing

### Flow 7: Products Multi-Select
1. User clicks "Select one or more products…" button
2. Grouped dropdown opens (GL — General Liability, ML — Management Liability, PL, AR, EL)
3. Products shown: 11 total options across 5 categories
4. User clicks items to toggle; selected items show checkmark icons
5. Button display shows selected product cards with "GL/ML/PL" category badge and product name
6. Each card has a remove (×) button; "Clear all selections" at bottom of dropdown

---

## UI Patterns Observed

| Pattern | Details |
|---|---|
| Card-style radio buttons | Submission Type uses two clickable cards with icon, name, description, and "Selected" badge |
| Searchable dropdown | Account Name: click-to-open inline search with text filter; shows account number, city, type |
| Multi-select product cards | Products: grouped dropdown; selected items display as cards with category code badge |
| Auto-populate cascade | On account selection: Brokerage fields go read-only; Underwriting fields populate but stay editable |
| Date auto-populate | Effective Date → Expiration Date (+1 yr) works; Effective Date → Need By Date (−5 days) does NOT work |
| Stage grouped dropdown | Submission Stage: options grouped by workflow phase with phase headers |
| Application Preview panel | Overlay panel showing all form data for review before submission |
| Cancel confirmation dialog | 3-button dialog: Keep Editing / Discard / Save as Draft |
| Character counter | Internal Notes field shows live character count |
| Required fields notice | Bottom banner listing required fields by name (currently omits Expiration Date and Documents) |
| Inline validation | "Required" helper text appears below empty mandatory fields after submission attempt |
| AI Companion | Right-side panel with contextual suggestions that update based on current form state |

---

## Stage Dropdown Options (Full List)

| Phase | Options |
|---|---|
| Intake & Triage | Incomplete Submission (default), Complete Submission, Declined to Quote |
| Underwriting | Information Gathering, Review In Progress, Referred |
| Quoting | Quote In Progress, Quote Sent, Quote Negotiation, Revised Quote |
| Decision | Bound, UE Non-Renewed, Member Declined, Member No Response |
| Post-Bind | Pending Issuance, Issued, Cancelled, Endorsed |

---

*Generated by generate-test-cases skill during live app crawl — 2026-05-27*
