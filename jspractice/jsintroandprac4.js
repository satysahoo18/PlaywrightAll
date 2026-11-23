
// Person object can also be represented as class
class Person {
    // constructor is a method with is executed when the object is declared

constructor(firstName, lastName){
    this.firstName=firstName
    this.lastName=lastName
}
getName(){
    return this.firstName+this.lastName
}
     age=25
     get location(){ //get is used to set the property, so location is not a method it is a property
        return "pune"
     }
}
let person = new Person("Satya","Sahoo");
console.log(person.age)
console.log(person.location) // location is not a method its a propert
console.log(person.getName());

module.exports={Person}
