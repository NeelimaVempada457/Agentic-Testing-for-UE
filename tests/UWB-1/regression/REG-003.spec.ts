// spec: test-artifacts/UWB-1/test-cases/regression/new-submission-regression.md
// regression-target: DISC-002 open defect — underwriting fields remain editable after auto-population
// KNOWN DEFECT: DISC-002

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Regression — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-002
  test.fail();
  test('REG-003: Underwriting fields remain editable after account selection (open defect DISC-002)', async ({ page }) => {
    // 2. Select a valid Account from the Account Name field
    const accountField = page.locator('input[placeholder*="Account"], input[name*="account"], [aria-label*="Account Name"]').first();
    await accountField.click();
    await accountField.fill('Test');
    const firstOption = page.locator('[role="option"], .dropdown-item, li').first();
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();

    // 3. Wait for Underwriting Team section to auto-populate
    const underwriterField = page.locator('select[name*="underwriter"], [aria-label*="Underwriter"]').first();
    await expect(underwriterField).toBeVisible();

    // 4. Per spec AC-10: both fields should be disabled after auto-population
    await expect(underwriterField).toBeDisabled();

    const specialistField = page.locator('select[name*="specialist"], [aria-label*="Underwriting Specialist"]').first();
    await expect(specialistField).toBeDisabled();
  });
});
