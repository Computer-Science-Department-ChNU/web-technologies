const person = {
    name: ["Bob", "Smith"],
    age: 32,
    gender: "male",
    interests: ["music", "skiing"],
    bio: function () {
        alert(
            this.name[0] +
            " " +
            this.name[1] +
            " is " +
            this.age +
            " years old. He likes " +
            this.interests[0] +
            " and " +
            this.interests[1] +
            ".",
        )
    },
    greeting: function () {
        alert("Hi! I'm " + this.name[0] + ".")
    },
}

// Dot notation
console.log(person.name)
console.log(person.name[0])
console.log(person.age)
console.log(person.interests[1])
console.log(person.bio())
console.log(person.greeting())
