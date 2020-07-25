// Interfaces //
// A core principle of TypeScript is focusing on the *shape* an object has (often called "duck typing" or "structural
// typing"). Interfaces are the way of naming these types, and sort of act as contracts within youre code.

/// Simple example to demonstrate
function simplePrintLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}
// ^ has a single parameter that requires that the object passed in has a property called 'label' of type 'string'

let myObj = { size: 10, label: "Size 10 Object" };
simplePrintLabel(myObj);
// `myObj` has more properties than simplePrintLabel needs, but the compiler only checks that at least the ones required are
// present and match the types required.
// NOTE: There are some cases where TS isn't as lenient, which will be covered later.
////

/// Our first interface
// We can write the above example using an interface:
interface LabeledValue {
    label: string;
}

// Now the interface `LabeledValue` can be used to describe the requirement in the previous example.
function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

// printLabel({ size: 10, label: "Size 10 Object" }); // Notice this doesn't work because of "excess property checking",
// which is described below
let myOtherObj = { size: 10, label: "Size 10 Object" };
printLabel(myOtherObj);
// Notice we didn't specify that the object passed to printLabel implements the interface like we might have to in other
// statically typed languages. In TS, it's only the shape that matters. If the object passed meets the requirements of
// the shape, then it's good to go.
// NOTE: Worth noting the type checker doesn't care the about the order of the properties, just that they are present
// and have the required type.
////

/// Optional properties
// Denoted by '?' at the end of the property name in the declaration.
interface SquareConfig {
    color?: string;
    width?: number;
}

//                                         : means the function is returning a non-`void` type, in this case an object
function createSquare(config: SquareConfig): { color: string; area: number } {
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
////

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
////

/// Excess property checks