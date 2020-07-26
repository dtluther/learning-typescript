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
/////

//// `this` and arrow functions!!! (JS review below)
// `this` is set whena a function IS called!
// Arrow functions 'capture' the variable this (so arrow functions are closures, because they are capturing a variable
// from outside their scope)

let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() { // there is an inherent `this` that is left unassigned, so it will be assigned when called
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
    
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};

let cardPicker = deck.createCardPicker(); // returns the function with an unbound `this`
let pickedCard = cardPicker(); // now the returned function is finally called, and `this` is bound to the calling
// object, which is the `global` object here and the `window` in the browser.
alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// With arrow functions, we can capture the variable `this` where the function is created, rather than where it is
// invoked:
let deckWithArrowFunc = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        console.log(this);
        return () => { // arrow function captures `this` right here, which will be an instance of a `deck` object
            console.log(this);
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
    
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
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
function f(this: void) {
    `Make sure \`this\` is unusable in this standalone function.`;
}

// let's make the above deck and card situation more better
// starting with types:
interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
// createCardPicker is a function taking a parameter list (just `this`) and returns a function that returns a `Card`

let tsDeck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
        }
    }
}

let tsCardPicker = deck.createCardPicker();
let tsPickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

/// this parameter in callbacks
// I think this is specific, but good to be aware of, and at least to know I can find it here
// In order to avoid errors with `this` in callbacks (say, in a library), the [library author] needs to annotate the
// callback type with `this`:
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
let uiElement = {} as UIElement;
uiElement.addClickListener(h.onClickBad); // error!
// Here we said that `onClickBad` must be called on an instance of `Handler`. Then, the compiler sees addClickListener.
// In our interface, we said that addClickListener requires a function as a parameter. That function requires `this` to
// be a `void` type. So in `onClickBad`, we said `this` is type `Handler`, which breaks the contract of our interface.
// So to fix it, we need to change the type of this:
class BetterHandler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use `this` here because it's of type void!
        this.info = e.message;
        console.log("clicked!");
    }
}
let bh = new BetterHandler();
uiElement.addClickListener(bh.onClickGood);
// Because `onClickGood` specified that its `this` is `void`, it can be passed to `addClickListener`. Of course, this
// also means we can't use `this.info` because "Property 'info' does not exist on type 'void'.ts(2339)". If we want to
// use both, we need an arrow function:
class ArrowHandler {
    info: string;
    onClickArrow = (e: Event) => {
        this.info = e.message;
    }
}
let ah = new ArrowHandler();
uiElement.addClickListener(ah.onClickArrow);
// This works because arrow functions use the outer `this`, so we can always pass them to something that expects 
// `this: void`. <-- I don't understand why it's okay to pass an instance of `Handler` (or any object) to a `void` type
// yet...
// The downside is that one arrow function is created per object of type Handler. Methods, on the other hand, are only
// created once and attached to the Handler's protyotype. <-- Ahhh interesting! Good to know, so this makes them shared
// among all instances of type Handler without duplicating functions.