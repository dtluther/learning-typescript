// Basic Types //
// boolean
let isDone = false;
// number
// All numbers in TypeScript are  floating point values. TS supports decimal, hexadecimal, binary, and octal literls.
let decimal = 6;
let hex = 0xf00d;
let binary = 0b1010;
let octal = 0o744;
// string
// Single or double quotes
// Can also use `template strings` which can span multiple lines and have embedded expressions
let color = "red";
color = 'blue';
let fullName = 'John Smith';
let age = 37;
let sentence = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;
console.log(sentence);
// Which is basically equivalent to:
let sentence2 = "Hello, my name is " +
    fullName +
    ".\n\n" +
    "I'll be " +
    (age + 1) +
    " years old next month.";
// array
// Can be written one of two ways:
// 1) The type of elements follows by []
let list = [1, 2, 3];
// 2) Use a generic array type, `Array<elemType>`
let list2 = [1, 2, 3];
// tuple
// Tuple types allow you to express an array with a fixed number of elements which known types that need not be the same
// 1) Declare a typle type
let x;
// 2) Initialize it
x = ["hello", 10];
console.log(x[0].substring(1));
// The lines below have errors, and if uncommented we can see them
console.log(x[1].substring(1));
x[3] = 'world';
console.log(x[5].toString());
// enum
// An addition to the standard set of datatypes from JS
// An enum is a way of giving more friendly names to sets of numeric values (like in C#)
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let c = Color.Green;
console.log(c);
// By default, enums begin numbering at 0. This can be changed by manually setting the value of one of its members
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 1] = "Red";
    Color1[Color1["Green"] = 2] = "Green";
    Color1[Color1["Blue"] = 3] = "Blue";
})(Color1 || (Color1 = {}));
let c2 = Color1.Green;
// Or we can manually set all of them
var ColorManual;
(function (ColorManual) {
    ColorManual[ColorManual["Red"] = 1] = "Red";
    ColorManual[ColorManual["Green"] = 2] = "Green";
    ColorManual[ColorManual["Blue"] = 4] = "Blue";
})(ColorManual || (ColorManual = {}));
let cMan = ColorManual.Green;
// A useful feature is we can go from the numeric value to the name of the value in the enum
let colorName = ColorManual[2];
console.log(colorName);
// unknown
// We may need to describe the type of variables we do not know when writing an application, such as values that come
// from dynamic content -- e.g. from the user -- or we may want to accept all values in our API (really...?).
let whoKnows = 4;
whoKnows = "maybe a string instead";
whoKnows = false;
// const aNumber: number = maybe; // Error: "Type 'unknown' is not assignable to 'number'."
// a) comparison check:
if (maybe === true) {
    // TS knows that 'maybe' is now a boolean now
    const aBoolean = maybe;
    // const aString: string = maybe; // so it cannot be a string
}
// b) `typeof` check (type guards):
if (typeof maybe === "string") {
    // TS knows that 'maybe' is now a string now
    const aString = maybe;
}
const str = getValue("myString"); // Would be checked at run time
// It can be useful for working with existing JS, since you can gradually opt in to type checking.
// Unlike `unknown`, type `any` variables allow you access arbitrary properties, even ones that don't exist. These
// properties include functions and TS will not check their existence or type:
let looselyTyped = 4;
looselyTyped.ifItExists(); // Ok, ifItExists might exist at runtime
looselyTyped.toFixed(); // okay, toFixed exists (but the compiler doesn't check, because it's an any)
let strictlyTyped = 4;
// strictlyTyped.toFixed(); // Error: "Property 'toFixed' does not exist on type 'unknown'."
// NOTE: `any` will propagate through your objects:
let evenLooser = {};
let d = evenLooser.a.b.c.d; // so d is type `any`
// NOTE: Apparently, in other languages, the `Object` type plays a similar role to TS's `any`.
// However, TS `Object` only allows you to assign a value to them. You can't call arbitrary methods on them, even ones
// that actually exists. NOTE: there is a non-primitive `object` type to use instead, talked about later.
let notSure = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check, because it's an any)
let prettySure = 4;
// prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
// `any` can also be useful (Idk about this) if you know some part of the type, but not all.
let someKnown = [1, true, "who knows"];
someKnown[0] = false;
// void
// The opposite of any: the absence of having any type at all.
// This is commonly seen as the return types of some functions that do not return a value.
function warnUser() {
    console.log("This is my warning message");
}
// void is not useful because you can only assign `null` (only if --stringNullChecks is not specified) or `undefined` to
// them
let unusable = undefined;
unusable = null; // OK if `strictNullNecks` is not given
// null and undefined
// By default, they are subtypes of other types, like a `number` for instance.
// However, when using the `--strictNullChecks` flag, `null` and `undefined` are only assignable to `any` and their
// respective types (the one exception being `undefined` can also be be assigned to `void`), which helps avoid many
// errors. In a case where you want to pass either a `string` or `null` or `undefined`, you can use the `union` type:
// string | null | undefined
// `union` is an advanced topic covered later.
// NOTE: handbook encourages use of `--strictNullChecks`, when possible, but assume it is turned off for the purposes
// of this handbook.
let u = undefined;
let n = null;
// never
// The types of values that never occur.
// For instance, the return type for a function expression or an arrow function expression that always throws an
// exception or one that never returns.
// Variables also acquire the `never` type when narrows by any type guard that can never be true.
// `never` is a subtype of, and assignable to every type. However, the opposite is not true. Even `any` isn't assignable
// to `never`.
// Ex 1) Function returning never must have unreachable endpoint:
function error(message) {
    throw new Error(message);
}
// 2) Inferred return type is `never`:
function fail() {
    return error("Something failed");
}
// 3) Function returing never must have unreachable endpoint
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // OK
// create(null); // OK
// create(42); // Error
// create("string"); // Error
// create(false); // Error
create(undefined); // Says it's Error in handbook, but I don't get one...
// Type assertions
// In cases where we know more about a value than TS does, i.e. when we know the type of some entity could be more
// specific than its current type, we can use type assertions to tell the compiler "trust me, I know what I'm doing." A
// type assertion is like a type cast in other languages, but it performs not special checking or restructuring of data.
// It has no runtime impact, and it is used purely by the compiler. TS assumes that the programmer has performed any
// any special checks they need.
// Two forms:
// 1) "angle-bracket" syntax:
let someValue = "this is a string";
let strLength = someValue.length;
// 2) "as" syntax: (NOTE when using TS with JSX, only "as" assertions are allowed!)
let anotherValue = "string number 2";
let anotherLength = anotherValue.length;
