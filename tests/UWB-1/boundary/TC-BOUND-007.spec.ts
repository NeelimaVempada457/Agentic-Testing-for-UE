// spec: test-artifacts/UWB-1/test-cases/boundary/new-submission-boundary.md
// TC-BOUND-007: Document at exactly 25 MB size limit

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const APP_URL = 'https://united-educators-application.vercel.app';

const TWENTY_FIVE_MB = 25 * 1024 * 1024; // 26,214,400 bytes exactly

test.describe('Boundary: New Submission Form — Document Upload', () => {
  let tempFilePath: string;

  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test.beforeAll(() => {
    // Create a temporary PDF-like file of exactly 25 MB
    tempFilePath = path.join(os.tmpdir(), 'test-boundary-25mb.pdf');
    const buffer = Buffer.alloc(TWENTY_FIVE_MB, 0);
    // Write a minimal PDF header so it is recognized as a .pdf
    buffer.write('%PDF-1.4\n', 0, 'ascii');
    fs.writeFileSync(tempFilePath, buffer);
  });

  test.afterAll(() => {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  test('TC-BOUND-007: Document at exactly 25 MB size limit', async ({ page }) => {
    // Navigate to New Submission form
    await page.getByRole('link', { name: /new submission/i }).click();

    // Step 1 & 2: Upload a .pdf file of exactly 25.0 MB via Add Document
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(tempFilePath);

    // Expected Result: Upload succeeds at the boundary limit — no size error shown
    await expect(
      page.getByText(/file size exceeds/i).or(page.getByText(/too large/i))
    ).not.toBeVisible({ timeout: 10000 });

    // Confirm the uploaded file name appears in the UI
    await expect(
      page.getByText(/test-boundary-25mb/i).or(page.getByText(/uploaded/i))
    ).toBeVisible({ timeout: 10000 });
  });
});
