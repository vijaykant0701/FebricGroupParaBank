import { Page, expect } from '@playwright/test';
import { config } from '../support/config';
import { generateRandomUsername } from '../support/helpers';

export class RegistrationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${config.baseUrl}/register.htm`);
    
  }

  async fillRegistrationForm(userDetails?: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
    ssn?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }): Promise<void> {
    const defaultData = config.testData.registration.validRegistration;
    const username = userDetails?.username || generateRandomUsername();
    const password = userDetails?.password || defaultData.password;

    // Personal Information
    await this.page.fill('input[name="customer.firstName"]', userDetails?.firstName || defaultData.firstName);
    await this.page.fill('input[name="customer.lastName"]', userDetails?.lastName || defaultData.lastName);
    await this.page.fill('input[name="customer.address.street"]', userDetails?.address || defaultData.address);
    await this.page.fill('input[name="customer.address.city"]', userDetails?.city || defaultData.city);
    await this.page.fill('input[name="customer.address.state"]', userDetails?.state || defaultData.state);
    await this.page.fill('input[name="customer.address.zipCode"]', userDetails?.zipCode || defaultData.zipCode);
    await this.page.fill('input[name="customer.phoneNumber"]', userDetails?.phone || defaultData.phone);
    await this.page.fill('input[name="customer.ssn"]', userDetails?.ssn || defaultData.ssn);

    // Account Information
    await this.page.fill('input[name="customer.username"]', username);
    await this.page.fill('input[name="customer.password"]', password);
    await this.page.fill('input[name="repeatedPassword"]', userDetails?.confirmPassword || password);
  }

  // registration.page.ts
async submitForm(): Promise<void> {
    const submitButton = this.page.locator('input[value="Register"]');
    
    // Wait for button to be visible and enabled
    await submitButton.waitFor({ state: 'visible', timeout: 10000 });
    submitButton.click()
   // await submitButton.waitFor({ state: 'enabled', timeout: 10000 });
    
    // Click and wait for navigation
    // await Promise.all([
    //   this.page.waitForNavigation({ 
    //     url: '**/overview.htm', 
    //     timeout: 15000 
    //   }),
    //   submitButton.click()
    // ]);
    
    
    // Verify successful registration
//     await this.page.waitForSelector('#rightPanel p', { 
//       state: 'visible', 
//       timeout: 10000 
//     });
//     const successText = await this.page.innerText('#rightPanel p');
//     if (!successText.includes('Your account was created successfully')) {
//       throw new Error('Registration failed: ' + successText);
//     }
  }
}