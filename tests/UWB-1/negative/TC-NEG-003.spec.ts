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

  test('TC-NEG-003: Submit without selecting Account Name', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 1. Fill all mandatory fields except Account Name
    // Submission Type: "New Business" is pre-selected by default

    // Set Need By Date and Effective Date (YYYY-MM-DD format)
    const dateInputs = page.locator('input[type="date"]');
    await dateInputs.nth(0).fill('2027-06-20');
    await dateInputs.nth(1).fill('2027-06-25');

    // Select Product
    await page.getByRole('button', { name: /Select one or more products/ }).click();
    await page.getByRole('option', { name: /ELL/i }).first().click();
    await page.keyboard.press('Escape');

    // 2. Click "Create Submission" without selecting Account Name
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Verify: validation error shown for Account Name
    await expect(page.locator('p').filter({ hasText: /^Required$/ })).toBeVisible();

    // Verify: Brokerage fields remain empty (show "Select an account above")
    await expect(page.getByText('Select an account above').first()).toBeVisible();

    // Verify: form is not submitted (still on the new submission page)
    await expect(page).toHaveURL(/submissions\/new/);
  });
});
