class LoginPage{
    constructor(page){
        this.page=page;
        this.userEmail =  page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.loginButton = page.locator("#login")

    }
    async goTo(baseURL){
        await this.page.goto(baseURL);
    }
    async login(userEmail,userPass){
        await this.userEmail.fill(userEmail);
        await this.userPassword.fill(userPass)
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = { LoginPage };