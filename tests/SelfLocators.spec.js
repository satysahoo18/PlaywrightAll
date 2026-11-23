const {test,expect} = require ("@playwright/test");


test('Playwright Special Locators, expect, action and test Wait timeout',async ({browser})=>{
    //Apart from global timeout for test we do also have test level timeout
    //Timeout priority Step Level>>Test Level >> Global level
    test.setTimeout(50000)
    // Timeout for actions and navigation on test level
    page.setDefaultTimeout(20000)
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    //getByLable - must have lable tag
    await page.getByLabel("Check me out if you Love IceCreams!").click({timeout:12000}); //action timeout step level
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //Get By PlaceHolder
    await page.getByPlaceholder("Password").fill("Satya1996");
    //get by Role : button
    await page.getByRole("button",{name:"Submit"}).click();
    //get by Text
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    
    
    
    //get by Role : Link
    await page.getByRole("link",{name:"Shop"}).click();
    //5 Seconds default timeout for the expect,but can be set at Step level
    await expect(page.locator(".col-lg-3.col-md-6.mb-3").filter({hasText:"Nokia Edge"}).getByRole("Button")).toBeVisible({ timeout: 10000 });
    //Also can be Set at the Test level
    const slowExpect = expect.configure({timeout:8000}); 
    await slowExpect(page.locator(".col-lg-3.col-md-6.mb-3").filter({hasText:"Nokia Edge"}).getByRole("Button")).toBeVisible();
    await page.locator(".col-lg-3.col-md-6.mb-3").filter({hasText:"Nokia Edge"}).getByRole("Button").click();
    await page.pause();


});