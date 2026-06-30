import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('Non-Nationals accordion shows 2 government IDs and address proof requirements', async ({ page }) => {
    await navigateToInstructionSection(page, 'Ordinary Savings');

    await expect(page).toHaveURL(/.*SelfRegister/);
    await expect(page.getByRole('heading', { name: /Ordinary Savings Application/i, level: 2 })).toBeVisible();

    // Click the "Non-Nationals / Residents Outside CARICOM" accordion
    const nonNationalsAccordion = page.getByText('Non-Nationals / Residents Outside CARICOM', { exact: true });
    await nonNationalsAccordion.click();

    // Verify requirement for 2 government IDs
    await expect(page.getByText(/Two forms of valid \(unexpired\) Government Issued Identification:/i)).toBeVisible();

    // Verify specific ID types listed (use broad pattern to avoid apostrophe issues)
    await expect(page.getByRole('listitem').filter({ hasText: /^Passport$/ }).first()).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Driver.s License/i }).first()).toBeVisible();

    // Verify address proof requirements
    await expect(page.getByText(/Confirmation of Residential Address by way of any one of the following documents:/i)).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Original utility bill in the Customer.s Name/i }).first()).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Tenancy agreement/i }).first()).toBeVisible();
  });
});
