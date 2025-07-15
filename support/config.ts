import fs from 'fs';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || 'https://parabank.parasoft.com/parabank';

interface TestData {
  ui: {
    registration: any;
    accounts: any;
    navigation: any;
  };
  api: {
    transactions: {
      findByAmount: {
        endpoint: string;
        method: string;
        headers: {
          'Content-Type': string;
          'Accept': string;
        };
      };
    };
  };
  account: {
    savingsAccount: {
      type: string;
      fromAccountId: string;
      initialDeposit: string;
    };
    checkingAccount: {
      type: string;
      fromAccountId: string;
      initialDeposit: string;
    };
    transfer: {
      amount: string;
      description: string;
    };
    billPayment: {
      payeeName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      phone: string;
      accountNumber: string;
      verifyAccount: string;
      amount: string;
    };
  };
  registration: {
    validRegistration: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      phone: string;
      ssn: string;
      password: string;
      confirmPassword: string;
    };
    invalidRegistration?: {  // Made optional since your JSON doesn't include it
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      phone: string;
      ssn: string;
      password: string;
      confirmPassword: string;
    };
  };
}

const loadTestData = (): TestData => {
  const dataPath = path.join(__dirname, '../test-data');
  
  return {
    ui: {
      registration: JSON.parse(fs.readFileSync(path.join(dataPath, 'ui/registration.json'), 'utf-8')),
      accounts: JSON.parse(fs.readFileSync(path.join(dataPath, 'ui/accounts.json'), 'utf-8')),
      navigation: JSON.parse(fs.readFileSync(path.join(dataPath, 'ui/navigation.json'), 'utf-8'))
    },
    api: {
      transactions: JSON.parse(fs.readFileSync(path.join(dataPath, 'api/transactions.json'), 'utf-8'))
    },
    account: JSON.parse(fs.readFileSync(path.join(dataPath, 'ui/account.json'), 'utf-8')),
    registration: JSON.parse(fs.readFileSync(path.join(dataPath, 'ui/registration.json'), 'utf-8'))
  };
};

export const config = {
  env: ENV,
  baseUrl: BASE_URL,
  testData: loadTestData()
};