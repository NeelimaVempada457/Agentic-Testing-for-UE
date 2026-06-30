// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

// NOTE (DISC-004): The Cancel dialog in the live app shows three buttons:
// "Keep Editing", "Discard", and "Save as Draft" — not the two-button "Yes"/"No"
// dialog specified in UWB-1 requirements. Tests are written against the actual
// live app behavior. BA confirmation pending on whether "Save as Draft" is in scope.

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-011: Click Cancel after modifying fields — verify warning dialog', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 1. Select "New Business" for Submission Type (modify the form)
    // "New Business" is pre-selected; clicking Cross-Sell creates a trackable modification
    await page.getByRole('button', { name: /Cross-Sell/ }).click();
    await expect(page.getByRole('button', { name: /Cross-Sell.*Selected/i })).toBeVisible();

    // 2. Click the "Cancel" button
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Verify: warning dialog appears
    await expect(page.getByRole('heading', { name: /Discard this submission/i })).toBeVisible();

    // Verify: dialog contains the warning message about discarding or saving progress
    await expect(page.getByText(/discard.*entirely|save.*progress.*draft/i)).toBeVisible();

    // Verify: dialog contains "Keep Editing" button (equivalent to "No" per spec)
    await expect(page.getByRole('button', { name: 'Keep Editing' })).toBeVisible();

    // Verify: dialog contains "Discard" button (equivalent to "Yes" per spec)
    await expect(page.getByRole('button', { name: 'Discard' })).toBeVisible();

    // Verify: dialog contains "Save as Draft" button (DISC-004 — undocumented in UWB-1 spec)
    await expect(page.getByRole('button', { name: 'Save as Draft' })).toBeVisible();

    // Clicking "Keep Editing" (equivalent to "No") — verify user returns to form with data intact
    await page.getByRole('button', { name: 'Keep Editing' }).click();

    // Verify: dialog is dismissed
    await expect(page.getByRole('heading', { name: /Discard this submission/i })).not.toBeVisible();

    // Verify: form is still on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // Verify: data is intact — Cross-Sell is still selected
    await expect(page.getByRole('button', { name: /Cross-Sell.*Selected/i })).toBeVisible();
  });
});
