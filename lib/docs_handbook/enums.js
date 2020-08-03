// Enums are one of the few features TS has which is not a type-level extension of JS.
// Enums allow a dev to define a set of named constances, which can make it easier to document intent or create a set of
// distinct cases. TS provides both numeric and string-based enums.
//// Numeric enums
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
// `Direction.Up` has the value 1, `Down` 2, and 3, and 4 
// We can leave off initializers entirely (keep in mind this will index at 0):
var DirectionNoInitializer;
(function (DirectionNoInitializer) {
    DirectionNoInitializer[DirectionNoInitializer["Up"] = 0] = "Up";
    DirectionNoInitializer[DirectionNoInitializer["Down"] = 1] = "Down";
    DirectionNoInitializer[DirectionNoInitializer["Left"] = 2] = "Left";
    DirectionNoInitializer[DirectionNoInitializer["Right"] = 3] = "Right";
})(DirectionNoInitializer || (DirectionNoInitializer = {}));
// To use an enum, just access any member as a property off of the enum itself, and delcare types using the name of the
// enum:
var Responder;
(function (Responder) {
    Responder[Responder["No"] = 0] = "No";
    Responder[Responder["Yes"] = 1] = "Yes"; // or this, because it's 1 + No
})(Responder || (Responder = {}));
function respond(recipient, message) {
    // ...
}
respond("Princess Caroline", Responder.Yes);
// Numeric enums without initializers either need to be first or come after numeric enums initialized with numeric
// constance or other constant enum members. Basically, you can't do this:
var E;
(function (E) {
    E[E["A"] = getSomeValue()] = "A";
    E[E["B"] = void 0] = "B"; // Error! Enum member must have initializer
})(E || (E = {}));
/////
//// String enums
// Similar concept, but have some runtime differences. In a string enum, each member has to be constant-initialized with
// a string literal or another string enum member.
var DirectionString;
(function (DirectionString) {
    DirectionString["Up"] = "UP";
    DirectionString["Down"] = "DOWN";
    DirectionString["Left"] = "LEFT";
    DirectionString["Right"] = "RIGHT";
})(DirectionString || (DirectionString = {}));
// While they don't have auto-incrementing behavior, string-enums have the benefit that they "serialize" well. In other
// words, if you were debugging and had to read the runtime value of a numeric enum, the value doesn't convey any useful
// meaning on its own (though reverse maping can often help). String enums allow you to give a meaningful and readable
// value when your code runs, independent of the name of the emum member itself.
/////
//// Heterogeneous enums
// Techinically, they can be mixed. But not sure why you would want to (could be trying to manipulate JS's runtime
// behavior, but it's advised not to do this):
var BooleanLikeHeterogeneousEnum;
(function (BooleanLikeHeterogeneousEnum) {
    BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
    BooleanLikeHeterogeneousEnum["Yes"] = "YES";
})(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
/////
//// Computed and constant members
// Each enum member has a value associated with it that is constant or computed.
// Constant is defined as:
// 1) It is the first member in the enum and it has no initializer (value = 0):
var A;
(function (A) {
    A[A["A"] = 0] = "A";
})(A || (A = {}));
// 2) Does not have iniitalizer and the preceding enum member was a numeric constant (preceding value + 1):
var E1;
(function (E1) {
    E1[E1["X"] = 0] = "X";
    E1[E1["Y"] = 1] = "Y";
    E1[E1["Z"] = 2] = "Z";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2[E2["A"] = 1] = "A";
    E2[E2["B"] = 2] = "B";
    E2[E2["C"] = 3] = "C";
})(E2 || (E2 = {}));
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
var FileAccess;
(function (FileAccess) {
    // constant members
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // computed member
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
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
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
let c = {
    kind: ShapeKind.Square,
    radius: 100
};
// The other change is that enum types themselves effectively become a union of each enum member. With union enums, the
// type system is able to leverage the fact that it knows the exact set of values that exist in the enum itself. Because
// of that, TypeScript can catch silly bugs where we might be comparing values incorrectly. For example:
var X;
(function (X) {
    X[X["Foo"] = 0] = "Foo";
    X[X["Bar"] = 1] = "Bar";
})(X || (X = {}));
function f(x) {
    if (x !== X.Foo || x !== X.Bar) {
        //             ~~~~~~~~~~~
        // Error! This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
    }
}
// If x isn't X.Foo, it must be X.Bar here, so we don't need to check both.
/////
//// Enums at runtime
// Enums are real objects that exist at runtime. For instance we can pass around enums to functions:
var F;
(function (F) {
    F[F["X"] = 0] = "X";
    F[F["Y"] = 1] = "Y";
    F[F["Z"] = 2] = "Z";
})(F || (F = {}));
function f(obj) {
    return obj.X;
}
f(F); // Works, since 'F' has a property named 'X' which is a number.
/////
//// Enums at compile time
// Use `keyof` `typeof` to get a type that represents all enums as strings:
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function printImportant(key, message) {
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
var Enum;
(function (Enum) {
    Enum[Enum["M"] = 0] = "M";
})(Enum || (Enum = {}));
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
`;
let directions = [
    0 /* Up */,
    1 /* Down */,
    2 /* Left */,
    3 /* Right */
];
// in generated code will become:
`
var directions = [0 , 1, 2, 3]; 
`;
// One important difference between ambient and non-ambient enums is that, in regular enums, members that don’t have an
// initializer will be considered constant if its preceding enum member is considered constant. In contrast, an ambient
// (and non-const) enum member that does not have initializer is always considered computed.
