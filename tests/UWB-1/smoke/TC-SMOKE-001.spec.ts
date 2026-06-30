import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-001: Successfully create a New Business submission with all mandatory fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Successfully create a New Business submission with all mandatory fields', async ({ page }) => {
    // 2. Select "New Business" card as Submission Type
    await page.getByRole('radio', { name: 'New Business' }).click();

    // 3. Search and select a valid Account Name
    await page.getByLabel('Account Name').fill('Test');
    await page.waitForSelector('[role="option"], [role="listbox"] li, .dropdown-option', { timeout: 10000 });
    await page.getByRole('option').first().click();

    // 4. Set a future Effective Date
    const effectiveDate = '01/01/2027';
    await page.getByLabel('Effective Date').fill(effectiveDate);
    await page.keyboard.press('Tab');

    // 5. Verify Expiration Date auto-populates to Effective Date + 1 year
    await expect(page.getByLabel('Expiration Date')).toHaveValue('01/01/2028');

    // 6. Manually enter Need By Date (auto-populate known broken — DISC-003)
    await page.getByLabel('Need By Date').fill('12/27/2026');

    // 7. Select at least one Product from the dropdown
    await page.getByLabel('Product(s)').click();
    await page.getByRole('option', { name: /ELL/i }).first().click();
    await page.keyboard.press('Escape');

    // 8. Upload a valid document (.pdf)
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-document.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test document'),
    });

    // 9. Click "Create Submission"
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Expected Result: Submission is created successfully, unique Submission ID is displayed, no errors
    await expect(page.getByText(/Submission ID|SUB-\d+/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('alert')).not.toBeVisible();
  });
});
