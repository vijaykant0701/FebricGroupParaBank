import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { RegistrationPage } from '../../../pages/registration.page';
import { HomePage } from '../../../pages/home.page';
import { config } from '../../../support/config';
import { generateRandomUsername } from '../../../support/helpers';
let registrationPage: RegistrationPage;
let homePage: HomePage;
let username: string;

Given('I navigate to ParaBank registration page', async function () {
  registrationPage = new RegistrationPage(this.page);
  await registrationPage.navigate();
});

When('I fill in registration form with random unique details', async function () {
  username = generateRandomUsername();
  await registrationPage.fillRegistrationForm({
    ...config.testData.registration.validRegistration,
    username
  });
});

When('I fill in registration form with following details:', 
  async function (dataTable: DataTable) {
    const userData = dataTable.rowsHash();
    username = userData.username || generateRandomUsername();
    
    await registrationPage.fillRegistrationForm({
      ...config.testData.registration.validRegistration,
      ...userData,
      username,
      confirmPassword: userData.confirmPassword || userData.password
    });
});

// ... (keep other existing steps)