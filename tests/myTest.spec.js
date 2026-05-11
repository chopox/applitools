import { SauceDemo } from '../pages/SauceDemo';
const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration, MatchLevel } = require('@applitools/eyes-playwright');

const users = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user"
];
const password = "secret_sauce";
const runner = new VisualGridRunner({ testConcurrency: 6 });

test.describe('SauceDemo Advanced Visual AI', () => {

    for (const user of users) {
        test(`Pruebas Avanzadas para ${user}`, async ({ page }) => {
            const sauceDemo = new SauceDemo(page);
            
            // Instancia local para cada test
            const eyes = new Eyes(runner);
            const config = new Configuration();
            config.setMatchLevel(MatchLevel.Strict); 
            eyes.setConfiguration(config);

            try {
                await eyes.open(page, 'SauceDemo', `Usuario: ${user}`);

                await sauceDemo.goto();
                await eyes.check('Login Page', Target.window().fully());

                await sauceDemo.authentificate(user, password);
                
                await eyes.check('Página principal', Target.window()
                    .fully()
                    .ignoreRegions(page.locator('.shopping_cart_link'))
                    .layoutRegions(page.locator('.inventory_list'))
                );

                await sauceDemo.elegirFiltro("za");
                await eyes.check("Filtro Z a A", Target.window()
                    .fully()
                    .matchLevel(MatchLevel.Content)
                );

                await sauceDemo.goToCart();
                await sauceDemo.clickCheckout();
                await sauceDemo.writeInfoPerson("John", "Doe", "12345");
                
                await eyes.check("Datos Personales", Target.window()
                    .fully()
                    .floatingRegions(page.locator('.checkout_info'), 5, 5, 5, 5)
                );

                await eyes.close(false);
            } catch (error) {
                console.error(`Error en test de ${user}:`, error);
                await eyes.abort();
            }
        });
    }

    test.afterAll(async () => {
        // Obtenemos resultados sin romper la build
        const resultsSummary = await runner.getAllTestResults(false);
        console.log('--- Resumen de Applitools ---');
        console.log(resultsSummary);
    });
});