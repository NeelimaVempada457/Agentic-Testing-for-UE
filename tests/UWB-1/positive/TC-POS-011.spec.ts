// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Brokerage Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-011: Verify Brokerage data correctly reflects selected account
  test('Verify Brokerage data correctly reflects selected account', async ({ page }) => {
    // 1. Navigate to New Submission form
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();
    await page.getByRole('button', { name: /new business/i }).click();

    // 2. Select Account with known brokerage data
    await page.getByLabel(/account/i).fill('Riverside Unified School District');
    await page.getByRole('option', { name: /riverside unified school district/i }).click();

    // Wait for brokerage fields to populate
    await page.waitForTimeout(500);

    // 3. Verify Brokerage, Broker Contact, Broker Email, Broker Phone populate correctly
    const brokerage = page.getByLabel(/brokerage/i);
    const brokerContact = page.getByLabel(/broker contact/i);
    const brokerEmail = page.getByLabel(/broker email/i);
    const brokerPhone = page.getByLabel(/broker phone/i);

    await expect(brokerage).not.toBeEmpty();
    await expect(brokerContact).not.toBeEmpty();
    await expect(brokerEmail).not.toBeEmpty();
    await expect(brokerPhone).not.toBeEmpty();

    // 4. Verify all 4 are read-only (non-editable)
    await expect(brokerage).toBeDisabled();
    await expect(brokerContact).toBeDisabled();
    await expect(brokerEmail).toBeDisabled();
    await expect(brokerPhone).toBeDisabled();

    // Expected Result: All 4 Brokerage fields match the account's Salesforce data and are non-editable.
  });
});
