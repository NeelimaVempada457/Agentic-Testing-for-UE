import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('Self-Employed accordion shows differentiated ID requirements', async ({ page }) => {
    await navigateToInstructionSection(page, 'Ordinary Savings');

    await expect(page).toHaveURL(/.*SelfRegister/);
    await expect(page.getByRole('heading', { name: /Ordinary Savings Application/i, level: 2 })).toBeVisible();

    // Click the "Self – Employed Individuals" accordion
    const selfEmployedAccordion = page.getByText('Self – Employed Individuals', { exact: true });
    await selfEmployedAccordion.click();

    // Verify differentiated ID requirements:
    // 1 ID for ECCU/CARICOM nationals, 2 IDs for Non-Nationals
    await expect(
      page.getByRole('listitem').filter({
        hasText: /One \(1\) form of Government-Issued Picture Identification in the case of Nationals\/Residents of ECCU and CARICOM/i,
      })
    ).toBeVisible();

    await expect(
      page.getByRole('listitem').filter({
        hasText: /Two \(2\) forms of Government.? Issued Picture Identification in the case of Non Nationals\/Residents Outside of CARICOM/i,
      })
    ).toBeVisible();

    // Verify Residential Address section heading is also present
    await expect(page.getByRole('heading', { name: /Residential Address/i, level: 4 }).last()).toBeVisible();
  });
});
