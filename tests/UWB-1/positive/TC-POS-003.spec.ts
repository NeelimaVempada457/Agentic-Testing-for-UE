// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Multiple Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-003: Create submission with multiple products selected
  test('Create submission with multiple products selected', async ({ page }) => {
    // 1. Navigate to New Submission and fill all mandatory fields
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();
    await page.getByRole('button', { name: /new business/i }).click();
    await page.getByLabel(/account/i).click();
    await page.getByRole('option').first().click();
    await page.getByLabel(/effective date/i).fill('2027-07-01');
    await page.getByLabel(/need by date/i).fill('2027-06-26');

    // 2. Select 3 products: ELL, CGL, SBL
    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /educators legal liability.*ell/i }).click();

    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /primary general liability.*cgl/i }).click();

    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /school board liability.*sbl/i }).click();

    // 3. Verify all 3 display as removable cards
    await expect(page.getByText(/ell/i)).toBeVisible();
    await expect(page.getByText(/cgl/i)).toBeVisible();
    await expect(page.getByText(/sbl/i)).toBeVisible();

    // 4. Upload document and submit
    await page.getByLabel(/upload|document/i).setInputFiles('test.pdf');
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission created with all 3 products recorded.
    await expect(page.getByText(/submission id/i)).toBeVisible();
  });
});
