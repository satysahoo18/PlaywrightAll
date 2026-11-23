
import {test,expect,Page,Locator} from '@playwright/test';
import {customTest} from '../testData/LoginAndProductDataFixtureTS';
const dataset = JSON.parse(JSON.stringify(require("../testData/LoginAndProductData.json")));
// const userEmail = "satyabratasahoo981@gmail.com"
// const userPass = "satya1996"
// const product = "ZARA COAT 3"
import {PageObjectManager} from "../PageObjectsTS/PageObjectManager.ts"


for(const data of dataset){
    

test(`POM end to End flow test with json data : product ${data.product}`, async({page})=>{
    
    
    const pageObjectManager:any = new PageObjectManager(page);
    const loginPage:any = await pageObjectManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login")
    await loginPage.login(data.userEmail,data.userPass);
    
    const dashboardPage: any = await pageObjectManager.getDashboardPage();
    await dashboardPage.addProductToCart(data.product);
    await dashboardPage.navigateToCart();

    const cartPage: any = await pageObjectManager.getCheckoutPage();
    let bool: boolean = await cartPage.productVisibilityCart(data.product);
    await expect (bool).toBeTruthy;
    await cartPage.checkoutProduct();
    await cartPage.placeOrder();
    bool = await cartPage.verifySuccessfulOrderPlace()
    expect(bool).toBeTruthy();
    
   
   
    

}); 
}

customTest("POM end to End flow test with json data", async({page,testData})=>{
    const pageObjectManager = new PageObjectManager(page);
    const loginPage :any = await pageObjectManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login")
    await loginPage.login(testData.userEmail,testData.userPass);
    
    const dashboardPage : any= await pageObjectManager.getDashboardPage();
    await dashboardPage.addProductToCart(testData.product);
    await dashboardPage.navigateToCart();

    const cartPage :any = await pageObjectManager.getCheckoutPage();
    let bool:boolean = await cartPage.productVisibilityCart(testData.product);
     expect (bool).toBeTruthy;
    await cartPage.checkoutProduct();
    await cartPage.placeOrder();
    bool = await cartPage.verifySuccessfulOrderPlace()
    expect(bool).toBeTruthy();
    
   
   
    

}); 

