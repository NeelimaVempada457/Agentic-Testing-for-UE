// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: DISC-003 open defect — Need By Date does not auto-populate when Effective Date is set
// KNOWN DEFECT: DISC-003

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-003
  test.fail();
  test('REG-004: Need By Date does not auto-populate when Effective Date is set (open defect DISC-003)', async ({ page }) => {
    // 2. Set Effective Date to 2027-03-15
    const effectiveDateField = page.locator('input[name*="effective"], input[placeholder*="Effective"], [aria-label*="Effective Date"]').first();
    await effectiveDateField.fill('2027-03-15');
    await effectiveDateField.blur();

    // 3. Observe Need By Date field — per spec it should auto-populate to Effective Date − 5 days = 2027-03-10
    const needByDateField = page.locator('input[name*="needBy"], input[placeholder*="Need By"], [aria-label*="Need By Date"]').first();
    await expect(needByDateField).not.toHaveValue('');
    await expect(needByDateField).toHaveValue('2027-03-10');

    // 4. Expiration Date should correctly auto-populate to 2028-03-15 (this part works)
    const expirationDateField = page.locator('input[name*="expir"], input[placeholder*="Expiration"], [aria-label*="Expiration Date"]').first();
    await expect(expirationDateField).toHaveValue('2028-03-15');
  });
});
