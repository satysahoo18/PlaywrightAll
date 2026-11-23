// @ts-check
import { defineConfig, devices } from '@playwright/test';

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
// to use different config user option --config <config name>
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  //will retry once if the test fails 
  retries:1,
  /* workers are the tabs that will execute the cases parallely that means at a
   time thare will be only 2 workers will run the tab even if there are 5 tests */
   // if set to 1 it will work serially
   // only test files will run parallaly not the tests present in the test file


   // so if a file contains 3 tests will run sequentiall even if thw workers are altered.
  workers:2,
/* running tests in parallel can cause race condition when using same credentials or same environment
 so to aviod race conditions use
  1. test.skip to skip similar tests
  2. Add retries 

*/ 
// test.only will affter the running of the tests as it will only activate the tests that have test.only

  expect: {
    timeout: 10000
  },
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  //allure Reporting 
  //npm i -D @playwright/test allure-playwright to install allure dependencies
  //npx playwright test --grep "@web" --reporter=line,allure-playwright to use allure to convert line reports to allure reports
  //npx allure generate ./allure-results --clean , clean and newly generate report from allure-results folder
  // npx allure open ./allure-report to open the report from ./allure-results


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  // add option "--project=firefox"or "--project=chrome"
  // if not provided the option then the test will run with all the project in projects
  projects:[
    {
        name:'chrome',
        use:{
            trace: 'on',
            screenshot: 'on',
            browserName: 'chromium',
            headless : false,
            //can choose any device
            ...devices["Pixel 10"],
            //for recording vedio
            video:'retain-on-failure'
        }
    },
    {
        name:'firefox',
        use:{
            trace: 'on',
            screenshot: 'on',
            browserName: 'firefox',
            headless : false,
            // controls the display of the window screen.
            viewport : {width:1080,height:720},
            // bypass the ssl certificates 
            ignoreHttpsErrors : true,
            //allows the geolocation permissions
            permissions:["geolocation"]

            
        }
    }
  ]
//   use: {
//     /* Base URL to use in actions like `await page.goto('')`. */
//     // baseURL: 'http://localhost:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     // trace: 'on-first-retry',
//     trace: 'on',
//     // Trace only on failure is good way to conserve memory and maintain the system stability.
//     // trace: 'retain-on-failure', //on,off,on-first-retry
//     // screenshot: 'only-on-failure',  //on , off
//     screenshot: 'on',
//     actionTimeout: 10000, // timeout for actions like click, type
//     navigationTimeout: 10000, // timeout for navigation to load page
//     browserName: 'chromium',
//     headless: false
//   },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


