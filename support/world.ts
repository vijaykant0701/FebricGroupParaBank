import { IWorldOptions, World } from '@cucumber/cucumber';
import { APIRequestContext, Browser, BrowserContext, Page, APIResponse } from '@playwright/test';
import { ApiClient } from './ api-client';

export interface ICustomWorld extends World {
  context: BrowserContext;
  page: Page;
  browser: Browser;
  request: APIRequestContext;
  apiClient: ApiClient;  // Add this
  response?: APIResponse; 
}

export class CustomWorld extends World implements ICustomWorld {
  accountIds: any;
  constructor(options: IWorldOptions) {
    super(options);
  }
  context!: BrowserContext;
  page!: Page;
  browser!: Browser;
  request!: APIRequestContext;
  apiClient!: ApiClient;
  response?: APIResponse;
}