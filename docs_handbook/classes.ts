//// Quick JS Intro
// Trad JS uses functions and prototype-based inheritance to build up reusable components (not object-oriented). ES6
// allows us to start coding in a an object-oriented syntax (underneath the hood it's using the prototype stuff). TS
// allows devs to use object oriented programming and it compiles it down to JS that works across all major browsers and
// platforms.
/////

// Classes
class Greeter { // declare class Greeter
    // Greeter has 3 members
    greeting: string; // 1) a property called greeting
    constructor(message: string) { // 2) a constructor
        this.greeting = message;
    }
    greet() { // 3) a method greet
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world"); // construct an instance using `new`, creating a new object with `Greeter` shape

// NOTE: we use this to denote member access. Any time we refer to one of the members of the class (in practice, we are
// referring to an instance of the Greeter class, so this.member is accessing the member of an instance), we prepend
// `this`.
/////

//// Inheritance
// Some good review
// Classes inherit properties and methods from base classes
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
  
class Dog extends Animal { // extends to create subclasses
    bark() {
        console.log("Woof! Woof!");
    }
}
  
const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// A more complex example:
class ComplexAnimal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
  
class Snake extends ComplexAnimal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
  
class Horse extends ComplexAnimal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
  
let sam = new Snake("Sammy the Python");
let tom: ComplexAnimal = new Horse("Tommy the Palomino");
// Even though Tom is declared as an animal, its value is a horse

sam.move();
/*
>> Slithering...
>> Sammy the Python moved 5m.
*/
console.log(tom.constructor.name);
tom.move(34); // Tom, although type is animal, will gallop because his value is a `horse`, which is a subclass
/*
>> Galloping...
>> Tommy the Palomino moved 34m.
*/

// Each derived class that contains a constructor function MUST call `super()`, which executes the constructor of the
// base class. Before we ever access a property on `this`, we HAVE to call `super()`. TS will enforce this important
// rule.