// // @ts-check
// import { test, expect } from '@playwright/test';
// const test = require("node:test");

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

//variables inside {} are treated as global variables  
const {test,page,playwright} = require('@playwright/test');

const { expect } = require('@playwright/test');

// taggin will help to run the particular test with the @web tag
// will have to use option --grep web
test('@web Open HRM Portal', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  console.log(await page.title());
});


test('Validate Google home page tittle', async ({page}) => {
  await page.goto('https://www.google.com');
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
}); 