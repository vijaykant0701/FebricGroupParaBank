import { IWorldOptions, World } from '@cucumber/cucumber';
import { APIRequestContext, Browser, BrowserContext, Page, chromium, APIResponse } from '@playwright/test';
import { ApiClient } from './api-client';
import { RegistrationPage } from '../pages/registration.page';
import { HomePage } from '../pages/home.page';
import { AccountPage } from '../pages/account.page';

export interface ICustomWorld extends World {
  context: BrowserContext;
  page: Page;
  browser: Browser;
  request: APIRequestContext;
  apiClient: ApiClient;
  response?: APIResponse;
  registrationPage: RegistrationPage;
  homePage: HomePage;
  accountIds: any;
  accountPage: AccountPage;
}

export class CustomWorld extends World implements ICustomWorld {
  context!: BrowserContext;
  page!: Page;
  browser!: Browser;
  request!: APIRequestContext;
  apiClient!: ApiClient;
  response?: APIResponse;
  registrationPage!: RegistrationPage;
  homePage!: HomePage;
  accountIds: any = {};
    timeout: number | undefined;
    accountPage!: AccountPage;

  
  constructor(options: IWorldOptions) {
    super(options);
    // Initialize with default values
    this.accountPage = null as unknown as AccountPage;
    this.homePage = null as unknown as HomePage;
    this.registrationPage = null as unknown as RegistrationPage;
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 50
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.request = this.context.request;
    this.apiClient = new ApiClient(this.request);
    this.registrationPage = new RegistrationPage(this.page);
    this.homePage = new HomePage(this.page);
    this.accountPage = new AccountPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
  }

  async close(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}