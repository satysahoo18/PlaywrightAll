// ExcelJS reads and writes the downloaded spreadsheet.

// node install exceljs  command to install excell js 
const exceljs= require("exceljs");
// `test` defines a Playwright test; `expect` checks its results.
const {test,expect} = require("@playwright/test")
// This commented example uses `.then()` to handle the promise instead of
// `async`/`await`. Both styles can be used to wait for asynchronous work.
// const workbook = new exceljs.Workbook();
// workbook.xlsx.readFile("c:/users/Satyabrata Sahoo/Downloads/download.xlsx").then(function(){
//     const worksheet = workbook.getWorksheet("Sheet1")

// worksheet.eachRow((row,rowNumber)=>{
//     row.eachCell((cell, colNumber)=>{
//         console.log(cell.value);
//     })
// })
// })


// Find a cell containing `oldEntry`, replace it with `newEntry`, and update
// the related price cell. `change` describes the offset from the matching cell.
async function writeExcel(oldEntry,newEntry,change,newPrice,path){
    // Create a workbook object, then load the existing Excel file into it.
    const workbook = new exceljs.Workbook();
    
    await workbook.xlsx.readFile(path)
    // Get the worksheet by its tab name and locate the cell to update.
    const worksheet = workbook.getWorksheet("Sheet1")
    const location =await readExcel(worksheet,oldEntry);
    

            // Replace the matching value and the value `colChange` columns to its right.
            let cell = worksheet.getCell(location.row,location.col)
            cell.value = newEntry
            cell = worksheet.getCell(location.row,location.col+change.colChange)
            cell.value = newPrice
            // Wait for the modified workbook to be saved before continuing.
            await workbook.xlsx.writeFile(path)
}

// Search every cell in the worksheet and return the row and column of `oldEntry`.
async function readExcel(worksheet,oldEntry){
    // -1 indicates that a matching cell has not been found.
    const location = {row:-1,col:-1};
    // `eachRow` and `eachCell` visit the worksheet's rows and populated cells.
    worksheet.eachRow(async(row,rowNumber)=>{
     row.eachCell(async(cell, colNumber)=>{
        console.log(cell.value);
        // Save the coordinates when this cell contains the value being searched for.
        if(cell.value===oldEntry){
            location.row = rowNumber
            location.col=colNumber
        }
    })
})
return location;
}


test("Upload and download test",async ({page})=>{
    // Open the sample page and confirm that the download control is available.
    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
   
    await expect(page.getByRole("button",{name:"Download"})).toBeVisible();
    // Start waiting before clicking so the download event cannot be missed.
    const downloadPromise = page.waitForEvent("download");

    // Click the button to trigger the browser download.
    await page.getByRole("button",{name:"Download"}).click();
    // Wait for the download event and get its download object.
    const download = await downloadPromise
    // Save the downloaded file locally, then update its spreadsheet data.
    await download.saveAs("C:/Users/Satyabrata Sahoo/Downloads/download.xlsx");
    await writeExcel("Apple","Iphone",{rowChange:0,colChange:2},61000,"c:/users/Satyabrata Sahoo/Downloads/download.xlsx");

    // Select the saved workbook for upload through the page's file input.
    await page.locator("#fileinput").click();
    //setinput will onlywork if the element has input tag
    await page.locator("#fileinput").setInputFiles("c:/users/Satyabrata Sahoo/Downloads/download.xlsx")
    
    // Check that the page reports a successful update and shows the new data.
    await expect(page.getByText("Updated Excel Data Successfully.")).toBeVisible();

    const desiredLocator = page.getByRole("row").filter({hasText:'Iphone'});
    expect(desiredLocator.getByText("61000")).toBeVisible();

    await page.pause();
})