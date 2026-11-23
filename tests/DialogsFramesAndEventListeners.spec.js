import {test,expect} from '@playwright/test';
test("HiddenElements, Dialogs, Frames and EventListeners",async ({page})=>{
    await page.goto("https://google.com");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goBack();
    
    await page.goForward();
    
    
    await page.locator("#hide-textbox").click();
    // Assertion for hidden elements
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();
    

    // Accept or dismiss java based alert(in selenium) or dialog(in playwright)
    // page.once is used for trigerring listener for once so it will listen to a single event and then stop
    page.once("dialog",async dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();

    // page.on is used for trigerring litener for every time so it will listen every time.
    // So if we are using page.on we can not use page.on again as it will give error
    // on- permanent listener once- one time listener
    page.on("dialog",async dialog=>dialog.dismiss());
    await page.locator("#confirmbtn").click();
    
    //Hover on the element
    page.locator("#mousehover").hover();


    const frameLocator = page.frameLocator("#courses-iframe");
    await frameLocator.locator("li a[href='lifetime-access']:visible").click();
    const text = await frameLocator.locator("div[class=text] h2").textContent();
    console.log(text.split(" ")[1]);
    


});