require('dotenv').config();
const { test } = require('@playwright/test');
const { Arteza } = require('../pages/Arteza.js');
const {
    Eyes,
    Target,
    VisualGridRunner,
    Configuration,
    BrowserType,
    BatchInfo,
    DeviceName,
    ScreenOrientation
} = require('@applitools/eyes-playwright');

// Creamos runner y batch para ambos tests
const runner = new VisualGridRunner({ testConcurrency: 15 });
const batch = new BatchInfo('Arteza E2E - Split Platforms');

test.describe('Pruebas Visuales Arteza', () => {
    // Comprobación: Si no habrá API KEY, sale un error en lenguaje humano.
    if (!process.env.APPLITOOLS_API_KEY) {
        throw new Error('ERROR: APPLITOOLS_API_KEY no encontrado en process.env. Comprueba fichero .env');
    }

    // Grupo 1: Navegadores desktop
    test.describe('Desktop Browsers', () => {
        let eyes;

        test.beforeEach(async ({ page }, testInfo) => {
            const config = new Configuration();
            config.setBatch(batch);
            config.setApiKey(process.env.APPLITOOLS_API_KEY);
            config.setAppName('Arteza');
            config.setTestName(`${testInfo.title} [Desktop]`);

            // Configuración Grid para navegadores
            config.addBrowser(1920, 1080, BrowserType.CHROME);
            config.addBrowser(3840, 2160, BrowserType.CHROME);
            config.addBrowser(1920, 1080, BrowserType.FIREFOX);
            config.addBrowser(1920, 1080, BrowserType.SAFARI);

            eyes = new Eyes(runner, config);
            await eyes.open(page);
        });

        test('Arteza Main Flow - Desktop', async ({ page }) => {
            test.slow(); // Aumenta tiempo de espera de los comandos a 3 veces
            const arteza = new Arteza(page);
            await arteza.goto();

            await eyes.check('Página principal', Target.window().fully());

            const postLinks = page.getByRole('main', { name: 'Main Content' }).getByRole('link');
            const count = await postLinks.count();

            // Bucle por todos posts
            for (let i = 0; i < count; i++) {
                const currentPost = postLinks.nth(i);
                const title = await currentPost.innerText();

                await test.step(`Comprobación de post: ${title}`, async () => {
                    await currentPost.click();
                    await page.waitForLoadState('networkidle');
                    // Captura de cada post
                    await eyes.check(`Post: ${title}`, Target.window().fully());
                    await page.goBack();
                });
            }

            // Comprobación de menús
            const sections = ['CATEGORÍAS', 'ETIQUETAS', 'ARCHIVO', 'DONAR', 'SOBRE MÍ', 'INICIO'];
            for (const section of sections) {
                await page.getByRole('link', { name: section, exact: section === 'INICIO' }).click();
                await page.waitForLoadState('networkidle');
                await eyes.check(`Menu ${section.toLowerCase()}`, Target.window().fully());
            }
        });
        test.afterEach(async () => { await eyes.closeAsync(); });
    });

    // Grupo 2: Dispositivos móviles
    test.describe('Mobile Devices', () => {
        let eyes;

        test.beforeEach(async ({ page }, testInfo) => {
            const config = new Configuration();
            config.setBatch(batch);
            config.setApiKey(process.env.APPLITOOLS_API_KEY);
            config.setAppName('Arteza');
            config.setTestName(`${testInfo.title} [Mobile]`);

            // Configuración Grid para móviles
            config.addDeviceEmulation(DeviceName.Galaxy_S25_Ultra, ScreenOrientation.PORTRAIT);
            config.addDeviceEmulation(DeviceName.iPhone_15_Pro, ScreenOrientation.PORTRAIT);
            config.addDeviceEmulation(DeviceName.OnePlus_7T_Pro, ScreenOrientation.LANDSCAPE);
            config.addDeviceEmulation(DeviceName.OnePlus_7T_Pro, ScreenOrientation.PORTRAIT);
            config.addDeviceEmulation(DeviceName.Galaxy_Tab_S8, ScreenOrientation.PORTRAIT);
            config.addDeviceEmulation(DeviceName.Galaxy_Tab_S8, ScreenOrientation.LANDSCAPE);

            eyes = new Eyes(runner, config);
            await eyes.open(page);
        });

        test('Arteza Main Flow - Mobile', async ({ page }) => {
            test.slow(); // Aumenta tiempo de espera de los comandos a 3 veces
            const arteza = new Arteza(page);
            await arteza.goto();

            await eyes.check('Página principal', Target.window().fully());

            const postLinks = page.getByRole('main', { name: 'Main Content' }).getByRole('link');
            const count = await postLinks.count();

            // Bucle por todos posts
            for (let i = 0; i < count; i++) {
                const currentPost = postLinks.nth(i);
                const title = await currentPost.innerText();

                await test.step(`Comprobación de post: ${title}`, async () => {
                    await currentPost.click();
                    await page.waitForLoadState('networkidle');
                    // Captura de cada post
                    await eyes.check(`Post: ${title}`, Target.window().fully());
                    await page.goBack();
                });
            }

            // Comprobación de menús
            const sections = ['CATEGORÍAS', 'ETIQUETAS', 'ARCHIVO', 'DONAR', 'SOBRE MÍ', 'INICIO'];
            for (const section of sections) {
                await page.getByRole('link', { name: section, exact: section === 'INICIO' }).click();
                await page.waitForLoadState('networkidle');
                await eyes.check(`Menu ${section.toLowerCase()}`, Target.window().fully());
            }
        });
        test.afterEach(async () => { await eyes.closeAsync(); });
    });

    test.afterAll(async () => {
        test.setTimeout(180000); // Asigna tiempo de ejecución máximo
        await runner.getAllTestResults(false); // Espera respuesta de Applitools, si imñagenes son mismos o hay diferencias
        console.log('\n' + '='.repeat(39));
        console.log('✅ Test arteza.es enviado correctamente');
        console.log('='.repeat(39) + '\n');
    });
});
