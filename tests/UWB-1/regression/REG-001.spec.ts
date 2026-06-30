// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: D-04 fix (was dropdown → cards)

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('REG-001: Submission Type renders as card-style radio buttons', async ({ page }) => {
    // 2. Inspect the Submission Type section at the top of the form
    const submissionTypeSection = page.locator('text=Submission Type').first();
    await expect(submissionTypeSection).toBeVisible();

    // 3. Verify the control type — should be card-style radio buttons, NOT a <select> dropdown
    const selectDropdown = page.locator('select').filter({ hasText: /new business|cross.?sell/i });
    await expect(selectDropdown).toHaveCount(0);

    const newBusinessCard = page.locator('[type="radio"]').filter({ hasText: /new business/i })
      .or(page.locator('label').filter({ hasText: /new business/i }));
    await expect(newBusinessCard.first()).toBeVisible();

    const crossSellCard = page.locator('[type="radio"]').filter({ hasText: /cross.?sell/i })
      .or(page.locator('label').filter({ hasText: /cross.?sell/i }));
    await expect(crossSellCard.first()).toBeVisible();
  });
});
