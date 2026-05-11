import { SauceDemo } from '../pages/SauceDemo';
const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, MatchLevel } = require('@applitools/eyes-playwright');

const applitoolsConfig = require('../applitools.config.js');

const users = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user"
];
const password = "secret_sauce";

const runner = new VisualGridRunner({ testConcurrency: 10 });

test.describe('SauceDemo Advanced Visual AI', () => {

    for (const user of users) {
        test(`Pruebas Avanzadas para ${user}`, async ({ page }) => {
            const sauceDemo = new SauceDemo(page);
            const eyes = new Eyes(runner);

            const config = new Configuration(applitoolsConfig);
            config.setMatchLevel(MatchLevel.Strict); 
            eyes.setConfiguration(config);

            try {
                await eyes.open(page, 'SauceDemo', `Usuario: ${user}`);

                await sauceDemo.goto();
                await eyes.check('Login Page', Target.window().fully());

                await sauceDemo.authentificate(user, password);

                await eyes.check('Página principal', Target.window()
                    .fully()
                    .ignoreRegions('.shopping_cart_link')
                    .layoutRegions('.inventory_list')
                );

                await sauceDemo.elegirFiltro("za");
                await eyes.check("Filtro Z a A", Target.window()
                    .fully()
                    .matchLevel(MatchLevel.IgnoreColors)
                );

                await sauceDemo.goToCart();
                await sauceDemo.clickCheckout();
                await sauceDemo.writeInfoPerson("John", "Doe", "12345");
                
                await eyes.check("Datos Personales", Target.window()
                    .fully()
                    .floatingRegions('.checkout_info', 5, 5, 5, 5)
                );

                await eyes.close(false);
            } catch (error) {
                console.error(`Error detectado en ${user}:`, error.message);
                await eyes.abort();
            }
        });
    }

    test.afterAll(async () => {
        const resultsSummary = await runner.getAllTestResults(false);
        console.log('Resultados procesados en Applitools.');
    });
});