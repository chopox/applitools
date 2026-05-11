require('dotenv').config();
const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo } = require('@applitools/eyes-playwright');

test.describe('Prueba Carrito - Validacion Simple', () => {
  let eyes;
  let runner;

  test.beforeAll(async () => {
    runner = new VisualGridRunner({ testConcurrency: 1 }); // Solo 1 para no saturar
    const config = new Configuration();
    config.setBatch(new BatchInfo('Validacion Carrito Solo Chrome'));
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    config.addBrowser(1280, 800, BrowserType.CHROME); // Solo un navegador
    eyes = new Eyes(runner, config);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    await eyes.open(page, 'SauceDemo', testInfo.title);
  });

  test('Interfaz del carrito', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.shopping_cart_link');
    
    await eyes.check('Vista Carrito', Target.window().fully());
  });

  test.afterEach(async () => { await eyes.closeAsync(); });
  test.afterAll(async () => { 
    await runner.getAllTestResults(false); 
    console.log('🚀 Test enviado correctamente');
  });
});