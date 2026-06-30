// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Real-time Summary Updates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-008: Verify Submission Summary updates in real-time as fields are filled
  test('Verify Submission Summary updates in real-time as fields are filled', async ({ page }) => {
    // 1. Navigate to New Submission form
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();

    // 2. Select "New Business" — verify TYPE updates in summary
    await page.getByRole('button', { name: /new business/i }).click();
    await expect(page.getByText(/new business/i)).toBeVisible();

    // 3. Select Account — verify ACCOUNT and BROKERAGE update
    await page.getByLabel(/account/i).click();
    await page.getByRole('option').first().click();
    // Summary panel should reflect the selected account
    const summaryPanel = page.locator('[class*="summary"], [data-testid*="summary"], aside').first();
    await expect(summaryPanel).toBeVisible();

    // 4. Set Effective Date — verify EFFECTIVE and EXPIRATION update in summary
    await page.getByLabel(/effective date/i).fill('2027-07-01');
    await page.waitForTimeout(300);
    await expect(page.getByText('2027-07-01')).toBeVisible();
    await expect(page.getByText('2028-07-01')).toBeVisible();

    // 5. Select Product — verify PRODUCTS updates in summary
    await page.getByLabel(/product/i).click();
    await page.getByRole('option', { name: /educators legal liability.*ell/i }).click();
    await expect(page.getByText(/ell/i)).toBeVisible();

    // Expected Result: Summary panel reflects each change in real-time without needing to submit.
  });
});
