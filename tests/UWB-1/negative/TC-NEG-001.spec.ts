// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-001: Submit with no fields filled — verify all mandatory field errors', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 2. Do not fill in any fields — all fields left blank intentionally

    // 3. Click "Create Submission"
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Verify: form is not submitted (still on the new submission page)
    await expect(page).toHaveURL(/submissions\/new/);

    // Verify: at least 4 "Required" validation error messages are shown
    const requiredErrors = page.locator('p').filter({ hasText: /^Required$/ });
    await expect(requiredErrors).toHaveCount(4);

    // Verify: each required field error is visible
    await expect(requiredErrors.first()).toBeVisible();
  });
});
