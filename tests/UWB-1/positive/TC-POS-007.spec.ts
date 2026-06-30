// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Multiple Documents', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-007: Create submission with multiple documents uploaded
  test('Create submission with multiple documents uploaded', async ({ page }) => {
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

    // 2. Upload test.pdf
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles('test.pdf');

    // 3. Upload test.docx (second document)
    await fileInput.setInputFiles(['test.pdf', 'test.docx']);

    // 4. Verify both appear in the documents list
    await expect(page.getByText('test.pdf')).toBeVisible();
    await expect(page.getByText('test.docx')).toBeVisible();

    // 5. Submit
    await page.getByRole('button', { name: /create submission/i }).click();

    // Expected Result: Submission created with both documents attached.
    await expect(page.getByText(/submission id/i)).toBeVisible();
  });
});
