// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-003: SQL Injection — Inject payload in searchable fields

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

const SQL_PAYLOADS = [
  `' OR '1'='1`,
  `'; DROP TABLE submissions; --`,
];

test.describe("Security — SQL Injection: Payloads in Account Name search field", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test("TC-SEC-003: SQL Injection — Inject payload in searchable fields", async ({ page }) => {

    const accountSearchField = page.getByLabel(/account name/i).or(
      page.locator(
        'input[name*="account"], input[id*="account"], input[placeholder*="account" i], input[aria-label*="account" i]'
      )
    );

    for (const payload of SQL_PAYLOADS) {
      // Step 1/3: Type each SQL injection payload into the Account Name search field
      await accountSearchField.fill(payload);

      // Allow the search debounce / API call to complete
      await page.waitForTimeout(1500);

      // Step 2/4: Assert no database error messages are surfaced in the UI
      const pageText = await page.evaluate(() => document.body.innerText);
      const errorPatterns = [
        /sql/i,
        /syntax error/i,
        /unclosed quotation/i,
        /ORA-\d+/,          // Oracle error codes
        /pg_query/i,        // PostgreSQL
        /mysql_fetch/i,     // MySQL
        /exception/i,
        /stack trace/i,
      ];
      for (const pattern of errorPatterns) {
        expect(pageText).not.toMatch(pattern);
      }

      // Assert the page is still stable — no unexpected redirects to error pages
      await expect(page).not.toHaveURL(/error|500|crash/i);

      // Clear field before next payload
      await accountSearchField.clear();
    }
  });
});
