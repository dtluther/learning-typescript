//// Quick JS Intro
// Trad JS uses functions and prototype-based inheritance to build up reusable components (not object-oriented). ES6
// allows us to start coding in a an object-oriented syntax (underneath the hood it's using the prototype stuff). TS
// allows devs to use object oriented programming and it compiles it down to JS that works across all major browsers and
// platforms.
/////
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Classes
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world"); // construct an instance using `new`, creating a new object with `Greeter` shape
// NOTE: we use this to denote member access. Any time we refer to one of the members of the class (in practice, we are
// referring to an instance of the Greeter class, so this.member is accessing the member of an instance), we prepend
// `this`.
/////
//// Inheritance
// Some good review
// Classes inherit properties and methods from base classes
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log("Woof! Woof!");
    };
    return Dog;
}(Animal));
var dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
// A more complex example:
var ComplexAnimal = /** @class */ (function () {
    function ComplexAnimal(theName) {
        this.name = theName;
    }
    ComplexAnimal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return ComplexAnimal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(ComplexAnimal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(ComplexAnimal));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
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
