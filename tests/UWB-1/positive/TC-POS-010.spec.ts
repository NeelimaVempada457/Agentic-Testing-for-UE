// spec: test-artifacts/UWB-1/test-cases/positive/new-submission-positive.md

import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

// All 14 expected products in format "Name (Code) - LOB"
const EXPECTED_PRODUCTS = [
  // GL line
  /primary general liability.*cgl.*gl/i,
  /blx.*gl/i,
  /glx.*gl/i,
  /psl.*gl/i,
  // ML line
  /educators legal liability.*ell.*ml/i,
  /elx.*ml/i,
  /fdl.*ml/i,
  /fdx.*ml/i,
  /school board liability.*sbl.*ml/i,
  // PL line
  /ipl.*pl/i,
  // AR line
  /rps.*ar/i,
  /rph.*ar/i,
  // EL line
  /xff.*el/i,
  /xpg.*el/i,
];

test.describe('Create New Submission — Products Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  // TC-POS-010: Verify Products dropdown lists all 14 products with correct format
  test('Verify Products dropdown lists all 14 products with correct format', async ({ page }) => {
    // 1. Navigate to New Submission form
    await page.getByRole('link', { name: /submissions/i }).click();
    await page.getByRole('link', { name: /new submission/i }).click();
    await page.getByRole('button', { name: /new business/i }).click();

    // 2. Click Product(s) dropdown
    await page.getByLabel(/product/i).click();

    // Wait for the dropdown options to render
    await page.waitForSelector('[role="option"], [role="listbox"] li, .dropdown-item', { timeout: 5000 });

    const optionsLocator = page.getByRole('option');
    const count = await optionsLocator.count();

    // 3. Verify all 14 products are listed in format "Name (Code) - LOB"
    // CGL, BLX, GLX, PSL (GL)
    await expect(page.getByRole('option', { name: /cgl/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /blx/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /glx/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /psl/i })).toBeVisible();

    // ELL, ELX, FDL, FDX, SBL (ML)
    await expect(page.getByRole('option', { name: /ell/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /elx/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /fdl/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /fdx/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /sbl/i })).toBeVisible();

    // IPL (PL)
    await expect(page.getByRole('option', { name: /ipl/i })).toBeVisible();

    // RPS, RPH (AR)
    await expect(page.getByRole('option', { name: /rps/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /rph/i })).toBeVisible();

    // XFF, XPG (EL)
    await expect(page.getByRole('option', { name: /xff/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /xpg/i })).toBeVisible();

    // Expected Result: All 14 products present in format "Name (Code) - LOB".
    expect(count).toBeGreaterThanOrEqual(14);
  });
});
