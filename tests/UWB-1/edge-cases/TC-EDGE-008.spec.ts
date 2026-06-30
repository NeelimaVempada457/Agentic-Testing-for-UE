// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-008: Change Stage to "Declined to Quote" before submission

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Change Stage to "Declined to Quote" before submission', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Locate the Current Stage dropdown — default is "Incomplete Submission"
    const stageDropdown = page.getByLabel(/current stage|stage/i);
    await expect(stageDropdown).toBeVisible();

    // Step 2: Change stage to "Declined to Quote"
    await stageDropdown.click();
    await page.getByRole('option', { name: /declined to quote/i }).click();

    // Verify stage selection
    await expect(stageDropdown).toHaveValue(/declined to quote/i);

    // Fill remaining mandatory fields
    await page.getByLabel(/submission type/i).click();
    await page.getByRole('option').first().click();

    await page.getByLabel(/account name/i).fill('Test Account');
    await page.getByRole('option').first().click();

    await page.getByLabel(/effective date/i).fill('01/01/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    await page.getByLabel(/product\(s\)|products/i).click();
    await page.getByRole('option').first().click();

    // Submit the form
    await page.getByRole('button', { name: /create submission/i }).click();

    // Verify submission is created successfully with "Declined to Quote" stage
    await expect(
      page.getByText(/submission.*created|successfully created/i)
    ).toBeVisible({ timeout: 15000 });

    // Verify the persisted stage value on the created submission
    await expect(page.getByText(/declined to quote/i)).toBeVisible();
  });
});
