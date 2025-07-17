import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../../../support/world';
import { RegistrationPage } from '../../../pages/registration.page';
import { HomePage } from '../../../pages/home.page';
import { AccountPage } from '../../../pages/account.page';
import { config } from '../../../support/config';

declare module '@cucumber/cucumber' {
  interface World {
    registrationPage: RegistrationPage;
    homePage: HomePage;
    accountPage: AccountPage;
  }
}

const accountBalances: Record<string, number> = {};

Given('I navigate to ParaBank registration page', async function (this: CustomWorld) {
  this.registrationPage = new RegistrationPage(this.page);
  await this.registrationPage.navigate();
});

// When('I fill in registration form with random details', 
//   async function (this: CustomWorld) {
//     await this.registrationPage.fillRegistrationForm();
//   });

// For specific data
When('I fill in registration form with random details', 
  async function (this: CustomWorld) {
    await this.registrationPage.fillRegistrationForm();
  });

// For specific data
When('I fill in registration form with these details:',
  async function (this: CustomWorld, dataTable: DataTable) {
    const userData = dataTable.hashes()[0];
    await this.registrationPage.fillRegistrationForm({
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      phone: userData.phone,
      ssn: userData.ssn,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    });
  });

  
  

Then('I should be logged in with same user', async function (this: CustomWorld) {
  await this.page.waitForSelector('#leftPanel', { timeout: 50000 });
  //expect(await this.homePage.isLoggedIn()).to.be.true;
});



When('I submit the registration form', async function (this: CustomWorld) {
  try {
    await this.registrationPage.submitForm();
    // await this.page.locator('text=Open New Account').click();
    //   await this.page.selectOption('#type', { label: 'SAVINGS' });
      //await this.page.selectOption('#fromAccountId', { label: 'SAVINGS' });
      // Press Enter on the whole page

    //this.homePage = new HomePage(this.page);
    
  } catch (error) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
    throw new Error(`Form submission failed: ${error}`);
  }
});


Then('I have the following accounts:', 
  async function () {
    // Verify initialization
    if (!this.accountPage) {
      const screenshot = await this.page.screenshot();
      this.attach(screenshot, 'image/png');
      throw new Error('accountPage not initialized - check Before hook');
    }

   
      // Click Open New Account
      await this.page.locator('text=Open New Account').click();

      // Select account type
      await this.page.selectOption('#type', { label: 'SAVINGS' });
      
      // Wait briefly for UI to update (consider replacing with specific condition)
      await this.page.waitForTimeout(1000);

      // Submit form
      await this.page.locator('input[value="Open New Account"]').click({ force: true });

      // Verify account creation
      await this.page.waitForSelector('text=Your new account number:', { 
        state: 'visible', 
        timeout: 10000 
      });

      // Get new account number
      const accountNumberElement = this.page.locator('[id="newAccountId"]');
      const accountNumber = await accountNumberElement.textContent();
      
      if (!accountNumber) {
        throw new Error('Account creation failed - no account number generated');
      }

      // Click on the new account
      await accountNumberElement.click();
      
      // Verify account details page
      await this.page.waitForSelector('text=Account Details', { 
        state: 'visible', 
        timeout: 10000 
      });

    } 
  
);
