import { Page, expect } from '@playwright/test';
import { config } from '../support/config';

export class AccountPage {
  private readonly page: Page;
  private readonly defaultTimeout = 15000;

  constructor(page: Page) {
    this.page = page;
  }

  // Common Navigation with enhanced waiting
  async navigateTo(section: string): Promise<void> {
    try {
      await this.page.locator(`text=${section}`).click();
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
      await expect(this.page.locator('h1.title')).toBeVisible({ timeout: this.defaultTimeout });
    } catch (error) {
      const screenshot = await this.page.screenshot();
      throw new Error(`Navigation to ${section} failed: ${error}\nScreenshot saved`);
    }
  }

  // Robust account creation with proper timeout handling
  async openNewAccount(accountType: string, initialBalance?: string): Promise<string> {
    try {
      const accountConfig = accountType === 'SAVINGS' 
        ? config.testData.account.savingsAccount 
        : config.testData.account.checkingAccount;

     //await this.navigateTo('Open New Account');
      await this.page.locator('text=Open New Account').click();

      // Wait for form elements to be ready
      await this.page.waitForSelector('#type', { state: 'visible', timeout: this.defaultTimeout });
      await this.page.selectOption('#type', accountConfig.type);

      if (initialBalance) {
        await this.page.waitForSelector('#fromAccountId', { state: 'visible', timeout: this.defaultTimeout });
        await this.page.selectOption('#fromAccountId', { label: accountConfig.fromAccountId });
      }

      // Submit with navigation wait
      const [response] = await Promise.all([
        this.page.waitForNavigation({ 
          url: '**/openaccount.htm', 
          timeout: 20000,
          waitUntil: 'networkidle'
        }),
        this.page.locator('input[value="Open New Account"]').click()
      ]);

      // Verify success
      await this.page.waitForSelector('#newAccountId', { 
        state: 'visible', 
        timeout: this.defaultTimeout 
      });
      
      return await this.getNewAccountNumber();
    } catch (error) {
      const screenshot = await this.page.screenshot();
      throw new Error(`Account creation failed: ${error}\nScreenshot saved`);
    }
  }
  async paybill(): Promise<string> {
    return (await this.page.locator('#newAccountId').textContent())?.trim() || '';
  }
  async getNewAccountNumber(): Promise<string> {
    return (await this.page.locator('#newAccountId').textContent())?.trim() || '';
  }
}