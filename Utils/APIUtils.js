

class APIUtils{
   
    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload=loginPayload
    }
   
    async getToken(){
         const response = 
    await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayload
        });
    const jsonResponse = await response.json();
    const token = jsonResponse.token;
    console.log(jsonResponse.token);
    return token;

    }
    async createOrder(createOrderPayload){
        const token  =await this.getToken();
         const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data:createOrderPayload,
                    headers: {
                        "Authorization":token,
                        "Content-Type":"application/json"
        
                    }
                }
            );
            const orderResponseJson =await orderResponse.json();
            console.log("response data :"+ orderResponseJson);
            const orderID =await orderResponseJson.orders[0];
            console.log(orderID)
            return orderID

    }
}
module.exports= {APIUtils}; // common js
// export default {APIUtils}; // es module