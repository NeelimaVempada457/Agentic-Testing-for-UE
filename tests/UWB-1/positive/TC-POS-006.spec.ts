// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Non-default Stage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-006: Create submission with a non-default Stage
  test('Create submission with a non-default Stage', async ({ page }) => {
    // 1. Navigate to New Submission and fill mandatory fields
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

    // 2. Change Current Stage from "Incomplete Submission" to "Complete Submission"
    await page.getByLabel(/current stage/i).selectOption('Complete Submission');

    // 3. Submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission created with Stage = "Complete Submission" (not default).
    await expect(page.getByText(/submission id/i)).toBeVisible();
    await expect(page.getByText(/complete submission/i)).toBeVisible();
  });
});
