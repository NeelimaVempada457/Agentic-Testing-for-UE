// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-016 | AC-01

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Mandatory Field Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Submission creation blocked when any mandatory field is empty', async ({ page }) => {
    // 2. Attempt to submit with no fields filled — verify at least one error appears
    await page.getByRole('button', { name: /create submission/i }).click();
    await expect(
      page.locator('.error, [role="alert"], .field-error, .validation-error').first()
    ).toBeVisible({ timeout: 5000 });

    // 3. Fill all mandatory fields
    await page.getByRole('radio', { name: /new business/i }).click();

    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();

    const productsDropdown = page.getByLabel(/product/i);
    await productsDropdown.click();
    await page.locator('[role="option"]').first().click();

    const effectiveDateField = page.getByLabel(/effective date/i);
    await effectiveDateField.fill('2027-06-15');
    await effectiveDateField.blur();

    // 4. Clear Submission Type — click Create Submission → verify validation error appears
    // (Deselect by clicking the selected option or clearing the field)
    // Attempt to submit with no Submission Type selected by reloading with only Account + Product + Date
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');

    const accountNameField2 = page.getByLabel(/account name/i);
    await accountNameField2.fill('Edu');
    const firstOption2 = page.locator('[role="option"]').first();
    await expect(firstOption2).toBeVisible({ timeout: 10000 });
    await firstOption2.click();

    const productsDropdown2 = page.getByLabel(/product/i);
    await productsDropdown2.click();
    await page.locator('[role="option"]').first().click();

    const effectiveDateField2 = page.getByLabel(/effective date/i);
    await effectiveDateField2.fill('2027-06-15');
    await effectiveDateField2.blur();

    // Submission Type left empty — expect error
    await page.getByRole('button', { name: /create submission/i }).click();
    await expect(
      page.locator('text=/submission type.*required/i, text=/select.*submission type/i, .error, [role="alert"]').first()
    ).toBeVisible({ timeout: 5000 });

    // 5. Clear Account Name — verify error
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('radio', { name: /new business/i }).click();

    const productsDropdown3 = page.getByLabel(/product/i);
    await productsDropdown3.click();
    await page.locator('[role="option"]').first().click();

    const effectiveDateField3 = page.getByLabel(/effective date/i);
    await effectiveDateField3.fill('2027-06-15');
    await effectiveDateField3.blur();

    // Account Name left empty — expect error
    await page.getByRole('button', { name: /create submission/i }).click();
    await expect(
      page.locator('text=/account.*required/i, text=/select.*account/i, .error, [role="alert"]').first()
    ).toBeVisible({ timeout: 5000 });
  });
});
