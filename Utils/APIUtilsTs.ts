

class APIUtils{
   apiContext:any
   loginPayload: any
    constructor(apiContext:any,loginPayload:any){
        this.apiContext = apiContext;
        this.loginPayload=loginPayload
    }
   
    async getToken(){
         const response :any = 
    await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayload
        });
    const jsonResponse = await response.json();
    const token = jsonResponse.token;
    console.log(jsonResponse.token);
    return token;

    }
    async createOrder(createOrderPayload:any){
       
        //  let response  ={token:String , orderID:String} 
        /*
        Here, String is not a type annotation. It refers to JavaScript’s built-in String 
        constructor, so the object initially stores that constructor function as the value 
        of both properties.
        
        
        In TypeScript, use lowercase string to describe a string’s type. 
        The type goes after a colon following the variable name:
        */ 
         let response: { token: string; orderID: string } = {
  token: "",
  orderID: ""
};
         response.token = await this.getToken();
         const orderResponse : any = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data:createOrderPayload,
                    headers: {
                        "Authorization":response.token,
                        "Content-Type":"application/json"
        
                    }
                }
            );
            const orderResponseJson =await orderResponse.json();
            console.log("response data :"+ orderResponseJson);
            response.orderID =await orderResponseJson.orders[0];
            console.log(response.orderID)
            return response.orderID

    }
}
module.exports= {APIUtils}; // common js
// export default {APIUtils}; // es module