# Accessibility Test Cases — UWB-3: View Submissions in Tabular List
# Ticket: https://unitededucators.atlassian.net/browse/UWB-3
# Standard: WCAG 2.1 AA
# Generated: 2026-05-21

---

## TC-UWB3-ACC-001: Table is navigable by keyboard
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-001 |
| **Priority** | P0 |
| **Type** | Accessibility |
| **WCAG** | 2.1.1 Keyboard |

**Steps:**
1. Navigate to `/submissions`
2. Press Tab to reach the table
3. Use arrow keys to navigate between rows and cells

**Expected Result:** Keyboard focus moves through table cells; Tab reaches column headers and row cells; no keyboard trap

---

## TC-UWB3-ACC-002: Column headers have role="columnheader"
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-002 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 1.3.1 Info and Relationships |

**Steps:**
1. Inspect the table DOM with accessibility tree in DevTools
2. Check column header elements

**Expected Result:** Column headers use `<th scope="col">` or have `role="columnheader"`; screen reader announces column names when navigating cells

---

## TC-UWB3-ACC-003: Sortable column headers announce sort state
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-003 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 4.1.2 Name, Role, Value |

**Steps:**
1. Focus on a sortable column header (Premium, Need By, Effective)
2. Read announcement with screen reader
3. Activate sort; re-read announcement

**Expected Result:** Header announces sort direction (e.g. "Premium, sorted ascending"); uses aria-sort attribute ("ascending", "descending", "none")

---

## TC-UWB3-ACC-004: Pagination controls are keyboard accessible
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-004 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 2.1.1 Keyboard |

**Steps:**
1. Tab to the pagination footer
2. Use Tab/Enter to navigate pages

**Expected Result:** Previous, Next, and numbered page buttons all receive focus; Enter activates them; disabled buttons are communicated as disabled

---

## TC-UWB3-ACC-005: Stage badges communicate status to screen readers
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-005 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 1.4.1 Use of Colour |

**Steps:**
1. Navigate to a stage badge cell with a screen reader
2. Read the announcement

**Expected Result:** Stage label is announced as text (e.g. "In Review"); status is not conveyed by colour alone; aria-label or visible text is present

---

## TC-UWB3-ACC-006: Unassigned underwriter is announced descriptively
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-006 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 1.3.3 Sensory Characteristics |

**Steps:**
1. Navigate to a row with "Unassigned" underwriter using screen reader

**Expected Result:** Cell announces "Unassigned" as text; not conveyed only by the "?" placeholder or a visual icon

---

## TC-UWB3-ACC-007: Focus is visible on all interactive elements
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-007 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 2.4.7 Focus Visible |

**Steps:**
1. Tab through all interactive elements on the table page (tabs, search, sort headers, rows, pagination)

**Expected Result:** A visible focus ring appears on every focused element; no element has `outline: none` without an alternative focus indicator

---

## TC-UWB3-ACC-008: Table has accessible name or caption
| Field | Value |
|---|---|
| **ID** | TC-UWB3-ACC-008 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 1.3.1 Info and Relationships |

**Steps:**
1. Inspect the table element in the accessibility tree

**Expected Result:** Table has an accessible name (e.g. `aria-label="Submissions"` or `<caption>`) so screen reader users know what the table contains before navigating into it

---
