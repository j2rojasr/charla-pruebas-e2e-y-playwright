const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
	await page.goto('https://www.google.com');
});

test.describe('Búsqueda de la página Playwright', () => {
	
	test('Ingresar palabra', async ({ page }) => {
		// escribir "Playwright" en campo de búsqueda
    await page.fill('textarea[name="q"]', 'Playwright');
    
    // presionar Enter
    await page.keyboard.press('Enter');

    // espera a que los resultados de la búsqueda se carguen
    await page.waitForSelector('h3');

    // buscar usando selector css
    const links = await page.$$('h3'); // obtener lista de todos los h3
    if (links.length > 0) {
      await links[0].click();
    }

		// Aumenta el tiempo de espera para la redirección
		await page.waitForURL('https://playwright.dev/', { waitUntil: 'networkidle', timeout: 20000 });

		// Verificar que se haya redireccionado correctamente
		const redirectedUrl = page.url();
		expect(redirectedUrl).toBe('https://playwright.dev/');
	});
});