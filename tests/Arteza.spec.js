import { test } from '@applitools/eyes-playwright/fixture'
const { Arteza } = require('../pages/Arteza.js');

test('Arteza Main Flow', async ({ page, eyes }) => {
  const arteza = new Arteza(page);
  
  const config = eyes.getConfiguration();
  config.setBatch({ name: 'Arteza E2E Visual Tests' });
  eyes.setConfiguration(config);
  await eyes.open(page, 'Arteza');

  await arteza.goto();
  await eyes.check('Página principal');

  const postLinks = page.getByRole('main', { name: 'Main Content' }).getByRole('link');

  const count = await postLinks.count();

  for (let i = 0; i < count; i++) {
    const currentPost = postLinks.nth(i);
    const title = await currentPost.innerText();

    await test.step(`Comprobasión de post: ${title}`, async () => {
      await currentPost.click();

      await page.waitForLoadState('networkidle');
      
      await eyes.check(`Post: ${title}`)

      await page.goBack();
    });
  }

  await page.getByRole('link', { name: 'CATEGORÍAS' }).click();
  await page.waitForLoadState('networkidle');
  await eyes.check('Menu categorias')

  await page.getByRole('link', { name: 'ETIQUETAS' }).click();
  await page.waitForLoadState('networkidle');
  await eyes.check('Menu etiquetas')

  await page.getByRole('link', { name: 'ARCHIVO' }).click();
  await page.waitForLoadState('networkidle');
  await eyes.check('Menu archivo')

  await page.getByRole('link', { name: 'DONAR' }).click();
  await page.waitForLoadState('networkidle');
  await eyes.check('Menu donar')

  await page.getByRole('link', { name: 'SOBRE MÍ' }).click();
  await page.waitForLoadState('networkidle');
  await eyes.check('Menu sobre mi')

  await page.getByRole('link', { name: 'INICIO', exact: true }).click();
  await page.waitForLoadState('networkidle');
  await eyes.check('Menu inicio')

});
