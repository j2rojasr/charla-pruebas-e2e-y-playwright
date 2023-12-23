const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('https://www.google.com');
  testInfo.setTimeout(testInfo.timeout + 30000);
});

test.describe('Búsqueda de la página Playwright', () => {

  test('Ingresar palabra', async ({ page }) => {
    try {
      await page.fill('textarea[name="q"]', 'Playwright');
      await page.keyboard.press('Enter');
      
      await page.waitForURL('**/search?**q=Playwright**');
      await page.waitForLoadState('networkidle');

      const searchInputValue = await page.$eval('input[name="q"]', el => el.value);
      expect(searchInputValue).toContain('Playwright');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('Aparece Playwright en los resultados', async ({ page }) => {
    try {
      await page.fill('textarea[name="q"]', 'Playwright');
      await page.keyboard.press('Enter');

      await page.waitForSelector('h3');
      await page.waitForLoadState('networkidle');

      // verificar que Playwright se menciona en los resultados de búsqueda      
      const searchSnippet = await page.$eval('h3', el => el.textContent); // obtener valor de un solo elemento en la página
      expect(searchSnippet).toContain('Playwright');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('El primer enlace es el correcto', async ({ page }) => {
    try {
      await page.fill('textarea[name="q"]', 'Playwright');
      await page.keyboard.press('Enter');

      await page.waitForSelector('h3');
      await page.waitForLoadState('networkidle');

      // clic en primer link y verificar texto
      await page.click('h3:has-text("Playwright: Fast and reliable end-to-end testing")');

      await page.waitForURL('https://playwright.dev');
      await page.waitForLoadState('networkidle');

      expect(page.url()).toContain('playwright.dev');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

});
