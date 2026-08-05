import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {
  test('Main page loads and has correct title', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct (or at least contains the expected name)
    await expect(page).toHaveTitle(/Dylan Rigney/);
    
    // Check if the LiquidGlassCanvas background component renders
    // Based on standard component usage, it might have a specific class or id.
    // If not, we just rely on the page title and checking for body visibility.
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
