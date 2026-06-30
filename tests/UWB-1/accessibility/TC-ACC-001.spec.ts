import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-001: All form fields have visible labels or aria-label attributes', async ({ page }) => {

    // Inspect each form field and verify it has an accessible label
    const unlabeledInputs: string[] = await page.evaluate(() => {
      const inputs = Array.from(
        document.querySelectorAll('input, select, textarea, [role="combobox"], [role="listbox"], [role="textbox"]')
      );

      const unlabeled: string[] = [];

      inputs.forEach((el) => {
        const htmlEl = el as HTMLElement;

        // Check for associated <label>
        const id = htmlEl.getAttribute('id');
        const hasLabel = id ? !!document.querySelector(`label[for="${id}"]`) : false;

        // Check for aria-label
        const hasAriaLabel = !!htmlEl.getAttribute('aria-label');

        // Check for aria-labelledby
        const labelledBy = htmlEl.getAttribute('aria-labelledby');
        const hasAriaLabelledBy = labelledBy
          ? !!document.getElementById(labelledBy)
          : false;

        // Check for wrapping <label>
        const hasWrappingLabel = !!htmlEl.closest('label');

        // Check for placeholder as fallback (not sufficient but note it)
        const hasPlaceholder = !!htmlEl.getAttribute('placeholder');

        if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy && !hasWrappingLabel) {
          unlabeled.push(
            `${htmlEl.tagName} [id="${htmlEl.id}" name="${htmlEl.getAttribute('name')}" placeholder="${hasPlaceholder}"]`
          );
        }
      });

      return unlabeled;
    });

    // Every field must have a programmatic label — no unlabeled controls
    expect(
      unlabeledInputs,
      `Found unlabeled form controls: ${unlabeledInputs.join(', ')}`
    ).toHaveLength(0);

    // Spot-check key fields by name / role
    const fieldsToCheck = [
      'Submission Type',
      'Account Name',
      'Need By Date',
      'Product',
      'Stage',
      'Notes',
    ];

    for (const fieldName of fieldsToCheck) {
      // Label text, aria-label, or placeholder containing the field name should exist
      const found = await page.evaluate((name) => {
        const labels = Array.from(document.querySelectorAll('label'));
        const hasLabelText = labels.some((l) =>
          l.textContent?.toLowerCase().includes(name.toLowerCase())
        );

        const ariaInputs = Array.from(
          document.querySelectorAll('[aria-label]')
        );
        const hasAriaLabel = ariaInputs.some((el) =>
          (el.getAttribute('aria-label') ?? '').toLowerCase().includes(name.toLowerCase())
        );

        return hasLabelText || hasAriaLabel;
      }, fieldName);

      expect(found, `Field "${fieldName}" has no accessible label in the DOM`).toBe(true);
    }
  });
});
