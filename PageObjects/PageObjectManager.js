const {LoginPage} = require("./LoginPage.js")
const {DashboardPage} = require("./DashboardPage")
const {CartPage} = require("./CartPage")

class PageObjectManager{
    constructor(page){
        this.page=page;
        this.LoginPage = new LoginPage(page);
        this.DashboardPage =new DashboardPage(page);
        this.CartPage = new CartPage(page);
    }
    async getLoginPage(){
        return this.LoginPage;
    }

    async getDashboardPage(){
        return this.DashboardPage;
    }
    async getCheckoutPage(){
        return this.CartPage;
    }
}
module.exports ={PageObjectManager}