// Tools used for creating reusable components

//// Hello World of generics: the identity function
// It returns whatever is passed in.
// Can think of it in a similar way to the `echo` command

// Without generics, we would have to give the identity function a specific type
function notGenericIdentity(arg: number): number {
    return arg;
}

// Or we could describe it using the any
function anyIdentity(arg: any): any {
    return arg;
}

// The issue with `any` above we lose information with the returned type. If we again pass in a number, the inly info
// we have is that `any` type could be returned.
// So we can use a 'type variable', a special kind of variable that works on types rather than values:
function genericIdentity<T>(arg: T): T {
    return arg;
}

// The type variable allows us to capture the type the user provides so that we can use that info later, in this case to
// return the type.

// We say that this version of the identity function is generic, as it works over a wide range of types. Unlike using
// `any`, it's also just as precise as the first identity function.

// Once we have written the generic identity function, we can call it in one of two ways.
// 1) pass all of the arguments, including the type arg, to the function:
let output = genericIdentity<string>("myString)"); // type of output will be a string
// 2) type argument inference, where the compiler infers the type for us automatically based on what we pass in:
let inferredType = genericIdentity("myString");

// The compiler can incorrectly infer, so sometimes we will have to specifically pass in the type.
/////

//// Working with generic type variables
// TS will enforce us to treat generically typed parameters as if they could be any and all types:
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length); // Property 'length' does not exist on type 'T'.ts(2339)
    return arg;
}

// What if we intend this function to work with arrays of `T` rather than a `T` object directly:
function arrayOfType<T>(arg: Array<T>): Array<T> { // Can also use 'T[]'
    console.log(arg.length);
    return arg;
}
/////

//// Generic types
// The type of generic functions is just like non-generic ones, i.e. the type parameters listed first:
let myIdentity: <T>(arg: T) => T = genericIdentity;

// We could also have useda a different name for the generic type parameter in the type (assuming other stuff matches):
let myOtherIdentity: <U>(arg: U) => U = genericIdentity;

// We could also write the generic type as a call signature of an object literal type:
let myAdditionalIdentity: { <T>(arg: T): T } = genericIdentity;

// ... which leads us to our first generic identity:
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function updatedIdentity<T>(arg: T): T {
    return arg;
}

let myUpdatedIdentity: GenericIdentityFn = updatedIdentity;

// Another useful option would be to move the generic parameter to be a parameter of the whole interface rather than a
// function within the interface. This allows us to see wah type(s) we're generic over, and makes the parameter visible
// to all other members of the interface (if that's what we want):
interface GenericInterfaceFn<T> {
    (arg: T): T;
}

function alternativeIdentity<T>(arg: T): T {
    return arg;
}

let myAlternativeIdentity: GenericInterfaceFn<number> = alternativeIdentity;

/////

//// Generic classes
// Similar shape to a generic interface:
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
  
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
    return x + y;
};
// This is a pretty literl use of GenericNumber, but nothing restricted it to only the number type. We could have passed
// in a string or more complext objects:
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) {
    return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// Just as with an interface, putting the type parameter on the class itself lets us make sure all of the properties of
// the class are working with the same type.

// NOTE: Generic classes are only generic over their instances side rather than their static side. So when working with
// classes, static members can NOT us the class's type parameter.
/////

//// Generic constraints
// In our above logging example, what if we wanted to only have types that had a property called length? This is where
// generic constraints come in. We can make an interface that describes the constraint, and then we can extend it to the
// function to denote the constraint:
interface Lengthwise {
    length: number;
}

function onlyTypesWithLength<T extends Lengthwise>(arg: T): T {
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
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
  
let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

/// Using class types in generics
// When creating factories (look up factories) using generics, it is necessary to refer to class types by their
// constructor functions. For instance:
function create<T>(c: { new (): T}): T {
    return new c();
}

// More advanced example, using the prototype property to infer and constrain relationships between the constructor
// function and the instance of class types:
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag; // typechecks!
createInstance(Bee).keeper.hasMask; // typechecks!