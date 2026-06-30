// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-001: Effective Date equal to Expiration Date (boundary — equal dates)

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Boundary: New Submission Form — Date Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-001: Effective Date equal to Expiration Date (boundary — equal dates)', async ({ page }) => {

    // Step 1: Set Effective Date = 2027-01-01
    await page.getByLabel(/effective date/i).fill('2027-01-01');

    // Step 2: Set Expiration Date = 2027-01-01 (same date)
    await page.getByLabel(/expiration date/i).fill('2027-01-01');

    // Step 3: Attempt to create submission
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: System either accepts (equal dates allowed) or shows a clear validation message
    const hasValidationError = await page.getByText(/effective date must not exceed expiration date/i).isVisible().catch(() => false);
    const hasSuccess = await page.getByText(/submission created/i).isVisible().catch(() => false);

    // One of these outcomes must be true — equal-date boundary must produce a deterministic result
    expect(hasValidationError || hasSuccess).toBe(true);
  });
});
