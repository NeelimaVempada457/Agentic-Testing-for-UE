import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-007: Product(s) multi-select dropdown is keyboard accessible', async ({ page }) => {

    // Tab to the Product(s) field
    const productField = page.locator(
      '[aria-label*="Product"], [name*="product"], [id*="product"], [placeholder*="Product"], label:has-text("Product") + * input, label:has-text("Product") ~ * [role="combobox"]'
    ).first();

    await productField.focus();

    // Confirm focus is on the Product field
    const isFocused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return (
        el?.getAttribute('aria-label')?.toLowerCase().includes('product') ||
        el?.getAttribute('name')?.toLowerCase().includes('product') ||
        el?.getAttribute('id')?.toLowerCase().includes('product') ||
        el?.getAttribute('placeholder')?.toLowerCase().includes('product') ||
        false
      );
    });
    console.info('Product field focused:', isFocused);

    // Open the Products dropdown with Enter/Space
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);

    // Check if the dropdown/listbox opened
    const dropdownVisible = await page
      .locator('[role="listbox"], [role="option"], [class*="dropdown"], [class*="menu"]')
      .first()
      .isVisible()
      .catch(() => false);

    if (!dropdownVisible) {
      // Try Space key as an alternative
      await page.keyboard.press('Space');
      await page.waitForTimeout(400);
    }

    // Navigate through options with Arrow keys
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);

    // Select the highlighted option with Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Verify a product card / tag appeared in the DOM after selection
    const productCardCount = await page
      .locator(
        '[class*="tag"], [class*="chip"], [class*="badge"], [class*="selected"], [class*="product-card"], [data-selected]'
      )
      .count();

    expect(
      productCardCount,
      'No product card/tag appeared after selecting a product via keyboard'
    ).toBeGreaterThan(0);

    console.info(`Product cards/tags visible after keyboard selection: ${productCardCount}`);

    // Verify the remove (×) button on the product card is keyboard-reachable
    const removeButton = page.locator(
      'button[aria-label*="remove"], button[aria-label*="Remove"], button:has-text("×"), button:has-text("x"), [class*="remove"], [class*="clear"], [class*="close"]'
    ).first();

    // Tab to reach the remove button
    let removeButtonFocused = false;
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const activeTag = await page.evaluate(
        () => (document.activeElement as HTMLElement)?.tagName ?? ''
      );
      const activeLabel = await page.evaluate(
        () =>
          (document.activeElement as HTMLElement)?.getAttribute('aria-label') ??
          (document.activeElement as HTMLElement)?.textContent?.trim() ??
          ''
      );
      if (
        activeTag === 'BUTTON' &&
        (activeLabel.includes('×') ||
          activeLabel.toLowerCase().includes('remove') ||
          activeLabel.toLowerCase().includes('clear'))
      ) {
        removeButtonFocused = true;
        break;
      }
    }

    console.info('Remove button reached via keyboard Tab:', removeButtonFocused);
    // The remove button on the card must be keyboard-reachable per WCAG 2.1.1
    expect(
      removeButtonFocused,
      'Remove (×) button on product card is not reachable via keyboard Tab navigation'
    ).toBe(true);

    // Verify dropdown is keyboard-closable (pressing Escape should close it)
    await productField.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const dropdownAfterEscape = await page
      .locator('[role="listbox"], [role="option"], [class*="dropdown"][style*="display: block"]')
      .first()
      .isVisible()
      .catch(() => false);

    expect(
      dropdownAfterEscape,
      'Products dropdown did not close when Escape key was pressed'
    ).toBe(false);
  });
});
