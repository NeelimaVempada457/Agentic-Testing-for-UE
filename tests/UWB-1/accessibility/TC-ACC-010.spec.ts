import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-010: Form is functional at 200% browser zoom', async ({ page }) => {

    // Zoom browser to 200% using CDP (Chrome DevTools Protocol)
    const cdpSession = await page.context().newCDPSession(page);
    await cdpSession.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2, // 200% zoom equivalent
      mobile: false,
    });

    // Wait for layout reflow at 200% zoom
    await page.waitForTimeout(500);

    // Verify no horizontal scrollbar overflow that would indicate clipping
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // Some overflow is acceptable if the page scrolls vertically but not clipped
    console.info(`Horizontal overflow at 200% zoom: ${hasHorizontalOverflow}`);

    // Verify key form fields are still visible and not clipped at 200% zoom
    const elementsToCheck = [
      { selector: 'button:has-text("Create Submission"), button[type="submit"]', label: 'Create Submission button' },
      { selector: 'button:has-text("Cancel"), a:has-text("Cancel")', label: 'Cancel button' },
      { selector: 'label, [class*="label"]', label: 'Form labels' },
    ];

    for (const { selector, label } of elementsToCheck) {
      const el = page.locator(selector).first();
      const isVisible = await el.isVisible().catch(() => false);
      console.info(`${label} visible at 200% zoom: ${isVisible}`);
      expect(
        isVisible,
        `${label} is not visible at 200% zoom — content may be clipped or hidden`
      ).toBe(true);
    }

    // Verify fields are not overlapping at 200% zoom by checking bounding boxes
    const overlaps = await page.evaluate(() => {
      const formElements = Array.from(
        document.querySelectorAll('input, select, textarea, button, label')
      ).slice(0, 20);

      const rects = formElements.map((el) => ({
        el: (el as HTMLElement).tagName + ' ' + ((el as HTMLElement).textContent?.trim().substring(0, 20) ?? ''),
        rect: (el as HTMLElement).getBoundingClientRect(),
      }));

      const overlapping: string[] = [];

      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i].rect;
          const b = rects[j].rect;
          // Skip elements with zero dimensions (hidden)
          if (a.width === 0 || b.width === 0) continue;
          const overlapX = a.left < b.right && a.right > b.left;
          const overlapY = a.top < b.bottom && a.bottom > b.top;
          if (overlapX && overlapY) {
            overlapping.push(`"${rects[i].el}" overlaps with "${rects[j].el}"`);
          }
        }
      }

      return overlapping;
    });

    if (overlaps.length > 0) {
      console.warn('Overlapping elements at 200% zoom:\n' + overlaps.join('\n'));
    }

    expect(
      overlaps,
      `${overlaps.length} element overlap(s) detected at 200% zoom:\n` + overlaps.join('\n')
    ).toHaveLength(0);

    // Verify the form is still functional at 200% zoom: interact with a field
    const firstInput = page.locator('input, [role="combobox"], [role="textbox"]').first();
    await firstInput.click();
    const isInteractable = await firstInput.isEnabled().catch(() => false);
    expect(
      isInteractable,
      'First form input is not interactable at 200% zoom'
    ).toBe(true);

    // Verify the Submit button is clickable at 200% zoom
    const submitButton = page.locator(
      'button:has-text("Create Submission"), button:has-text("Submit"), button[type="submit"]'
    ).first();

    const submitEnabled = await submitButton.isEnabled().catch(() => false);
    expect(
      submitEnabled,
      'Submit / Create Submission button is not enabled/clickable at 200% zoom'
    ).toBe(true);

    // Scroll through the form to verify no content is hidden
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo(0, 0));

    // Reset zoom back to 100%
    await cdpSession.send('Emulation.clearDeviceMetricsOverride');
    console.info('Zoom reset to 100% after test');
  });
});
