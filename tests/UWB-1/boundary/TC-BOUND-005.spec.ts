// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-005: Need By Date after Effective Date

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Boundary: New Submission Form — Need By Date Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-005: Need By Date after Effective Date', async ({ page }) => {

    // Step 1: Set Effective Date = 2027-03-01
    await page.getByLabel(/effective date/i).fill('2027-03-01');

    // Step 2: Manually set Need By Date = 2027-03-10 (after Effective Date — invalid per spec)
    await page.getByLabel(/need by date/i).fill('2027-03-10');

    // Step 3: Attempt to submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Validation error — Need By Date must be before Effective Date
    const errorLocator = page.getByText(/need by date must be before effective date/i)
      .or(page.getByText(/need by date.*before.*effective/i))
      .or(page.getByText(/invalid need by date/i))
      .or(page.getByRole('alert').filter({ hasText: /need by/i }));

    await expect(errorLocator).toBeVisible({ timeout: 10000 });

    // Confirm submission was blocked
    await expect(page).not.toHaveURL(/confirmation|success/i);
  });
});
