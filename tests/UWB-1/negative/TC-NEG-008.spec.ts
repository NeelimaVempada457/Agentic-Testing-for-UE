// spec: test-artifacts/UWB-1/test-cases/negative/new-submission-negative.md

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const APP_URL = 'https://united-educators-application.vercel.app';

// 26 MB in bytes — exceeds the 25 MB limit
const LARGE_FILE_SIZE_BYTES = 26 * 1024 * 1024;

test.describe('Negative: New Submission Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-NEG-008: Upload a file exceeding 25 MB', async ({ page }) => {
    // Verify we are on the new submission page
    await expect(page).toHaveURL(/submissions\/new/);

    // Create a temporary large PDF file (26 MB) for testing
    const tmpDir = os.tmpdir();
    const largeFilePath = path.join(tmpDir, 'large-file.pdf');
    const buffer = Buffer.alloc(LARGE_FILE_SIZE_BYTES, 0);
    // Add minimal PDF header so it passes MIME sniffing
    buffer.write('%PDF-1.4\n', 0, 'ascii');
    fs.writeFileSync(largeFilePath, buffer);

    try {
      // 1. Click the Add Document upload area
      const fileInput = page.locator('input[type="file"]');

      // 2. Attempt to upload a file larger than 25 MB
      await fileInput.setInputFiles(largeFilePath);

      // Wait briefly for any rejection response
      await page.waitForTimeout(500);

      // Verify: upload is rejected with a size error message
      const sizeError = page.locator('p, span, [class*="error"]').filter({
        hasText: /25\s*MB|file.*size|size.*limit|too.*large|exceed/i,
      });
      const noDocsMessage = page.getByText('No documents attached yet');

      // The oversized file should be rejected — error message or file not appearing
      await expect(sizeError.or(noDocsMessage).first()).toBeVisible();

      // Verify: the large file does NOT appear as a successfully attached document
      await expect(
        page.locator('[class*="document"]').filter({ hasText: 'large-file.pdf' })
      ).not.toBeVisible();
    } finally {
      if (fs.existsSync(largeFilePath)) {
        fs.unlinkSync(largeFilePath);
      }
    }
  });
});
