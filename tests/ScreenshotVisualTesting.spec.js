const {test,expect} = require("@playwright/test")
// To run the tests with the file parallelaly
// test.describe.configure({mode:"parallel"})

// if the tests are interdependent then we can use serial
test.describe.configure({mode:"serial"})
test("Screenshot Capture",async({page})=>{
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     await page.locator("#displayed-text").screenshot({path:"./Screenshots/displaytext.png"});
     await page.screenshot({path:"./Screenshots/beforehide.png"})
     await page.locator("#hide-textbox").click();
     await page.screenshot({path:"./Screenshots/afterhide.png"})

});

test("Visual testing",async({page})=>{
     // await page.goto("https://www.flipkart.com/");
     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
     expect(await page.screenshot()).toMatchSnapshot("./landing.png");
})