# Security Test Cases — Registration Form: Instruction Section
# Ticket: BDBP1-202 | Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Generated: 2026-05-16 | Source: APP-ANALYSIS
# Note: These are defensive tests — expected result is always that the attack FAILS

---

## Summary

| # | Test Case ID | Title | Priority | Scenario Type | Risk Level | Source | Jira AC Ref | Tags |
|---|---|---|---|---|---|---|---|---|
| 1 | INSTR-SEC-001 | FATCA external link does not expose sensitive referrer information | P1 | Security | High | APP-ANALYSIS | DOD-01, DOD-02 | `@Security` `@P1` `@BDBP1-202` `@ExternalLink` `@Referrer` |
| 2 | INSTR-SEC-002 | Console errors do not expose system internals or stack traces | P0 | Security | Critical | APP-ANALYSIS | N/A | `@Security` `@P0` `@BDBP1-202` `@InformationDisclosure` `@ConsoleErrors` |
| 3 | INSTR-SEC-003 | Registration flow URL does not expose sensitive state in query parameters | P1 | Security | High | APP-ANALYSIS | N/A | `@Security` `@P1` `@BDBP1-202` `@URL` `@QueryParams` |
| 4 | INSTR-SEC-004 | Instruction Section is not accessible by manipulating browser history to skip product selection | P1 | Security | High | APP-ANALYSIS | N/A | `@Security` `@P1` `@BDBP1-202` `@AccessControl` `@StepSkipping` |
| 5 | INSTR-SEC-005 | External footer links include noopener noreferrer for security | P1 | Security | High | APP-ANALYSIS | DOD-01 | `@Security` `@P1` `@BDBP1-202` `@ExternalLinks` `@TabNabbing` |
| 6 | INSTR-SEC-006 | Salesforce API response for product instructions does not expose internal metadata | P1 | Security | High | APP-ANALYSIS | AC-03 | `@Security` `@P1` `@BDBP1-202` `@API` `@InformationDisclosure` `@Salesforce` |

---

### INSTR-SEC-001

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SEC-001 |
| **Title** | FATCA external link does not expose sensitive referrer information |
| **Priority** | P1 |
| **Module** | Instruction Section — Link Security |
| **Scenario Type** | Security |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | DOD-01, DOD-02 |
| **Tags** | `@Security` `@P1` `@BDBP1-202` `@ExternalLink` `@Referrer` |
| **Preconditions** | 1. User is on the Instruction Section |
| **Test Steps** | 1. Open browser DevTools → Network tab<br>2. Click the FATCA link<br>3. Observe the network request to the IRS website<br>4. Check the Referrer header sent to the external site |
| **Expected Results** | 1. FATCA link opens in a new tab (target="_blank")<br>2. Link has rel="noopener noreferrer" attribute to prevent referrer leakage and tab hijacking<br>3. The referrer header sent to IRS.gov does not expose the full BOSL application URL with any user state<br>4. No session tokens or query parameters containing user data are appended to the external URL |

---

### INSTR-SEC-002

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SEC-002 |
| **Title** | Console errors do not expose system internals or stack traces |
| **Priority** | P0 |
| **Module** | Instruction Section — Error Information Disclosure |
| **Scenario Type** | Security |
| **Risk Level** | Critical |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Security` `@P0` `@BDBP1-202` `@InformationDisclosure` `@ConsoleErrors` |
| **Preconditions** | 1. Browser DevTools available |
| **Test Steps** | 1. Open DevTools → Console tab<br>2. Navigate through the full registration flow to the Instruction Section<br>3. Review all console errors and warnings |
| **Expected Results** | 1. No stack traces expose server-side file paths, class names, or framework details<br>2. No API keys, tokens, or credentials visible in console output<br>3. Errors are generic user-facing messages where shown in UI<br>4. The 2 console errors observed during analysis do not contain sensitive system information |

---

### INSTR-SEC-003

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SEC-003 |
| **Title** | Registration flow URL does not expose sensitive state in query parameters |
| **Priority** | P1 |
| **Module** | Registration Form — URL Security |
| **Scenario Type** | Security |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Security` `@P1` `@BDBP1-202` `@URL` `@QueryParams` |
| **Preconditions** | 1. User navigates through the registration flow |
| **Test Steps** | 1. Navigate through all steps observing the URL at each step<br>2. Check URL at: Home, Customer Type modal, Select Product, Instruction Section<br>3. Note any query parameters present |
| **Expected Results** | 1. No PII (name, email, national ID) appears in the URL at any step<br>2. No session tokens or authentication credentials in the URL<br>3. Product selection state is maintained via session/state management — not exposed in URL<br>4. URL stays as /SelfRegister throughout the flow |

---

### INSTR-SEC-004

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SEC-004 |
| **Title** | Instruction Section is not accessible by manipulating browser history to skip product selection |
| **Priority** | P1 |
| **Module** | Registration Form — Step Access Control |
| **Scenario Type** | Security |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | N/A |
| **Tags** | `@Security` `@P1` `@BDBP1-202` `@AccessControl` `@StepSkipping` |
| **Preconditions** | 1. User has access to browser developer tools |
| **Test Steps** | 1. Navigate to home page<br>2. Use browser JS console to attempt navigation to the Instructions step without completing Step 1<br>3. Attempt: history.pushState({}, '', '/SelfRegister') followed by direct step manipulation<br>4. Observe application response |
| **Expected Results** | 1. Application enforces step order — Instructions cannot be loaded without prior product selection<br>2. If accessed directly, user is redirected to Step 1 or shown an appropriate error<br>3. No sensitive instruction content is rendered for an unauthenticated/uninitialized session |

---

### INSTR-SEC-005

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SEC-005 |
| **Title** | External footer links include noopener noreferrer for security |
| **Priority** | P1 |
| **Module** | Registration Form — Footer Link Security |
| **Scenario Type** | Security |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | DOD-01 |
| **Tags** | `@Security` `@P1` `@BDBP1-202` `@ExternalLinks` `@TabNabbing` |
| **Preconditions** | 1. User is on the Instruction Section page |
| **Test Steps** | 1. Inspect the HTML of external footer links (BOSL Website, Credit Card Portal, Debit Card Portal)<br>2. Check for rel attribute on each anchor tag |
| **Expected Results** | 1. All external links have target="_blank" AND rel="noopener noreferrer"<br>2. Prevents reverse tabnabbing (malicious page taking control of the opener tab)<br>3. Social media links (Facebook, Instagram, Twitter, YouTube) also have this attribute<br>4. FATCA link also has rel="noopener noreferrer" |

---

### INSTR-SEC-006

| Field | Details |
|---|---|
| **Test Case ID** | INSTR-SEC-006 |
| **Title** | Salesforce API response for product instructions does not expose internal metadata |
| **Priority** | P1 |
| **Module** | Instruction Section — API Response Security |
| **Scenario Type** | Security |
| **Risk Level** | High |
| **Source** | APP-ANALYSIS |
| **Jira AC Ref** | AC-03 |
| **Tags** | `@Security` `@P1` `@BDBP1-202` `@API` `@InformationDisclosure` `@Salesforce` |
| **Preconditions** | 1. Browser DevTools Network tab available |
| **Test Steps** | 1. Open DevTools → Network tab<br>2. Navigate to the Instruction Section<br>3. Identify the API call fetching product instructions from Salesforce<br>4. Examine the response payload |
| **Expected Results** | 1. API response contains only the instruction content (no internal Salesforce IDs exposed unnecessarily)<br>2. No internal field names, org IDs, or system metadata visible to the end user<br>3. API response is served over HTTPS only<br>4. No API keys or tokens visible in the response or request headers accessible to the client |
