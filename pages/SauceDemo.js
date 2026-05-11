const { expect } = require('@playwright/test');

// models/TodoPage.js
class SauceDemo {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Определяем локаторы
    this.productList = page.locator('.inventory_list')
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async authentificate(user,password) {
    await this.page.locator('#user-name').fill(user);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login-button').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async addCart(product){
    const productCard = this.page.locator('.inventory_item').filter({ hasText: product });
    await productCard.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeCart(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({hasText: product});
    await productCard.getByRole('button', { name: /remove/i}).click();
  }

  async goToCart(){
    await this.page.locator('.shopping_cart_link').click();
  }

  async checkCartProduct(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({hasText: product});
    await expect(productCard).toBeVisible(product);
  }

  async checkNoCartProduct(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({hasText: product});
    await expect(productCard).toBeHidden(product);
  }

  async checkNoMainCartProduct(product){
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({ hasText: product }).getByRole('button');
    await expect(productCard).toHaveText(/add to cart/i);
  }

  async clickCheckout(){
    await this.page.locator('#checkout').click();
  }

  async clickContinue(){
    await this.page.locator('#continue').click();
  }

  async clickFinish(){
    await this.page.locator('#finish').click();
  }

  async clickBackHome(){
    await this.page.locator('#back-to-products').click();
  }

  async writeInfoPerson(nombre,apellido,postal){
    await this.page.locator('#first-name').click();
    await this.page.locator('#first-name').fill(nombre);
    await this.page.locator('#last-name').click();
    await this.page.locator('#last-name').fill(apellido);
    await this.page.locator('#postal-code').click();
    await this.page.locator('#postal-code').fill(postal);
  }
  
  async contadorBotonesRemove(count){
    const removeButtons = this.page.getByRole('button', { name: /remove/i });
    await expect(removeButtons).toHaveCount(count);
  }

  async encontrarTexto(text){
    await expect(this.page.locator('body')).toContainText(text);
  }

  async elegirFiltro(text){
    await this.page.locator('.product_sort_container').selectOption(text); // az,za,lohi,hilo
  }

  async comprobarPrimerProducto(text){
    await expect(this.page.locator('[data-test="inventory-item"]').first().locator('.inventory_item_name')).toHaveText(text, { useInnerText: true });
  }

  async agregarTodosProductos(){
    await this.page.locator('[data-test="inventory-item"]').nth(0).getByRole('button').click();
    await this.page.locator('[data-test="inventory-item"]').nth(1).getByRole('button').click();
    await this.page.locator('[data-test="inventory-item"]').nth(2).getByRole('button').click();
    await this.page.locator('[data-test="inventory-item"]').nth(3).getByRole('button').click();
    await this.page.locator('[data-test="inventory-item"]').nth(4).getByRole('button').click();
    await this.page.locator('[data-test="inventory-item"]').nth(5).getByRole('button').click();
  }

  async clickBurgerMenu(){
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async clickTexto(text){
    await this.page.getByText(text).click();
  }

  async tieneURL(url){
    await expect(this.page).toHaveURL(url);
  }

  async checkURL(name,url){
    const link = this.page.locator(name);
    await expect(link).toHaveAttribute('href', url);
  }

}

module.exports = { SauceDemo };

// Puede servir para verificar filtro                                                     inventory_item_name 
// await page.locator('[data-test="inventory-item"]').nth(1).click();
// await page.locator('[data-test="inventory-item"]').first().click();
// await this.page.locator('[data-test="inventory-item"]').first().locator()