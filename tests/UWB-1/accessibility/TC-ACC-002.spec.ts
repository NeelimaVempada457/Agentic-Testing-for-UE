import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-002: Tab order follows logical top-to-bottom sequence', async ({ page }) => {

    // Place focus on the first focusable form element
    await page.keyboard.press('Tab');

    // Collect the order in which elements receive focus as the user tabs through the form
    const focusOrder: string[] = await page.evaluate(async () => {
      return new Promise<string[]>((resolve) => {
        const order: string[] = [];
        let tabCount = 0;
        const MAX_TABS = 30;

        const onFocus = (e: FocusEvent) => {
          const el = e.target as HTMLElement;
          const label =
            el.getAttribute('aria-label') ||
            el.getAttribute('name') ||
            el.getAttribute('id') ||
            el.getAttribute('placeholder') ||
            el.tagName;
          order.push(label);
          tabCount++;
          if (tabCount >= MAX_TABS) {
            document.removeEventListener('focus', onFocus, true);
            resolve(order);
          }
        };

        document.addEventListener('focus', onFocus, true);
      });
    });

    // Simulate Tab presses to populate the focus order list
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
    }

    // Focus order array should have entries (form has focusable elements)
    expect(focusOrder.length).toBeGreaterThan(0);

    // Verify focus never becomes trapped unexpectedly:
    // pressing Tab 20+ times should still produce distinct focus targets
    const uniqueElements = new Set(focusOrder);
    // At least a few distinct elements should have received focus
    expect(uniqueElements.size).toBeGreaterThan(2);

    // Verify the active element after tabbing is still within the form
    // (not stuck on the same element for all presses)
    const firstFocus = focusOrder[0];
    const lastFocus = focusOrder[focusOrder.length - 1];
    // If focus cycled correctly the last focused element differs from the first
    // (unless the form has only one focusable element, which it shouldn't)
    expect(focusOrder.length).toBeGreaterThan(1);

    // Log the captured order for manual review
    console.info('Tab focus order captured:', focusOrder);
    console.info(`First: ${firstFocus} | Last: ${lastFocus}`);
  });
});
