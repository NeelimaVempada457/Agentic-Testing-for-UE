// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Cross-sell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-002: Create Cross-sell submission — all mandatory fields
  test('Create Cross-sell submission — all mandatory fields', async ({ page }) => {
    // 1. Navigate to Submissions > New Submission
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();

    // 2. Select "Cross-sell" card
    await page.getByRole('button', { name: /cross-sell/i }).click();

    // 3. Select a valid Account
    await page.getByLabel(/account/i).click();
    await page.getByRole('option').first().click();

    // 4. Set all required dates
    await page.getByLabel(/effective date/i).fill('2027-07-01');
    await page.getByLabel(/need by date/i).fill('2027-06-26');

    // 5. Select "Primary General Liability (CGL) - GL"
    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /primary general liability.*cgl/i }).click();

    // 6. Upload document
    await page.getByLabel(/upload|document/i).setInputFiles('test.pdf');

    // 7. Submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Cross-sell submission created with unique ID.
    await expect(page.getByText(/submission id/i)).toBeVisible();
  });
});
