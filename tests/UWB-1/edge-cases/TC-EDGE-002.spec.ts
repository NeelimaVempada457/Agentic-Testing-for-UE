// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-002: Manually override Need By Date after auto-population

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Manually override Need By Date after auto-population', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Set Effective Date to 02/10/2027 — Need By Date auto-populates to 02/05/2027
    await page.getByLabel(/effective date/i).fill('02/10/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    const needByDate = page.getByLabel(/need by date/i);
    await expect(needByDate).toHaveValue('02/05/2027');

    // Step 2: Manually change Need By Date to 01/20/2027
    await needByDate.fill('01/20/2027');
    await needByDate.press('Tab');

    // Verify manual override is accepted and value is preserved
    await expect(needByDate).toHaveValue('01/20/2027');

    // Step 3: Proceed to submit — verify no error on Need By Date field
    await page.getByRole('button', { name: /create submission/i }).click();
    await expect(page.getByText(/need by date.*error|invalid need by date/i)).not.toBeVisible();
  });
});
