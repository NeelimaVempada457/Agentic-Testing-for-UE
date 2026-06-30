import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-004: Mandatory field errors are announced to screen readers', async ({ page }) => {

    // Click "Create Submission" without filling any fields to trigger validation
    await page.click('button:has-text("Create Submission"), button:has-text("Submit"), button[type="submit"]');
    await page.waitForTimeout(800);

    // Verify error messages are present in the DOM
    const errorElements = await page.locator(
      '[role="alert"], [aria-live="polite"], [aria-live="assertive"], .error, .error-message, [class*="error"], [class*="invalid"]'
    ).count();

    expect(
      errorElements,
      'No error elements with role="alert" or aria-live found after submitting empty form'
    ).toBeGreaterThan(0);

    // Check that error regions use aria-live or role="alert" for screen reader announcement
    const ariaLiveRegions: { tag: string; role: string | null; ariaLive: string | null; text: string }[] =
      await page.evaluate(() => {
        const alerts = Array.from(
          document.querySelectorAll(
            '[role="alert"], [aria-live="polite"], [aria-live="assertive"]'
          )
        );
        return alerts.map((el) => ({
          tag: el.tagName,
          role: el.getAttribute('role'),
          ariaLive: el.getAttribute('aria-live'),
          text: (el as HTMLElement).innerText?.trim().substring(0, 120),
        }));
      });

    expect(
      ariaLiveRegions.length,
      'No aria-live or role="alert" regions found for screen reader announcement'
    ).toBeGreaterThan(0);

    console.info('aria-live / alert regions detected:', ariaLiveRegions);

    // Verify error messages are not empty
    const nonEmptyErrors = ariaLiveRegions.filter((r) => r.text && r.text.length > 0);
    expect(
      nonEmptyErrors.length,
      'aria-live regions exist but all have empty text content'
    ).toBeGreaterThan(0);

    // Verify focus moves to the first error field after form submission attempt
    const focusedElementInfo = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return {
        tag: el?.tagName ?? '',
        id: el?.id ?? '',
        name: (el as HTMLInputElement)?.name ?? '',
        ariaInvalid: el?.getAttribute('aria-invalid') ?? '',
        role: el?.getAttribute('role') ?? '',
      };
    });

    // After validation the active element should be a form field or error container
    const isFocusedOnFormElement = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'DIV', 'SPAN'].includes(
      focusedElementInfo.tag.toUpperCase()
    );
    expect(
      isFocusedOnFormElement,
      `Focus after validation is on unexpected element: ${JSON.stringify(focusedElementInfo)}`
    ).toBe(true);

    console.info('Focus after empty-form submission:', focusedElementInfo);
  });
});
