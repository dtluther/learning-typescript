//// Quick JS recap
// Named function
function add(x, y) {
    return x + y;
}
// Anonymous function
var myAdd = function (x, y) {
    return x + y;
};
// Closures
var z = 100;
function addTo(x, y) {
    return x + y + z; // captures the value z from outside the function scope, due to lexical scoping in JS
}
/////
//// Typing the function
// Let's add types to the simple examples from above:
function addTyped(x, y) {
    return x + y;
}
var myAddTyped = function (x, y) {
    return x + y + z;
};
console.log(myAddTyped(1, 2));
/////
//// Writing the function type
// Now that we've typed the function, let's fully type the function by looking at each piece of the function type:
var myAddFullyTyped = function (x, y) {
    return x + y + z;
};
// A function's type has the same two parts: the type of the arguments and the return type. Both are required when
// writing out the whole function type. Parameter types are just like a parameter list, each with a name and type. The
// name is just to help with readability. Hence, we could have done:
var myAddNames = function (x, y) {
    return x + y + z;
};
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
var justParameters = function (x, y) {
    return x + y; // yes, I'm dropping the captured 'z' because the docs don't have it
};
// full function type
// essentially, typing that right of equals sign
var fullFunctionType = function (x, y) {
    return x + y;
};
// Above is called "contextual typing", and helps cut down the amount of effor to keep the program typed.
/////
//// Optional and default params
// Contrary to JS, every param in TS is assumed to be required by the function, even if the type is param is type `null` or
// `undefined`. The compiler also assumes the specified parameters are the only parameters that will be passed to the
// function, and will throw errors if the wrong number is given:
function buildName(firstName, lastName) {
    return firstName + lastName; // because we returned a string here, TS inferred. Hover over definition to see.
}
var result1 = buildName('Bob'); // too few parameters
var result2 = buildName('Bob', 'Adams', 'Sr.'); // too many parameters
var result3 = buildName('Bob', 'Adams');
// If we want optional params in TS, we can do it by adding a ? to the param name:
function buildNameOptional(firstName, lastName) {
    if (lastName)
        return firstName + " " + lastName;
    return firstName;
}
var result4 = buildNameOptional('Bob'); // works correctly now!
var result5 = buildNameOptional('Bob', 'Adams', 'Sr.'); // too many parameters
var result6 = buildNameOptional('Bob', 'Adams');
// NOTE: optional parameters must follow required parameters
// default params, same as usual:
function buildNameDefault(firstName, lastName) {
    if (lastName === void 0) { lastName = "Smith"; }
    return firstName + " " + lastName;
}
var result7 = buildNameDefault('Bob'); // returns "Bob Smith"
var result8 = buildNameDefault('Bob', undefined); // still works, also returns "Bob Smith"
var result9 = buildNameDefault('Bob', 'Adams', 'Sr.'); // too many parameters
var result10 = buildNameDefault('Bob', 'Adams');
// Both optional and default parameters share the same type:
// (firstName: string, lastName?: string) => string.
// Default params don't need to occur after required params. But if we want the default value, we need to explicitly
// pass `undefined` to the default param:
function defaultFirst(firstName, lastName) {
    if (firstName === void 0) { firstName = "Will"; }
    return firstName + " " + lastName;
}
var result11 = defaultFirst('Bob'); // error, too few params
var result12 = defaultFirst('Bob', 'Adams', 'Sr.'); // too many parameters
var result13 = defaultFirst('Bob', 'Adams');
var result14 = defaultFirst(undefined, 'Adams'); // returns "Will Adams"
/////
//// Rest parameters
// Can use the spread operator to gather multiple arguments into a single variable
function buildLotsOfNames(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildLotsOfNames("Joseph", "Samuel", "Lucas", "MacKinzie");
// Rest parameters are treated as a boundless number of optional parameters, and the compiler will build them into an
// array. Can also be used in the type of function:
var buildNameFunc = buildLotsOfNames;
/////
//// `this` and arrow functions!!! (JS review below)
// `this` is set whena a function IS called!
// Arrow functions 'capture' the variable this (so arrow functions are closures, because they are capturing a variable
// from outside their scope)
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker(); // returns the function with an unbound `this`
var pickedCard = cardPicker(); // now the returned function is finally called, and `this` is bound to the calling
// object, which is the `global` object here and the `window` in the browser.
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
// With arrow functions, we can capture the variable `this` where the function is created, rather than where it is
// invoked:
var deckWithArrowFunc = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        console.log(this);
        return function () {
            console.log(_this);
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
cardPicker = deckWithArrowFunc.createCardPicker();
pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
// Now the great thing about TS is that it will warn you when you make this mistake if you pass the `--noImplicitThis`
// flag to the compiler. It will point out that `this` in `this.suits[pickedSuit]` is of type `any`.
//// `this` parameters
// `this` has the type `any` because `this` comes from the function expression inside the object literal. To solve this
// problem, we can assign an explicit `this` parameter, which is a fake parameter that comes first in the parameter list
// of a function:
function f() {
    "Make sure `this` is unusable in this standalone function.";
}
// createCardPicker is a function taking a parameter list (just `this`) and returns a function that returns a `Card`
var tsDeck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var tsCardPicker = deck.createCardPicker();
var tsPickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);

/// this parameter in callbacks:
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // oops, used `this` here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!