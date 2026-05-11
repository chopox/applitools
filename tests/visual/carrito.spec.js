require('dotenv').config();
const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo } = require('@applitools/eyes-playwright');

const { SauceDemo } = require('../../pages/SauceDemo'); 

test.describe('Prueba Carrito - Validacion POM', () => {
  let eyes;
  let runner;
  let sauceDemo; 

  test.beforeAll(async () => {
    runner = new VisualGridRunner({ testConcurrency: 1 });
    const config = new Configuration();
    config.setBatch(new BatchInfo('Validacion Carrito con POM')); // Cambiado para diferenciarlo
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    config.addBrowser(1280, 800, BrowserType.CHROME);
    eyes = new Eyes(runner, config);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    
    sauceDemo = new SauceDemo(page); 
    await eyes.open(page, 'SauceDemo', testInfo.title);
  });

  test('Interfaz del carrito', async ({ page }) => {
    
    await sauceDemo.goto(); 
    await sauceDemo.authentificate('standard_user', 'secret_sauce');
    await sauceDemo.goToCart();
   
    await eyes.check('Vista Carrito', Target.window().fully());
  });

  test.afterEach(async () => { await eyes.closeAsync(); });
  test.afterAll(async () => { 
    await runner.getAllTestResults(false); 
    console.log('🚀 Test con POM enviado correctamente');
  });
});