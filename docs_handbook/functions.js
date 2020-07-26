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
