require('dotenv').config();

const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, BrowserType, BatchInfo, DeviceName } = require('@applitools/eyes-playwright');

test.describe('Suite de Pruebas Visuales - Login Vacío', () => {
  let eyes;
  let runner;

  // 1. SETUP GLOBAL (Se ejecuta una vez para todo el archivo)
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

  // 2. ENCENDER LA CÁMARA (Se ejecuta antes de empezar tu test)
  test.beforeEach(async ({ page }, testInfo) => {
    await eyes.open(page, 'SauceDemo App', testInfo.title);
  });

  // 3. EL TEST EN SÍ
  test('Prueba Visual 2: Mensaje de error en Login', async ({ page }) => {
    // Vamos a la página inicial
    await page.goto('https://www.saucedemo.com/');
    
    // Hacemos clic en el botón de Login SIN poner usuario ni contraseña
    await page.locator('[data-test="login-button"]').click();
    
    // Capturamos la pantalla: Applitools validará que el cuadro rojo de error aparece correctamente
    await eyes.check('Pantalla Login - Error por campos vacíos', Target.window().fully());
  });

  // 4. APAGAR LA CÁMARA (Para que la foto se guarde)
  test.afterEach(async () => {
    await eyes.closeAsync();
  });

  // 5. ENVIAR TODO Y CERRAR (Faltaba esta llave final)
  test.afterAll(async () => {
    await runner.getAllTestResults(false);
    console.log('✅ Ejecución completada. Test de Login Vacío enviado.');
  });
}); 