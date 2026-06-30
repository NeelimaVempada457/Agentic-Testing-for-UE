// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-001 | AC-01

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Submission Type', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Submission Type renders as card-style radio buttons (New Business / Cross-sell)', async ({ page }) => {
    // 2. Locate the Submission Type section
    const submissionTypeSection = page.locator('text=Submission Type').first();
    await expect(submissionTypeSection).toBeVisible();

    // 3. Verify two card-style radio buttons: "New Business" and "Cross-sell"
    const newBusinessCard = page.getByRole('radio', { name: /new business/i });
    const crossSellCard = page.getByRole('radio', { name: /cross.?sell/i });
    await expect(newBusinessCard).toBeVisible();
    await expect(crossSellCard).toBeVisible();

    // 4. Select "New Business"
    await newBusinessCard.click();
    await expect(newBusinessCard).toBeChecked();
    await expect(crossSellCard).not.toBeChecked();

    // 5. Select "Cross-sell" — verify only one can be selected at a time
    await crossSellCard.click();
    await expect(crossSellCard).toBeChecked();
    await expect(newBusinessCard).not.toBeChecked();
  });
});
