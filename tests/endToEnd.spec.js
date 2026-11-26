const {test} = require ('@playwright/test');
import {expect} from '@playwright/test';

test("end to End flow test", async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("satyabratasahoo981@gmail.com");

    await page.locator("#userPassword").fill("satya1996");
    
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle");
    const product = page.locator(".card");
    await product.first().waitFor();
    

    const listOfProducts = await product.allTextContents();
    console.log(listOfProducts);
    const productCount = await product.count();
    for(let i=0;i<productCount;i++){
        const requiredProduct = await product.nth(i).locator("b").textContent();

        if(requiredProduct === "ZARA COAT 3"){
            await product.nth(i).locator("text=Add To Cart").click();
            break;
        }   
    }
    await page.locator("li button").nth(2).click();
    await page.locator("div li").first().waitFor();
    const bool  = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    
    await page.locator("text=Checkout").click();
    await page.locator("input[placeholder='Select Country']").waitFor();
    await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
    const list = page.locator(".ta-results.list-group.ng-star-inserted");
    await list.waitFor();
    const listCount = await list.locator("button").count();
    for(let i = 0;i<listCount;i++){

        const listName = await list.locator("button").nth(i).textContent();
        console.log(listName);
        if(listName.trim() === "India"){
            await list.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator("//div/label")).toHaveText("satyabratasahoo981@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator("text=THANKYOU FOR THE ORDER.")).toBeVisible();
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const actualOrderID = orderID.split(" ")[2];
    console.log(actualOrderID);
    await page.locator("label[routerlink='/dashboard/myorders']").click();
 

    const orderList = page.locator("table tbody tr");
    await orderList.first().waitFor();
    const orderListCount = await orderList.count();
    console.log("orderlistcount:" + orderListCount);

    for(let i=0;i<orderListCount;i++){
        const expOrderID = await orderList.nth(i).locator("th").textContent();
        console.log("Expected Order ID : " + expOrderID);
        if(orderID.includes(expOrderID)){
            await orderList.locator("button").first().click();
            break;
        }
    }
    const exOrderID = await page.locator(".col-md-6 .col-text.-main").textContent();
    console.log("exOrderId : " + exOrderID);
    await expect(page.locator(".col-md-6 .col-text.-main")).toHaveText(actualOrderID);

}); 