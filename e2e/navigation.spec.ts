import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    
    // Check home page
    await expect(page).toHaveTitle(/Secret Sauce/);
    
    // Navigate to Stories
    await page.click('text=Stories');
    await expect(page).toHaveURL(/.*\/stories/);
    
    // Navigate to Podcast
    await page.click('text=Podcast');
    await expect(page).toHaveURL(/.*\/podcast/);
    
    // Navigate back home
    await page.click('text=Secret Sauce');
    await expect(page).toHaveURL(/.*\//);
  });
});