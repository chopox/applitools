import { test } from '@applitools/eyes-playwright/fixture'
const { SauceDemo } = require('../pages/SauceDemo.js');
//const user = "visual_user";
const user = "standard_user";
const password = "secret_sauce"


test('SauceDemo', async ({ page, eyes }) => {
  const sauceDemo = new SauceDemo(page);
  await sauceDemo.goto();

  await eyes.check('Login Page')

  await sauceDemo.authentificate(user,password)

  await eyes.check('Página principal')

  await sauceDemo.elegirFiltro("za");
  await eyes.check("Filto de Z a A")

  await sauceDemo.elegirFiltro("lohi")
  await eyes.check("Filto de menor a mayor")

  await sauceDemo.elegirFiltro("hilo")
  await eyes.check("Filto de mayor a menor")

  await sauceDemo.goToCart();
  await eyes.check("Cesta")

  await sauceDemo.clickCheckout();
  await sauceDemo.writeInfoPerson("1111","2222","3333");
  await eyes.check("Datos de persona")

  await sauceDemo.clickContinue();
  await eyes.check("Datos finales de compra")

  await sauceDemo.clickFinish();
  await eyes.check("Felicidades por compra")

  await sauceDemo.clickBackHome()
  await sauceDemo.clickBurgerMenu()
  await eyes.check("Burger menu abierto")
});