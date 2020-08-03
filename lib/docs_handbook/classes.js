//// Quick JS Intro
// Trad JS uses functions and prototype-based inheritance to build up reusable components (not object-oriented). ES6
// allows us to start coding in a an object-oriented syntax (underneath the hood it's using the prototype stuff). TS
// allows devs to use object oriented programming and it compiles it down to JS that works across all major browsers and
// platforms.
/////
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _name;
// Classes
class Greeter {
    constructor(message) {
    }
    greet() {
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
    move(distanceInMeters = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
class Dog extends Animal {
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
    constructor(theName) {
        this.name = theName;
    }
    move(distanceInMeters = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Snake extends ComplexAnimal {
    constructor(name) {
        super(name);
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends ComplexAnimal {
    constructor(name) {
        super(name);
    }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom = new Horse("Tommy the Palomino");
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
/////
//// Public, private, and protected modifiers
/// Public by default
// In TS, we don't have to declare public. Each member is public by default.
// We can still mark a member public explicitly, if we want, as so with `Animal`:
class PublicAnimal {
    constructor(theName) {
        this.name = theName;
    }
    move(distanceInMeters) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
/// Private fields
// In TS 3.8, can now suppoer the new JS syntax for private fields:
class NewPrivateAnimal {
    constructor(theName) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, theName);
    }
}
_name = new WeakMap();
new NewPrivateAnimal("Cat").;
// Property '#name' is not accessible outside class 'PrivateAnimal' because it has a private identifier.ts(18013)
// NOTE: This syntax is build into JD runtime and can have better guarantees about the isolation of each private field.
/// Understanding TS's `private`
class PrivateAnimal {
    constructor(theName) {
        this.name = theName;
    }
}
new PrivateAnimal("Cat").name; // Property 'name' is private and only accessible within class 'PrivateAnimal'.ts(2341)
// TS is a structural type system, i.e. regardless of where two types came from, if we compare two different types, if
// the types of all the members are compatible, then we say the types themselves are compatible.
// Howver, for private and protected members, it's different. For the two types to be considered compatible, if one has
// a private/public member, then the other must have a private/protected member that originated in the same declaration:
class AnotherAnimal {
    constructor(theName) {
        this.name = theName;
    }
}
class Rhino extends AnotherAnimal {
    constructor() {
        super("Rhino");
    }
}
class Employee {
    constructor(theName) {
        this.name = theName;
    }
}
let animal = new AnotherAnimal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");
animal = rhino;
animal = employee;
// Error: Type 'Employee' is not assignable to type 'AnotherAnimal'.
// Types have separate declarations of a private property 'name'.ts(2322)
// Because `animal` and `rhino` share the private side of their shape from the same declaration of
// `private name: string` in `AnotherAnimal`, they are compatible. For the inverse reasons, `employee` is not.`
// `employee`'s private `name` was not the one declared in `AnotherAnimal`.
/// Understanding `protected`
// Acts like `private` except that `protected` members can also be accessed within deriving classes:
class Person {
    constructor(name) {
        this.name = name;
    }
}
class NewEmployee extends Person {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard = new NewEmployee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);
// Error: Property 'name' is protected and only accessible within class 'Person' and its subclasses.ts(2445)
// While we can't use `name` outside of `Person`, we can use it from within an instance method of `NewEmployee` derives
// from `Person`.
// A constructor may also be `protected`, i.e. the class cannot be instantiated outside of its containing class, but it
// can be extended:
class ProtectedPerson {
    constructor(theName) {
        this.name = theName;
    }
}
// AnotherEmployee can extend ProtectedPerson
class AnotherEmployee extends ProtectedPerson {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let jeff = new AnotherEmployee("Jeff", "Sales");
let john = new ProtectedPerson("John");
// Constructor of class 'ProtectedPerson' is protected and only accessible within the class declaration.ts(2674)
/////
//// Readonly modifiers
class Octopus {
    constructor(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
/// Parameter properties
class ConciseOctopus {
    constructor(name) {
        this.name = name;
        this.numberOfLegs = 8;
    } // allows us to drop the type declaration above and can use it here
}
let o = new ConciseOctopus('testing');
console.log(o.name);
// We were able to drop `theName` altogether and just use the shortend `readonly name: string`
// Can do this with accessibility modifiers (`public`, `private`, or `protected`), or `readonly`, or both.
/////
//// Accessors (getters and setters)
// Without getters and setters:
class NoAccessor {
}
let lifeform = new NoAccessor();
lifeform.fullName = "Bob Smith";
if (lifeform.fullName) {
    console.log(lifeform.fullName);
}
// While letting people set `fullName` directly is handy, we might want to enforce some constraints. Below, we do this
// with a setter that checks the length of `newName`. We'll also add a simple getter that retrieves `fullName`
// unmodified:
const fullNameMaxLength = 10;
class GetterSetter {
    get fullName() {
        return this._fullName;
    }
    set fullName(newName) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }
        this._fullName = newName;
    }
}
let newLifeform = new GetterSetter();
newLifeform.fullName = "djfaksfjd;ajfhkhfjkldashf";
if (newLifeform.fullName) {
    console.log(newLifeform.fullName);
}
newLifeform.fullName = "A really long name";
// NOTES:
// 1) accessors require that we set the compiler to output ES5 or higher. Downleveling to ES 3 is not suppooted.
// 2) Accessors with a `get` and no `set` are automatically inferred to be `readonly`.
/////
//// Static properties
// Members that are visible on the class itself RATHER than the instance (probably also called class properties).
// Similarly to prepending `this` for instance accesses, we prepend `ClassName` in front of static accesses:
class Grid {
    constructor(scale) {
        this.scale = scale;
    }
    calculateDistanceFromOrigin(point) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
}
Grid.origin = { x: 0, y: 0 };
let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
/////
//// Abstract classes
// These are base classses from which other classes may be derived. Abstract classes may NOT be instantiated directly.
// Unlike an interface, an abstract class may contain implementation details for its members. The `abstract` keyword is
// used to define `abstract` classes as well as `abstract` method within an `abstract` class.
class Alien {
    move() {
        console.log("roaming the earth...");
    }
}
// Methods marked as `abstract` do not contain an implementation and must be implemented in derived classes. Abstract
// methods, like interface methods, define the signature of a method without including the method body. However,
// abstract methods must include the `abstract` keyword and may optionally include access modifiers:
class Department {
    constructor(name) {
        this.name = name;
    }
    printName() {
        console.log("Department name: " + this.name);
    }
}
class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }
    printMeeting() {
        console.log("The Accounting Department meets each Monday at 10am.");
    }
    generateReports() {
        console.log("Generating accounting reports...");
    }
}
let department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
// This last one is interesting because an abstract class can only exist in type, but not in instance. So we can have
// type (shape) `Department` but never an instance of class `Department`
/////
//// Advanced techniques
/// Constructor functions
// When we declare a class in TS, we are actually creating multiple function declarations at the same time: the type of
// the instances of the class, and a constructor function.
// First, let's check out the type of the 'instance' of the class:
class OtherGreeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let otherGreeter;
otherGreeter = new OtherGreeter("world");
console.log(otherGreeter.greet()); // "Hello, world"
// `let otherGreeter: OtherGreeter` defines the instances of the `OtherGreeter` class as also of type `OtherGreeter`.
// We're also creating another value that we call the 'constructor function'. This is the function that is called when
// we `new` up instances of the class. To see what this looks like in practice, lets check out the JS created by the
// above example:
let GreeterJS = (function () {
    function GreeterJS(message) {
        this.greeting = message;
    }
    GreeterJS.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return GreeterJS; // the constructor function returns this a new GreeterJS object
})();
let greeterJS;
greeterJS = new Greeter("world");
console.log(greeterJS.greet()); // "Hello, world"
// Above, `let GreeterJS` is assigned to the constructor function. When we call `new` and run this function, we get an
// instance of the class. The constructor function also contains all the static members of the class. Another way to
// think of each class is that there is an 'instance' side and a 'static' side. The example is modifed below to show
// this difference:
class GreeterJS2 {
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return GreeterJS2.standardGreeting;
        }
    }
}
GreeterJS2.standardGreeting = "Hello, there";
let greeter1;
greeter1 = new GreeterJS2();
console.log(greeter1.greet()); // "Hello, there"
let greeterMaker = GreeterJS2; // we do this because are making another constructor function, so we
// want the type of the class, not the type of an instance
greeterMaker.standardGreeting = "Hey there!";
let greeter2 = new greeterMaker(); // so now we can call `new` on greeterMaker and create an instance
console.log(greeter2.greet()); // "Hey there!"
// `greeter1` works as we've seen before.
// Next, we use the class directly. We create the variable, `greeterMaker` which holds the class itself, or said another
// way, its constructor function. We use `typeof Greeter`, i.e. "give me the type of the Greeter class itself" rather
// than the instance type. Or more precisely, "give me the type of the symbol called `Greeter`", which is the type of
// the constructor function. This type will contain all of the static members of Greeter along with the constructor that
// creates instances of the `Greeter` class. We show this by using `new` on greeterMaker, creating new instances of
// `Greeter` and invoking them as before.
/////
//// Using a class as an interface
// As we mentioned, a class declaraton creates 2 things:
// 1) a type representing the instances of the class
// 2) a constructor function
// Because classes create types, we can use them in the same place we would be able to use interfaces:
class AnotherPoint {
}
let point3d = { x: 1, y: 2, z: 3 };
