const {customTest} = require("../Utils/Fixtures")
const {expect} = require("@playwright/test")
customTest("Fixtures Demo",async({authenticatedPage,createOrder,testData})=>{
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await authenticatedPage.locator("button[routerlink='/dashboard/myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    console.log(createOrder);
    await expect(authenticatedPage.getByText(createOrder)).toBeVisible();
    console.log(testData.product);
    await authenticatedPage.pause();

})