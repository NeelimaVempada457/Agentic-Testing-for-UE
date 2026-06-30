// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-002: Effective Date one day before Expiration Date

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Boundary: New Submission Form — Date Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-002: Effective Date one day before Expiration Date', async ({ page }) => {

    // Step 1: Set Effective Date = 2027-01-01
    await page.getByLabel(/effective date/i).fill('2027-01-01');

    // Step 2: Set Expiration Date = 2027-01-02 (1 day apart — minimum valid range)
    await page.getByLabel(/expiration date/i).fill('2027-01-02');

    // Step 3: Fill remaining mandatory fields and submit
    await page.getByLabel(/submission type/i).selectOption({ index: 1 });
    await page.getByLabel(/account name/i).fill('Test Account');
    await page.getByLabel(/need by date/i).fill('2026-12-31');

    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission created successfully — minimum valid date range
    await expect(
      page.getByText(/submission created/i).or(page.getByText(/successfully/i))
    ).toBeVisible({ timeout: 10000 });
  });
});
