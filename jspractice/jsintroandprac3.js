// javascript objects

let person = {
    firstName : 'Satya',
    lastName:'sahoo',
    age : 24,
    fullName: function(){
        console.log(this.firstName + this.lastName)
    }

}

//types of object retrieving
console.log(person.firstName);
console.log(person['lastName'])

person.firstName = "Satyabrata"
console.log(person.firstName);
person.gender = "male"

console.log(person)
console.log('gender' in person)
delete person.gender
console.log(person)

console.log('gender' in person)

// print all the values of the javascript object
for(let key in person){
    console.log(person[key])
}
person.fullName()
