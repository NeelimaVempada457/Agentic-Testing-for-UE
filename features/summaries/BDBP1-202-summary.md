# Test Summary: BDBP1-202
## Registration Form — Instruction Section

**Generated:** 2026-05-15  
**Ticket Status:** UAT Deployed  
**Epic:** BDBP1-153 — Digital Portal (Customer) | User Journey

---

## Scenario Counts

| Type          | Count |
|---------------|-------|
| Positive      | 10    |
| Negative      | 4     |
| Edge Case     | 6     |
| Security      | 3     |
| Accessibility | 5     |
| **Total**     | **28** |

---

## Acceptance Criteria Coverage

| AC | Description | Scenarios Covering | Status |
|----|-------------|-------------------|--------|
| AC-1 | Header/Footer consistent with Registration Page (BDBP1-94) | Scenario: Header, footer, and left-side component are consistent | ✅ Covered |
| AC-2 | Left side component consistent (BDBP1-95) | Scenario: Header, footer, and left-side component are consistent | ✅ Covered |
| AC-3 | Instruction section — product-specific content from Salesforce, FATCA notice, 4 residency buttons | Scenarios: Page loads with all buttons visible; Product-specific instructions loaded from Salesforce; FATCA compliance notice displayed | ✅ Covered |
| AC-4 | On Button Click — show documentation requirements per residency type | Scenarios: ECCU, CARICOM, Non-CARICOM, Self-Employed button clicks | ✅ Covered |
| AC-5 | Accordion behavior — collapsible, one open at a time, auto-close on new open | Scenarios: Auto-close on second open; Collapse on re-click; A11y keyboard accordion | ✅ Covered |
| AC-6 | Navigation: Continue → Personal Information; Save Progress; Back to Dashboard | Scenarios: Continue navigation; Save Progress; Back to Dashboard; Mobile layout | ✅ Covered |

---

## Tag Distribution

| Tag | Count |
|-----|-------|
| `@Smoke` | 2 |
| `@Regression` | 26 |
| `@Positive` | 10 |
| `@Negative` | 4 |
| `@EdgeCase` | 6 |
| `@Security` | 3 |
| `@Accessibility` | 5 |
| `@HighPriority` | 16 |
| `@MediumPriority` | 10 |
| `@LowPriority` | 2 |
| `@UI` | 28 |
| `@Web` | 28 |

---

## Linked Issues Considered

| Issue | Type | Impact on Tests |
|-------|------|----------------|
| BDBP1-408 | Blocks (Controlled Step Navigation) | Covered by step guard negative scenario (cannot skip Instructions) |
| BDBP1-529 | Related bug (content/formatting mismatch) — Completed | Content format and Salesforce rendering covered in positive scenarios |
| BDBP1-94 | Header/Footer component | Referenced in AC-1 scenario |
| BDBP1-95 | Left side component | Referenced in AC-2 scenario |

---

## Key Testing Notes

1. **Salesforce dynamic content** — Instructions are fetched from `Product_Instructions__c` (Rich Text Area field). Tests must verify real Salesforce integration, not mocked data, in QA environment.
2. **Accordion mutual exclusivity** — Only one section may be open at a time. This is a behavioral invariant that must hold across all four sections.
3. **Session expiry** — The negative session scenario is critical given this is an authenticated banking portal.
4. **FATCA link** — Must open in a new tab and point to the correct URL (per Definition of Done).
5. **Navigation links (Continue, Save, Back)** — All three are in the Definition of Done as explicit acceptance criteria.
6. **Minor account handling** — ECCU section notes minors cannot have their own picture ID; parent/guardian KYC required. This is documented in the KYC table but no separate scenario was created as it's an informational display, not an interactive flow — flag for manual verification.

---

## Warnings

- ⚠️ **No explicit AC for error states**: The ticket does not describe what happens if Salesforce content is unavailable. The negative scenario "Salesforce API unavailable" is a risk-based addition — confirm expected behaviour with the team.
- ⚠️ **No URL provided**: `${APP_URL}` placeholder used — replace with actual QA/UAT environment URL before running tests.
- ⚠️ **Step guard behaviour** (BDBP1-408 dependency): The step navigation story is UAT Deployed; the negative "cannot skip Instructions" scenario assumes step locking is active in the test environment.

---

## Next Steps

1. Replace `${APP_URL}`, `${TEST_USERNAME}`, `${TEST_PASSWORD}` in your `.env` file
2. Run Smoke tests first: `npx playwright test --grep @Smoke`
3. Run full regression: `npx playwright test --grep @BDBP1-202`
4. Review `risks/BDBP1-202-risk-analysis.md` for identified gap areas
5. Run `/generate-playwright BDBP1-202` to auto-generate Playwright step implementations
