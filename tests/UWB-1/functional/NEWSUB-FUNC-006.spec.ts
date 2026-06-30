// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-006 | AC-05

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Products Multi-Select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Products multi-select renders selected items as removable cards', async ({ page }) => {
    // 2. Click Product(s) dropdown
    const productsDropdown = page.getByLabel(/product/i);
    await productsDropdown.click();

    // 3. Select "Educators Legal Liability (ELL) - ML"
    await page.getByRole('option', { name: /educators legal liability/i }).click();

    // 4. Select "Primary General Liability (CGL) - GL"
    await productsDropdown.click();
    await page.getByRole('option', { name: /primary general liability/i }).click();

    // 5. Select a third product
    await productsDropdown.click();
    const thirdOption = page.locator('[role="option"]').first();
    await thirdOption.click();

    // 6. Verify each selected product appears as a card (tag/chip/card element)
    const productCards = page.locator('.product-card, .tag, .chip, [data-testid*="product-tag"], .selected-product');
    await expect(productCards).toHaveCount(3, { timeout: 5000 });

    // 7. Remove one product using the × button
    const removeButton = productCards.first().locator('button, [aria-label*="remove"], [aria-label*="delete"], .remove-btn').first();
    await removeButton.click();

    // 8. Verify removal works — now 2 products remain
    await expect(productCards).toHaveCount(2, { timeout: 5000 });

    // 9. Verify dropdown still accessible
    await productsDropdown.click();
    await expect(page.locator('[role="listbox"], [role="option"]').first()).toBeVisible();
  });
});
