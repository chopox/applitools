require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo, DeviceName, ScreenOrientation } = require('@applitools/eyes-playwright');
const { SauceDemo } = require('../../pages/SauceDemo');

test.describe('Flujo E2E y Validación DOM: Compra Exitosa', () => {
  let eyes;
  let runner;
  let sauceDemo;

  test.beforeAll(async () => {
    runner = new VisualGridRunner({ testConcurrency: 5 });
    const config = new Configuration();
    config.setBatch(new BatchInfo('Validacion DOM - Flujo E2E Completo (UFG)'));
    config.setApiKey(process.env.APPLITOOLS_API_KEY);

    // --- CONFIGURACIÓN DEL ULTRAFAST GRID ---
    // Navegadores de Escritorio
    config.addBrowser(1200, 800, BrowserType.CHROME);
    config.addBrowser(1200, 800, BrowserType.FIREFOX);
    config.addBrowser(1200, 800, BrowserType.EDGE_CHROMIUM);
    config.addBrowser(1200, 800, BrowserType.SAFARI);

    // Dispositivos Móviles (Applitools renderizará el diseño responsive)
    config.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    config.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    // ----------------------------------------

    eyes = new Eyes(runner, config);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    sauceDemo = new SauceDemo(page);
    await eyes.open(page, 'SauceDemo', testInfo.title);
  });

  test('Validar limpieza del DOM y pantalla de éxito tras completar la compra', async ({ page }) => {
    // 1. Preparación y Login
    await sauceDemo.goto();
    await sauceDemo.authentificate('standard_user', 'secret_sauce');

    // 2. Interacción: Flujo completo de compra
    await sauceDemo.addCart('Sauce Labs Fleece Jacket');
    await sauceDemo.goToCart();
    await sauceDemo.clickCheckout();
    
    // Rellenamos el formulario usando tu método
    await sauceDemo.writeInfoPerson('Ivan', 'QA', '28001');
    await sauceDemo.clickContinue();
    
    // Aquí Applitools podría validar la pantalla de resumen, pero iremos hasta el final
    await sauceDemo.clickFinish();

    // 3. Validaciones Profundas del DOM tras la compra
    const contenedorExito = await sauceDemo.obtenerContenedorExito();
    const cartBadge = await sauceDemo.obtenerBadgeCarrito();

    // Verificamos que el contenedor de éxito se haya inyectado y sea visible
    await expect(contenedorExito).toBeVisible();
    
    // Validamos usando tu método que el texto exacto está renderizado
    await sauceDemo.encontrarTexto('Thank you for your order!');
    await sauceDemo.encontrarTexto('Your order has been dispatched');

    // ¡Validación Clave del DOM! El carrito debió vaciarse, por lo que el badge 
    // rojo debe haber desaparecido completamente del árbol DOM
    await expect(cartBadge).toHaveCount(0);

    // 4. Validación Visual: Disparamos la captura a los 6 dispositivos
    await eyes.check('Checkout Complete - Success State', Target.window().fully());
  });

  test.afterEach(async () => { await eyes.closeAsync(); });
  test.afterAll(async () => { 
    const results = await runner.getAllTestResults(false); 
    console.log('🚀 Flujo E2E renderizado en el UFG completado');
  });
});