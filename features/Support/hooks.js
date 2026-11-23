const { BeforeStep,Before,After,AfterStep,BeforeAll,AfterAll,
    Status} = require("@cucumber/cucumber");

// const {playwright,chromium} = require ("@playwright/test")
const playwright = require("@playwright/test")
const {PageObjectManager} = require("../../PageObjects/PageObjectManager")
// This will run before all scenarios
Before(async function(){
    const browser = await playwright.chromium.launch({headless:false})
     const context = await browser.newContext();
     this.page =await context.newPage();

     //world constructor uses this keyworkd in cucumber 
     this.pageObjectManager = new PageObjectManager(this.page);
})
Before({tags:"@regression"},function(){
    console.log("Before regression")
})

After(function(){
    
})

//This Will run after ever step i.e. given when then
BeforeStep(function(){
    console.log("Before Step")
})
//Similar to before step
// should have result 
// here result.status has lowercase but Status.Failed is bigcase
AfterStep(async function({result}){
    console.log(result.status)
    if(result.status===Status.FAILED){
        await this.page.screenshot({path:"screenshot1.png"});
    }
})
//Will run once before all the scenarios
BeforeAll(function(){
    
})
AfterAll(function(){

})