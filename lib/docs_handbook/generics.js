// Tools used for creating reusable components
//// Hello World of generics: the identity function
// It returns whatever is passed in.
// Can think of it in a similar way to the `echo` command
// Without generics, we would have to give the identity function a specific type
function notGenericIdentity(arg) {
    return arg;
}
// Or we could describe it using the any
function anyIdentity(arg) {
    return arg;
}
// The issue with `any` above we lose information with the returned type. If we again pass in a number, the inly info
// we have is that `any` type could be returned.
// So we can use a 'type variable', a special kind of variable that works on types rather than values:
function genericIdentity(arg) {
    return arg;
}
// The type variable allows us to capture the type the user provides so that we can use that info later, in this case to
// return the type.
// We say that this version of the identity function is generic, as it works over a wide range of types. Unlike using
// `any`, it's also just as precise as the first identity function.
// Once we have written the generic identity function, we can call it in one of two ways.
// 1) pass all of the arguments, including the type arg, to the function:
let output = genericIdentity("myString)"); // type of output will be a string
// 2) type argument inference, where the compiler infers the type for us automatically based on what we pass in:
let inferredType = genericIdentity("myString");
// The compiler can incorrectly infer, so sometimes we will have to specifically pass in the type.
/////
//// Working with generic type variables
// TS will enforce us to treat generically typed parameters as if they could be any and all types:
function loggingIdentity(arg) {
    console.log(arg.length); // Property 'length' does not exist on type 'T'.ts(2339)
    return arg;
}
// What if we intend this function to work with arrays of `T` rather than a `T` object directly:
function arrayOfType(arg) {
    console.log(arg.length);
    return arg;
}
/////
//// Generic types
// The type of generic functions is just like non-generic ones, i.e. the type parameters listed first:
let myIdentity = genericIdentity;
// We could also have useda a different name for the generic type parameter in the type (assuming other stuff matches):
let myOtherIdentity = genericIdentity;
// We could also write the generic type as a call signature of an object literal type:
let myAdditionalIdentity = genericIdentity;
function updatedIdentity(arg) {
    return arg;
}
let myUpdatedIdentity = updatedIdentity;
function alternativeIdentity(arg) {
    return arg;
}
let myAlternativeIdentity = alternativeIdentity;
/////
//// Generic classes
// Similar shape to a generic interface:
class GenericNumber {
}
let myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
// This is a pretty literl use of GenericNumber, but nothing restricted it to only the number type. We could have passed
// in a string or more complext objects:
let stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
function onlyTypesWithLength(arg) {
    console.log(arg.length); // Now we know it has a length property, so we can call it without error.
    return arg;
}
// Because it is now constrained, `onlyTypesWithLength` will no longer work over any and all types:
onlyTypesWithLength(3); // Argument of type '3' is not assignable to parameter of type 'Lengthwise'.ts(2345)
// Instead, we need to pass in values whose type has all the require properties:
onlyTypesWithLength({ length: 10, value: 3 });
/// Using type parameters in generic constraints
// We can declare a type parameter that is constrained by another type parameter.
// Ex) We want to make sure we only a property that exists on the obj below:
function getProperty(obj, key) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
/// Using class types in generics
// When creating factories (look up factories) using generics, it is necessary to refer to class types by their
// constructor functions. For instance:
function create(c) {
    return new c();
}
// More advanced example, using the prototype property to infer and constrain relationships between the constructor
// function and the instance of class types:
class BeeKeeper {
}
class ZooKeeper {
}
class Animal {
}
class Bee extends Animal {
}
class Lion extends Animal {
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nametag; // typechecks!
createInstance(Bee).keeper.hasMask; // typechecks!
