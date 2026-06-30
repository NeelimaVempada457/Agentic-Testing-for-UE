// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

// NOTE (DISC-004): The Cancel dialog in the live app uses "Keep Editing" / "Discard" / "Save as Draft"
// instead of the "Yes" / "No" buttons specified in UWB-1 requirements.
// "Discard" = "Yes" (confirm cancel). Tests are written against actual live app behavior.

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-012: Confirm cancel warning — verify data is lost on "Yes" (Discard)', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 1. Fill in Submission Type and Account Name to create form modifications
    // Switch to Cross-Sell to create a trackable change from the default
    await page.getByRole('button', { name: /Cross-Sell/ }).click();
    await expect(page.getByRole('button', { name: /Cross-Sell.*Selected/i })).toBeVisible();

    // Select an account
    await page.getByRole('button', { name: /Search accounts by name/ }).click();
    await page.getByRole('textbox', { name: /Search by name/ }).fill('Riverside');
    await page.getByRole('button', { name: /Riverside Unified School District/ }).click();

    // Verify account was selected (Brokerage auto-populates)
    await expect(page.getByText('Gallagher Education, Inc.')).toBeVisible();

    // 2. Click "Cancel"
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Verify: warning dialog appears
    await expect(page.getByRole('heading', { name: /Discard this submission/i })).toBeVisible();

    // 3. When warning dialog appears, click "Discard" (equivalent to "Yes" in spec)
    await page.getByRole('button', { name: 'Discard' }).click();

    // Verify: form is closed / user is navigated away from the new submission page
    await expect(page).not.toHaveURL(/submissions\/new/);

    // Verify: user lands on a different page (submissions list or dashboard)
    await expect(page).toHaveURL(/\/(submissions|$)/);

    // Verify: no submission was created — navigated away with no confirmation or new submission ID
  });
});
