// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: DISC-004 open defect — Cancel dialog has 3 buttons instead of 2
// KNOWN DEFECT: DISC-004

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-004
  test.fail();
  test('REG-006: Cancel dialog has 3 buttons instead of 2 (open defect DISC-004)', async ({ page }) => {
    // 2. Enter a value in any field to trigger dirty state
    const anyTextField = page.locator('input[type="text"]').first();
    await anyTextField.fill('Test value');

    // 3. Click Cancel
    await page.click('button:has-text("Cancel")');

    // 4. Verify dialog is visible and count buttons
    const dialog = page.locator('[role="dialog"], .modal, .dialog').first();
    await expect(dialog).toBeVisible();

    // Per spec: dialog should have exactly 2 buttons — "Yes" and "No"
    const dialogButtons = dialog.locator('button');
    await expect(dialogButtons).toHaveCount(2);

    await expect(dialog.locator('button:has-text("Yes")')).toBeVisible();
    await expect(dialog.locator('button:has-text("No")')).toBeVisible();

    // The following incorrectly-named buttons should NOT be present
    await expect(dialog.locator('button:has-text("Keep Editing")')).toHaveCount(0);
    await expect(dialog.locator('button:has-text("Discard")')).toHaveCount(0);
    await expect(dialog.locator('button:has-text("Save as Draft")')).toHaveCount(0);
  });
});
