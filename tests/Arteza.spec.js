import { test } from '@applitools/eyes-playwright/fixture';
const { Arteza } = require('../pages/Arteza.js');
const {
  VisualGridRunner,
  Configuration,
  BrowserType,
  DeviceName,
  BatchInfo
} = require('@applitools/eyes-playwright');

// Creamos runner y batch
const runner = new VisualGridRunner({ testConcurrency: 10 });
const batch = new BatchInfo('Arteza E2E - Visual Regression');

test.describe('Pruebas Visuales Arteza', () => {

  test('Arteza Main Flow', async ({ page, eyes }, testInfo) => {
    const arteza = new Arteza(page);

    const config = new Configuration();
    config.setBatch(batch);

    // Comprobación: Si no habrá API KEY, sale un error en lenguaje humano.
    if (!process.env.APPLITOOLS_API_KEY) {
      throw new Error('ERROR: APPLITOOLS_API_KEY no encontrado en process.env. Comprueba fichero .env');
    }

    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    config.setAppName('Arteza');
    config.setTestName(testInfo.title);

    // Configuración Grid
    config.addBrowser(1920, 1080, BrowserType.CHROME);
    config.addBrowser(1366, 768, BrowserType.FIREFOX);
    config.addBrowser(1280, 800, BrowserType.SAFARI);
    config.addDeviceEmulation(DeviceName.iPhone_X);
    config.addDeviceEmulation(DeviceName.Pixel_5);

    await eyes.setConfiguration(config);
    await eyes.open(page);

    await arteza.goto();
    await eyes.check('Página principal');

    const postLinks = page.getByRole('main', { name: 'Main Content' }).getByRole('link');
    const count = await postLinks.count();

    // Bucle por todos posts
    for (let i = 0; i < count; i++) {
      const currentPost = postLinks.nth(i);
      const title = await currentPost.innerText();

      await test.step(`Comprobasión de post: ${title}`, async () => {
        await currentPost.click();
        await page.waitForLoadState('networkidle');

        // Captura de cada post
        await eyes.check(`Post: ${title}`);

        await page.goBack();
      });
    }

    // Comprobación de menús
    const sections = ['CATEGORÍAS', 'ETIQUETAS', 'ARCHIVO', 'DONAR', 'SOBRE MÍ', 'INICIO'];

    for (const section of sections) {
        await page.getByRole('link', { name: section, exact: section === 'INICIO' }).click();
        await page.waitForLoadState('networkidle');
        await eyes.check(`Menu ${section.toLowerCase()}`);
    }

    // Fixture ejecuta eyes.close(), si no aparece errores
  });
});
