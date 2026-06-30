import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-011: Verify unique Submission ID is generated on creation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify unique Submission ID is generated on creation', async ({ page }) => {
    // Helper to complete and submit a submission, then return the generated Submission ID
    async function createSubmission(): Promise<string> {
      await page.getByRole('radio', { name: 'New Business' }).click();

      await page.getByLabel('Account Name').fill('Test');
      await page.waitForSelector('[role="option"], [role="listbox"] li, .dropdown-option', { timeout: 10000 });
      await page.getByRole('option').first().click();

      await page.getByLabel('Effective Date').fill('01/01/2027');
      await page.keyboard.press('Tab');

      await page.getByLabel('Need By Date').fill('12/27/2026');

      await page.getByLabel('Product(s)').click();
      await page.getByRole('option', { name: /ELL/i }).first().click();
      await page.keyboard.press('Escape');

      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles({
        name: 'test-document.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('%PDF-1.4 test content'),
      });

      await page.getByRole('button', { name: 'Create Submission' }).click();

      const idLocator = page.getByText(/SUB-\d+|\d{4,}/i).first();
      await expect(idLocator).toBeVisible({ timeout: 15000 });
      return (await idLocator.textContent()) ?? '';
    }

    // 1. Complete and submit Submission #1 — note the Submission ID
    const id1 = await createSubmission();

    // 2. Navigate back to dashboard and open new submission form for Submission #2
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');

    const id2 = await createSubmission();

    // Expected Result: each submission receives a unique auto-incremented ID; IDs differ and are non-null
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toEqual(id2);
  });
});
