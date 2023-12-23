const { chromium } = require('playwright'); // Importa la biblioteca Playwright

(async () => {
  const browser = await chromium.launch({ headless: false }); // Inicia el navegador Chromium
  const page = await browser.newPage(); // Crea una nueva página
  
  await page.goto('https://www.google.com');

  // espera explícita
  await page.waitForSelector('textarea[name="q"]', { state: 'visible' });
  
  try {
    // escribir "Playwright" en campo de búsqueda
    await page.fill('textarea[name="q"]', 'Playwright');
    
    // presionar Enter
    await page.keyboard.press('Enter');

    // espera a que los resultados de la búsqueda se carguen
    await page.waitForSelector('h3');

    // buscar usando selector css
    const links = await page.$$('h3');
    if (links.length > 0) {
      await links[0].click();
    }
    
    await page.waitForLoadState('networkidle'); // "load", "domcontentloaded", "networkidle"
    
    // tomar captura de pantalla
    await page.screenshot({ path: 'playwright_page.png' });

  } catch (error) {
    console.error('Hubo un error al ejecutar el script:', error);
  }

  await browser.close();
})();

