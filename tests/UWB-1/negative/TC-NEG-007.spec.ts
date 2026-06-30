// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-007: Upload a file with a disallowed extension', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // Create a temporary .exe file for testing
    const tmpDir = os.tmpdir();
    const exeFilePath = path.join(tmpDir, 'test-file.exe');
    fs.writeFileSync(exeFilePath, 'MZ - fake executable content for testing');

    try {
      // 1. Click the Add Document upload area
      const fileInput = page.locator('input[type="file"]');

      // 2. Attempt to upload a .exe file
      await fileInput.setInputFiles(exeFilePath);

      // Wait briefly for any rejection response
      await page.waitForTimeout(500);

      // Verify: .exe file does NOT appear in the documents list
      await expect(page.getByText('test-file.exe')).not.toBeVisible();

      // Verify: document section still shows "No documents attached yet" OR shows an error
      const noDocsMessage = page.getByText('No documents attached yet');
      const errorMessage = page.locator('p, [class*="error"]').filter({
        hasText: /invalid.*file|not.*allowed|file.*type|unsupported|allowed.*type|\.exe/i,
      });
      await expect(noDocsMessage.or(errorMessage.first())).toBeVisible();
    } finally {
      if (fs.existsSync(exeFilePath)) {
        fs.unlinkSync(exeFilePath);
      }
    }
  });
});
