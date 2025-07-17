import { Page, expect } from '@playwright/test';

export class HomePage {
  static getWelcomeMessage() {
    throw new Error('Method not implemented.');
  }
  static isLoggedIn(): any {
    throw new Error('Method not implemented.');
  }
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://parabank.parasoft.com/');
  }

  async getWelcomeMessage(): Promise<string> {
    await this.page.waitForSelector('h1.title', { state: 'visible', timeout: 5000 });
    console.log(this.page.innerText('h1.title'));
    return await this.page.innerText('h1.title');
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForSelector('a[href="logout.htm"]', { 
        state: 'visible', 
        timeout: 3000 
      });
      return true;
    } catch {
      return false;
    }
  }

  async verifySuccessfulRegistration(): Promise<void> {
    await expect(this.page.locator('#rightPanel p'))
      .toContainText('Your account was created successfully');
  }

  async logout(): Promise<void> {
    if (await this.isLoggedIn()) {
      await this.page.click('a[href="/parabank/logout.htm"]');
      await expect(this.page.locator('text=Customer Login')).toBeVisible();
    }
  }
}