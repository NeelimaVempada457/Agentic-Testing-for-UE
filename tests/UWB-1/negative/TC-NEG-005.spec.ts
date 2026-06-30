// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-005: Submit without uploading a document', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 1. Fill all mandatory fields except Add Document
    // Submission Type: "New Business" is pre-selected by default

    // Select Account Name
    await page.getByRole('button', { name: /Search accounts by name/ }).click();
    await page.getByRole('textbox', { name: /Search by name/ }).fill('Riverside');
    await page.getByRole('button', { name: /Riverside Unified School District/ }).click();

    // Set Need By Date and Effective Date (YYYY-MM-DD format)
    const dateInputs = page.locator('input[type="date"]');
    await dateInputs.nth(0).fill('2027-06-20');
    await dateInputs.nth(1).fill('2027-06-25');

    // Select Product
    await page.getByRole('button', { name: /Select one or more products/ }).click();
    await page.getByRole('option', { name: /ELL/i }).first().click();
    await page.keyboard.press('Escape');

    // Document upload intentionally skipped

    // 2. Click "Create Submission"
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Verify: "No documents attached yet" message still shows (no documents uploaded)
    await expect(page.getByText('No documents attached yet')).toBeVisible();

    // Verify: document drop zone is still visible as empty
    await expect(page.getByText('Drop files here or click to browse')).toBeVisible();

    // Verify: form does not navigate away on submission without a document
    await expect(page).toHaveURL(/submissions\/new/);
  });
});
