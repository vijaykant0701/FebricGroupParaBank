import { Page, expect } from '@playwright/test';

export class NavigationPage {
  private readonly page: Page;

  // Mapping of menu items to their selectors
  private readonly menuItems = {
    'Open New Account': 'text=Open New Account',
    'Accounts Overview': 'text=Accounts Overview',
    'Transfer Funds': 'text=Transfer Funds',
    'Bill Pay': 'text=Bill Pay',
    'Find Transactions': 'text=Find Transactions',
    'Update Contact': 'text=Update Contact Info',
    'Request Loan': 'text=Request Loan',
    'Log Out': 'text=Log Out'
  };

  // Mapping of quick links to their selectors
  private readonly quickLinks = {
    'ATM Services': 'text=ATM Services',
    'Withdraw Funds': 'text=Withdraw Funds',
    'Transfer Funds': 'text=Transfer Funds',
    'Check Balances': 'text=Check Balances',
    'Make Deposits': 'text=Make Deposits',
    'Pay Bills': 'text=Pay Bills'
  };

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks on a menu item in the global navigation
   * @param menuItem The text of the menu item to click
   */
  async clickMenuItem(menuItem: string): Promise<void> {
    const selector = this.menuItems[menuItem as keyof typeof this.menuItems];
    if (!selector) {
      throw new Error(`Menu item '${menuItem}' not found in the mapping`);
    }
    await this.page.click(selector);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clicks on a quick link in the sidebar
   * @param linkText The text of the quick link to click
   */
  async clickQuickLink(linkText: string): Promise<void> {
    const selector = this.quickLinks[linkText as keyof typeof this.quickLinks];
    if (!selector) {
      throw new Error(`Quick link '${linkText}' not found in the mapping`);
    }
    await this.page.click(selector);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Gets the current page title (h1 heading)
   */
  async getCurrentPageTitle(): Promise<string> {
    await this.page.waitForSelector('h1.title');
    return await this.page.innerText('h1.title');
  }

  /**
   * Verifies the user is logged in by checking for logout link
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.page.isVisible('text=Log Out');
  }

  /**
   * Navigates to the home page
   */
  async navigateToHome(): Promise<void> {
    await this.page.goto('https://parabank.parasoft.com/');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Performs login (to be called from Given step)
   * @param username 
   * @param password 
   */
  async login(username: string, password: string): Promise<void> {
    await this.navigateToHome();
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('input[value="Log In"]');
    await expect(this.page.locator('h1.title')).toHaveText('Accounts Overview');
  }
}