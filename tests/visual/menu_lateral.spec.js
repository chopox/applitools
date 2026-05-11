require('dotenv').config();
const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo, DeviceName } = require('@applitools/eyes-playwright');
// 1. Importamos el POM de Artem
const { SauceDemo } = require('../../pages/SauceDemo'); 

test.describe('Suite de Pruebas Visuales - Menú Lateral', () => {
  let eyes;
  let runner;
  let sauceDemo; // 2. Variable para el POM

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
    // 3. Inicializamos el POM pasándole la página
    sauceDemo = new SauceDemo(page); 
    await eyes.open(page, 'SauceDemo App', testInfo.title);
  });

  test('Prueba Visual 4: Despliegue del menú lateral', async ({ page }) => {
    // 4. Usamos los métodos de Artem para navegar y login
    await sauceDemo.goto();
    await sauceDemo.authentificate('standard_user', 'secret_sauce');
    
    // 5. Usamos el método específico del menú que creó Artem
    await sauceDemo.clickBurgerMenu();
    
    // Un pequeño respiro para la animación
    await page.waitForTimeout(500); 
    
    // 6. Captura visual de Applitools
    await eyes.check('Menú Hamburguesa Desplegado', Target.window().fully());
  });

  test.afterEach(async () => {
    await eyes.closeAsync();
  });

  test.afterAll(async () => {
    await runner.getAllTestResults(false);
    console.log('✅ Ejecución completada. Test del Menú Lateral con POM enviado.');
  });
});