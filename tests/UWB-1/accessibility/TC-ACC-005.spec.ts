import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-005: Submission Type options are keyboard navigable', async ({ page }) => {

    // Tab to the Submission Type field
    // First Tab to move into the form area
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Identify the Submission Type element and bring it into focus
    const submissionTypeLocator = page.locator(
      '[aria-label*="Submission Type"], [name*="submissionType"], [id*="submissionType"], [placeholder*="Submission"], label:has-text("Submission Type") + * input, label:has-text("Submission Type") ~ * input'
    ).first();

    await submissionTypeLocator.focus();

    // Capture the focused element's role and name
    const beforeInteraction = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return {
        tag: el?.tagName,
        role: el?.getAttribute('role'),
        ariaLabel: el?.getAttribute('aria-label'),
        name: (el as HTMLInputElement)?.name,
      };
    });
    console.info('Focused on Submission Type element:', beforeInteraction);

    // Use Arrow keys to navigate between New Business / Cross-sell options
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);

    const afterArrowDown = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return {
        tag: el?.tagName,
        ariaSelected: el?.getAttribute('aria-selected'),
        ariaChecked: el?.getAttribute('aria-checked'),
        text: el?.textContent?.trim().substring(0, 60),
      };
    });
    console.info('After ArrowDown:', afterArrowDown);

    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);

    // Press Enter or Space to select the highlighted option
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    // Verify the selected state is reflected programmatically
    const selectedOption = await page.evaluate(() => {
      // Check for aria-selected="true", aria-checked="true", or checked radio buttons
      const selected = document.querySelector(
        '[aria-selected="true"], [aria-checked="true"], input[type="radio"]:checked'
      );
      return selected
        ? {
            tag: (selected as HTMLElement).tagName,
            ariaSelected: selected.getAttribute('aria-selected'),
            ariaChecked: selected.getAttribute('aria-checked'),
            value: (selected as HTMLInputElement).value ?? selected.textContent?.trim(),
          }
        : null;
    });

    // A selection should be programmatically communicated
    expect(
      selectedOption,
      'No element with aria-selected="true", aria-checked="true", or checked radio found after keyboard selection'
    ).not.toBeNull();

    console.info('Selected option after keyboard interaction:', selectedOption);

    // Verify the selected value is one of the valid Submission Type options
    const validOptions = ['new business', 'cross-sell', 'crosssell', 'cross sell'];
    if (selectedOption?.value) {
      const value = selectedOption.value.toLowerCase();
      const isValid = validOptions.some((opt) => value.includes(opt));
      expect(
        isValid,
        `Selected value "${selectedOption.value}" is not a recognized Submission Type option`
      ).toBe(true);
    }
  });
});
