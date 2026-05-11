require('dotenv').config();

const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo, DeviceName } = require('@applitools/eyes-playwright');

test.describe('Suite de Pruebas Visuales - Menú Lateral', () => {
  let eyes;
  let runner;

  test.beforeAll(async () => {
    runner = new VisualGridRunner({ testConcurrency: 5 });
    const config = new Configuration();
    
    config.setBatch(new BatchInfo('SauceDemo - Pruebas de Regresión Visual'));
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    
    config.addBrowser(1920, 1080, BrowserType.CHROME);
    config.addBrowser(1366, 768, BrowserType.FIREFOX);
    config.addBrowser(1280, 800, BrowserType.SAFARI);
    config.addDeviceEmulation(DeviceName.iPhone_X);   
    config.addDeviceEmulation(DeviceName.Pixel_5);    

    eyes = new Eyes(runner, config);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    await eyes.open(page, 'SauceDemo App', testInfo.title);
  });

  test('Prueba Visual 4: Despliegue del menú lateral', async ({ page }) => {
    // 1. Navegamos y hacemos login
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // 2. Hacemos clic en el icono del menú hamburguesa (arriba a la izquierda)
    await page.locator('#react-burger-menu-btn').click();
    
    // Esperamos medio segundo para que la animación del menú termine de abrirse
    await page.waitForTimeout(500); 
    
    // 3. Capturamos la pantalla con el menú desplegado
    await eyes.check('Menú Hamburguesa Desplegado', Target.window().fully());
  });

  test.afterEach(async () => {
    await eyes.closeAsync();
  });

  test.afterAll(async () => {
    await runner.getAllTestResults(false);
    console.log('✅ Ejecución completada. Test del Menú Lateral enviado.');
  });
});