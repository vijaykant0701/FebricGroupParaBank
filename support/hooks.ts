// features/support/hooks.ts
import { setWorldConstructor, Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { CustomWorld } from './world';

// Register the custom world
setWorldConstructor(CustomWorld);

// Type the hooks using the hook function approach
BeforeAll(async function () {
  const world = this as CustomWorld;
  world.browser = await chromium.launch({ 
    headless: false,
    timeout: 10000
  });
});

Before(async function () {
  const world = this as CustomWorld;
  world.context = await world.browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  world.page = await world.context.newPage();
});

After(async function () {
  const world = this as CustomWorld;
  await world.page.close();
  await world.context.close();
});

AfterAll(async function () {
  const world = this as CustomWorld;
  await world.browser.close();
});