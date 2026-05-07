// @ts-check
import { test, expect } from '@playwright/test';
import { Eyes, Target } from '@applitools/eyes-playwright';
import dotenv from 'dotenv';

dotenv.config();

test('Visual test homepage', async ({ page }) => {
  const eyes = new Eyes();

  await eyes.open(page, 'Demo App', 'Homepage Test');

  await page.goto('https://playwright.dev');

  await eyes.check('Homepage', Target.window());

  await eyes.close();
});