require('dotenv').config();

const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo, DeviceName } = require('@applitools/eyes-playwright');

test.describe('Suite de Pruebas Visuales - SauceDemo', () => {
  let eyes;
  let runner;

  // 1. SETUP GLOBAL (Se ejecuta una vez para toda la suite)
  test.beforeAll(async () => {
    // Usamos Ultrafast Grid para escalar pruebas rápidamente
    runner = new VisualGridRunner({ testConcurrency: 5 });
    const config = new Configuration();
    
    // 🔥 PRO TIP: Agrupar en un "Batch" para que en el Dashboard no salgan sueltas, sino como una "Release"
    config.setBatch(new BatchInfo('SauceDemo - Pruebas de Regresión Visual'));
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    
    // Matriz de pruebas (Cross-browser y Responsive real)
    config.addBrowser(1920, 1080, BrowserType.CHROME);    // Desktop Full HD
    config.addBrowser(1366, 768, BrowserType.FIREFOX);    // Laptop estándar
    config.addBrowser(1280, 800, BrowserType.SAFARI);     // Mac
    config.addDeviceEmulation(DeviceName.iPhone_X);       // iPhone   
    config.addDeviceEmulation(DeviceName.Pixel_5);        // Mobile Android

    // Inicializamos Eyes con toda esta configuración brutal
    eyes = new Eyes(runner, config);
  });

  // 2. SETUP POR TEST (Se ejecuta antes de cada 'test')
  test.beforeEach(async ({ page }, testInfo) => {
    // 🔥 PRO TIP: Usamos 'testInfo.title' para que Eyes nombre automáticamente la prueba igual que en Playwright
    await eyes.open(page, 'SauceDemo E2E', testInfo.title);
  });

  // 3. NUESTRO CASO DE PRUEBA
  test('Flujo E2E: Login exitoso y vista de inventario', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Captura inicial
    await eyes.check('1. Pantalla de Login', Target.window().fully());

    // Acciones de Playwright
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Captura post-login
    await eyes.check('2. Inventario Completo', Target.window().fully());
  });

  /* Puedes añadir más tests aquí abajo y compartirán la misma configuración 
    test('Validar el carrito de compras', async ({ page }) => { ... });
  */

  // 4. TEARDOWN POR TEST (Se ejecuta al final de cada 'test')
  test.afterEach(async () => {
    // 🔥 PRO TIP: Usar closeAsync() en lugar de close() acelera la ejecución 
    // porque Playwright no espera a que Applitools termine de procesar las imágenes para pasar al siguiente test.
    await eyes.closeAsync();
  });

  // 5. TEARDOWN GLOBAL (Se ejecuta al final de toda la suite)
  test.afterAll(async () => {
    // Publicamos todos los resultados del Grid
    const results = await runner.getAllTestResults(false);
    console.log('✅ Ejecución completada en Ultrafast Grid. Revisa el Dashboard de Applitools.');
  });
});