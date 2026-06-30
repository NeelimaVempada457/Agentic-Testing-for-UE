// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Create New Submission — Cancel Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-009: Verify Cancel without modifications skips warning dialog
  test('Verify Cancel without modifications skips warning dialog', async ({ page }) => {
    // 1. Navigate to New Submission form
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();

    // 2. Do NOT touch any field — immediately click Cancel
    await page.getByRole('button', { name: /cancel/i }).click();

    // Expected Result: No dialog shown. User navigated away immediately.
    await expect(page.getByRole('dialog')).not.toBeVisible();
    // Verify we're no longer on the new submission form
    await expect(page.getByRole('button', { name: /create submission/i })).not.toBeVisible();
  });
});
