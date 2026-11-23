//Inheritance is the main pillar in object oriented programming
//once class can inherit/acquire the properties, Methods of another class
// The class which inherits the properties of other in known as subclass (derived class, cihld class)
//the class whose properties are inherited is known as superclass
const {Person}= require("./jsintroandprac4") // for importing any module or class need to export the same
class Pet extends Person{
    constructor(lastName,firstName){
        super(lastName,firstName)
    }
    // get location(){  //Location is not a method it is a property
    //     return "Keshav Nagar"
    // }
}

let pet = new Pet("john","doe")
console.log(pet.getName());
console.log(pet.location)