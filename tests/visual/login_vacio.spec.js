require('dotenv').config();
const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo, DeviceName } = require('@applitools/eyes-playwright');
// 1. Importamos el POM
const { SauceDemo } = require('../../pages/SauceDemo'); 

test.describe('Suite de Pruebas Visuales - Login Vacío', () => {
  let eyes;
  let runner;
  let sauceDemo;

  test.beforeAll(async () => {
    // Usamos el runner para gestionar las pruebas en la nube
    runner = new VisualGridRunner({ testConcurrency: 5 });
    const config = new Configuration();
    
    config.setBatch(new BatchInfo('SauceDemo - Pruebas de Regresión Visual'));
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    
    // Configuración de navegadores y dispositivos
    config.addBrowser(1920, 1080, BrowserType.CHROME);
    config.addBrowser(1366, 768, BrowserType.FIREFOX);
    config.addBrowser(1280, 800, BrowserType.SAFARI);
    config.addDeviceEmulation(DeviceName.iPhone_X);   
    config.addDeviceEmulation(DeviceName.Pixel_5);    

    eyes = new Eyes(runner, config);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    sauceDemo = new SauceDemo(page); 
    await eyes.open(page, 'SauceDemo App', testInfo.title);
  });

  test('Prueba Visual 2: Mensaje de error en Login', async ({ page }) => {
    // Usamos el método de Artem para ir a la web
    await sauceDemo.goto();
    
    /* IMPORTANTE: No usamos sauceDemo.authentificate('', '') porque el POM de Artem
      obliga a que la URL cambie a /inventory.html, y en este test de error
      queremos quedarnos en la página de login para ver el mensaje rosa.
    */
    
    // Hacemos click directamente en el botón de login usando el selector del POM
    await page.locator('#login-button').click(); 
    
    // Capturamos el estado de error con Applitools
    await eyes.check('Pantalla Login - Error por campos vacíos', Target.window().fully());
  });

  test.afterEach(async () => {
    await eyes.closeAsync();
  });

  test.afterAll(async () => {
    // Cerramos el runner y mostramos resultados
    await runner.getAllTestResults(false);
    console.log('✅ Ejecución completada. Test de Login Vacío con POM corregido enviado.');
  });
});