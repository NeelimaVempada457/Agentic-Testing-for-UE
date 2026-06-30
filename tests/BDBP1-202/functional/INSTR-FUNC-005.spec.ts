import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('Product description shows correct Ordinary Savings features and benefits', async ({ page }) => {
    await navigateToInstructionSection(page, 'Ordinary Savings');

    await expect(page).toHaveURL(/.*SelfRegister/);
    await expect(page.getByRole('heading', { name: /Ordinary Savings Application/i, level: 2 })).toBeVisible();

    // Verify Ordinary Savings product name label is visible
    await expect(page.getByText('Ordinary Savings').first()).toBeVisible();

    // Verify product description text (partial match)
    await expect(page.getByText(/A regular savings account from Bank of Saint Lucia/i)).toBeVisible();

    // Verify "Features" section heading text
    await expect(page.getByText('Features', { exact: true })).toBeVisible();

    // Verify feature items
    await expect(page.getByRole('listitem').filter({ hasText: /Must be 18 years and over/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Minimum opening balance of \$50/i })).toBeVisible();

    // Verify "Benefits" section heading text
    await expect(page.getByText('Benefits', { exact: true })).toBeVisible();

    // Verify some benefit items
    await expect(page.getByRole('listitem').filter({ hasText: /Interest paid quarterly/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Unlimited deposits and withdrawals via ATM/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Standing order facility/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Complete Online Banking/i })).toBeVisible();
  });
});
