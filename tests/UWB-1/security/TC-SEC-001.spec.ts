// spec: test-artifacts/UWB-1/test-cases/security/new-submission-security.md
// TC-SEC-001: XSS — Script tag in Internal Notes field

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

test.describe('Security — XSS: Script tag in Internal Notes field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-SEC-001: XSS — Script tag in Internal Notes field', async ({ page }) => {
    const xssPayload = `<script>alert('XSS')</script>`;

    // Step 1: Enter XSS payload in the Internal Notes field
    const notesField = page.getByLabel(/internal notes/i).or(
      page.locator('textarea[name*="notes"], textarea[id*="notes"], textarea[placeholder*="notes" i]')
    );
    await notesField.fill(xssPayload);

    // Step 2: Fill remaining mandatory fields to allow form submission
    const submissionTypeField = page.getByLabel(/submission type/i).or(
      page.locator('select[name*="type"], [id*="submissionType"]')
    );
    if (await submissionTypeField.count() > 0) {
      await submissionTypeField.selectOption({ index: 1 });
    }

    // Step 3: Click "Create Submission" / submit the form
    // Register a dialog handler BEFORE clicking — if XSS fires an alert, this catches it
    let alertFired = false;
    page.once('dialog', async (dialog) => {
      alertFired = true;
      await dialog.dismiss();
    });

    const submitButton = page.getByRole('button', { name: /create submission/i }).or(
      page.locator('button[type="submit"]')
    );
    if (await submitButton.count() > 0) {
      await submitButton.click();
    }

    // Allow a brief moment for any XSS to fire
    await page.waitForTimeout(1000);

    // Step 4: Assert no alert dialog was triggered
    expect(alertFired).toBe(false);

    // Assert the page did not crash
    await expect(page).not.toHaveURL(/error/i);

    // Assert the payload is NOT rendered as an executable script in the DOM
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    // The raw <script> tag should not appear unescaped in the rendered DOM
    expect(bodyHTML).not.toContain('<script>alert(');
  });
});
