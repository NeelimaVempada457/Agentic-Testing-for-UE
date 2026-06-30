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

  test('TC-NEG-004: Submit without selecting any Product(s)', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 1. Fill all mandatory fields except Product(s)
    // Submission Type: "New Business" is pre-selected by default

    // Select Account Name
    await page.getByRole('button', { name: /Search accounts by name/ }).click();
    await page.getByRole('textbox', { name: /Search by name/ }).fill('Riverside');
    await page.getByRole('button', { name: /Riverside Unified School District/ }).click();

    // Set Need By Date and Effective Date (YYYY-MM-DD format)
    const dateInputs = page.locator('input[type="date"]');
    await dateInputs.nth(0).fill('2027-06-20');
    await dateInputs.nth(1).fill('2027-06-25');

    // Product(s) intentionally left empty

    // 2. Click "Create Submission"
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Verify: validation error shown for Product(s) field
    const productSection = page.getByText('Product(s)').locator('..').locator('..');
    await expect(productSection.locator('p').filter({ hasText: /^Required$/ })).toBeVisible();

    // Verify: form is not submitted (still on the new submission page)
    await expect(page).toHaveURL(/submissions\/new/);
  });
});
