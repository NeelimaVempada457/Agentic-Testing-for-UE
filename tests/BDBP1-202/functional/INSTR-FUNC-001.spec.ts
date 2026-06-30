import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('CARICOM accordion shows correct identification and address requirements', async ({ page }) => {
    await navigateToInstructionSection(page, 'Ordinary Savings');

    // Verify we are on the SelfRegister page showing the Instruction Section
    await expect(page).toHaveURL(/.*SelfRegister/);
    await expect(page.getByRole('heading', { name: /Ordinary Savings Application/i, level: 2 })).toBeVisible();

    // Click the "Resident Nationals of CARICOM (except ECCU territories)" accordion
    const caricomAccordion = page.getByText('Resident Nationals of CARICOM (except ECCU territories)', { exact: true });
    await caricomAccordion.click();

    // Verify identification requirements heading is now visible
    await expect(page.getByText(/One Form of Valid \(Unexpired\) Government Issued Identification:/i)).toBeVisible();

    // The two ID items — the live app uses Unicode curly apostrophe in "Driver's"
    await expect(page.getByRole('listitem').filter({ hasText: /Passport and/i })).toBeVisible();
    // Use a broad pattern to avoid apostrophe encoding issues
    await expect(page.getByRole('listitem').filter({ hasText: /Driver.s License or National Identification Card/i })).toBeVisible();

    // Verify address requirements
    await expect(page.getByText(/Confirmation of Residential Address required by any one of the following documents:/i)).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Original utility bill in the Customer.s Name/i }).first()).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Tenancy agreement/i }).first()).toBeVisible();
  });
});
