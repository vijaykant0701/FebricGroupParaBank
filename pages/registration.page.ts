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

  async submitForm(): Promise<void> {
    await this.page.click('input[value="Register"]');
    await this.page.waitForNavigation();
  }
}