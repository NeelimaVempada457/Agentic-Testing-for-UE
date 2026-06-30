# Application Flow Analysis
# Ticket: BDBP1-202 — Registration Form: Instruction Section
# Application: https://bankofstlucia--digitalqa.sandbox.my.site.com/
# Analyzed: 2026-05-16 | Browser: Chrome

---

## Application Entry Points

| Route | Title | Access |
|---|---|---|
| `/` | Home | Public |
| `/SelfRegister` | Register | Public — reached via "New Customer" modal |

---

## Registration Flow — Multi-Step Navigation

```
Home Page
  └── Start Application → "Are you an existing customer?" modal
        └── New Customer → /SelfRegister
              ├── Step 1: Select Product
              │     ├── Bank Accounts → A+ Club / HomeStart / Ordinary Savings
              │     ├── Debit Cards
              │     ├── Credit Cards
              │     └── Loans
              ├── Step 2: Instructions  ← BDBP1-202
              ├── Step 3: Personal Information
              └── Step 4: Validation
```

---

## Detected Modules

| # | Module | URL | Step |
|---|---|---|---|
| 1 | Home Page | `/` | — |
| 2 | Customer Type Modal | `/` (overlay) | — |
| 3 | Select Product | `/SelfRegister` | Step 1 |
| 4 | Select Sub-Product (Bank Accounts) | `/SelfRegister` | Step 1b |
| 5 | **Instruction Section** | `/SelfRegister` | **Step 2** |
| 6 | Personal Information | `/SelfRegister` | Step 3 |
| 7 | Validation | `/SelfRegister` | Step 4 |

---

## Instruction Section — Detected Elements

### Page Header
- BOSL Digital Logo (top-left)
- "Back to Home" button (top-right of form area)
- Left sidebar: step navigation (Select Product → Instructions → Personal Information → Validation)

### Content Sections (in order)
1. **Page Heading**: "Ordinary Savings Application" (H2)
2. **Sub-heading**: "Complete the following steps"
3. **General Instructions** (H3 "General Instructions")
   - H3: "Instructions for completing the form"
   - 4 bullet points (completeness, 4-person max, AML policy, Personal Info Form)
   - **DISCLAIMER** paragraph (bold label + body text)
4. **Product Description Block** (Ordinary Savings)
   - Product icon + name
   - Description text (3 paragraphs)
   - "Features" section (2 items: age requirement, minimum balance)
   - "Benefits" section (6 items)
   - Disclaimer footnote
5. **Important Compliance Notice** (H3)
   - FATCA hyperlink: `https://www.irs.gov/businesses/corporations/fatca-related-forms`
   - Supporting text about consequences of non-completion
6. **Document Requirements Accordion** ("What documents do you need?")
   - Button 1: "Individual (National) of ECCU Territories"
   - Button 2: "Resident Nationals of CARICOM (except ECCU territories)"
   - Button 3: "Non-Nationals / Residents Outside CARICOM"
   - Button 4: "Self – Employed Individuals"
7. **Continue** button (bottom)

### Footer
- "Need help? Contact (758)-456-6999 / Email bosldigital@bankofsaintlucia.com"
- Footer links: BOSL Website, Credit Card Portal, Debit Card Portal
- Social links: Facebook, Instagram, Twitter/X, YouTube
- Copyright: © 2026 | All Rights Reserved

---

## Accordion Content Verified

### Accordion 1 — Individual (National) of ECCU Territories ✅
- **Identification**: One form of Valid Government-Issued Picture ID (Passport, National ID Card, Social Security Card, Driver's License, Voter's Card)
- **Residential Address**: NO PROOF OF ADDRESS REQUIRED (for Saint Lucian Nationals/Residents)
- **Additional Notes**: Minors — parent/guardian KYC + Birth Certificate

### Accordion 2 — Resident Nationals of CARICOM ✅
- **Identification**: Passport AND Driver's License or National ID Card
- **Residential Address**: One of — utility bill (3 months), tenancy agreement, reference letter (financial institution, 1yr+), employer letter, combined living arrangement letter, bank statement (3 months)

### Accordion 3 — Non-Nationals / Residents Outside CARICOM ✅ (auto-closed by Self-Employed click)
- Auto-closed when Self-Employed was opened — single-expand behaviour confirmed

### Accordion 4 — Self-Employed Individuals ✅
- **Identification**: 1 ID (ECCU/CARICOM nationals), 2 IDs (Non-Nationals outside CARICOM)
- **Residential Address**: Same proof-of-address options as CARICOM

---

## Accordion Behaviour Observations

| Behaviour | Expected (Jira AC) | Observed | Status |
|---|---|---|---|
| Collapsible accordion | AC-07 | Present — clicking expands/collapses | ✅ VERIFIED |
| Only one open at a time | AC-08 | ECCU closed when CARICOM opened | ✅ VERIFIED |
| Auto-close on new open | AC-09 | Confirmed across all 4 buttons | ✅ VERIFIED |

---

## Navigation Elements Observed

| Element | Present | Target / Behaviour |
|---|---|---|
| Continue button | ✅ Yes | Proceeds to Personal Information |
| Back to Home button | ✅ Yes | Returns to home page |
| Save Progress button | ❌ NOT FOUND | Required by Definition of Done |
| Back to Dashboard button | ❌ NOT FOUND | Required by Definition of Done |
| Left sidebar steps | ✅ Yes | Shows 4 steps, current step highlighted |

---

## Links Detected

| Link Text | URL | Opens New Tab? |
|---|---|---|
| FATCA (Foreign Account Tax Compliance Act) | https://www.irs.gov/businesses/corporations/fatca-related-forms | TBD — requires test |
| BOSL Website | https://www.bankofsaintlucia.com | TBD |
| BOSL Credit Card Enquiry Portal | https://www.4csonline.com/CardInquiry/logon.aspx?cthm=BOSL | TBD |
| BOSL Debit Card Portal | https://debitcard.bankofsaintlucia.com/eservicesbosl/ | TBD |
| BOSL Facebook | https://www.facebook.com/bankofsaintlucia | TBD |

---

## Console Errors Observed

- 2 console errors detected during navigation (non-blocking — page loaded successfully)
- 3 warnings detected
- Errors logged — recommend investigation by dev team
