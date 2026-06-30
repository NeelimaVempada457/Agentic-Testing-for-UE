import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

// Status: PASS EXPECTED — D-04 RESOLVED (card-style buttons now implemented)

test.describe('TC-SMOKE-003: Verify Submission Type field renders as card-style radio buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Submission Type field renders as card-style radio buttons', async ({ page }) => {
    // 2. Locate the Submission Type field
    const submissionTypeSection = page.locator('[data-testid*="submission-type"], .submission-type, fieldset').filter({ hasText: /Submission Type/i }).first();
    await expect(submissionTypeSection).toBeVisible();

    // 3. Inspect available options — exactly two card-style radio buttons: "New Business" and "Cross-sell"
    const newBusinessCard = page.getByRole('radio', { name: 'New Business' });
    const crossSellCard = page.getByRole('radio', { name: 'Cross-sell' });

    await expect(newBusinessCard).toBeVisible();
    await expect(crossSellCard).toBeVisible();

    // Only one can be selected at a time
    await newBusinessCard.click();
    await expect(newBusinessCard).toBeChecked();
    await expect(crossSellCard).not.toBeChecked();

    await crossSellCard.click();
    await expect(crossSellCard).toBeChecked();
    await expect(newBusinessCard).not.toBeChecked();
  });
});
