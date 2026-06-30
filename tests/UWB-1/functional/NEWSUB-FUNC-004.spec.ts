// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-004 | AC-09

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Underwriting Auto-Population', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Underwriting fields auto-populate after account selection', async ({ page }) => {
    // 2. Select a valid Account
    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();

    // 3. Verify Underwriter field auto-populates
    const underwriterField = page.getByLabel(/^underwriter$/i);
    await expect(underwriterField).not.toHaveValue('');

    // 4. Verify Underwriting Specialist field auto-populates
    const underwritingSpecialistField = page.getByLabel(/underwriting specialist/i);
    await expect(underwritingSpecialistField).not.toHaveValue('');
  });
});
