// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-019

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Cancel Warning Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Cancel with unsaved changes shows warning dialog', async ({ page }) => {
    // 2. Fill one or more fields to create unsaved changes
    await page.getByRole('radio', { name: /new business/i }).click();

    // 3. Click Cancel
    await page.getByRole('button', { name: /cancel/i }).click();

    // 4. Verify a warning dialog appears before navigating away
    const dialog = page.locator(
      '[role="dialog"], .modal, .dialog, [data-testid*="dialog"], [data-testid*="modal"]'
    ).first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
  });
});
