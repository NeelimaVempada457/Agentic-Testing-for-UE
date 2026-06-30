// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: Core stage default — Stage defaults to "Incomplete Submission" on form load

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('REG-010: Stage defaults to "Incomplete Submission"', async ({ page }) => {
    // 2. Read the Current Stage field value on load — no user interaction required
    const stageField = page.locator(
      'input[name*="stage"], select[name*="stage"], [aria-label*="Stage"], [aria-label*="Current Stage"], [data-field*="stage"]'
    ).first();
    await expect(stageField).toBeVisible();

    // 3. Verify default value is "Incomplete Submission"
    const tagOrText = page.locator('text=Incomplete Submission').first();
    await expect(tagOrText).toBeVisible();
  });
});
