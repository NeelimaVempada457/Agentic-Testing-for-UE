// spec: test-artifacts/UWB-1/test-cases/functional/new-submission-functional.md
// test case: NEWSUB-FUNC-003 | AC-09, AC-10

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('New Submission Form — Brokerage Auto-Population', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Account selection auto-populates Brokerage fields (read-only)', async ({ page }) => {
    // 2. Select a valid Account with associated brokerage
    const accountNameField = page.getByLabel(/account name/i);
    await accountNameField.fill('Edu');
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();

    // 3. Verify Brokerage section populates: Brokerage, Broker Contact, Broker Email, Broker Phone
    const brokerageField = page.getByLabel(/^brokerage$/i);
    const brokerContactField = page.getByLabel(/broker contact/i);
    const brokerEmailField = page.getByLabel(/broker email/i);
    const brokerPhoneField = page.getByLabel(/broker phone/i);

    await expect(brokerageField).not.toHaveValue('');
    await expect(brokerContactField).not.toHaveValue('');
    await expect(brokerEmailField).not.toHaveValue('');
    await expect(brokerPhoneField).not.toHaveValue('');

    // 4. Attempt to edit — all brokerage fields should be read-only (disabled or readonly)
    await expect(brokerageField).toBeDisabled();
    await expect(brokerContactField).toBeDisabled();
    await expect(brokerEmailField).toBeDisabled();
    await expect(brokerPhoneField).toBeDisabled();
  });
});
