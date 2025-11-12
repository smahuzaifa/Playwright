// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';
import { off } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 50000, /* Overall test timeout setting, which specifies the maximum time allowed for the 
  entire test to complete, including all actions, fixtures, and hooks. If the test exceeds this timeout 
  (30 seconds here), Playwright aborts the test with a timeout error.*/
  expect: {
    timeout: 5000, /*This is the timeout specifically for assertions made with the expect API. It sets
     the maximum time Playwright will wait for a particular expectation (e.g., an element becoming visible)
      to be met. By default, the expect timeout is 5 seconds, and if the assertion condition is not met
       within this time, it will fail.*/
  },
  use:{
    browserName : 'firefox',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});

