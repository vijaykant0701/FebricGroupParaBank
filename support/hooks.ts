import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, chromium, Page } from 'playwright';
import { config } from '../support/config';

let browser: Browser;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: config.env === 'production', // headless in prod, visible in dev
    slowMo: 50
  });
});

Before(async function () {
  page = await browser.newPage();
  this.page = page; // Make page available to all step definitions
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await page.screenshot({
      path: `./test-results/screenshots/${pickle.name.replace(/\s/g, '_')}.png`,
    });
    this.attach(screenshot, 'image/png');
  }
  await page.close();
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});