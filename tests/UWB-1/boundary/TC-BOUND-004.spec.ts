// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-004: Need By Date exactly equal to Effective Date (zero days before)

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Boundary: New Submission Form — Need By Date Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-BOUND-004: Need By Date exactly equal to Effective Date (zero days before)', async ({ page }) => {
    // NOTE: Need By Date auto-populate is broken (DISC-003) — entering manually

    // Step 1: Set Effective Date = 2027-03-01
    await page.getByLabel(/effective date/i).fill('2027-03-01');

    // Step 2: Manually set Need By Date = 2027-03-01 (same as Effective Date — zero-day boundary)
    await page.getByLabel(/need by date/i).fill('2027-03-01');

    // Step 3: Attempt to submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Spec does not explicitly forbid Need By = Effective Date.
    // System either accepts or shows a clear validation message. Both outcomes are valid for this boundary probe.
    const hasValidationError = await page.getByText(/need by date must be before effective date/i).isVisible().catch(() => false);
    const hasSuccess = await page.getByText(/submission created/i).isVisible().catch(() => false);
    const hasAnyError = await page.getByRole('alert').isVisible().catch(() => false);

    expect(hasValidationError || hasSuccess || hasAnyError).toBe(true);
  });
});
