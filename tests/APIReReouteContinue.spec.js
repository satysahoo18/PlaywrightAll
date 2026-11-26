const {test} = require ('@playwright/test');
import {expect} from '@playwright/test';

test("end to End flow test", async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("satyabratasahoo981@gmail.com");

    await page.locator("#userPassword").fill("satya1996");
    
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle")
    
   
    await page.locator("[routerlink='/dashboard/myorders']").click();
    // We are using the route.continue to intercept the request itself passing another 
    // query to verify if the security is getting breached or not
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({
            url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"
        })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("div .blink_me")).toHaveText("You are not authorize to view this order");


}); 