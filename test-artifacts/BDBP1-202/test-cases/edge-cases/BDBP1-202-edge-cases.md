# Edge Case Test Cases — Registration Form: Instruction Section
# Ticket: BDBP1-202 | Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Source: COMBINED (Jira AC + Live App)

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | INSTR-EDGE-001 | Rapidly clicking multiple accordion buttons in quick succession | P1 | Edge | High | APP-ANALYSIS | AC-07, AC-08 | `@Edge` `@P1` `@BDBP1-202` `@Accordion` `@RapidClick` |
| 2 | INSTR-EDGE-002 | Refreshing the page mid-session on the Instruction Section | P1 | Edge | High | APP-ANALYSIS | N/A | `@Edge` `@P1` `@BDBP1-202` `@PageRefresh` |
| 3 | INSTR-EDGE-003 | Pressing browser Back button from Instruction Section | P1 | Edge | High | APP-ANALYSIS | N/A | `@Edge` `@P1` `@BDBP1-202` `@BrowserBack` |
| 4 | INSTR-EDGE-004 | Instruction Section displays correctly after navigating forward then back | P2 | Edge | Medium | APP-ANALYSIS | N/A | `@Edge` `@P2` `@BDBP1-202` `@HistoryNavigation` |
| 5 | INSTR-EDGE-005 | Opening the Instruction Section in a new tab via copied URL | P2 | Edge | Medium | APP-ANALYSIS | N/A | `@Edge` `@P2` `@BDBP1-202` `@URLSharing` |
| 6 | INSTR-EDGE-006 | Instruction Section content renders correctly under slow network conditions | P2 | Edge | Medium | APP-ANALYSIS | AC-03 | `@Edge` `@P2` `@BDBP1-202` `@SlowNetwork` |
| 7 | INSTR-EDGE-007 | Instruction Section handles Salesforce data fetch failure gracefully | P1 | Edge | High | APP-ANALYSIS | AC-03 | `@Edge` `@P1` `@BDBP1-202` `@ErrorHandling` `@Salesforce` |
| 8 | INSTR-EDGE-008 | Accordion animation completes before next accordion can be interacted with | P2 | Edge | Low | APP-ANALYSIS | AC-07 | `@Edge` `@P2` `@BDBP1-202` `@Accordion` `@Animation` |

---

### INSTR-EDGE-001

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-001 |
| **Title** | Rapidly clicking multiple accordion buttons in quick succession behaves correctly |
| **Priority** | P1 |
| **Module** | Instruction Section — Accordion Rapid Interaction |
| **Scenario Type** | Edge |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-07, AC-08 |
| **Tags** | `@Edge` `@P1` `@BDBP1-202` `@Accordion` `@RapidClick` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Rapidly click all 4 accordion buttons in sequence without waiting for animations to complete<br>2. Observe the final state of all accordions |
| **Expected Results** | 1. Application does not crash or freeze<br>2. No race condition results in multiple accordions being simultaneously open<br>3. The last-clicked accordion is the one that ends up open<br>4. All accordion content is correctly displayed (no garbled or missing data) |

---

### INSTR-EDGE-002

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-002 |
| **Title** | Refreshing the page mid-session on the Instruction Section |
| **Priority** | P1 |
| **Module** | Instruction Section — Page Refresh |
| **Scenario Type** | Edge |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Edge` `@P1` `@BDBP1-202` `@PageRefresh` `@SessionState` |
| **Preconditions** | 1. User has navigated to the Instruction Section after selecting Ordinary Savings |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Press F5 or Ctrl+R to refresh the page<br>3. Observe the result |
| **Expected Results** | 1. Either the page reloads to the Instruction Section with the selected product context maintained<br>2. OR the user is redirected to Step 1 (Select Product) to restart the flow<br>3. The page does NOT show a blank or broken state<br>4. The user is NOT shown content for a different product than what they originally selected |

---

### INSTR-EDGE-003

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-003 |
| **Title** | Pressing browser Back button from Instruction Section returns to Product Selection |
| **Priority** | P1 |
| **Module** | Registration Form — Back Navigation |
| **Scenario Type** | Edge |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Edge` `@P1` `@BDBP1-202` `@BrowserBack` `@Navigation` |
| **Preconditions** | 1. User has navigated from Select Product to the Instruction Section |
| **Test Steps** | 1. Navigate to the Instruction Section<br>2. Press the browser's Back button<br>3. Observe where the user lands |
| **Expected Results** | 1. User is returned to the Select Product screen (Step 1) with their previous selection intact<br>2. OR user is returned to the Customer Type modal on the home page<br>3. User is not stranded on a broken or empty page<br>4. Application state is consistent — no data corruption |

---

### INSTR-EDGE-004

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-004 |
| **Title** | Instruction Section displays correctly when accessed after navigating forward then back |
| **Priority** | P2 |
| **Module** | Instruction Section — History Navigation |
| **Scenario Type** | Edge |
| **Risk Level** | Medium |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Edge` `@P2` `@BDBP1-202` `@Navigation` `@HistoryNavigation` |
| **Preconditions** | 1. User has proceeded past the Instruction Section to Personal Information |
| **Test Steps** | 1. Complete the Instruction Section and click Continue<br>2. Reach Personal Information (Step 3)<br>3. Press browser Back button to return to Instructions<br>4. Observe the Instruction Section state |
| **Expected Results** | 1. Instruction Section re-renders correctly with the previously selected product<br>2. All 4 accordion buttons are visible<br>3. Accordion state is reset (all collapsed) or restored to last known state<br>4. Continue button is functional again |

---

### INSTR-EDGE-005

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-005 |
| **Title** | Opening the Instruction Section in a new browser tab after copying the URL |
| **Priority** | P2 |
| **Module** | Instruction Section — URL Sharing |
| **Scenario Type** | Edge |
| **Risk Level** | Medium |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Edge` `@P2` `@BDBP1-202` `@URL` `@TabSharing` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Copy the current URL (https://bankofstlucia--digitalqa.sandbox.my.site.com/SelfRegister)<br>2. Open a new browser tab<br>3. Paste and navigate to the copied URL |
| **Expected Results** | 1. Either the new tab shows Step 1 (Select Product) requiring product selection first<br>2. OR the page shows the Instructions section if state is preserved in URL params<br>3. The page does NOT show a broken or empty state<br>4. No JS errors that break the page |

---

### INSTR-EDGE-006

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-006 |
| **Title** | Instruction Section content renders correctly with very slow network conditions |
| **Priority** | P2 |
| **Module** | Instruction Section — Performance / Network |
| **Scenario Type** | Edge |
| **Risk Level** | Medium |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Edge` `@P2` `@BDBP1-202` `@Performance` `@SlowNetwork` |
| **Preconditions** | 1. Browser network can be throttled via DevTools |
| **Test Steps** | 1. Open Chrome DevTools → Network → throttle to "Slow 3G"<br>2. Navigate to the Instruction Section<br>3. Observe loading behaviour and content accuracy |
| **Expected Results** | 1. Loading indicator/spinner is shown while content fetches from Salesforce<br>2. All product-specific instructions load correctly after the delay (no partial content)<br>3. FATCA link and accordion buttons are all functional after load<br>4. Page does not time out or show an error state under slow network |

---

### INSTR-EDGE-007

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-007 |
| **Title** | Instruction Section handles Salesforce data fetch failure gracefully |
| **Priority** | P1 |
| **Module** | Instruction Section — Error Handling |
| **Scenario Type** | Edge |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Edge` `@P1` `@BDBP1-202` `@ErrorHandling` `@Salesforce` |
| **Preconditions** | 1. Network request to Salesforce for product instructions can be intercepted via DevTools |
| **Test Steps** | 1. Open DevTools → Network → block the Salesforce API request for product instructions<br>2. Navigate to the Instruction Section<br>3. Observe application behaviour when the data fetch fails |
| **Expected Results** | 1. Application shows a user-friendly error message (not a raw stack trace)<br>2. User is not shown a blank content area without any explanation<br>3. User is offered a way to retry or contact support<br>4. No PII or system internals are exposed in the error message |

---

### INSTR-EDGE-008

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-EDGE-008 |
| **Title** | Accordion animation completes correctly when next accordion is clicked during transition |
| **Priority** | P2 |
| **Module** | Instruction Section — Accordion Animation |
| **Scenario Type** | Edge |
| **Risk Level** | Low |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-07 |
| **Tags** | `@Edge` `@P2` `@BDBP1-202` `@Accordion` `@Animation` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Click "Individual (National) of ECCU Territories"<br>2. Immediately (before animation completes) click "Resident Nationals of CARICOM"<br>3. Observe the final state |
| **Expected Results** | 1. Both transitions complete correctly — ECCU closes, CARICOM opens<br>2. No visual glitch or partially-open state persists<br>3. Content is not duplicated or overlapping<br>4. Only CARICOM content is visible in the final state |
