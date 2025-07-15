import { Page, expect } from '@playwright/test';
import { config } from '../support/config';

export class AccountPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common Navigation
  async navigateTo(section: string): Promise<void> {
    await this.page.locator(`text=${section}`).click();
    await expect(this.page.locator('h1.title')).toBeVisible();
  }

  // Account Management
  async openNewAccount(accountType: string, initialBalance?: string): Promise<string> {
    const accountConfig = accountType === 'SAVINGS' 
      ? config.testData.account.savingsAccount 
      : config.testData.account.checkingAccount;

    await this.navigateTo('Open New Account');
    await this.page.selectOption('#type', accountConfig.type);
    
    if (initialBalance) {
      await this.page.selectOption('#fromAccountId', { label: accountConfig.fromAccountId });
    }
    
    await this.page.locator('input[value="Open New Account"]').click();
    await expect(this.page.locator('#newAccountId')).toBeVisible();
    return this.getNewAccountNumber();
  }

  async getNewAccountNumber(): Promise<string> {
    return await this.page.locator('#newAccountId').textContent() || '';
  }

  // Fund Transfer
  async transferFunds(fromAccountType: string, toAccountType: string, amount?: string): Promise<void> {
    const transferConfig = config.testData.account.transfer;
    
    await this.navigateTo('Transfer Funds');
    await this.page.fill('#amount', amount || transferConfig.amount);
    
    await this.page.selectOption('#fromAccountId', { label: fromAccountType });
    await this.page.selectOption('#toAccountId', { label: toAccountType });
    
    await this.page.locator('input[value="Transfer"]').click();
    await expect(this.page.locator('h1.title')).toHaveText('Transfer Complete!');
  }

  // Balance Verification
  async getAccountBalance(accountType: string): Promise<string> {
    await this.navigateTo('Accounts Overview');
    const balanceLocator = this.page.locator(`tr:has-text("${accountType}") td:nth-child(2)`);
    await expect(balanceLocator).toBeVisible();
    return await balanceLocator.textContent() || '0.00';
  }

  // Bill Payment
  async payBill(fromAccountType: string, payeeName?: string, amount?: string, description?: string): Promise<void> {
    const billConfig = config.testData.account.billPayment;
    
    await this.navigateTo('Bill Pay');
    
    await this.page.fill('input[name="payee.name"]', payeeName || billConfig.payeeName);
    await this.page.fill('input[name="payee.address.street"]', billConfig.address);
    await this.page.fill('input[name="payee.address.city"]', billConfig.city);
    await this.page.fill('input[name="payee.address.state"]', billConfig.state);
    await this.page.fill('input[name="payee.address.zipCode"]', billConfig.zipCode);
    await this.page.fill('input[name="payee.phoneNumber"]', billConfig.phone);
    await this.page.fill('input[name="payee.accountNumber"]', billConfig.accountNumber);
    await this.page.fill('input[name="verifyAccount"]', billConfig.verifyAccount);
    await this.page.fill('input[name="amount"]', amount || billConfig.amount);
    
    if (description) {
      await this.page.fill('input[name="description"]', description);
    }
    
    await this.page.selectOption('#fromAccountId', { label: fromAccountType });
    await this.page.locator('input[value="Send Payment"]').click();
    await expect(this.page.locator('h1.title')).toHaveText('Bill Payment Complete');
  }

  // Transaction History
  async getRecentTransactions(accountNumber?: string): Promise<string[]> {
    await this.navigateTo('Account Activity');
    
    if (accountNumber) {
      await this.page.selectOption('#accountId', { label: accountNumber });
    }
    
    await this.page.locator('button:has-text("Find Transactions")').click();
    const transactions = await this.page.locator('tr.ng-scope td:nth-child(2)').allTextContents();
    return transactions.map(t => t.trim()).filter(t => t);
  }

  // Account Verification
  async accountExists(accountNumber: string): Promise<boolean> {
    await this.navigateTo('Accounts Overview');
    return await this.page.locator(`text=${accountNumber}`).isVisible();
  }

  // Login Status
  async isLoggedIn(): Promise<boolean> {
    try {
      await expect(this.page.locator('text=Log Out')).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}