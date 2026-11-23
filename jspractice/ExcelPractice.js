const exceljs= require("exceljs");
// To handle the promise without async and await.
// const workbook = new exceljs.Workbook();
// workbook.xlsx.readFile("c:/users/Satyabrata Sahoo/Downloads/download.xlsx").then(function(){
//     const worksheet = workbook.getWorksheet("Sheet1")

// worksheet.eachRow((row,rowNumber)=>{
//     row.eachCell((cell, colNumber)=>{
//         console.log(cell.value);
//     })
// })
// })


async function writeExcel(oldEntry,newEntry,change,newPrice,path){
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(path)
    const worksheet = workbook.getWorksheet("Sheet1")
    const location =await readExcel(worksheet,oldEntry);
    

            let cell = worksheet.getCell(location.row,location.col)
            cell.value = newEntry
            cell = worksheet.getCell(location.row,location.col+change.colChange)
            cell.value = newPrice

            await workbook.xlsx.writeFile("c:/users/Satyabrata Sahoo/Downloads/download.xlsx")
}

async function readExcel(worksheet,oldEntry){
    const location = {row:-1,col:-1};
    worksheet.eachRow(async(row,rowNumber)=>{
     row.eachCell(async(cell, colNumber)=>{
        console.log(cell.value);
        if(cell.value===oldEntry){
            location.row = rowNumber
            location.col=colNumber
        }
    })
})
return location;
}
writeExcel("Apple","Iphone",{rowChange:0,colChange:2},61000,"c:/users/Satyabrata Sahoo/Downloads/download.xlsx");
