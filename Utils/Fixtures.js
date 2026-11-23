const base = require("@playwright/test");
const {request}=require("@playwright/test");

const {APIUtils} = require("./APIUtils");

const loginBody = {userEmail: "satyabratasahoo981@gmail.com", userPassword: "satya1996"};
const orderData = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
exports.customTest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            const context =await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            await page.locator("#userEmail").fill("satyabratasahoo981@gmail.com");
            await page.locator("#userPassword").fill("satya1996");
            await page.locator("#login").click();
            await page.waitForLoadState("networkidle");
            // The code written before use will be executed for tests 
            use(page);
            //code witten after the use will be executed after the test 
            
        },

        createOrder: async ({ }, use) => {
            const requestContext = await request.newContext();
            const apiUtils = new APIUtils(requestContext,loginBody);
            const orderID = await apiUtils.createOrder(orderData);
            use(orderID);
            await requestContext.dispose();
        },

        //Fixtures can also be used to declare the data 
        testData : {
            product : "Adidas Original"
        }
    }
)