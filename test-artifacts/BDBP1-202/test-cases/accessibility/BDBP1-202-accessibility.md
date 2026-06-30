# Accessibility Test Cases — Registration Form: Instruction Section
# Ticket: BDBP1-202 | Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Standard: WCAG 2.1 Level AA | Source: COMBINED

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | INSTR-A11Y-001 | All 4 accordion buttons are keyboard accessible via Tab and Enter/Space | P1 | Accessibility | High | COMBINED | AC-07 | `@Accessibility` `@P1` `@BDBP1-202` `@Keyboard` `@WCAG-2.1.1` |
| 2 | INSTR-A11Y-002 | Accordion buttons have correct ARIA expanded state (true/false) | P1 | Accessibility | High | APP-ANALYSIS | AC-07, AC-08 | `@Accessibility` `@P1` `@BDBP1-202` `@ARIA` `@ScreenReader` `@WCAG-4.1.2` |
| 3 | INSTR-A11Y-003 | BOSL Digital Logo has descriptive alt text | P1 | Accessibility | High | APP-ANALYSIS | AC-11 | `@Accessibility` `@P1` `@BDBP1-202` `@AltText` `@WCAG-1.1.1` |
| 4 | INSTR-A11Y-004 | Heading hierarchy on Instruction Section follows WCAG logical structure | P1 | Accessibility | High | APP-ANALYSIS | N/A | `@Accessibility` `@P1` `@BDBP1-202` `@Headings` `@WCAG-1.3.1` |
| 5 | INSTR-A11Y-005 | "Skip to Main" link is the first focusable element and functions correctly | P1 | Accessibility | High | APP-ANALYSIS | N/A | `@Accessibility` `@P1` `@BDBP1-202` `@SkipNavigation` `@WCAG-2.4.1` |
| 6 | INSTR-A11Y-006 | FATCA link is distinguishable from surrounding text without relying solely on color | P1 | Accessibility | High | APP-ANALYSIS | AC-04, DOD-02 | `@Accessibility` `@P1` `@BDBP1-202` `@Links` `@ColorIndependence` `@WCAG-1.4.1` |
| 7 | INSTR-A11Y-007 | Instruction Section is operable at 200% browser zoom without horizontal scrolling | P1 | Accessibility | High | COMBINED | AC-12 | `@Accessibility` `@P1` `@BDBP1-202` `@Zoom` `@Reflow` `@WCAG-1.4.4` |

---

### INSTR-A11Y-001

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-A11Y-001 |
| **Title** | All 4 accordion buttons are keyboard accessible via Tab and Enter/Space |
| **Priority** | P1 |
| **Module** | Instruction Section — Keyboard Navigation |
| **Scenario Type** | Accessibility |
| **Risk Level** | High |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-07 |
| **Tags** | `@Accessibility` `@P1` `@BDBP1-202` `@Keyboard` `@WCAG-2.1.1` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Navigate to the Instruction Section using Tab key from the top<br>2. Tab through all interactive elements<br>3. When focused on an accordion button, press Enter or Space to expand<br>4. Verify content expands<br>5. Press Enter/Space again to collapse<br>6. Tab to the next accordion and repeat |
| **Expected Results** | 1. Each accordion button receives keyboard focus in logical order<br>2. Enter key expands/collapses the accordion<br>3. Space key also expands/collapses the accordion<br>4. Keyboard focus does not get trapped inside the accordion content<br>5. Continue button is reachable via keyboard after all accordions<br>6. FATCA link is reachable and activatable via keyboard |

---

### INSTR-A11Y-002

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-A11Y-002 |
| **Title** | Accordion buttons have correct ARIA expanded state (true/false) |
| **Priority** | P1 |
| **Module** | Instruction Section — ARIA Attributes |
| **Scenario Type** | Accessibility |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-07, AC-08 |
| **Tags** | `@Accessibility` `@P1` `@BDBP1-202` `@ARIA` `@ScreenReader` `@WCAG-4.1.2` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Inspect the HTML of the accordion buttons before any interaction<br>2. Note the aria-expanded attribute value<br>3. Click to open an accordion<br>4. Re-inspect the aria-expanded attribute<br>5. Click a different accordion<br>6. Check aria-expanded on both the newly opened and the auto-closed one |
| **Expected Results** | 1. Collapsed accordions have aria-expanded="false" (or the attribute absent — but false is preferred)<br>2. Expanded accordion has aria-expanded="true"<br>3. When ECCU is auto-closed by opening CARICOM, ECCU's aria-expanded changes to "false"<br>4. Screen readers announce "expanded" or "collapsed" on focus/interaction<br>5. Accordion content panels have aria-hidden="true" when collapsed |

---

### INSTR-A11Y-003

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-A11Y-003 |
| **Title** | BOSL Digital Logo has descriptive alt text |
| **Priority** | P1 |
| **Module** | Instruction Section — Image Alt Text |
| **Scenario Type** | Accessibility |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-11 |
| **Tags** | `@Accessibility` `@P1` `@BDBP1-202` `@AltText` `@WCAG-1.1.1` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Inspect the BOSL Digital Logo image element<br>2. Check the alt attribute value<br>3. Verify product icon in the product description block has alt text |
| **Expected Results** | 1. BOSL Digital Logo has alt="BOSL Digital Logo" or equivalent descriptive text (verified as present in snapshot)<br>2. Product icon (Ordinary Savings) has meaningful alt text describing the product<br>3. No decorative images that should have alt="" are using descriptive alt text<br>4. No images are missing the alt attribute entirely |

---

### INSTR-A11Y-004

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-A11Y-004 |
| **Title** | Heading hierarchy on Instruction Section follows WCAG logical structure |
| **Priority** | P1 |
| **Module** | Instruction Section — Heading Structure |
| **Scenario Type** | Accessibility |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Accessibility` `@P1` `@BDBP1-202` `@Headings` `@WCAG-1.3.1` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Inspect the heading structure of the Instruction Section page<br>2. Map all heading levels (H1–H6) in order |
| **Expected Results** | 1. Heading hierarchy observed from app: H2 → H3 → H4 (within accordions)<br>2. H2: "Ordinary Savings Application"<br>3. H3: "General Instructions", "Instructions for completing the form", "Important Compliance Notice"<br>4. H4: "Identification", "Residential Address", "Additional Notes" (inside accordions)<br>5. No heading levels are skipped (e.g., no H4 without an H3 parent)<br>6. Headings describe the content of their sections meaningfully |

---

### INSTR-A11Y-005

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-A11Y-005 |
| **Title** | "Skip to Main" link is the first focusable element and functions correctly |
| **Priority** | P1 |
| **Module** | Instruction Section — Skip Navigation |
| **Scenario Type** | Accessibility |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Accessibility` `@P1` `@BDBP1-202` `@SkipNavigation` `@WCAG-2.4.1` |
| **Preconditions** | 1. User is on the Instruction Section (or any page in the app) |
| **Test Steps** | 1. Load the Instruction Section page<br>2. Press Tab — observe the first focused element<br>3. If "Skip to Main" is focused, press Enter<br>4. Observe where focus lands |
| **Expected Results** | 1. "Skip to Main" link is the first focusable element on the page (confirmed in snapshot as [ref=e10])<br>2. Pressing Enter on "Skip to Main" moves focus to the main content area<br>3. Keyboard users can skip the header navigation to reach the form content directly<br>4. The "Skip to Main" link is visible when focused (not permanently hidden) |

---

### INSTR-A11Y-006

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-A11Y-006 |
| **Title** | FATCA link is distinguishable from surrounding text without relying solely on color |
| **Priority** | P1 |
| **Module** | Instruction Section — Link Accessibility |
| **Scenario Type** | Accessibility |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-04, DOD-02 |
| **Tags** | `@Accessibility` `@P1` `@BDBP1-202` `@Links` `@ColorIndependence` `@WCAG-1.4.1` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Locate the FATCA link in the Important Compliance Notice<br>2. Observe its visual styling vs surrounding paragraph text<br>3. Check if the link is distinguishable by more than just color (e.g., underline, bold, icon)<br>4. Verify link text is descriptive (not "click here") |
| **Expected Results** | 1. FATCA link is visually distinguishable from surrounding text by underline, weight, or other visual cue (not color alone)<br>2. Link text "FATCA (Foreign Account Tax Compliance Act)" is descriptive and meaningful<br>3. Link has visible focus indicator when tabbed to<br>4. Contrast ratio of the link text meets WCAG AA (4.5:1) |

---

### INSTR-A11Y-007

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-A11Y-007 |
| **Title** | Instruction Section is operable at 200% browser zoom without horizontal scrolling |
| **Priority** | P1 |
| **Module** | Instruction Section — Reflow / Zoom |
| **Scenario Type** | Accessibility |
| **Risk Level** | High |
| **Source** | COMBINED |
| **Jira AC Ref** | AC-12 |
| **Tags** | `@Accessibility` `@P1` `@BDBP1-202` `@Zoom` `@Reflow` `@WCAG-1.4.4` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Set browser zoom to 200% (Ctrl/Cmd + to 200%)<br>2. Scroll through the entire Instruction Section<br>3. Interact with accordion buttons at 200% zoom<br>4. Click "Continue" button |
| **Expected Results** | 1. No horizontal scrollbar appears<br>2. All 4 accordion buttons remain visible and clickable<br>3. FATCA link remains within the content area<br>4. "Continue" button is fully visible and usable<br>5. Text does not overflow outside containers<br>6. Accordion content is readable without horizontal scrolling |
