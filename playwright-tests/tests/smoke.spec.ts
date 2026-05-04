import { test, expect } from '@playwright/test';

test('homepage responds and renders title', async ({ page }) => {
  const response = await page.goto('/');
  expect(response).not.toBeNull();
  expect(response?.ok()).toBeTruthy();

  await expect(page).toHaveTitle(/kite|mallorca/i);
});
