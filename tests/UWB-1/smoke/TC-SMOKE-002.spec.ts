import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-002: Successfully create a Cross-sell submission with all mandatory fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Successfully create a Cross-sell submission with all mandatory fields', async ({ page }) => {
    // 2. Select "Cross-sell" card as Submission Type
    await page.getByRole('radio', { name: 'Cross-sell' }).click();

    // 3. Search and select a valid Account Name
    await page.getByLabel('Account Name').fill('Test');
    await page.waitForSelector('[role="option"], [role="listbox"] li, .dropdown-option', { timeout: 10000 });
    await page.getByRole('option').first().click();

    // 4. Set a future Effective Date
    await page.getByLabel('Effective Date').fill('01/01/2027');
    await page.keyboard.press('Tab');

    // 5. Manually set Need By Date (auto-populate not working — DISC-003)
    await page.getByLabel('Need By Date').fill('12/27/2026');

    // 6. Select at least one Product
    await page.getByLabel('Product(s)').click();
    await page.getByRole('option', { name: /CGL/i }).first().click();
    await page.keyboard.press('Escape');

    // 7. Upload a valid document (.docx)
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-document.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      buffer: Buffer.from('PK test docx content'),
    });

    // 8. Click "Create Submission"
    await page.getByRole('button', { name: 'Create Submission' }).click();

    // Expected Result: Submission is created successfully with Cross-sell type, unique Submission ID is generated
    await expect(page.getByText(/Submission ID|SUB-\d+/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Cross-sell/i)).toBeVisible();
  });
});
