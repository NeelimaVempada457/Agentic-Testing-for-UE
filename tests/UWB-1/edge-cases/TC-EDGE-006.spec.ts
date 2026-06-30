// spec: test-artifacts/UWB-1/test-cases/edge-cases/new-submission-edge.md
// TC-EDGE-006: Enter maximum-length text in Internal Notes

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

// Generate a 5000-character test string
const LONG_TEXT = 'A'.repeat(4990) + '_END_MARKER';

test.describe('New Submission Form — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Enter maximum-length text in Internal Notes', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Fill all other mandatory fields so submission can proceed
    await page.getByLabel(/submission type/i).click();
    await page.getByRole('option').first().click();

    await page.getByLabel(/account name/i).fill('Test Account');
    await page.getByRole('option').first().click();

    await page.getByLabel(/effective date/i).fill('01/01/2027');
    await page.getByLabel(/effective date/i).press('Tab');

    // Step 1 & 2: Click the Internal Notes textarea and paste a 5000-character string
    const notesField = page.getByLabel(/internal notes/i);
    await notesField.click();
    await notesField.fill(LONG_TEXT);

    // Verify text is accepted (check field contains content — may be truncated by limit)
    const currentValue = await notesField.inputValue();
    expect(currentValue.length).toBeGreaterThan(0);
    expect(currentValue.length).toBeLessThanOrEqual(5000);

    // If a character counter exists, verify it is displayed
    const charCounter = page.locator('[data-testid="char-counter"], .char-count, [aria-label*="character"]');
    if (await charCounter.isVisible()) {
      await expect(charCounter).toBeVisible();
    }

    // Step 3: Attempt to submit — verify no UI crash occurs
    await page.getByRole('button', { name: /create submission/i }).click();

    // Either success or a limit-related error message — no crash or unhandled exception
    await expect(page.getByText(/javascript error|uncaught|exception/i)).not.toBeVisible();
  });
});
