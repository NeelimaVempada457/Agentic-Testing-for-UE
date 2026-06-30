// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-011: Expiration Date 1 day before Effective Date (after override)

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Boundary: New Submission Form — Date Override Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-011: Expiration Date 1 day before Effective Date (after override)', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Set Effective Date = 2027-01-10
    await page.getByLabel(/effective date/i).fill('2027-01-10');

    // Step 2: Verify Expiration Date auto-populates to 2028-01-10 (1 year default)
    const expirationField = page.getByLabel(/expiration date/i);
    await expect(expirationField).toHaveValue('2028-01-10', { timeout: 5000 });

    // Step 3: Manually override Expiration Date to 2027-01-09 (1 day BEFORE Effective Date)
    await expirationField.fill('2027-01-09');

    // Step 4: Attempt to submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Validation error — Expiration Date must be >= Effective Date
    const errorLocator = page.getByText(/expiration date must be.*effective date/i)
      .or(page.getByText(/effective date must not exceed expiration date/i))
      .or(page.getByText(/invalid.*expiration date/i))
      .or(page.getByText(/expiration.*before.*effective/i))
      .or(page.getByRole('alert').filter({ hasText: /expiration|date/i }));

    await expect(errorLocator).toBeVisible({ timeout: 10000 });

    // Confirm the form was blocked from submitting
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });
});
