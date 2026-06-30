// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-003: Effective Date exceeds Expiration Date by 1 day

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Boundary: New Submission Form — Date Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-003: Effective Date exceeds Expiration Date by 1 day', async ({ page }) => {

    // Step 1: Set Effective Date = 2027-01-02
    await page.getByLabel(/effective date/i).fill('2027-01-02');

    // Step 2: Set Expiration Date = 2027-01-01 (Effective > Expiration — invalid)
    await page.getByLabel(/expiration date/i).fill('2027-01-01');

    // Step 3: Attempt to submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Field-level validation error prevents submission; error references date constraint
    const errorLocator = page.getByText(/effective date must not exceed expiration date/i)
      .or(page.getByText(/expiration date must be after effective date/i))
      .or(page.getByText(/invalid date range/i))
      .or(page.getByText(/date.*error/i));

    await expect(errorLocator).toBeVisible({ timeout: 10000 });

    // Verify form did NOT navigate away (submission was blocked)
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });
});
