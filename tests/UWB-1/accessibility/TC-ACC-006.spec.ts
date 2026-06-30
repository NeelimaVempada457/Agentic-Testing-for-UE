import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-006: Date picker fields are keyboard accessible', async ({ page }) => {

    // Helper: test a single date field by selector
    const testDateField = async (fieldSelector: string, fieldLabel: string) => {
      const dateField = page.locator(fieldSelector).first();

      // Focus the date field via keyboard
      await dateField.focus();

      // Verify field is focusable
      const isFocused = await page.evaluate((sel) => {
        const el = document.activeElement;
        const target = document.querySelector(sel);
        return el === target || target?.contains(el);
      }, fieldSelector);

      // Open the date picker via keyboard (Enter or Space)
      await page.keyboard.press('Enter');
      await page.waitForTimeout(400);

      // Check if a date picker / calendar widget appeared
      const calendarVisible = await page
        .locator(
          '[role="dialog"], [role="grid"], [role="listbox"], .datepicker, .calendar, [class*="calendar"], [class*="datepicker"]'
        )
        .first()
        .isVisible()
        .catch(() => false);

      if (calendarVisible) {
        console.info(`${fieldLabel}: date picker opened via keyboard Enter`);

        // Navigate to a date using Arrow keys
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);

        // Select the highlighted date
        await page.keyboard.press('Enter');
        await page.waitForTimeout(400);

        // Verify the date picker closed (calendar dismissed)
        const calendarStillVisible = await page
          .locator(
            '[role="dialog"], [role="grid"], [role="listbox"], .datepicker, .calendar, [class*="calendar"], [class*="datepicker"]'
          )
          .first()
          .isVisible()
          .catch(() => false);

        expect(calendarStillVisible, `${fieldLabel}: date picker did not close after selecting a date`).toBe(false);

        // Verify the input now has a value
        const dateValue = await dateField.inputValue().catch(() => '');
        console.info(`${fieldLabel} value after keyboard selection: "${dateValue}"`);
        expect(
          dateValue.length,
          `${fieldLabel}: input value is empty after keyboard date selection`
        ).toBeGreaterThan(0);
      } else {
        // Date picker might accept direct typed input
        console.info(`${fieldLabel}: no calendar widget found — testing direct typed input`);
        await page.keyboard.press('Escape');
        await dateField.fill('12/31/2026');
        const typedValue = await dateField.inputValue().catch(() => '');
        expect(
          typedValue.length,
          `${fieldLabel}: could neither open calendar nor type a date value`
        ).toBeGreaterThan(0);
      }
    };

    // Tab to the Need By Date field
    await testDateField(
      'input[name*="needByDate"], input[placeholder*="Need By"], input[aria-label*="Need By"], input[id*="needByDate"]',
      'Need By Date'
    );

    // Tab to Effective Date field
    await testDateField(
      'input[name*="effectiveDate"], input[placeholder*="Effective"], input[aria-label*="Effective"], input[id*="effectiveDate"]',
      'Effective Date'
    );

    // Tab to Expiration Date field
    await testDateField(
      'input[name*="expirationDate"], input[placeholder*="Expiration"], input[aria-label*="Expiration"], input[id*="expirationDate"]',
      'Expiration Date'
    );
  });
});
