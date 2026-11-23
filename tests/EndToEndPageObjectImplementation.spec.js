const {test} = require ('@playwright/test');
import {expect} from '@playwright/test';
const {customTest} = require ('../testData/LoginAndProductDataFixture');
const dataset = JSON.parse(JSON.stringify(require("../testData/LoginAndProductData.json")));
// const userEmail = "satyabratasahoo981@gmail.com"
// const userPass = "satya1996"
// const product = "ZARA COAT 3"
const {PageObjectManager} = require("../PageObjects/PageObjectManager.js")

for(const data of dataset){
test(`POM end to End flow test with json data : product ${data.product}`, async({page})=>{
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = await pageObjectManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login")
    await loginPage.login(data.userEmail,data.userPass);
    
    const dashboardPage = await pageObjectManager.getDashboardPage();
    await dashboardPage.addProductToCart(data.product);
    await dashboardPage.navigateToCart();

    const cartPage = await pageObjectManager.getCheckoutPage();
    let bool = await cartPage.productVisibilityCart(data.product);
    await expect (bool).toBeTruthy;
    await cartPage.checkoutProduct();
    await cartPage.placeOrder();
    bool = await cartPage.verifySuccessfulOrderPlace()
    expect(bool).toBeTruthy();
    
   
   
    

}); 
}

customTest("POM end to End flow test with json data", async({page,testData})=>{
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = await pageObjectManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login")
    await loginPage.login(testData.userEmail,testData.userPass);
    
    const dashboardPage = await pageObjectManager.getDashboardPage();
    await dashboardPage.addProductToCart(testData.product);
    await dashboardPage.navigateToCart();

    const cartPage = await pageObjectManager.getCheckoutPage();
    let bool = await cartPage.productVisibilityCart(testData.product);
    await expect (bool).toBeTruthy;
    await cartPage.checkoutProduct();
    await cartPage.placeOrder();
    bool = await cartPage.verifySuccessfulOrderPlace()
    expect(bool).toBeTruthy();
    
   
   
    

}); 

