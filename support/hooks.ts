import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, chromium } from 'playwright';
import { CustomWorld } from './world';
import { config } from './config';
import { ApiClient } from './api-client';

// Global variables to hold browser instance
let browser: Browser;
BeforeAll(async function () {
  browser = await chromium.launch({
    headless: config.env === 'production',
    slowMo: 50
  });
});

Before(async function (this: CustomWorld) {
  // Cast 'this' to CustomWorld and initialize

  await this.init();
  const world = this as unknown as CustomWorld;
  world.context = await browser.newContext();
  world.page = await world.context.newPage();
  world.request = world.context.request;
  world.apiClient = new ApiClient(world.request);
  //world.timeout = 30000; // Set global timeout to 30 seconds
  
});

After(async function (this: CustomWorld, { pickle, result }) {
  const world = this as unknown as CustomWorld;
  
  if (result?.status === Status.FAILED) {
    const screenshot = await world.page.screenshot({
      path: `./test-results/screenshots/${pickle.name.replace(/\s/g, '_')}.png`,
    });
    this.attach(screenshot, 'image/png');
  }

  //await world.context?.close();
});

AfterAll(async function () {
 // await browser?.close();
});