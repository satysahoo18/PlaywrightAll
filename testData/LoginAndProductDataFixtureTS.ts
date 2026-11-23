import {test as baseTest} from "@playwright/test";

interface TestData { userEmail:string,
    userPass:string,
    product:string

}
export const customTest = baseTest.extend<{testData:TestData}>(
    {
        //Fixtures can also be used to declare the data 
        testData : {
            userEmail:"satyabratasahoo981@gmail.com",
            userPass : "satya1996",
            product : "ZARA COAT 3"
        }
    }
)

