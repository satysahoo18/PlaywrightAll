const {test,expect} = require ("@playwright/test");
let storedContext;

test("Session Storage in json", async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("satyabratasahoo981@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("satya1996");
    await page.getByRole("button",{name:"Login"}).click();
    await page.waitForLoadState("networkidle");
    //For storing  the session waiting for all the network to be idle or the page to be stable is 
    // very necessary as it will store the full session
    await context.storageState({path:"state.json"});
    storedContext =await browser.newContext({storageState:"state.json"});


});

test("Using stored Session for login",async()=>{
    const page = await storedContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
});