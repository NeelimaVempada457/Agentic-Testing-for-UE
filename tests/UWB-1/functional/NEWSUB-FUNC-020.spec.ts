// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-020
// KNOWN DEFECT: DISC-004 — Cancel dialog has 3 buttons (Keep Editing / Discard / Save as Draft)
//               instead of the spec-required 2 buttons (Yes / No)

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Cancel Dialog Button Labels', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-004 — Three buttons found (Keep Editing / Discard / Save as Draft) vs spec's two (Yes / No)
  test.fail();
  test('Cancel dialog button labels match specification', async ({ page }) => {
    // 1. Modify a field
    await page.getByRole('radio', { name: /new business/i }).click();

    // 2. Click Cancel to trigger the warning dialog
    await page.getByRole('button', { name: /cancel/i }).click();

    const dialog = page.locator('[role="dialog"], .modal, .dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // 3. Count and read all dialog button labels
    const dialogButtons = dialog.getByRole('button');
    await expect(dialogButtons).toHaveCount(2);

    // 4. Verify spec-required button labels: "Yes" and "No"
    await expect(dialog.getByRole('button', { name: /^yes$/i })).toBeVisible();
    await expect(dialog.getByRole('button', { name: /^no$/i })).toBeVisible();

    // Verify non-spec buttons are NOT present
    await expect(dialog.getByRole('button', { name: /keep editing/i })).not.toBeVisible();
    await expect(dialog.getByRole('button', { name: /discard/i })).not.toBeVisible();
    await expect(dialog.getByRole('button', { name: /save as draft/i })).not.toBeVisible();
  });
});
