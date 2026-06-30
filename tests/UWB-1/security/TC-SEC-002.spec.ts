// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-002: XSS — Script tag in Account Name search field

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Security — XSS: IMG onerror payload in Account Name search field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-SEC-002: XSS — Script tag in Account Name search field', async ({ page }) => {
    const xssPayload = `<img src=x onerror=alert('XSS')>`;

    // Register dialog handler before typing — if onerror fires, this catches it
    let alertFired = false;
    page.on('dialog', async (dialog) => {
      alertFired = true;
      await dialog.dismiss();
    });

    // Step 1: Type XSS payload into the Account Name search field
    const accountSearchField = page.getByLabel(/account name/i).or(
      page.locator(
        'input[name*="account"], input[id*="account"], input[placeholder*="account" i], input[aria-label*="account" i]'
      )
    );
    await accountSearchField.fill(xssPayload);

    // Allow any async rendering / debounce timers to flush
    await page.waitForTimeout(1500);

    // Step 2: Assert no JavaScript alert was executed
    expect(alertFired).toBe(false);

    // Step 3: Assert the rendered search results area does not contain an unescaped <img> tag
    // that could trigger onerror — inspect the DOM for unescaped payload
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    // The literal onerror= attribute must not appear unescaped
    expect(bodyHTML).not.toMatch(/onerror\s*=/i);

    // Step 4: Assert the page is stable (no JS errors caused a navigation away)
    await expect(page).not.toHaveURL(/error/i);
  });
});
