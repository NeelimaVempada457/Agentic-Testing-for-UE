// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-006: Verify page source does not expose sensitive data

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

/** Patterns that indicate leaked secrets in page source / loaded scripts. */
const SENSITIVE_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'API key (apikey=)', pattern: /apikey\s*=\s*["'][^"']{8,}/i },
  { label: 'API key (api_key)', pattern: /api[_-]?key\s*[:=]\s*["'][^"']{8,}/i },
  { label: 'Bearer token', pattern: /bearer\s+[A-Za-z0-9\-_]{20,}/i },
  { label: 'Authorization header value', pattern: /authorization\s*[:=]\s*["'][^"']{10,}/i },
  { label: 'AWS access key ID', pattern: /AKIA[0-9A-Z]{16}/i },
  { label: 'AWS secret key', pattern: /aws[_\-]?secret[_\-]?access[_\-]?key\s*[:=]\s*["'][^"']{10,}/i },
  { label: 'Password in source', pattern: /password\s*[:=]\s*["'][^"']{4,}/i },
  { label: 'Secret variable', pattern: /secret\s*[:=]\s*["'][^"']{8,}/i },
  { label: '.env variable pattern', pattern: /process\.env\.[A-Z_]{5,}\s*(?:=|;)?\s*["'][^"']{4,}/i },
  { label: 'Private key PEM block', pattern: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/ },
  { label: 'Database connection string', pattern: /(?:mongodb|postgres|mysql|mssql):\/\/[^"'\s]{10,}/i },
];

test.describe('Security — Page source does not expose sensitive data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-SEC-006: Verify page source does not expose sensitive data', async ({ page }) => {

    // Step 2: Retrieve the full rendered page HTML (equivalent of View Source)
    const pageHTML = await page.evaluate(() => document.documentElement.outerHTML);

    // Step 3: Search for sensitive data patterns in the page HTML
    for (const { label, pattern } of SENSITIVE_PATTERNS) {
      expect(
        pageHTML,
        `Sensitive data pattern found in page source — "${label}"`
      ).not.toMatch(pattern);
    }

    // Step 4: Inspect all inline <script> tag content for hardcoded secrets
    const inlineScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script:not([src])'));
      return scripts.map((s) => s.textContent ?? '').join('\n');
    });

    for (const { label, pattern } of SENSITIVE_PATTERNS) {
      expect(
        inlineScripts,
        `Sensitive data pattern found in inline script — "${label}"`
      ).not.toMatch(pattern);
    }

    // Assert the page itself is stable
    await expect(page).not.toHaveURL(/error|500/i);
  });
});
