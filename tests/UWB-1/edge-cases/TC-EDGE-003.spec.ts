// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-003: Manually set Expiration Date to before the auto-default

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Manually set Expiration Date to before the auto-default', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1: Set Effective Date to 01/01/2027 — Expiration Date auto-populates to 01/01/2028
    await page.getByLabel(/effective date/i).fill('01/01/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    const expirationDate = page.getByLabel(/expiration date/i);
    await expect(expirationDate).toHaveValue('01/01/2028');

    // Step 2: Manually change Expiration Date to 06/01/2027
    await expirationDate.fill('06/01/2027');
    await expirationDate.press('Tab');

    // Verify override is accepted (06/01/2027 is still after Effective Date 01/01/2027)
    await expect(expirationDate).toHaveValue('06/01/2027');

    // Step 3: Proceed to submit — verify no validation error on Expiration Date
    await page.getByRole('button', { name: /create submission/i }).click();
    await expect(page.getByText(/expiration date.*error|invalid expiration date/i)).not.toBeVisible();
  });
});
