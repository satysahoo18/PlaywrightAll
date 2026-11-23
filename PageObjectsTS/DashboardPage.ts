import { Locator, Page } from "@playwright/test";

export class DashboardPage{
    page: Page
    product: Locator
    cartButton: Locator
    pageLoadElement: Locator
    constructor(page: Page){
        this.page=page;
        this.product = page.locator(".card");
        this.cartButton = page.locator("li button").nth(2);
        this.pageLoadElement = page.locator("div li").first();
    }

    async addProductToCart(productName: string){
        await this.product.first().waitFor();
            
        
            let listOfProducts: string[] = await this.product.allTextContents();
            console.log(listOfProducts);
            let productCount: number = await this.product.count();
            for(let i=0;i<productCount;i++){

                let requiredProduct: string|null = await this.product.nth(i).locator("b").textContent();
        
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

