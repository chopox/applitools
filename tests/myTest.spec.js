import { SauceDemo } from '../pages/SauceDemo';
const { test } = require('@playwright/test');
const { Eyes, Target, VisualGridRunner, Configuration } = require('@applitools/eyes-playwright');

const users = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user"
];
const password = "secret_sauce";

// Runner para el Ultrafast Grid
const runner = new VisualGridRunner({ testConcurrency: 5 });

test.describe('SauceDemo Visual AI', () => {
    let eyes;

    for (const user of users) {
        test(`SauceDemo ${user}`, async ({ page }) => {
            const sauceDemo = new SauceDemo(page);
            eyes = new Eyes(runner);

            // Configuramos la rama dinámicamente si es necesario
            const configuration = new Configuration();
            if (user !== "standard_user") {
                configuration.setBranchName("ci-tests");
                configuration.setParentBranchName("main");
            }
            eyes.setConfiguration(configuration);

            await eyes.open(
                page,
                'SauceDemo',
                `Prueba visual de SauceDemo - Usuario: ${user}`
            );

            await sauceDemo.goto();
            await eyes.check('Login Page', Target.window().fully());

            await sauceDemo.authentificate(user, password);
            await eyes.check('Página principal', Target.window().fully());

            await sauceDemo.elegirFiltro("za");
            await eyes.check("Filtro de Z a A", Target.window().fully());

            await sauceDemo.elegirFiltro("lohi");
            await eyes.check("Filtro de menor a mayor", Target.window().fully());

            await sauceDemo.elegirFiltro("hilo");
            await eyes.check("Filtro de mayor a menor", Target.window().fully());

            await sauceDemo.goToCart();
            await eyes.check("Cesta", Target.window().fully());

            await sauceDemo.clickCheckout();
            await sauceDemo.writeInfoPerson("1111","2222","3333");
            await eyes.check("Datos personales", Target.window().fully());

            await sauceDemo.clickContinue();
            await eyes.check("Datos finales de compra", Target.window().fully());

            await sauceDemo.clickFinish();
            await eyes.check("Felicidades por compra", Target.window().fully());

            await sauceDemo.clickBackHome();
            await sauceDemo.clickBurgerMenu();
            await eyes.check("Burger menu abierto", Target.window().fully());
            
            await eyes.close(false);
        });
    }

    test.afterAll(async () => {
        // Espera a que todos los resultados del Grid se procesen
        const resultsSummary = await runner.getAllTestResults();
        console.log(resultsSummary);
    });
});