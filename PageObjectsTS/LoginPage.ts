import { Locator, Page } from "@playwright/test";

export class LoginPage{
    page: Page
    userEmail: Locator
    userPassword: Locator
    loginButton: Locator
    constructor(page: Page){
        this.page=page;
        this.userEmail =  page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.loginButton = page.locator("#login")

    }
    async goTo(baseURL: string){
        await this.page.goto(baseURL);
    }
    async login(userEmail: string,userPass: string){
        await this.userEmail.fill(userEmail);
        await this.userPassword.fill(userPass)
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

