// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: DISC-001 open defect — Expiration Date label missing mandatory asterisk
// KNOWN DEFECT: DISC-001

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-001
  test.fail();
  test('REG-005: Expiration Date missing mandatory asterisk (open defect DISC-001)', async ({ page }) => {
    // 2. Inspect the Policy section and check each date field label for a mandatory asterisk (*)
    // Confirm other mandatory fields correctly show asterisks
    const accountLabel = page.locator('label').filter({ hasText: /account name/i }).first();
    await expect(accountLabel).toContainText('*');

    const needByLabel = page.locator('label').filter({ hasText: /need by date/i }).first();
    await expect(needByLabel).toContainText('*');

    const effectiveLabel = page.locator('label').filter({ hasText: /effective date/i }).first();
    await expect(effectiveLabel).toContainText('*');

    // 3. Expiration Date label should also show asterisk — per spec it is a required field
    const expirationLabel = page.locator('label').filter({ hasText: /expiration date/i }).first();
    await expect(expirationLabel).toContainText('*');
  });
});
