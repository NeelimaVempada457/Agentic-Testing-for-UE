// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Internal Notes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-004: Create submission with Internal Notes populated
  test('Create submission with Internal Notes populated', async ({ page }) => {
    // 1. Navigate to New Submission and fill all mandatory fields
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();
    await page.getByRole('button', { name: /new business/i }).click();
    await page.getByLabel(/account/i).click();
    await page.getByRole('option').first().click();
    await page.getByLabel(/effective date/i).fill('2027-07-01');
    await page.getByLabel(/need by date/i).fill('2027-06-26');
    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /educators legal liability.*ell/i }).click();
    await page.getByLabel(/upload|document/i).setInputFiles('test.pdf');

    // 2. Enter text in Internal Notes
    await page.getByLabel(/internal notes/i).fill('Initial submission for annual renewal review');

    // 3. Submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission created with notes saved. Notes field did not block submission.
    await expect(page.getByText(/submission id/i)).toBeVisible();
  });
});
