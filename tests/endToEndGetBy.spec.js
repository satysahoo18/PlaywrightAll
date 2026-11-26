const {test,expect} = require("@playwright/test");

test("End to End using Get By Locators",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("satyabratasahoo981@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("satya1996");
   
    await page.getByRole("button",{name:"Login"}).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body").filter({hasText:"Zara Coat 3"})
    .getByRole("button",{name:"Add To Cart"}).click();
    //The below line will first find out all the list items in the page and verify
    //  if the cart button is present in the listitem 
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("Zara Coat 3")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").waitFor();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();

    //below line used is displayed as button but it is anchor so used getByText
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    

})