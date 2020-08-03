// Interfaces //
// A core principle of TypeScript is focusing on the *shape* an object has (often called "duck typing" or "structural
// typing"). Interfaces are the way of naming these types, and sort of act as contracts within your code.
//// Simple example to demonstrate
function simplePrintLabel(labeledObj) {
    console.log(labeledObj.label);
}
// ^ has a single parameter that requires that the object passed in has a property called 'label' of type 'string'
let myObj = { size: 10, label: "Size 10 Object" };
simplePrintLabel(myObj);
// Now the interface `LabeledValue` can be used to describe the requirement in the previous example.
function printLabel(labeledObj) {
    console.log(labeledObj.label);
}
printLabel({ size: 10, label: "Size 10 Object" }); // Notice this doesn't work because of "excess property checking",
// which is described below. Object literals may only describe known properties.
let myOtherObj = { size: 10, label: "Size 10 Object" };
printLabel(myOtherObj);
//                                         : means the function is returning a non-`void` type, in this case an object
function createSquare(config) {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let mySquare = createSquare({ color: "black" });
// Can construct a point by assigning an object literal. After assignment, x and y can't be changed:
// NOTE TO SELF: Just learned a boject literal is a POJO.
let p1 = { x: 10, y: 20 };
p1.x = 5; // Error: Cannot assign to 'x' because it is a read-only property.
// TS also comes up with a `ReadonlyArray<T> type that is the same as an array type but with all the mutating methods
// removed so that you don't accidentally modify the array.
let a = [1, 2, 3, 4];
let ro = a;
ro[0] = 12; // Index signature in type 'readonly number[]' only permits reading.ts(2542)
ro.push(5); // Error: Property 'push' does not exist on type 'readonly number[]'.ts(2339)
ro.length = 100; // Error: Cannot assign to 'length' because it is a read-only property.ts(2540)
a = ro; // Error: The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.ts(4104)
// Even assigning entire ReadonlyArray back to a normal array isn't allowed.
// However, it can be overridden with a type assertion:
a = ro;
// `readonly` vs `const`
// Variables use `const`, whereas properties use `readonly`
/////
//// Excess property checks
// In the first example, we were able to pass a variable of shape ({ size: number, label: string }) to something that
// only expected { label: string }. And we have the optional properties, which allow us to pass "option bags".
// However, combining the two can cause problems. See below example:
function createSquareAgain(config) {
    return { color: config.color || "red", area: config.width || 20 };
}
let mySquareAgain = createSquareAgain({ colour: "blue", width: 100 }); // In plain JS, this would fail silently.
// Error: Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean
// to write 'color'?ts(2345)
// My first thought is this should be fine because it looks like it is correctly typed at minimum. It has at least one
// compatible property, width, and both width and color are optional properties based on SquareConfig. Both are handled
// in function the the function will still return the correct shape. 'colour' just looks like an extra property, and so
// it would seem to be insignificant.
// HOWEVER, TypeScript says no!
// Object literals get special treatment: Excess Property Checking when they are passed as arguments. If an object
// literal (POJO?) has any properties that the "target type" doesn't have, we'll get an error.
// There are simple ways to get around this, though.
// 1) Type assertion, which is the easiest:
let mySquareAgain2 = createSquareAgain({ colour: "blue", width: 100 });
console.log(mySquareAgain2);
let mySquareAgain3 = createSquareAgain({ width: 100, opacity: 0.5 });
console.log(mySquareAgain3);
// Index signatures later, but this means SquareConfigWithIS can have any number of properties, and as long as they
// aren't color or width, their types do not matter.
// 3) Assign the object to another variable:
let squareOptions = { colour: "blue", width: 100 };
let mySquareAgain4 = createSquareAgain(squareOptions);
console.log(mySquareAgain4);
// Since the variable `squareOptions` won't undergo excess property checks, no error will be thrown.
// NOTE: It still has to have at least one common property, which is `width` in this case.
// This, on the other hand, would fail:
let squareOptionsFail = { colour: "blue" };
let mySquareAgain5 = createSquareAgain(squareOptionsFail);
// It can be used just like other interfaces:
let mySearch;
mySearch = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
};
// NOTE: for function types to correctly type check, the names of the parameters do not need to match. This works:
let myOtherSearch;
myOtherSearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
// Ah finally what I was looking for. Since the above functions are directly assigned to the interface SearchFunc, TS
// can contextually figure out the parameter types if they aren't specified:
let mySmartSearch;
mySmartSearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
// And if the expression returned the wrong type (anything other than boolean here), it would throw an error:
let myDumbSearch;
myDumbSearch = function (src, sub) {
    return "string";
};
let myArray;
myArray = ["Bob", "Fred"];
let myStr = myArray[0];
let cannotModify = ["Alice", "Bob"];
cannotModify[2] = "Fred"; // Error: Index signature in type 'ReadonlyStringArray' only permits reading.ts(2542)
class Clock {
    constructor(h, m) {
        this.currentTime = new Date();
    }
}
class BetterClock {
    constructor(h, m) {
        this.currentTime = new Date();
    }
    setTime(d) {
        this.currentTime = d;
    }
}
class BadClock {
    constructor() {
        // Error: Class 'BadClock' incorrectly implements interface 'ClockConstructer'.
        // Type 'BadClock' provides no match for the signature 'new (hour: number, minute: number): any'.ts(2420)
        this.currentTime = new Date();
        // Constructor implementation is missing.ts(2390)
    }
}
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
class DigitalClock {
    constructor(h, m) { }
    tick() {
        console.log('beep beep');
    }
}
class AnalogClock {
    constructor(h, m) { }
    tick() {
        console.log('tick tick');
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
// Another simple way is
// 2) Class expressions
// Using the interfaces from above:
const OtherClock = class OtherClock {
    constructor(h, m) { }
    tick() {
        console.log('beep beep');
    }
};
let square = {};
square.color = "blue";
square.sideLength = 10;
// let newSquare: ComboSquare = {}; // Why doesn't this work?
let newSquare = {};
newSquare.color = "blue";
newSquare.penWidth = 5.0;
newSquare.sideLength = 10;
console.log(newSquare);
function getCounter() {
    let counter = function (start) { }; // I think this is type casting? init a function as a Counter
    counter.interval = 123; // assign a property of the counter object
    counter.reset = function () { }; // assign another propeter of the counter object
    return counter; // return the new counter
}
let ctr = getCounter();
ctr(10); // What does this do? I guess a Counter is a function that takes a number and does nothing?
ctr.reset();
ctr.interval = 5.0;
console.log(ctr);
/////
//// Interfaces extending classes
// When this happens, the interface inherits the members of the class but not their implementations. Interfaces inherit
// even the private and protected members of the class. When we create an interface that extends a class with private/
// protected members, that interface type can only be implemented by that class or a subclass of it:
class Control {
}
class Button extends Control {
    select() { }
}
class ImageControl {
    select() { }
}
// Within the `Control` class it is possible to access the `state` private member through an instance of
// `SelectableControl`. Effectively, `SelectableControl` acts like a `Control` that we know has a `select` method.
// NOTE: the `Button` and `TextBox` classes are subtypes of `SelectableControl` because they both inherit from `Control`
// and have a `select` method.
