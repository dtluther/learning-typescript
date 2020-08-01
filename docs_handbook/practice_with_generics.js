"use strict";
exports.__esModule = true;
function genericIdentity(arg) {
    console.log(typeof arg);
    return arg;
}
console.log(genericIdentity('test'));
console.log(genericIdentity(5));
var combine = function (arg1, arg2) {
    return arg1 + arg2;
};
var genericCombine = function (arg1, arg2) {
    return arg1 + arg2;
};
console.log(genericCombine(7, 2));
console.log(combine("joined", "string"));
console.log(combine(1, 2));
// console.log(concat(1, "test")) // Yay, this doesn't work
function addFn(arg1, arg2) {
    return arg1 + arg2;
}
var addArrow = function (arg1, arg2) {
    return arg1 + arg2;
};
var promise = new Promise(function (resolve, reject) {
    resolve('winner');
});
console.log(promise);
