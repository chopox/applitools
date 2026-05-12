require('dotenv').config();
const { test, expect } = require('@playwright/test');
// Importamos DeviceName y ScreenOrientation para los dispositivos móviles
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo, DeviceName, ScreenOrientation } = require('@applitools/eyes-playwright');
const { SauceDemo } = require('../../pages/SauceDemo');

test.describe('Validación profunda del DOM: Ordenamiento y Filtros', () => {
  let eyes;
  let runner;
  let sauceDemo;

  test.beforeAll(async () => {
    // testConcurrency: 5 permite que Applitools renderice hasta 5 entornos a la vez (depende de tu plan)
    runner = new VisualGridRunner({ testConcurrency: 5 });
    const config = new Configuration();
    config.setBatch(new BatchInfo('Validacion DOM - Filtros y Ordenamiento (UFG)'));
    config.setApiKey(process.env.APPLITOOLS_API_KEY);

    // --- CONFIGURACIÓN DEL ULTRAFAST GRID ---
    
    // 1. Navegadores de Escritorio (Desktop)
    config.addBrowser(1200, 800, BrowserType.CHROME);
    config.addBrowser(1200, 800, BrowserType.FIREFOX);
    config.addBrowser(1200, 800, BrowserType.EDGE_CHROMIUM);
    config.addBrowser(1200, 800, BrowserType.SAFARI);

    // 2. Dispositivos Móviles (Emulación)
    config.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    config.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    
    // ----------------------------------------

    eyes = new Eyes(runner, config);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    sauceDemo = new SauceDemo(page);
    await eyes.open(page, 'SauceDemo', testInfo.title);
  });

  test('El DOM debe reordenarse correctamente al filtrar por Precio (Menor a Mayor)', async ({ page }) => {
    await sauceDemo.goto();
    await sauceDemo.authentificate('standard_user', 'secret_sauce');

    await sauceDemo.elegirFiltro('lohi');

    const pricesText = await sauceDemo.obtenerPreciosProductos();
    const pricesFloat = pricesText.map(price => parseFloat(price.replace('$', '')));
    const isSorted = pricesFloat.every((val, i, arr) => !i || val >= arr[i - 1]);
    expect(isSorted).toBeTruthy();
    
    await sauceDemo.comprobarPrimerProducto('Sauce Labs Onesie');

    // Esta única línea ahora mandará a validar el layout a los 6 entornos configurados
    await eyes.check('Inventory Page - Sorted LoHi', Target.window().fully());
  });

  test.afterEach(async () => { await eyes.closeAsync(); });
  test.afterAll(async () => { 
    // Muestra en la consola los resultados de todos los entornos
    const results = await runner.getAllTestResults(false); 
    console.log('🚀 Test de Filtros renderizado en el UFG completado', results);
  });
});