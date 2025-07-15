import fs from 'fs';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || 'https://parabank.parasoft.com/parabank';

interface TestData {
  ui: {
    registration: any;
    accounts: any;
    
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

const loadJsonFile = (filePath: string): any => {
    const fullPath = path.join(__dirname, '../test-data', filePath);
    console.log(`Loading test data from: ${fullPath}`);
  
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`);
      console.error(`Please create this file with valid JSON content`);
      process.exit(1);
    }
  
    const content = fs.readFileSync(fullPath, 'utf-8').trim();
    if (!content) {
      console.error(`❌ File is empty: ${fullPath}`);
      process.exit(1);
    }
  
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error(`❌ Invalid JSON in file: ${fullPath}`);
      console.error(`Error details:`, error);
      process.exit(1);
    }
  };
  
  const loadTestData = (): TestData => {
    return {
      ui: {
        registration: loadJsonFile('ui/registration.json'),
        accounts: loadJsonFile('ui/accounts.json'),
        
      },
      api: {
        transactions: loadJsonFile('api/transactions.json')
      },
      account: loadJsonFile('account.json'),
      registration: loadJsonFile('registration.json')
    };
  };

export const config = {
  env: ENV,
  baseUrl: BASE_URL,
  testData: loadTestData()
};