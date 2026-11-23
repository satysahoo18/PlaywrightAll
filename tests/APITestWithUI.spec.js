const {test,request} = require ("@playwright/test");
const {APIUtils}= require ("../Utils/APIUtils");
const loginBody = {userEmail: "satyabratasahoo981@gmail.com", userPassword: "satya1996"};
const orderData = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderID;
test.beforeAll(async()=>{
    const requestContext = await request.newContext();
    const apiUtils = new APIUtils(requestContext,loginBody);
    token = await apiUtils.getToken();
    orderID = await apiUtils.createOrder(orderData);

   
});
test.beforeEach(()=>{

});

test("Login to the website",async ({page})=>{
    
    // Playwright can execute any javascript 
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")

    await page.locator("[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody .ng-star-inserted th").first().waitFor();
    const orderListElements = await page.locator("tbody .ng-star-inserted th");
    const length = await orderListElements.count();
    for(let i = 0;i<length;i++){
        const requiredID = await orderListElements.nth(i).textContent()
        if(requiredID===orderID){
            await page.locator("tbody .ng-star-inserted td:nth-child(6) button").nth(i).click();
            break;
        }
    }
    
   
})