const { expect } = require('@playwright/test');

// models/TodoPage.js
class Arteza {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://applitools.arteza.es', { waitUntil: 'networkidle' });
  }
}
module.exports = { Arteza };
