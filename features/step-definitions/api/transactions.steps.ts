import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AccountPage } from '../../../pages/account.page';
import { CustomWorld } from '../../../support/world';
import { ApiClient } from '../../../support/api-client';

Given('I have made payment transactions with the following details:',
  async function (this: CustomWorld, dataTable: any) {
    this.apiClient = new ApiClient(this.request);
    const accountPage = new AccountPage(this.page);

    // Create accounts and make payments
    for (const row of dataTable.hashes()) {
      if (!this.accountIds[row.accountType]) {
        await accountPage.openNewAccount(row.accountType);
        this.accountIds[row.accountType] = await accountPage.getNewAccountNumber();
      }

      await accountPage.paybill(
       
      );
    }
  }
);

When('I search for transactions by amount {string} for account type {string}',
  async function (this: CustomWorld, amount: string, accountType: string) {
    const accountId = this.accountIds[accountType];
    this.response = await this.apiClient.findTransactionsByAmount(accountId, amount);
  }
);

Then('the API should return status code {int}',
  async function (this: CustomWorld, statusCode: number) {
    expect(this.response?.status()).to.equal(statusCode);
  }
);