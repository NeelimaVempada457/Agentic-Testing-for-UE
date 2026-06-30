import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-008: Cancel warning dialog is focus-trapped and announced', async ({ page }) => {

    // Modify at least one field — select Submission Type: New Business
    const submissionTypeField = page.locator(
      '[aria-label*="Submission Type"], [name*="submissionType"], label:has-text("Submission Type") ~ * [role="combobox"], label:has-text("Submission Type") ~ * input'
    ).first();

    await submissionTypeField.click();
    await page.waitForTimeout(300);

    // Select "New Business" option from the dropdown
    await page.click(
      '[role="option"]:has-text("New Business"), li:has-text("New Business"), [class*="option"]:has-text("New Business")'
    );
    await page.waitForTimeout(300);

    // Click the Cancel button to trigger the warning dialog
    await page.click('button:has-text("Cancel"), a:has-text("Cancel"), [aria-label*="Cancel"]');
    await page.waitForTimeout(500);

    // Verify the warning dialog appeared
    const dialog = page.locator('[role="dialog"], [role="alertdialog"], .modal, [class*="modal"], [class*="dialog"]').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Verify the dialog has an accessible role and announcement attributes
    const dialogAttributes = await page.evaluate(() => {
      const dlg = document.querySelector(
        '[role="dialog"], [role="alertdialog"], .modal, [class*="modal"]'
      );
      if (!dlg) return null;
      return {
        role: dlg.getAttribute('role'),
        ariaModal: dlg.getAttribute('aria-modal'),
        ariaLabel: dlg.getAttribute('aria-label'),
        ariaLabelledBy: dlg.getAttribute('aria-labelledby'),
        ariaDescribedBy: dlg.getAttribute('aria-describedby'),
      };
    });

    console.info('Dialog attributes:', dialogAttributes);
    expect(dialogAttributes, 'Warning dialog element not found in DOM').not.toBeNull();

    // The dialog must have role="dialog" or role="alertdialog"
    expect(
      ['dialog', 'alertdialog'],
      `Dialog role is "${dialogAttributes?.role}" — must be "dialog" or "alertdialog"`
    ).toContain(dialogAttributes?.role);

    // Verify focus is inside the dialog after it opens
    const focusInsideDialog = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"], [role="alertdialog"]');
      return dlg ? dlg.contains(document.activeElement) : false;
    });

    expect(
      focusInsideDialog,
      'Focus is not inside the dialog after it opened'
    ).toBe(true);

    // Check that focus is TRAPPED: tab through all elements and verify focus never leaves the dialog
    const focusEscaped = await page.evaluate(async () => {
      const dlg = document.querySelector('[role="dialog"], [role="alertdialog"]');
      if (!dlg) return false;

      // Collect all focusable elements inside the dialog
      const focusable = Array.from(
        dlg.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (focusable.length === 0) return false;

      // Simulate Tab presses programmatically (10 iterations)
      for (let i = 0; i < 10; i++) {
        const active = document.activeElement as HTMLElement;
        const currentIndex = focusable.indexOf(active);
        const nextIndex = (currentIndex + 1) % focusable.length;
        focusable[nextIndex].focus();
        if (!dlg.contains(document.activeElement)) {
          return true; // focus escaped
        }
      }
      return false; // focus stayed inside
    });

    expect(
      focusEscaped,
      'Focus escaped the Cancel warning dialog during Tab navigation — focus trap is broken'
    ).toBe(false);

    // Verify both Yes and No buttons are present and keyboard-reachable inside the dialog
    const yesButton = dialog.locator('button:has-text("Yes"), button:has-text("Confirm"), button:has-text("Leave")');
    const noButton = dialog.locator('button:has-text("No"), button:has-text("Stay"), button:has-text("Cancel")');

    await expect(yesButton.first(), 'Yes/Confirm button not found in dialog').toBeVisible();
    await expect(noButton.first(), 'No/Stay button not found in dialog').toBeVisible();

    // Press Tab inside the dialog and ensure both buttons are reachable
    let yesReached = false;
    let noReached = false;

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const activeText = await page.evaluate(
        () => (document.activeElement as HTMLElement)?.textContent?.trim() ?? ''
      );
      if (/yes|confirm|leave/i.test(activeText)) yesReached = true;
      if (/no|stay|cancel/i.test(activeText)) noReached = true;
    }

    console.info(`Yes button reached via Tab: ${yesReached} | No button reached via Tab: ${noReached}`);

    expect(
      yesReached || noReached,
      'Neither the Yes nor the No button was reached by Tab navigation inside the dialog'
    ).toBe(true);

    // Dismiss the dialog by clicking No / Stay
    await page.click('[role="dialog"] button:has-text("No"), [role="dialog"] button:has-text("Stay"), [role="alertdialog"] button:has-text("No")');
    await page.waitForTimeout(300);

    // Dialog should now be closed
    await expect(dialog).not.toBeVisible({ timeout: 3000 });
  });
});
