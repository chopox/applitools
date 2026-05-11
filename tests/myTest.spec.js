import { SauceDemo } from '../pages/SauceDemo';
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const { Eyes, Target } = require('@applitools/eyes-playwright');
const users = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user"
];
const password = "secret_sauce";

for (const user of users) {
    test('SauceDemo ' + user, async ({ page }) => {
    
    const sauceDemo = new SauceDemo(page);
    const eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    await eyes.open(
        page,
        'SauceDemo',
        'Prueba visual de SauceDemo con usuario ' + user
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