// Enums are one of the few features TS has which is not a type-level extension of JS.
// Enums allow a dev to define a set of named constances, which can make it easier to document intent or create a set of
// distinct cases. TS provides both numeric and string-based enums.

//// Numeric enums
enum Direction {
    Up = 1, // initialized the first one, and the rest are auto initialized (2, 3, and 4)
    Down,
    Left,
    Right
}
// `Direction.Up` has the value 1, `Down` 2, and 3, and 4 

// We can leave off initializers entirely (keep in mind this will index at 0):
enum DirectionNoInitializer {
    Up,
    Down,
    Left,
    Right
}

// To use an enum, just access any member as a property off of the enum itself, and delcare types using the name of the
// enum:
enum Responder {
    No = 0, // This is implicit, we do not need to initialize this
    Yes = 1 // or this, because it's 1 + No
}

function respond(recipient: string, message: Responder): void {
    // ...
}

respond("Princess Caroline", Responder.Yes);

// Numeric enums without initializers either need to be first or come after numeric enums initialized with numeric
// constance or other constant enum members. Basically, you can't do this:
enum E {
    A = getSomeValue(),
    B // Error! Enum member must have initializer
}
/////

//// String enums
// Similar concept, but have some runtime differences. In a string enum, each member has to be constant-initialized with
// a string literal or another string enum member.
enum DirectionString {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

// While they don't have auto-incrementing behavior, string-enums have the benefit that they "serialize" well. In other
// words, if you were debugging and had to read the runtime value of a numeric enum, the value doesn't convey any useful
// meaning on its own (though reverse maping can often help). String enums allow you to give a meaningful and readable
// value when your code runs, independent of the name of the emum member itself.
/////

//// Heterogeneous enums
// Techinically, they can be mixed. But not sure why you would want to (could be trying to manipulate JS's runtime
// behavior, but it's advised not to do this):
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES"
}
/////

//// Computed and constant members
// Each enum member has a value associated with it that is constant or computed.
// Constant is defined as:
// 1) It is the first member in the enum and it has no initializer (value = 0):
enum A {
    A
}
// 2) Does not have iniitalizer and the preceding enum member was a numeric constant (preceding value + 1):
enum E1 {
    X,
    Y,
    Z
}
  
enum E2 {
    A = 1,
    B,
    C
}
// All members of E1 and E2 are constant.

// 3) The enum member is initialized with a constant enum expression, which is a subset of TS expressions that can be
// fully evaluated at compile time. An expression is a constanct enum expression if it is:
//     a) a literal enum expression (basically a string literal or numeric literal)
//     b) a reference to previously defined constant enum memeber (which can originate from a different enum)
//     c) a parenthesized constant enum expression
//     d) one of the +, -, ~ unary operators applied to constant enum expressioins
//     e) +, -, *, /, %, <<, >>, >>>, &, |, ^ binary operators with constant enum expressions as operands
// It is a compile time error for constant enum expressions to be evaluated to `NaN` or `Infinity`.
// In all other cases, emum members are considered computed.
enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length
}
/////

//// Union emums and enum member types
// There is a special subset of constant enum members that aren’t calculated: literal enum members. A literal enum
// member is a constant enum member with no initialized value, or with values that are initialized to
//     * any string literal (e.g. "foo", "bar, "baz")
//     * any numeric literal (e.g. 1, 100)
//     * a unary minus applied to any numeric literal (e.g. -1, -100)

// When all members in an enum have literal enum values, some special semantics come to play. The first is that enum
// members also become types as well! For example, we can say that certain members can only have the value of an enum
// member:
enum ShapeKind {
    Circle,
    Square
}
  
interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}
  
interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}
  
let c: Circle = {
    kind: ShapeKind.Square, // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
    radius: 100
};


// The other change is that enum types themselves effectively become a union of each enum member. With union enums, the
// type system is able to leverage the fact that it knows the exact set of values that exist in the enum itself. Because
// of that, TypeScript can catch silly bugs where we might be comparing values incorrectly. For example:
enum X {
    Foo,
    Bar
}
  
function f(x: X) {
    if (x !== X.Foo || x !== X.Bar) {
      //             ~~~~~~~~~~~
      // Error! This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
    }
}
// If x isn't X.Foo, it must be X.Bar here, so we don't need to check both.
/////

//// Enums at runtime
// Enums are real objects that exist at runtime. For instance we can pass around enums to functions:
enum F {
    X,
    Y,
    Z
}

function f(obj: { X: number}) {
    return obj.X;
}

f(F); // Works, since 'F' has a property named 'X' which is a number.
/////

//// Enums at compile time
// Use `keyof` `typeof` to get a type that represents all enums as strings:
enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG
}
  
/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log("Log level key is:", key);
        console.log("Log level value is:", num);
        console.log("Log level message is:", message);
    }
}
printImportant("ERROR", "This is a message");

/// Reverse mappings
// Numeric enum members also get a 'reverse mapping' from enum values to enum names. For instance, TS might compile the
// following code:
enum Enum {
    M
}
let m = Enum.M;
let nameOfM = Enum[m]; // "L"
// into the following JS:
`
var Enum;
(function(Enum) {
    Enum[(Enum["M"] = 0)] = "M";
})(Enum || (Enum = {}));
var m = Enum.M;
var nameOfM = Enum[m]; // "A"
`
// In this generated code, an enum is compiled into an object that stores both forward (name -> value) and reverse
// (value -> name) mappings

/// `const` enums
// Const enums can only use constant enum expressions and unlike regular enums they are completely removed during
// compilation. Const enum members are inlined at use sites. This is possible since const enums cannot have computed
// members.
const enum ConstDirections {
    Up,
    Down,
    Left,
    Right
}
  
let directions = [
    ConstDirections.Up,
    ConstDirections.Down,
    ConstDirections.Left,
    ConstDirections.Right
];
// in generated code will become:
`
var directions = [0 , 1, 2, 3]; 
`
/////

//// Ambient enums
// Used to describe the shape of already existing enum types:
declare enum Enum {
    A = 1,
    B,
    C = 2
}

// One important difference between ambient and non-ambient enums is that, in regular enums, members that don’t have an
// initializer will be considered constant if its preceding enum member is considered constant. In contrast, an ambient
// (and non-const) enum member that does not have initializer is always considered computed.
