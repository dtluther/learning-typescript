// A 'literal' is a more concrete sub-type of a collective type, i.e. "Hello Worls" is a `string, but a `string` is not
// "Hello World" inside the type system.
// There are two sets of literal types available in TS today (7/27/20): strings and numbers. By using literal types, we
// can allow an exactly value which a string or number must have.
//// Literal narrowing
// The process of going from an infinite number of potential cases to a finite number of potential cases
// `var` and `let` tell the compiler that we could change the variable.
// `const` informs the compiler that this object will never change.
// We're making a guarantee that this variable helloWorld will never change, by using const.
const helloWorld = "Hello World"; // So, TypeScript sets the type to be "Hello World" not string
// On the other hand, a let can change, and so the compiler declares it a string
let hiWorld = "Hi World";
class UIElement {
    animate(dx, dy, easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // It's possible that someone could reach this
            // by ignoring your types though.
        }
    }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // Argument of type '"uneasy"' is not assignable to parameter of type 'Easing'.ts(2345)
// ... more overloads ...
function createElement(tagName) {
    // ... code goes here...
    return {};
}
// so for overloads, the last line has to be broad enough for any of the type inputs. Hence, in the last example in the
// functions.ts file, we use `any` because the options are string and number, and `any` is the minimum highest type
// to include them both
/////
//// Numeric literal types
// Act the same as the string literals above
function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}
const result = rollDice();
// setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
/////
