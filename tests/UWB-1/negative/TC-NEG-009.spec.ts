// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-009: Search Account with text that returns no results', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // 1. Click the Account Name search field
    await page.getByRole('button', { name: /Search accounts by name/ }).click();

    // Verify: the account search textbox is visible and active
    const searchInput = page.getByRole('textbox', { name: /Search by name/ });
    await expect(searchInput).toBeVisible();

    // 2. Type a search string that will return no results
    await searchInput.fill('ZZZZNONEXISTENT99999');

    // 3. Wait for search results to update
    await expect(page.getByText('No accounts found')).toBeVisible();

    // Verify: result count shows 0
    await expect(page.getByText('0 accounts')).toBeVisible();

    // Verify: Brokerage fields remain empty ("Select an account above")
    await page.keyboard.press('Escape');
    await expect(page.getByText('Select an account above').first()).toBeVisible();

    // Verify: no account was selected — Account Name search button still shows placeholder
    await expect(page.getByRole('button', { name: /Search accounts by name/ })).toBeVisible();
  });
});
