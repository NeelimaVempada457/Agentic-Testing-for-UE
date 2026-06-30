// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-018
// KNOWN DEFECT: DISC-001 — Expiration Date label is missing the mandatory asterisk (*) indicator

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Expiration Date Mandatory Asterisk', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // KNOWN DEFECT: DISC-001 — Expiration Date label has no asterisk; other mandatory fields do
  test.fail();
  test('Expiration Date field missing mandatory asterisk indicator', async ({ page }) => {
    // 2. Look at the Policy section labels — confirm other mandatory fields show asterisk
    await expect(page.locator('text=/account name\\s*\\*/i').first()).toBeVisible();
    await expect(page.locator('text=/need by date\\s*\\*/i').first()).toBeVisible();
    await expect(page.locator('text=/effective date\\s*\\*/i').first()).toBeVisible();

    // 3. Verify Expiration Date label has an asterisk (currently fails — DISC-001)
    await expect(page.locator('text=/expiration date\\s*\\*/i').first()).toBeVisible();
  });
});
