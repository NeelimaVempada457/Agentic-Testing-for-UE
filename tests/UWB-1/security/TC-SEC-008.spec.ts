// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-008: Verify no sensitive data in localStorage or sessionStorage

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

/** Key name patterns that should NEVER appear in browser storage. */
const SENSITIVE_KEY_PATTERNS: RegExp[] = [
  /password/i,
  /passwd/i,
  /secret/i,
  /api[_-]?key/i,
  /api[_-]?token/i,
  /auth[_-]?token/i,
  /access[_-]?token/i,
  /refresh[_-]?token/i,
  /credential/i,
  /private[_-]?key/i,
  /ssn/i,
  /social[_-]?security/i,
];

/** Value patterns that look like sensitive data regardless of key name. */
const SENSITIVE_VALUE_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'Bearer token value', pattern: /^Bearer\s+[A-Za-z0-9\-_.]{20,}$/ },
  { label: 'AWS access key', pattern: /AKIA[0-9A-Z]{16}/ },
  { label: 'PEM private key', pattern: /-----BEGIN.*PRIVATE KEY-----/ },
  { label: 'Database connection string', pattern: /(?:mongodb|postgres|mysql|mssql):\/\// },
];

test.describe('Security — No sensitive data in localStorage or sessionStorage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-SEC-008: Verify no sensitive data in localStorage or sessionStorage', async ({ page }) => {

    // Step 1: Fill in several form fields to trigger any caching behaviour
    const submissionTypeField = page.getByLabel(/submission type/i).or(
      page.locator('select[name*="type"], [id*="submissionType"]')
    );
    if (await submissionTypeField.count() > 0) {
      await submissionTypeField.selectOption({ index: 1 });
    }

    const accountField = page.getByLabel(/account name/i).or(
      page.locator('input[name*="account"], input[id*="account"], input[placeholder*="account" i]')
    );
    if (await accountField.count() > 0) {
      await accountField.fill('Test Account');
    }

    const notesField = page.getByLabel(/internal notes/i).or(
      page.locator('textarea[name*="notes"], textarea[id*="notes"]')
    );
    if (await notesField.count() > 0) {
      await notesField.fill('Some notes for testing storage inspection');
    }

    // Wait briefly for any auto-save / debounce writes to storage
    await page.waitForTimeout(1500);

    // Step 2: Snapshot localStorage and sessionStorage key-value pairs
    const storageSnapshot = await page.evaluate(() => {
      const collect = (storage: Storage) => {
        const entries: Record<string, string> = {};
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i) ?? '';
          entries[key] = storage.getItem(key) ?? '';
        }
        return entries;
      };
      return {
        local: collect(localStorage),
        session: collect(sessionStorage),
      };
    });

    const allEntries = [
      ...Object.entries(storageSnapshot.local).map(([k, v]) => ({ store: 'localStorage', k, v })),
      ...Object.entries(storageSnapshot.session).map(([k, v]) => ({ store: 'sessionStorage', k, v })),
    ];

    // Step 3: Assert no key names match sensitive patterns
    for (const { store, k } of allEntries) {
      for (const pattern of SENSITIVE_KEY_PATTERNS) {
        expect(
          k,
          `Sensitive key "${k}" found in ${store}`
        ).not.toMatch(pattern);
      }
    }

    // Step 4: Assert no values match sensitive data patterns
    for (const { store, k, v } of allEntries) {
      for (const { label, pattern } of SENSITIVE_VALUE_PATTERNS) {
        expect(
          v,
          `Sensitive value pattern "${label}" detected in ${store}["${k}"]`
        ).not.toMatch(pattern);
      }
    }

    // Assert the page is still stable
    await expect(page).not.toHaveURL(/error|500/i);
  });
});
