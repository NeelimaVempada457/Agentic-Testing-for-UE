// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: Core product card UI — Products multi-select displays cards with remove button

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('REG-009: Products multi-select displays cards with remove button', async ({ page }) => {
    // 2. Click Product(s) dropdown and select two products (ELL and CGL)
    const productsDropdown = page.locator('[aria-label*="Product"], select[name*="product"], [placeholder*="Product"]').first();
    await productsDropdown.click();

    const ellOption = page.locator('[role="option"]:has-text("ELL"), li:has-text("ELL"), .dropdown-item:has-text("ELL")').first();
    await expect(ellOption).toBeVisible();
    await ellOption.click();

    const cglOption = page.locator('[role="option"]:has-text("CGL"), li:has-text("CGL"), .dropdown-item:has-text("CGL")').first();
    await expect(cglOption).toBeVisible();
    await cglOption.click();

    // Close dropdown if needed
    await page.keyboard.press('Escape');

    // 3. Verify two product cards are displayed with × remove buttons and correct labels
    const ellCard = page.locator('.product-card, [data-product], .tag, .chip').filter({ hasText: 'ELL' }).first();
    await expect(ellCard).toBeVisible();

    const cglCard = page.locator('.product-card, [data-product], .tag, .chip').filter({ hasText: 'CGL' }).first();
    await expect(cglCard).toBeVisible();

    // Each card should have a remove (×) button
    const removeButtons = page.locator('.product-card button, [data-product] button, .tag button, .chip button, button[aria-label*="remove"], button:has-text("×")');
    await expect(removeButtons).toHaveCount(2);
  });
});
