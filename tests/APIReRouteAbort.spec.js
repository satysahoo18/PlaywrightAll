const {test} = require ('@playwright/test');
import {expect} from '@playwright/test';

test("end to End flow test", async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("satyabratasahoo981@gmail.com");

    await page.locator("#userPassword").fill("satya1996");
    
    await page.locator("#login").click();

    // await page.route("**/*.{jpg,png,jpeg})",route=>route.abort());
    await page.route("https://rahulshettyacademy.com/api/ecom/uploads/*",route=>route.abort());
    
    await page.on('request', request=>console.log(request.url()));
    await page.on('response', response=>console.log(response.url(),response.status()));
    await page.pause();
    
   
    

}); 