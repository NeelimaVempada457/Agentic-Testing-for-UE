import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('Instructions displayed are specific to the selected product (Loans)', async ({ page }) => {
    // Navigate using Personal Loan (a Loans sub-product)
    await navigateToInstructionSection(page, 'Personal Loan');

    await expect(page).toHaveURL(/.*SelfRegister/);

    // Verify the heading is Loans-specific, NOT Ordinary Savings
    await expect(page.getByRole('heading', { name: /Personal Loan Application/i, level: 2 })).toBeVisible();

    // Verify loan-specific product name is shown
    await expect(page.getByText('Personal Loan').first()).toBeVisible();

    // Verify loan-specific description text
    await expect(page.getByText(/BOSL Personal Loan/i)).toBeVisible();

    // Verify loan-specific checklist items
    await expect(page.getByRole('listitem').filter({ hasText: /Picture I\.D\./i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Letter from Employer/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Salary Slip/i })).toBeVisible();

    // Verify Ordinary Savings content is NOT displayed
    const pageText = await page.locator('body').textContent();
    expect(pageText?.toLowerCase()).not.toContain('ordinary savings');
  });
});
