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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _name;
// Classes
var Greeter = /** @class */ (function () {
    function Greeter(message) {
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
/////
//// Public, private, and protected modifiers
/// Public by default
// In TS, we don't have to declare public. Each member is public by default.
// We can still mark a member public explicitly, if we want, as so with `Animal`:
var PublicAnimal = /** @class */ (function () {
    function PublicAnimal(theName) {
        this.name = theName;
    }
    PublicAnimal.prototype.move = function (distanceInMeters) {
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return PublicAnimal;
}());
/// Private fields
// In TS 3.8, can now suppoer the new JS syntax for private fields:
var NewPrivateAnimal = /** @class */ (function () {
    function NewPrivateAnimal(theName) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, theName);
    }
    return NewPrivateAnimal;
}());
_name = new WeakMap();
new NewPrivateAnimal("Cat").;
// Property '#name' is not accessible outside class 'PrivateAnimal' because it has a private identifier.ts(18013)
// NOTE: This syntax is build into JD runtime and can have better guarantees about the isolation of each private field.
/// Understanding TS's `private`
var PrivateAnimal = /** @class */ (function () {
    function PrivateAnimal(theName) {
        this.name = theName;
    }
    return PrivateAnimal;
}());
new PrivateAnimal("Cat").name; // Property 'name' is private and only accessible within class 'PrivateAnimal'.ts(2341)
// TS is a structural type system, i.e. regardless of where two types came from, if we compare two different types, if
// the types of all the members are compatible, then we say the types themselves are compatible.
// Howver, for private and protected members, it's different. For the two types to be considered compatible, if one has
// a private/public member, then the other must have a private/protected member that originated in the same declaration:
var AnotherAnimal = /** @class */ (function () {
    function AnotherAnimal(theName) {
        this.name = theName;
    }
    return AnotherAnimal;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, "Rhino") || this;
    }
    return Rhino;
}(AnotherAnimal));
var Employee = /** @class */ (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var animal = new AnotherAnimal("Goat");
var rhino = new Rhino();
var employee = new Employee("Bob");
animal = rhino;
animal = employee;
// Error: Type 'Employee' is not assignable to type 'AnotherAnimal'.
// Types have separate declarations of a private property 'name'.ts(2322)
// Because `animal` and `rhino` share the private side of their shape from the same declaration of
// `private name: string` in `AnotherAnimal`, they are compatible. For the inverse reasons, `employee` is not.`
// `employee`'s private `name` was not the one declared in `AnotherAnimal`.
/// Understanding `protected`
// Acts like `private` except that `protected` members can also be accessed within deriving classes:
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var NewEmployee = /** @class */ (function (_super) {
    __extends(NewEmployee, _super);
    function NewEmployee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    NewEmployee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return NewEmployee;
}(Person));
var howard = new NewEmployee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);
// Error: Property 'name' is protected and only accessible within class 'Person' and its subclasses.ts(2445)
// While we can't use `name` outside of `Person`, we can use it from within an instance method of `NewEmployee` derives
// from `Person`.
// A constructor may also be `protected`, i.e. the class cannot be instantiated outside of its containing class, but it
// can be extended:
var ProtectedPerson = /** @class */ (function () {
    function ProtectedPerson(theName) {
        this.name = theName;
    }
    return ProtectedPerson;
}());
// AnotherEmployee can extend ProtectedPerson
var AnotherEmployee = /** @class */ (function (_super) {
    __extends(AnotherEmployee, _super);
    function AnotherEmployee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    AnotherEmployee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return AnotherEmployee;
}(ProtectedPerson));
var jeff = new AnotherEmployee("Jeff", "Sales");
var john = new ProtectedPerson("John");
// Constructor of class 'ProtectedPerson' is protected and only accessible within the class declaration.ts(2674)
/////
//// Readonly modifiers
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
/// Parameter properties
var ConciseOctopus = /** @class */ (function () {
    function ConciseOctopus(name) {
        this.name = name;
        this.numberOfLegs = 8;
    } // allows us to drop the type declaration above and can use it here
    return ConciseOctopus;
}());
var o = new ConciseOctopus('testing');
console.log(o.name);
// We were able to drop `theName` altogether and just use the shortend `readonly name: string`
// Can do this with accessibility modifiers (`public`, `private`, or `protected`), or `readonly`, or both.
/////
//// Accessors (getters and setters)
// Without getters and setters:
var NoAccessor = /** @class */ (function () {
    function NoAccessor() {
    }
    return NoAccessor;
}());
var lifeform = new NoAccessor();
lifeform.fullName = "Bob Smith";
if (lifeform.fullName) {
    console.log(lifeform.fullName);
}
// While letting people set `fullName` directly is handy, we might want to enforce some constraints. Below, we do this
// with a setter that checks the length of `newName`. We'll also add a simple getter that retrieves `fullName`
// unmodified:
var fullNameMaxLength = 10;
var GetterSetter = /** @class */ (function () {
    function GetterSetter() {
    }
    Object.defineProperty(GetterSetter.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (newName && newName.length > fullNameMaxLength) {
                throw new Error("fullName has a max length of " + fullNameMaxLength);
            }
            this._fullName = newName;
        },
        enumerable: false,
        configurable: true
    });
    return GetterSetter;
}());
var newLifeform = new GetterSetter();
newLifeform.fullName = "Bob Smith";
if (newLifeform.fullName) {
    console.log(newLifeform.fullName);
}
newLifeform.fullName = "A really long name";
