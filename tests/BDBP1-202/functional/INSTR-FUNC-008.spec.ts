import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('BOSL branding is consistent on the Instruction Section page', async ({ page }) => {
    await navigateToInstructionSection(page, 'Ordinary Savings');

    await expect(page).toHaveURL(/.*SelfRegister/);

    // Check for BOSL Digital logo in the top header
    const logo = page.getByRole('img', { name: 'BOSL Digital Logo' });
    await expect(logo).toBeVisible();

    // Verify the page heading confirms the correct application context
    await expect(page.getByRole('heading', { name: /Ordinary Savings Application/i, level: 2 })).toBeVisible();

    // Verify BOSL contact info is present in the footer help bar (branding consistency)
    await expect(page.getByRole('link', { name: /Call BOSL Digital Support/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Email BOSL Digital Support/i })).toBeVisible();

    // Verify computed font-family is set on the page body (basic brand consistency check)
    const fontFamily = await page.locator('body').evaluate(
      (el) => window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily.length).toBeGreaterThan(0);
  });
});
