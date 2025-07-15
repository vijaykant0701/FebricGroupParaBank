import { Page, expect } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/');
  }

  async getWelcomeMessage(): Promise<string> {
    return this.page.innerText('h1.title');
  }

  async isUserLoggedIn(): Promise<boolean> {
    return this.page.isVisible('a[href="/parabank/logout.htm"]');
  }
}