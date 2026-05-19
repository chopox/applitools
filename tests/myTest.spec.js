import { SauceDemo } from '../pages/SauceDemo';
const { test } = require('@playwright/test');
const { Eyes, Target } = require('@applitools/eyes-playwright');
require('dotenv').config(); //npm install dotenv

const user = "standard_user";
const password = "secret_sauce";

test.describe('SauceDemo Advanced Visual AI', () => {

    test(`Pruebas Avanzadas para ${user}`, async ({ page }) => {
        const sauceDemo = new SauceDemo(page);
        const eyes = new Eyes();

        try {
            await eyes.open(page, 'SauceDemo', `Usuario: ${user}`);

            await sauceDemo.goto();
            await eyes.check('Login Page', Target.window().fully());

            await sauceDemo.authentificate(user, password);
            await eyes.check('Estado Post-Login', Target.window().fully());
            await page.waitForSelector('.inventory_list', { timeout: 5000 }); 
            await eyes.check('Página principal', Target.window().fully());

            await sauceDemo.elegirFiltro("za");
            await eyes.check("Filtro Z a A", Target.window().fully());

            await sauceDemo.goToCart();
            await sauceDemo.clickCheckout();
            await sauceDemo.writeInfoPerson("John", "Doe", "12345");
            await eyes.check("Datos Personales", Target.window().fully());

            await sauceDemo.clickContinue();
            await eyes.check("Datos finales de compra", Target.window().fully());

            await sauceDemo.clickFinish();
            await eyes.check("Felicidades por la compra", Target.window().fully());

            await sauceDemo.clickBackHome();
            await sauceDemo.clickBurgerMenu();
            await eyes.check("Burger menu abierto", Target.window().fully());


            await eyes.close(false);
        } catch (error) {
            console.error(`Error detectado en ${user}:`, error.message);
            await eyes.abort();
            throw error;
        }
    });

    test.afterAll(async () => {
        console.log('Resultados procesados en Applitools.');
    });
});