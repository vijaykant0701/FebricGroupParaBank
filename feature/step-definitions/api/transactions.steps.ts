import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ApiClient } from '../../support/api-client';
import { config } from '../../../support/config';
import { AccountPage } from '../../../pages/account.page';
import { CustomWorld } from '../../../support/world';

let apiClient: ApiClient;
let accountPage: AccountPage;
let accountIds: { [key: string]: string } = {};

Given('I have made payment transactions with the following details:',
  async function (this: CustomWorld, dataTable: any) {
    apiClient = new ApiClient(this.context);
    accountPage = new AccountPage(this.page);

    // Create accounts and make payments
    for (const row of dataTable.hashes()) {
      if (!accountIds[row.accountType]) {
        await accountPage.openNewAccount(row.accountType);
        accountIds[row.accountType] = await accountPage.getNewAccountNumber();
      }

      await accountPage.payBill(
        accountIds[row.accountType],
        row.payeeName,
        row.amount,
        row.description
      );
    }
  }
);

// ... rest of your step definitions remain the same