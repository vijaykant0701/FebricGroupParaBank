import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Any global setup (e.g., authentication)
  await page.goto('https://parabank.parasoft.com/');
  
  await browser.close();
}

export default globalSetup;