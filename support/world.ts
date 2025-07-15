import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

export interface ICustomWorld extends World {
  context: BrowserContext;
  page: Page;
  browser: Browser;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  context!: BrowserContext;
  page!: Page;
  browser!: Browser;
}