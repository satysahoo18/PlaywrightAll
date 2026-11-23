// Function 
function add (a,b){
    return a+b
}
console.log(add(2,3))// calling is very necessary


//anonymus function

let sumOfIntegeres = function(c,d){
    return c+d
}
let sumOfIntegeresAno = (c,d)=>c+d //return and brackets are removed
console.log(sumOfIntegeresAno(2,6))


// var - golbal level /functional level - redeclare/reinitiliaze

var day = "sunday";
var day = "wednesday" // possible
if(true){
var  day = "monday"
}
function random(){
var day = "tuesday"
console.log(day)
}
random();
console.log(day)
//let global/block level  - no redeclare, reinitilize

let day1 = "sunday";
//let day1 = "monday"; // not possible
day1 = "monday";
if(true){
let  day1 = "monday"
console.log(day1)
}
function random(){
let day1 = "tuesday"
console.log(day1)
}
random();
console.log(day1) 

//const 

const day2 = "sunday";
//day2="wednesday" // not possible
if(true){
const  day2 = "monday"
console.log(day2)
}
function random(){
const day2 = "tuesday"
console.log(day2)
}
random();
console.log(day1) 