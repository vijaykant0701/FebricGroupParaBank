import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { LoginPage } from '../../../pages/login.page';
import { CustomWorld } from '../../../support/world';

let loginPage: LoginPage;

Given('I am on the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('I login with username {string} and password {string}', 
  async function (this: CustomWorld, username: string, password: string) {
    await loginPage.login(username, password);
  });

Then('I should be logged in', async function (this: CustomWorld) {
  expect(await loginPage.isLoggedIn()).to.be.true;
});
Then('I should not be logged in', async function (this: CustomWorld) {
    expect(await loginPage.isLoggedIn()).to.be.false;
  });