import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";



export class PageObjectManager{
    page: Page
    loginPage: LoginPage
    dashboardPage: DashboardPage
    cartPage: CartPage

    constructor(page: Page){
        this.page=page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage =new DashboardPage(page);
        this.cartPage = new CartPage(page);
    }
    async getLoginPage(){
        return this.loginPage;
    }

    async getDashboardPage(){
        return this.dashboardPage;
    }
    async getCheckoutPage(){
        return this.cartPage;
    }
}
