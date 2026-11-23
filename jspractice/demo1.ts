let a1: string = 'satya'
//a1 = 6 will give error as a1 type is string
let flag = false
let numberArray: number[]= [1,2,3,4]

let data: any = 'satya';
console.log(data)
data = 13
console.log(data)

//function declaration and return 
function add(a:number,b:number):number{
    return a+b
}
console.log(add(1,2))

// Object declaration
let obj :{firstName:string,lastName:string}= {
    firstName : "Satya",
    lastName : "Sahoo"
}

console.log(obj.firstName)