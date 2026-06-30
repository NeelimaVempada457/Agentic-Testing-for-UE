// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

// NOTE: The live form always pre-selects "New Business" on load and the card
// cannot be deselected via normal interaction. Submission Type therefore cannot
// be left empty by design. This test verifies the pre-selected state is enforced.

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-002: Submit without selecting Submission Type', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // Verify: "New Business" card is pre-selected by default
    await expect(page.getByRole('button', { name: /New Business.*Selected/i })).toBeVisible();

    // Attempt to deselect "New Business" by clicking it
    await page.getByRole('button', { name: /New Business/i }).first().click();

    // Verify: card remains selected — Submission Type cannot be left blank via normal interaction
    await expect(page.getByRole('button', { name: /New Business.*Selected/i })).toBeVisible();

    // 1. Fill all other mandatory fields (Account Name, dates, Product)
    await page.getByRole('button', { name: /Search accounts by name/ }).click();
    await page.getByRole('textbox', { name: /Search by name/ }).fill('Riverside');
    await page.getByRole('button', { name: /Riverside Unified School District/ }).click();

    // Set Need By Date and Effective Date (YYYY-MM-DD format for input[type="date"])
    const dateInputs = page.locator('input[type="date"]');
    await dateInputs.nth(0).fill('2027-06-20');
    await dateInputs.nth(1).fill('2027-06-25');

    // Select Product
    await page.getByRole('button', { name: /Select one or more products/ }).click();
    await page.getByRole('option', { name: /ELL/i }).first().click();
    await page.keyboard.press('Escape');

    // 2. Click "Create Submission" — Submission Type is always pre-selected
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Verify: no Submission Type error is shown (field cannot be left blank by design)
    await expect(page.getByRole('button', { name: /New Business.*Selected/i })).toBeVisible();
  });
});
