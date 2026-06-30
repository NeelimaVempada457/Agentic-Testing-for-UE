import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-005: Verify Product(s) multi-select allows multiple selections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Product(s) multi-select allows multiple selections', async ({ page }) => {
    // 1. Click the Product(s) dropdown
    await page.getByLabel('Product(s)').click();

    // 2. Select "Educators Legal Liability (ELL) - ML"
    await page.getByRole('option', { name: /Educators Legal Liability.*ELL.*ML/i }).click();

    // 3. Select "Primary General Liability (CGL) - GL"
    await page.getByRole('option', { name: /Primary General Liability.*CGL.*GL/i }).click();
    await page.keyboard.press('Escape');

    // 4. Observe the selected products — both appear as individual removable cards
    const ellCard = page.locator('[data-testid*="product-card"], .product-tag, .selected-product').filter({ hasText: /ELL/i }).first();
    const cglCard = page.locator('[data-testid*="product-card"], .product-tag, .selected-product').filter({ hasText: /CGL/i }).first();

    await expect(ellCard).toBeVisible();
    await expect(cglCard).toBeVisible();

    // Each card has a remove (x) button
    await expect(ellCard.getByRole('button', { name: /remove|×|close/i })).toBeVisible();
    await expect(cglCard.getByRole('button', { name: /remove|×|close/i })).toBeVisible();
  });
});
