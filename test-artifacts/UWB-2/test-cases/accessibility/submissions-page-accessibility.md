# Accessibility Test Cases — UWB-2: Submission Tasks View
# Ticket: https://unitededucators.atlassian.net/browse/UWB-2
# Standard: WCAG 2.1 AA
# Generated: 2026-05-21

---

## TC-UWB2-ACC-001: Summary bar stat cards are keyboard accessible
| Field | Value |
|---|---|
| **ID** | TC-UWB2-ACC-001 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 2.1.1 Keyboard |

**Steps:**
1. Navigate to `/submissions`
2. Use Tab key to move through the summary bar cards
3. Use Enter/Space to activate a clickable card

**Expected Result:** All clickable stat cards receive focus; Enter/Space activates the filter; disabled cards are focusable but not activatable (or skipped via aria-disabled)

---

## TC-UWB2-ACC-002: Stat cards have accessible labels
| Field | Value |
|---|---|
| **ID** | TC-UWB2-ACC-002 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 1.3.1 Info and Relationships |

**Steps:**
1. Use a screen reader (NVDA/JAWS) to navigate to the summary bar
2. Read each stat card

**Expected Result:** Screen reader announces card label and value (e.g. "Open Submissions: 13"); context text (e.g. "across all stages") is also announced; not announced as just a number

---

## TC-UWB2-ACC-003: Export and New Submission buttons have accessible names
| Field | Value |
|---|---|
| **ID** | TC-UWB2-ACC-003 |
| **Priority** | P0 |
| **Type** | Accessibility |
| **WCAG** | 4.1.2 Name, Role, Value |

**Steps:**
1. Inspect "Export" button with screen reader or DevTools accessibility panel
2. Inspect "New Submission" button

**Expected Result:** Both buttons have accessible names (aria-label or visible text); screen reader announces "Export" and "New Submission" buttons correctly

---

## TC-UWB2-ACC-004: Page heading hierarchy is correct
| Field | Value |
|---|---|
| **ID** | TC-UWB2-ACC-004 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 1.3.1 Info and Relationships |

**Steps:**
1. Navigate to `/submissions`
2. Inspect heading levels with a screen reader or accessibility audit tool

**Expected Result:** H1 is "Submissions"; no heading levels are skipped; logical hierarchy from H1 onwards

---

## TC-UWB2-ACC-005: Colour contrast on stat card values meets AA standard
| Field | Value |
|---|---|
| **ID** | TC-UWB2-ACC-005 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 1.4.3 Contrast (Minimum) |

**Steps:**
1. Use a contrast checker tool on the stat card value text against its background
2. Check both normal and pressed/active states

**Expected Result:** Text-to-background contrast ratio ≥ 4.5:1 for normal text; ≥ 3:1 for large text

---

## TC-UWB2-ACC-006: Active filter card state is communicated to screen readers
| Field | Value |
|---|---|
| **ID** | TC-UWB2-ACC-006 |
| **Priority** | P1 |
| **Type** | Accessibility |
| **WCAG** | 4.1.2 Name, Role, Value |

**Steps:**
1. Click a stat card filter
2. Use screen reader to check the card's announced state

**Expected Result:** Screen reader announces pressed/selected state (aria-pressed="true" or equivalent); not just a visual colour change

---
