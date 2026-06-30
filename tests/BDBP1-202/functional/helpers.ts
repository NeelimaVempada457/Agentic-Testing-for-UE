import { Page } from '@playwright/test';

/**
 * Navigates to the Instruction Section (Step 2) of the Self-Registration flow.
 *
 * Flow:
 *   1. Go to https://bankofstlucia--digitalqa.sandbox.my.site.com/
 *   2. Click "Start Application"
 *   3. Select "New Customer"
 *   4. Select the top-level product category + sub-product
 *   5. Click "Continue"
 *   → Lands on /SelfRegister with the Instruction Section visible
 *
 * @param page    Playwright Page instance
 * @param product Sub-product name to select. Defaults to "Ordinary Savings".
 *                Pass "Personal Loan" (or another sub-product name) for the Loans flow.
 */
export async function navigateToInstructionSection(
  page: Page,
  product: string = 'Ordinary Savings'
): Promise<void> {
  // Map sub-product names to their top-level category
  const categoryMap: Record<string, string> = {
    'Ordinary Savings': 'Bank Accounts',
    'A+ Club': 'Bank Accounts',
    'GUARANTEED MORTGAGE PLAN – HomeStart': 'Bank Accounts',
    'Personal Loan': 'Loans',
    'Land Loan': 'Loans',
    'Mortgage Loan': 'Loans',
    'Vehicle Loan': 'Loans',
  };

  const category = categoryMap[product] ?? 'Bank Accounts';

  // 1. Navigate to homepage
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Click "Start Application"
  await page.getByRole('button', { name: 'Start Application' }).click();

  // 3. Select "New Customer"
  await page.getByRole('heading', { name: 'New Customer', level: 2 }).click();
  await page.waitForURL('**/SelfRegister');

  // 4a. Select the top-level category (e.g. "Bank Accounts" or "Loans")
  await page.getByRole('img', { name: category }).click();

  // 4b. Select the sub-product (e.g. "Ordinary Savings" or "Personal Loan")
  await page.getByRole('img', { name: product }).click();

  // 5. Click "Continue" to advance to the Instruction Section
  await page.getByRole('button', { name: 'Continue' }).click();

  // Wait until the instruction heading is visible
  await page.waitForLoadState('domcontentloaded');
}
