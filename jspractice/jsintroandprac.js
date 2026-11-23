// Variables
// Var for below ecma5 and let var and const for ecma5 and above
// difference between var and let is var can be redeclare but let can not be 
// ex var a =2 , var a=3 it is ok, but let a =2 and let a=3 is not ok instead a=3

let a = 2
console.log(typeof(a))
a="Satya"
console.log(typeof(a))
var b=3
console.log(typeof(b))
var b =true // var can be redeclare
console.log(typeof(b));
console.log(!b) // negation


// Conditions - if else, switch case
const flag = true // const can not be changed

if(!b){
    console.log("condition satisfied")
}
else{
    console.log("condition not satisfied")
}


// while loop use when the loop to be run until the certain condition
let i =1;
while(i<2){
    console.log("I am inside loop")
    i++;
}
i=1
//dowhile loop // use when code needs to be run at least once
do{
console.log("I am inside loop do while")
    i++;
}while(i<0);

//for loop // use where you have specific number of interation to perform
for(let i =0;i<20;i++){
   if(i%2==0||i%5==0){
    console.log(i);
    if(i==2){
        break
    }
   }
}


// Arrays - Arrays is an collection of element
let marks = Array(6)
marks = new Array(20,30,40,50,60,70,80)
//or
marks = [10,15,20,25,30,35]
console.log(marks[2])
console.log(marks.length)
marks.push(30) // adds element in the end
console.log (marks)
marks.pop() // deletes element in the last
console.log (marks)
marks.unshift(12) // adds element in the first 
console.log (marks)
console.log(marks.indexOf(12))
console.log(marks.includes(12))
console.log(marks.slice(2,5)) // gives the subarray 2 is included and 5 is excluded

// array methods - reduce - user for accumulation
let total =marks.reduce((sum , mark)=>sum+mark,0);
console.log(total);
// array methods - filter - filtering the array
let filter = marks.filter(mark=>mark%2==0)
console.log(filter);
 
// array methods - map - performing action on each elemtnts present in the array
let mapping = marks.map(mark=>mark*1.5);
console.log(mapping);

// chaining the array methods

let chaining = marks.filter(mark=>mark%2==0).map(mark=>mark*2).reduce((sum,mark)=>sum+mark,0)
console.log(chaining)



// sorting strings array
let fruits = ["banana","Banana","mango","apple"]
console.log(fruits.sort())


let numbersort = [10,4,400,30,35]
console.log(numbersort.sort((a,b)=>a-b));
console.log(numbersort.reverse())
