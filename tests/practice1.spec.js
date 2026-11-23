const {test} = require('@playwright/test');
const { expect } = require('@playwright/test');

// taggin will help to run the particular test with the @web tag
// will have to use option --grep web
test('@web Orange HRM Invalid Credentials', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Playwright suggest to use css. but it also supports xpath but do not recommends it

  const errorMessage = page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text")
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator("input[name='username']").type('A');
  await page.locator("input[name='username']").fill('');
  // to get the value of the input field, we can use inputValue() method, which will return 
  // the value of the input field.
  
  
  // textContent() method will return the text content of the element, 
  // which is not the value of the input field,
  //  so we need to use inputValue() method to get the value of the input field.
  console.log("text:" +await page.locator("input[name='username']").inputValue());
  await page.locator("input[name='username']").fill('Admin');
  console.log("text:" +await page.locator("input[name='username']").inputValue());
  await page.locator("input[name='password']").fill('admin');
  
  await page.locator("button[type='submit']").click();
  console.log("Error Message : " + await errorMessage.textContent());
  await expect(errorMessage).toContainText('Invalid credentials');
});

test('Orange HRM Valid Credentials', async ({page}) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator("input[name='username']").fill('Admin');

  await page.locator("input[name='password']").fill('admin123');
  await page.locator("button[type='submit']").click();
  
//   await page.waitForLoadState('networkidle'); // Loads until there are no network connections for at least 500 ms.
//   console.log(await page.locator('.oxd-main-menu-item-wrapper').first().textContent());
//   console.log(await page.locator('.oxd-main-menu-item-wrapper').nth(1).textContent());
//   console.log(await page.locator('.oxd-main-menu-item-wrapper').last().textContent());


//   await page.waitForLoadState('networkidle'); // Loads until there are no network connections for at least 500 ms.

// Alternative to above method is to use waitFor() method on the locator, 
// which will wait for the element to be visible before performing any action on it. 
// This is a better approach than using waitForLoadState() method, as it will wait for 
// the specific element to be visible, rather than waiting for the entire page to load,
// but need to select a single element to use this method, otherwise it will throw an error.
//  So, we can use the first() method to select the first element of the locator and then use waitFor() method on it.
  await page.locator('.oxd-main-menu-item-wrapper').first().waitFor(); 
  console.log(await page.locator('.oxd-main-menu-item-wrapper').allTextContents()); // Need to wait for the page to load before using this method, otherwise it will return an empty array.
});