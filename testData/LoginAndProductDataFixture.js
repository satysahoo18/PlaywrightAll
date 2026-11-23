const base = require("@playwright/test");

exports.customTest = base.test.extend(
    {
       

        //Fixtures can also be used to declare the data 
        testData : {
            userEmail:"satyabratasahoo981@gmail.com",
            userPass : "satya1996",
            product : "ZARA COAT 3"
        }
    }
)

