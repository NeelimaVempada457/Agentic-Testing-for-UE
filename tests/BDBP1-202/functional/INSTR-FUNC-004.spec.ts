import { test, expect } from '@playwright/test';
import { navigateToInstructionSection } from './helpers';

test.describe('BDBP1-202 - Instruction Section Functional Tests', () => {
  test('General Instructions section displays all 4 mandatory bullet points', async ({ page }) => {
    await navigateToInstructionSection(page, 'Ordinary Savings');

    await expect(page).toHaveURL(/.*SelfRegister/);

    // The General Instructions headings are visible
    await expect(page.getByRole('heading', { name: 'General Instructions', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Instructions for completing the form', level: 3 })).toBeVisible();

    // Verify the 4 bullet points by their actual text from the live app
    // Use broad patterns (dots for apostrophes) to tolerate Unicode vs ASCII differences
    await expect(page.getByRole('listitem').filter({ hasText: /Application document MUST be completed in its entirety/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /No more than four \(4\) persons can be included on an account/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /AML policy/i })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: /Personal Information Form to be completed and signed/i })).toBeVisible();

    // Verify the DISCLAIMER paragraph
    await expect(page.getByText(/DISCLAIMER:/i)).toBeVisible();
    await expect(page.getByText(/bank may request additional supporting documentation or Video Snip/i)).toBeVisible();
  });
});
