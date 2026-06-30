// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Expiration Date Override', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-005: Create submission with Expiration Date overridden
  test('Create submission with Expiration Date overridden', async ({ page }) => {
    // 1. Navigate to New Submission form
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();
    await page.getByRole('button', { name: /new business/i }).click();
    await page.getByLabel(/account/i).click();
    await page.getByRole('option').first().click();

    // 2. Set Effective Date to 2027-01-01
    await page.getByLabel(/effective date/i).fill('2027-01-01');

    // Wait for auto-population of expiration date
    await page.waitForTimeout(500);

    // 3. Override auto-populated Expiration Date to 2027-06-30
    await page.getByLabel(/expiration date/i).fill('2027-06-30');

    // 4. Complete remaining mandatory fields
    await page.getByLabel(/need by date/i).fill('2026-12-26');
    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /educators legal liability.*ell/i }).click();
    await page.getByLabel(/upload|document/i).setInputFiles('test.pdf');

    // 5. Submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission created with overridden Expiration Date = 2027-06-30.
    await expect(page.getByText(/submission id/i)).toBeVisible();
    await expect(page.getByText('2027-06-30')).toBeVisible();
  });
});
