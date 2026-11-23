const {Given,When,Then}  = require ("@cucumber/cucumber")
const {expect,page,locator} = require ("@playwright/test")


Given('the user is on login page and logs in using {string} and {string}', {timeout:10*1000},
  async function (userName, password) {
  
     const loginPage = await this.pageObjectManager.getLoginPage();
     await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login")
     await loginPage.login(userName,password)

});

When('user lands on dashboard page and add {string} to the cart',async function (product) {
    this.dashboardPage = await this.pageObjectManager.getDashboardPage();
    await this.dashboardPage.addProductToCart(product);
    
});

Then('Verify if the {string} is added to the cart', async function (product) {
    this.cartPage = await this.pageObjectManager.getCheckoutPage();
    let bool = await this.cartPage.productVisibilityCart(product);
    expect (bool).toBeTruthy();
    await this.dashboardPage.navigateToCart();
});

Then('user selects country {string} and  Place the order', async function (country) {
    console.log(country)
    await this.cartPage.checkoutProduct();
    await this.cartPage.placeOrder();
});

Then('verify the order present in the order page', async function () {
   bool = await this.cartPage.verifySuccessfulOrderPlace()
   expect(bool).toBeTruthy();
   
});


//Step Validation
Given('user enters wrong username {string} password and {string},',{timeout:20000},
     async function (userName, password) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.page.locator("input[name='username']").fill('userName');
    await this.page.locator("input[name='password']").fill('password');
    await this.page.locator("button[type='submit']").click();
  
});

Then('user verify the error message {string}', async function (errorMessage) {

    await expect(this.page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text"))
    .toContainText(errorMessage);
});