class DashboardPage{
    constructor(page){
        this.page=page;
        this.product = page.locator(".card");
        this.cartButton = page.locator("li button").nth(2);
        this.pageLoadElement = page.locator("div li").first();
    }

    async addProductToCart(productName){
        await this.product.first().waitFor();
            
        
            const listOfProducts = await this.product.allTextContents();
            console.log(listOfProducts);
            const productCount = await this.product.count();
            for(let i=0;i<productCount;i++){
                const requiredProduct = await this.product.nth(i).locator("b").textContent();
        
                if(requiredProduct === productName){
                    await this.product.nth(i).locator("text=Add To Cart").click();
                    break;
                }   
            }
    }

    async navigateToCart(){
         await this.cartButton.click();
         await this.pageLoadElement.waitFor();
    }
}

module.exports = {DashboardPage};