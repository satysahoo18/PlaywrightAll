import { Locator, Page } from "@playwright/test";


export class CartPage{
    page: Page
    checkoutButton: Locator
    countryDropdowntext: Locator
    countryDropdownlist: Locator
    placeOrderButton: Locator
    orderSuccessful: Locator

    constructor(page:Page){
        this.page=page;
        this.checkoutButton =  page.locator("text=Checkout");
        this.countryDropdowntext = page.locator("input[placeholder='Select Country']");
        this.countryDropdownlist = page.locator(".ta-results.list-group.ng-star-inserted");
        this.placeOrderButton = page.locator(".action__submit");
        this.orderSuccessful = page.locator("text=THANKYOU FOR THE ORDER.");
    }

    async productVisibilityCart(productName: string){
        return this.page.locator("text="+productName).isVisible();
    }

    async checkoutProduct(){
        await this.checkoutButton.click();
    }
    async placeOrder(){
        await this.countryDropdowntext.waitFor();
        await this.countryDropdowntext.pressSequentially("ind");
        await this.countryDropdownlist.waitFor();
            let listCount: number = await this.countryDropdownlist.locator("button").count();
            for(let i = 0;i<listCount;i++){
        
                let listName: any= await this.countryDropdownlist.locator("button").nth(i).textContent();
                console.log(listName);
                if(listName.trim() === "India"){
                    await this.countryDropdownlist.locator("button").nth(i).click();
                    break;
                }
            }
            
            await this.placeOrderButton.click(); 
    }

    async verifySuccessfulOrderPlace(){
        await this.orderSuccessful.waitFor();
        return await this.orderSuccessful.isVisible();
    }
}

