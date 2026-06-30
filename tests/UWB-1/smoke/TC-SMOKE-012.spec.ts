import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-012: Verify Cancel without modifications does not show warning dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Cancel without modifications does not show warning dialog', async ({ page }) => {
    // 2. Do not modify any fields

    // 3. Click the "Cancel" button
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Expected Result: no warning dialog appears, user is navigated away immediately
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 3000 });
    await expect(page).not.toHaveURL(/new-submission/i, { timeout: 5000 });
  });
});
