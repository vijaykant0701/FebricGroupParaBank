import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AccountPage } from '../../../pages/account.page';
import { config } from '../../../support/config';
import { LoginPage } from '../../../pages/login.page';
import { CustomWorld } from '../../../support/world';

let accountPage: AccountPage;
//const accountBalances: Record<string, number> = {};

// // Given('I have the following accounts:', async function (dataTable: DataTable) {
// //   accountPage = new AccountPage(this.page);
  
// //   for (const row of dataTable.hashes()) {
// //     const accountNumber = await accountPage.openNewAccount(
// //       row.accountType || config.testData.account.savingsAccount.type,
// //       row.initialBalance || config.testData.account.savingsAccount.initialDeposit
// //     );
// //     accountBalances[row.accountType] = parseFloat(row.initialBalance || 
// //       config.testData.account.savingsAccount.initialDeposit);
// //   }
// // });

// When('I transfer {string} from {string} to {string}', 
//   async function (amount: string, fromType: string, toType: string) {
//     await accountPage.transferFunds(fromType, toType, amount);
    
//     const amountNum = parseFloat(amount || config.testData.account.transfer.amount);
//     accountBalances[fromType] -= amountNum;
//     accountBalances[toType] += amountNum;
//   });

// When('I pay bill with following details:', 
//   async function (dataTable: DataTable) {
//     const details = dataTable.hashes()[0];
//     await accountPage.payBill(
//       details.fromAccountType,
//       details.payeeName || config.testData.account.billPayment.payeeName,
//       details.amount || config.testData.account.billPayment.amount,
//       details.description
//     );
    
//     const amountNum = parseFloat(details.amount || config.testData.account.billPayment.amount);
//     accountBalances[details.fromAccountType] -= amountNum;
//   });
//   Then('the {string} balance should be {string}', 
//     async function (accountType: string, expectedBalance: string) {
//       const actualBalance = await accountPage.getAccountBalance(accountType);
//       expect(parseFloat(actualBalance)).to.equal(parseFloat(expectedBalance));
//     });
  
//   Given('I am logged in as user {string} with password {string}',
//     async function (this: CustomWorld, username: string, password: string) {
//       const loginPage = new LoginPage(this.page);
//       await loginPage.navigate();
//       await loginPage.login(username, password);
//       expect(await loginPage.isLoggedIn()).to.be.true;
//     });
