const {test,expect,request} = require ("@playwright/test");
const {APIUtils}= require ("../Utils/APIUtils");
const loginBody = {userEmail: "satyabratasahoo981@gmail.com", userPassword: "satya1996"};
const orderData = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayloadReroute = {data:[],message:"No Orders"};
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
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadReroute);
            await route.fulfill({
                response: response,
                body:body

            }) 
    });
    // Wer are using route.fulfill to replacing the response of the particular request to fake response
    //Intercepting response = getting response -> Playwright replacing it with fake response->
    // displaying fake response on the screen

    await page.locator("[routerlink='/dashboard/myorders']").click();
    // Playwright will instaltly inject the fake response when the particular request is hit
    // so need to wait for the response of the particular api so that fake response be injected prpperly
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await expect(page.locator("text= You have No Orders to show at this time.")).toBeVisible();
    
   
})