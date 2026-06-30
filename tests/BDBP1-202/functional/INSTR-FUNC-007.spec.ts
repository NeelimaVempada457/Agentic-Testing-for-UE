import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('Back to Home button returns user to the home page', async ({ page }) => {
    await navigateToInstructionSection(page, 'Ordinary Savings');

    await expect(page).toHaveURL(/.*SelfRegister/);

    // The "Back to Home" button is visible in the top header area
    const backToHomeButton = page.getByRole('button', { name: 'Back to Home' });
    await expect(backToHomeButton).toBeVisible();
    await backToHomeButton.click();

    // The app shows an "Unsaved Changes" confirmation dialog — click Continue to proceed
    const continueInDialog = page.getByRole('dialog', { name: /Unsaved Changes/i })
      .getByRole('button', { name: 'Continue' });
    await expect(continueInDialog).toBeVisible();
    await continueInDialog.click();

    // Verify navigation back to the home page
    await expect(page).toHaveURL(/bankofstlucia--digitalqa\.sandbox\.my\.site\.com\/?$/);

    // Verify home page content is present (hero heading from the live app)
    await expect(page.getByRole('heading', { name: /Simple\. Secure\. Convenient\./i, level: 1 })).toBeVisible();
  });
});
