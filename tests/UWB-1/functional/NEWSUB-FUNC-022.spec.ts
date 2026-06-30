// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-022

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

// Expected format: "Product Name (Product Code) - Line of Business Code"
// Example: "Educators Legal Liability (ELL) - ML"
const PRODUCT_FORMAT_REGEX = /^.+\s\([A-Z]+\)\s-\s[A-Z]+$/;

test.describe('New Submission Form — Product Display Format', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Product format displays as "Name (Code) - Line of Business Code"', async ({ page }) => {
    // 2. Click Product(s) dropdown
    const productsDropdown = page.getByLabel(/product/i);
    await productsDropdown.click();

    // 3. Read the format of the options listed and verify each matches expected pattern
    const options = page.locator('[role="option"], option');
    await expect(options.first()).toBeVisible({ timeout: 5000 });

    const optionTexts = await options.allTextContents();
    const nonEmptyOptions = optionTexts.filter(t => t.trim() !== '');

    expect(nonEmptyOptions.length).toBeGreaterThan(0);

    for (const optionText of nonEmptyOptions) {
      const trimmed = optionText.trim();
      expect(
        PRODUCT_FORMAT_REGEX.test(trimmed),
        `Product option "${trimmed}" should match format "Name (Code) - LOB"`
      ).toBeTruthy();
    }

    // 4. Verify specific known product is present in correct format
    await expect(
      page.locator('[role="option"]').filter({ hasText: 'Educators Legal Liability (ELL) - ML' }).first()
    ).toBeVisible();
  });
});
