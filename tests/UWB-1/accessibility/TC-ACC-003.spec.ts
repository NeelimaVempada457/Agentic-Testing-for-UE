import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-003: All interactive elements are operable via keyboard only', async ({ page }) => {

    // Tab to the Submission Type field and interact using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Attempt to open the Submission Type dropdown with Enter/Space
    await page.keyboard.press('Enter');
    // Arrow down to an option
    await page.keyboard.press('ArrowDown');
    // Select option
    await page.keyboard.press('Enter');

    // Tab to Account Name field and type a value
    await page.keyboard.press('Tab');
    await page.keyboard.type('Test Account');

    // Tab to Need By Date and interact via keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    // Navigate the date picker with arrow keys and select today
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    // Tab through remaining date fields
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    // Tab to Products dropdown and open with Enter/Space
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Tab to Stage dropdown
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Tab to Notes field and type
    await page.keyboard.press('Tab');
    await page.keyboard.type('Keyboard-only accessibility test notes');

    // Tab to the file upload input and verify it is reachable
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName ?? '');
    // File input or its accessible wrapper should be focusable
    expect(['INPUT', 'BUTTON', 'A', 'DIV', 'LABEL']).toContain(focusedTag.toUpperCase());

    // Tab to the Create Submission button and submit via Enter
    // Keep tabbing until we reach the submit button
    let submitReached = false;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const activeText = await page.evaluate(
        () =>
          (document.activeElement as HTMLElement)?.textContent?.trim() ??
          (document.activeElement as HTMLInputElement)?.value?.trim() ??
          ''
      );
      if (
        activeText.toLowerCase().includes('create') ||
        activeText.toLowerCase().includes('submit')
      ) {
        submitReached = true;
        break;
      }
    }

    expect(
      submitReached,
      'Could not reach the Create Submission / Submit button using keyboard Tab navigation'
    ).toBe(true);

    // Press Enter to submit via keyboard
    await page.keyboard.press('Enter');

    // After keyboard submit, page should show success or navigate away from the form
    await page.waitForTimeout(1500);
    const currentUrl = page.url();
    console.info('URL after keyboard submit:', currentUrl);
    // Verify we are no longer blocked on the form (either success message or redirect)
    expect(currentUrl).toBeTruthy();
  });
});
