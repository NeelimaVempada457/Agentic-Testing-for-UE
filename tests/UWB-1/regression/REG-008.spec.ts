// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: Core date auto-populate logic — Expiration Date = Effective Date + 1 year

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('REG-008: Expiration Date auto-populates to Effective Date + 1 year', async ({ page }) => {
    // 2. Set Effective Date to 2027-06-01
    const effectiveDateField = page.locator('input[name*="effective"], input[placeholder*="Effective"], [aria-label*="Effective Date"]').first();
    await effectiveDateField.fill('2027-06-01');
    await effectiveDateField.blur();

    // 3. Observe Expiration Date — expected to auto-populate to 2028-06-01
    const expirationDateField = page.locator('input[name*="expir"], input[placeholder*="Expiration"], [aria-label*="Expiration Date"]').first();
    await expect(expirationDateField).not.toHaveValue('');
    await expect(expirationDateField).toHaveValue('2028-06-01');
  });
});
