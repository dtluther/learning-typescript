// Interfaces //
// A core principle of TypeScript is focusing on the *shape* an object has (often called "duck typing" or "structural
// typing"). Interfaces are the way of naming these types, and sort of act as contracts within your code.

//// Simple example to demonstrate
function simplePrintLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}
// ^ has a single parameter that requires that the object passed in has a property called 'label' of type 'string'

let myObj = { size: 10, label: "Size 10 Object" };
simplePrintLabel(myObj);
// `myObj` has more properties than simplePrintLabel needs, but the compiler only checks that at least the ones required are
// present and match the types required.
// NOTE: There are some cases where TS isn't as lenient, which will be covered later.
/////

//// Our first interface
// We can write the above example using an interface:
interface LabeledValue {
    label: string;
}

// Now the interface `LabeledValue` can be used to describe the requirement in the previous example.
function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

printLabel({ size: 10, label: "Size 10 Object" }); // Notice this doesn't work because of "excess property checking",
// which is described below. Object literals may only describe known properties.

let myOtherObj = { size: 10, label: "Size 10 Object" };
printLabel(myOtherObj);
// Notice we didn't specify that the object passed to printLabel implements the interface like we might have to in other
// statically typed languages. In TS, it's only the shape that matters (when we're passing in a variable, not an object
// literal). If the object passed meets the requirements of the shape, then it's good to go.
// NOTE: Worth noting the type checker doesn't care the about the order of the properties, just that they are present
// and have the required type.
/////

//// Optional properties
// Denoted by '?' at the end of the property name in the declaration.
interface SquareConfig {
    color?: string;
    width?: number;
}

//                                         : means the function is returning a non-`void` type, in this case an object
function createSquare(config: SquareConfig): { color: string, area: number } {
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

// The nice thing about optional properties is you can describe possibly available properties while still also
// preventing the use of properties that are not part of the interface.
// For instance, had we mistyped the `color` property in `createSquare`, we would get an error message letting us know:
// function createSquareWithError(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "white", area: 100 };
//     if (config.clor) { // Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
//         newSquare.color = config.color;
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }

// let mySquareError = createSquareWithError({ color: "black" });
/////

// Readonly properties
// Some properties should only be modified when an object is first created, and thus are readonly:
interface Point {
    readonly x: number;
    readonly y: number;
}
// Can construct a point by assigning an object literal. After assignment, x and y can't be changed:
// NOTE TO SELF: Just learned a boject literal is a POJO.
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // Error: Cannot assign to 'x' because it is a read-only property.

// TS also comes up with a `ReadonlyArray<T> type that is the same as an array type but with all the mutating methods
// removed so that you don't accidentally modify the array.
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // Index signature in type 'readonly number[]' only permits reading.ts(2542)
ro.push(5); // Error: Property 'push' does not exist on type 'readonly number[]'.ts(2339)
ro.length = 100; // Error: Cannot assign to 'length' because it is a read-only property.ts(2540)
a = ro; // Error: The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.ts(4104)
// Even assigning entire ReadonlyArray back to a normal array isn't allowed.
// However, it can be overridden with a type assertion:
a = ro as number[];

// `readonly` vs `const`
// Variables use `const`, whereas properties use `readonly`
/////

//// Excess property checks
// In the first example, we were able to pass a variable of shape ({ size: number, label: string }) to something that
// only expected { label: string }. And we have the optional properties, which allow us to pass "option bags".
// However, combining the two can cause problems. See below example:
function createSquareAgain(config: SquareConfig): { color: string; area: number } {
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
let mySquareAgain2 = createSquareAgain({ colour: "blue", width: 100 } as SquareConfig);
console.log(mySquareAgain2);
let mySquareAgain3 = createSquareAgain({ width: 100, opacity: 0.5 } as SquareConfig);
console.log(mySquareAgain3);

// 2) Add an index signature, which can be a better way.
// We can do this if we're sure hte object has some extra properties that we know are used in a special way. If
// `SquareConfig` can have `color` and `width` properties with the above types, but it can also have any number of other
// properties, we can define it like so:
interface SquareConfigWithIS { // IS -> index signature
    color?: string;
    area?: number;
    [propName: string]: any;
}
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
// Error: Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.ts(2559)

// Last important NOTE: for simple code, like above, it's not in our best interest to "get around" these checks. A
// majority of excess property errors are actually bugs, especially with option bags. In our example, if it's okay to
// pass in an object with both a `color` or `colour` property to createSquareAgain, we should fix the definition of
// the SquareConfig (or whatever interface we're using) to reflect that.
/////

//// Function types
// Interfaces can also describe function types. To do this, we give the interface a 'call signature'.
// A 'call signature' is like a function declaration with only the parameter list and the return type given:
interface SearchFunc {
    (source: string, subString: string): boolean;
}

// It can be used just like other interfaces:
let mySearch: SearchFunc;

mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
}

// NOTE: for function types to correctly type check, the names of the parameters do not need to match. This works:
let myOtherSearch: SearchFunc;

myOtherSearch = function (src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}

// Ah finally what I was looking for. Since the above functions are directly assigned to the interface SearchFunc, TS
// can contextually figure out the parameter types if they aren't specified:
let mySmartSearch: SearchFunc;

mySmartSearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
}
// And if the expression returned the wrong type (anything other than boolean here), it would throw an error:
let myDumbSearch: SearchFunc;

myDumbSearch = function (src, sub) {
    return "string";
}
// Error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// Type 'string' is not assignable to type 'boolean'.ts(2322)
/////

//// Indexable types
// Have 'index signatures' that describe the types we can use to index into the object, along with the corresponding
// returned types.:
interface StringArray {
    [index: number]: string; // the index signature says: when indexed with a number, it returns a string
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// Weird shit (and by weird, I mean interesting details under the hood)
// Index signatures support only string and number indexers. But the return type of a number indexer must be a subtype
// of the type returned from the numeric indexer. Why you ask? Idk.
// Apparently, when indexing with a number, JS actually converts that to a string before indexing into the object, e.g.
// indexing with the number 100 is the same thing as indexing with the string "100", so the two need to be consistent.
// Idk why and when we would use multiple indexers (just seems dangerous) but maybe we'll find out:
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

interface NotOkay {
    [x: number]: Animal; // Numeric index type 'Animal' is not assignable to string index type 'Dog'.ts(2413)
    [x: string]: Dog;
}
// I might need an example to show this. I get it in concept, but I don't understand why in practice.
interface Okay {
    [x: string]: Animal;
    [x: number]: Dog;
}

// String index signatures are a useful way to describe the "dictionary" pattern, i.e. having a string/word as a key
// that is used to return a value. BUT, it's important to note that they also enfoce that all properties in the
// interface match their return type. This actually makes sense!!! Because a stirng indexer means we can access the
// value by property invocation, i.e. `obj.property`, in addition to `obj["property"]. If that property is a number, we
// can't call `obj.property`, as that could be obj.10 which isn't a thing. Ex:
interface NumberDictionary {
    [index: string]: number;
    length: number;
    name: string; // Error: Property 'name' of type 'string' is not assignable to string index type 'number'.ts(2411)
}

// However, different types are allowed if the index signature is a union of property types:
interface NumberOrStringDicitonary {
    [index: string]: number | string;
    length: number;
    name: string;
}

// Index signatures can also be made readonly, in order to prevent reassignment:
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let cannotModify: ReadonlyStringArray = ["Alice", "Bob"];
cannotModify[2] = "Fred"; // Error: Index signature in type 'ReadonlyStringArray' only permits reading.ts(2542)
/////

//// Class types
/// Implementing an interface
// One of the most common used of interfaces in languages like C# or Java is that of explicitly enforcing a class.
// Surprise! Same with TypeScript!
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) {}
}

// Can also describe methods in an interface that are implemented in a class:
interface BetterClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class BetterClock implements BetterClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) {}
}

// NOTE: interfaces describe the public side of the class, not private. So this does not allow us to check that a class
// also has particular types for the private side.

/// Difference between the static and instance sides of classes
// When a class implements an interface, only the instance side of the class is checked. Since something like a
// constructor sits on the static side, it cannot included in the check:
interface BadClockConstructer {
    new (hour: number, minute: number);
}

class BadClock implements BadClockConstructer {
    // Error: Class 'BadClock' incorrectly implements interface 'ClockConstructer'.
    // Type 'BadClock' provides no match for the signature 'new (hour: number, minute: number): any'.ts(2420)

    currentTime: Date = new Date();
    constructor(h: number, m: number);
    // Constructor implementation is missing.ts(2390)
}

// Instead, we need to work with the static side directly, so we define two interfaces, one for the constructor and one
// for the instance methods. Then, for convenience, we can define a constructor function that creates instances of the
// type passed to it. So, the first way:
// 1) Define two interfaces
interface ClockConstructor {
    new (hour: number, minute: number): UpdatedClockInterface;
}

interface UpdatedClockInterface {
    tick(): void;
}

function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
): UpdatedClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements UpdatedClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log('beep beep');
    }
}

class AnalogClock implements UpdatedClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log('tick tick');
    }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)

// Another simple way is
// 2) Class expressions
// Using the interfaces from above:

const OtherClock: ClockConstructor = class OtherClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log('beep beep');
    }
}
/////

//// Extending interfaces
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;

// Can extend multiple interfaces, creating combos:
interface PenStroke {
    penWidth: number;
}

interface ComboSquare extends Shape, PenStroke {
    sideLength: number;
}

// let newSquare: ComboSquare = {}; // Why doesn't this work?
let newSquare = {} as ComboSquare;
newSquare.color = "blue";
newSquare.penWidth = 5.0;
newSquare.sideLength = 10;
console.log(newSquare);
/////

//// Hybrid types
// For objects that work as a combination of the basic types we talked about in 'basic_types.ts'.
// Ex) function and an object, with additional properties
interface Counter {
    (start: number): string; // remember this is a call signature where we have the parameter list and return type
    interval: number; // property of object
    reset(): void; // property of object that is a function
}

function getCounter(): Counter { // function takes no parameters, but returns a Counter
    let counter = function (start: number) {} as Counter; // I think this is type casting? init a function as a Counter
    counter.interval = 123; // assign a property of the counter object
    counter.reset = function () {} // assign another propeter of the counter object
    return counter // return the new counter
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
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() {}
}

class ImageControl implements SelectableControl {
    // Oh Nay Nay this can't work because SelectableControl extends a class that has private shit, and so ImageControl
    // would need to be a subclass to get that private shit. Alas, it won't work.
    private state: any; // Doesn't work because it's its own 'state' private member, rather than extending `Control`
    select() {}
}

// Within the `Control` class it is possible to access the `state` private member through an instance of
// `SelectableControl`. Effectively, `SelectableControl` acts like a `Control` that we know has a `select` method.
// NOTE: the `Button` and `TextBox` classes are subtypes of `SelectableControl` because they both inherit from `Control`
// and have a `select` method.