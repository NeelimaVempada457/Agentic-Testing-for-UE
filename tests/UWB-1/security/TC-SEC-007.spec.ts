// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-007: Verify HTTPS is enforced

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';
const HTTP_URL = 'http://united-educators-application.vercel.app';

test.describe('Security — HTTPS enforcement', () => {
  // Note: This test does NOT require a prior login because we are testing
  // HTTP → HTTPS redirect behavior at the transport level before authentication.

  test('TC-SEC-007: Verify HTTPS is enforced — HTTP redirects to HTTPS', async ({ page }) => {
    // Step 1: Navigate to the HTTP version of the application URL
    await page.goto(HTTP_URL, { waitUntil: 'commit' });

    // Allow redirects to complete
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Assert the browser was redirected to HTTPS
    const finalURL = page.url();
    expect(finalURL, 'Final URL after HTTP navigation must start with https://').toMatch(
      /^https:\/\//i
    );

    // Step 3: Assert no mixed-content console errors related to insecure resources
    // Collect console messages during load
    const consoleMessages: string[] = [];
    page.on('console', (msg) => {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    });

    // Reload on HTTPS to capture any mixed-content warnings
    await page.goto(APP_URL, { waitUntil: 'networkidle' });

    const mixedContentWarnings = consoleMessages.filter((msg) =>
      /mixed.?content|insecure.*request|blocked.*http/i.test(msg)
    );

    expect(
      mixedContentWarnings.length,
      `Mixed content warnings detected:\n${mixedContentWarnings.join('\n')}`
    ).toBe(0);

    // Step 4: Verify the loaded URL is HTTPS
    await expect(page).toHaveURL(/^https:\/\//i);
  });

  test('TC-SEC-007b: Verify HTTPS on New Submission page', async ({ page }) => {
    // Navigate to the app and open New Submission form
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Assert the form page URL is HTTPS
    await expect(page).toHaveURL(/^https:\/\//i);
  });
});
