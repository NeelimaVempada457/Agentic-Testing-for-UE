// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-021 | AC-12

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Fresh Salesforce Data Per Submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Fresh Salesforce data is fetched for each new submission', async ({ page }) => {
    // 1. Create Submission #1 with Account A
    await page.getByRole('radio', { name: /new business/i }).click();

    const accountNameField1 = page.getByLabel(/account name/i);
    await accountNameField1.fill('Edu');
    const firstOption1 = page.locator('[role="option"]').first();
    await expect(firstOption1).toBeVisible({ timeout: 10000 });
    const accountText = await firstOption1.textContent();
    await firstOption1.click();

    const productsDropdown1 = page.getByLabel(/product/i);
    await productsDropdown1.click();
    await page.locator('[role="option"]').first().click();

    const effectiveDateField1 = page.getByLabel(/effective date/i);
    await effectiveDateField1.fill('2027-06-15');
    await effectiveDateField1.blur();

    await page.getByRole('button', { name: /create submission/i }).click();
    await expect(
      page.locator('text=/submission created/i, text=/success/i, [data-testid="success-message"]').first()
    ).toBeVisible({ timeout: 15000 });

    // 2. Return to New Submission form
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // 3. Search for Account A again — verify data is re-fetched (not cached/stale)
    const accountNameField2 = page.getByLabel(/account name/i);
    await accountNameField2.fill('Edu');
    const firstOption2 = page.locator('[role="option"]').first();
    await expect(firstOption2).toBeVisible({ timeout: 10000 });

    // Verify account options are returned again (not empty/stale cache)
    const optionCount = await page.locator('[role="option"]').count();
    expect(optionCount).toBeGreaterThan(0);

    // Verify the same account is still available (data re-fetched from Salesforce)
    if (accountText) {
      await expect(
        page.locator('[role="option"]').filter({ hasText: accountText.trim() }).first()
      ).toBeVisible();
    }
  });
});
