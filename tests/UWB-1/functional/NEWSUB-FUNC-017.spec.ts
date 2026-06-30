// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-017 | AC-04

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Account No Results', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Account "no results found" message appears for invalid search', async ({ page }) => {
    // 2. Type a nonsense string in Account Name field
    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('ZZZZINVALIDXXX');

    // 3. Wait for search results (or timeout)
    await page.waitForTimeout(2000);

    // 4. Verify "No results found" or similar message appears
    await expect(
      page.locator(
        'text=/no results found/i, text=/no accounts/i, text=/no matches/i, text=/no account.*match/i'
      ).first()
    ).toBeVisible({ timeout: 10000 });
  });
});
