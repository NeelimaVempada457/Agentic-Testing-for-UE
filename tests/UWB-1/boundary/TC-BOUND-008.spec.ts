// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-008: Document at 25 MB + 1 byte (over limit)

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const APP_URL = 'https://united-educators-application.vercel.app';

const OVER_LIMIT_BYTES = 25 * 1024 * 1024 + 1; // 26,214,401 bytes

test.describe('Boundary: New Submission Form — Document Upload', () => {
  let tempFilePath: string;

  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test.beforeAll(() => {
    // Create a temporary file of 25 MB + 1 byte
    tempFilePath = path.join(os.tmpdir(), 'test-boundary-over25mb.pdf');
    const buffer = Buffer.alloc(OVER_LIMIT_BYTES, 0);
    buffer.write('%PDF-1.4\n', 0, 'ascii');
    fs.writeFileSync(tempFilePath, buffer);
  });

  test.afterAll(() => {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  test('TC-BOUND-008: Document at 25 MB + 1 byte (over limit)', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1 & 2: Attempt to upload a file of 25 MB + 1 byte via Add Document
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(tempFilePath);

    // Expected Result: Upload rejected with a clear "File size exceeds 25 MB" error
    const errorLocator = page.getByText(/file size exceeds 25/i)
      .or(page.getByText(/exceeds.*25.*mb/i))
      .or(page.getByText(/file too large/i))
      .or(page.getByRole('alert').filter({ hasText: /25.*mb|file size/i }));

    await expect(errorLocator).toBeVisible({ timeout: 10000 });

    // File should NOT appear as successfully uploaded
    await expect(page.getByText(/uploaded/i)).not.toBeVisible({ timeout: 5000 });
  });
});
