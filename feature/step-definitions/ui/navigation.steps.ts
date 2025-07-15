import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { NavigationPage } from '../../../pages/navigation.page';
import { config } from '../../../support/config';

let navigationPage: NavigationPage;

Given('I am logged in as a registered user', async function () {
  navigationPage = new NavigationPage(this.page);
  // Implementation of login would be here
});

When('I click on the {string} in the global navigation', async function (menuItem: string) {
  await navigationPage.clickMenuItem(menuItem);
});

Then('I should be redirected to the {string} page', async function (expectedPage: string) {
  const currentPage = await navigationPage.getCurrentPageTitle();
  expect(currentPage).to.contain(expectedPage);
});

Then('the page title should contain {string}', async function (expectedTitle: string) {
  const title = await this.page.title();
  expect(title).to.contain(expectedTitle);
});

When('I click on the {string} quick link', async function (linkText: string) {
  await navigationPage.clickQuickLink(linkText);
});