import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-008: Verify Current Stage defaults to "Incomplete Submission"', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Current Stage defaults to "Incomplete Submission"', async ({ page }) => {
    // 2. Locate the Current Stage field in the Submission Stage section
    const currentStageField = page.getByLabel('Current Stage');

    // 3. Observe the default value — Expected: "Incomplete Submission"
    await expect(currentStageField).toBeVisible();
    await expect(currentStageField).toHaveValue('Incomplete Submission');
  });
});
