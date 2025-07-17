import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  // Base configuration
  testDir: './tests', // Your regular Playwright tests
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  reporter: [
    ['list'], // Simple console reporter
    ['html'], // HTML report
    ['json', { outputFile: 'test-results.json' }], // JSON report
    ['junit', { outputFile: 'results.xml' }] // JUnit report for CI
  ],
  
  // Cucumber-specific configuration
  projects: [
    {
      name: 'cucumber',
      testDir: './features', // Where your .feature files are
      testMatch: '**/*.features', // Note the 's' at the end
      use: {
        // Playwright browser context configuration
        headless: false,
        viewport: { width: 1280, height: 720 },
      },
    }
  ],

  // Shared configuration for all projects
  use: {
    baseURL: 'https://parabank.parasoft.com/',
    trace: 'on-first-retry',
  },

  // Cucumber-specific setup
  globalSetup: require.resolve('./features/support/global-setup.ts'),
  globalTeardown: require.resolve('./features/support/global-teardown.ts'),
});