import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-010: Verify Submission Summary preview displays correct fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify Submission Summary preview displays correct fields', async ({ page }) => {
    // 1. Fill in: Submission Type
    await page.getByRole('radio', { name: 'New Business' }).click();

    // Fill in: Account
    await page.getByLabel('Account Name').fill('Test');
    await page.waitForSelector('[role="option"], [role="listbox"] li, .dropdown-option', { timeout: 10000 });
    await page.getByRole('option').first().click();

    // Fill in: Effective Date
    await page.getByLabel('Effective Date').fill('01/01/2027');
    await page.keyboard.press('Tab');

    // Fill in: Product(s)
    await page.getByLabel('Product(s)').click();
    await page.getByRole('option', { name: /ELL/i }).first().click();
    await page.keyboard.press('Escape');

    // 2. Locate the Submission Summary / preview section
    const summarySection = page.locator('[data-testid*="summary"], .submission-summary, section').filter({ hasText: /Summary/i }).first();
    await expect(summarySection).toBeVisible();

    // 3. Verify all 8 summary fields are displayed: TYPE, ACCOUNT, PRODUCTS, NEED BY, EFFECTIVE, BROKERAGE, BROKER, STAGE
    await expect(summarySection.getByText(/TYPE|Submission Type/i)).toBeVisible();
    await expect(summarySection.getByText(/ACCOUNT|Account/i)).toBeVisible();
    await expect(summarySection.getByText(/PRODUCTS|Product/i)).toBeVisible();
    await expect(summarySection.getByText(/NEED BY|Need By/i)).toBeVisible();
    await expect(summarySection.getByText(/EFFECTIVE|Effective Date/i)).toBeVisible();
    await expect(summarySection.getByText(/BROKERAGE|Brokerage/i)).toBeVisible();
    await expect(summarySection.getByText(/BROKER|Broker/i)).toBeVisible();
    await expect(summarySection.getByText(/STAGE|Current Stage/i)).toBeVisible();
  });
});
