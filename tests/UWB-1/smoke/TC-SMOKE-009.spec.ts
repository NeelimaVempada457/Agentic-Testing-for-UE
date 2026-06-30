import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('TC-SMOKE-009: Verify document upload succeeds with valid file types', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('Verify document upload succeeds with valid file types', async ({ page }) => {
    // 1. Click "Add Document" / file upload area
    const addDocumentButton = page.getByRole('button', { name: /Add Document/i });
    const fileInput = page.locator('input[type="file"]');

    // 2. Select a valid .pdf file under 25 MB
    if (await addDocumentButton.isVisible()) {
      await addDocumentButton.click();
    }

    await fileInput.setInputFiles({
      name: 'test-document.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 smoke test document content'),
    });

    // 3. Observe the upload result — file name appears in the uploaded documents list, no error
    await expect(page.getByText('test-document.pdf')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('alert')).not.toBeVisible();
  });
});
