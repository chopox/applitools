import { test } from '@playwright/test';
import { Eyes, Target } from '@applitools/eyes-playwright';

test('Visual test homepage', async ({ page }) => {
  const apiKey = process.env.APPLITOOLS_API_KEY;

  if (!apiKey) {
    throw new Error('APPLITOOLS_API_KEY no encontrada');
  }

  const eyes = new Eyes();

  eyes.setApiKey(apiKey);

  await eyes.open(page, 'Demo App', 'Homepage Test');

  await page.goto('https://playwright.dev');

  await eyes.check('Homepage', Target.window());

  await eyes.close();
});