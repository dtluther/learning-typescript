//// Quick JS recap
// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) {
    return x + y;
}

// Closures
let z = 100;
function addTo(x, y) {
    return x + y + z; // captures the value z from outside the function scope, due to lexical scoping in JS
}
/////

//// Typing the function
// Let's add types to the simple examples from above:
function addTyped(x: number, y: number): number {
    return x + y;
}

let myAddTyped = function(x: number, y: number): number {
    return x + y + z;
}

console.log(myAddTyped(1, 2));
/////

//// Writing the function type
// Now that we've typed the function, let's fully type the function by looking at each piece of the function type:
let myAddFullyTyped: (x: number, y: number) => number = function(
    x: number,
    y: number
): number {
    return x + y + z;
}

// A function's type has the same two parts: the type of the arguments and the return type. Both are required when
// writing out the whole function type. Parameter types are just like a parameter list, each with a name and type. The
// name is just to help with readability. Hence, we could have done:
let myAddNames: (baseValue: number, increment: number) => number = function(
    x: number,
    y: number
): number {
    return x + y + z;
}
// As long as the types line up, the function is valid.
// The second part is the return type, which is clearly denoted by the fat arrow =>. This is a required part of the
// function type, so if the function doesn't return a value, you would use use `void` instead of leaving it off.
// Also note that only the parameters and the return type make of the function type. Captured variables are not
// reflected in the type. Essentially, captured variables are part of the "hidden state" of any function and do not make
// up its API.
/////

//// Inferring the types
// As I was just starting to complain about, we've noticed that the TS compiler can figure out the type even if it's
// only denoted on one side of the equation:

// the parameters 'x' and 'y' have the type number
// essentially, typing that right of equals sign
let justParameters = function(x: number, y: number): number {
    return x + y; // yes, I'm dropping the captured 'z' because the docs don't have it
}

// full function type
// essentially, typing that right of equals sign
let fullFunctionType: (baseValue: number, increment: number) => number = function(x, y) {
    return x + y;
}

// Above is called "contextual typing", and helps cut down the amount of effor to keep the program typed.
/////

//// Optional and default params
// Contrary to JS, every param in TS is assumed to be required by the function, even if the type is param is type `null` or
// `undefined`. The compiler also assumes the specified parameters are the only parameters that will be passed to the
// function, and will throw errors if the wrong number is given:
function buildName(firstName: string, lastName: string) {
    return firstName + lastName; // because we returned a string here, TS inferred. Hover over definition to see.
}

let result1 = buildName('Bob'); // too few parameters
let result2 = buildName('Bob', 'Adams', 'Sr.'); // too many parameters
let result3 = buildName('Bob', 'Adams');

// If we want optional params in TS, we can do it by adding a ? to the param name:
function buildNameOptional(firstName: string, lastName?: string) {
    if (lastName) return firstName + " " + lastName;
    return firstName;
}

let result4 = buildNameOptional('Bob'); // works correctly now!
let result5 = buildNameOptional('Bob', 'Adams', 'Sr.'); // too many parameters
let result6 = buildNameOptional('Bob', 'Adams');
// NOTE: optional parameters must follow required parameters

// default params, same as usual:
function buildNameDefault(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result7 = buildNameDefault('Bob'); // returns "Bob Smith"
let result8 = buildNameDefault('Bob', undefined); // still works, also returns "Bob Smith"
let result9 = buildNameDefault('Bob', 'Adams', 'Sr.'); // too many parameters
let result10 = buildNameDefault('Bob', 'Adams');

// Both optional and default parameters share the same type:
// (firstName: string, lastName?: string) => string.

// Default params don't need to occur after required params. But if we want the default value, we need to explicitly
// pass `undefined` to the default param:
function defaultFirst(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result11 = defaultFirst('Bob'); // error, too few params
let result12 = defaultFirst('Bob', 'Adams', 'Sr.'); // too many parameters
let result13 = defaultFirst('Bob', 'Adams');
let result14 = defaultFirst(undefined, 'Adams'); // returns "Will Adams"
/////

//// Rest parameters
// Can use the spread operator to gather multiple arguments into a single variable
function buildLotsOfNames(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildLotsOfNames("Joseph", "Samuel", "Lucas", "MacKinzie");

// Rest parameters are treated as a boundless number of optional parameters, and the compiler will build them into an
// array. Can also be used in the type of function:
let buildNameFunc: (firstName: string, ...restOfName: string[]) => string = buildLotsOfNames;