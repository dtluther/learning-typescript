///// Promises
// Constructor syntax, the function fassed to the new Promise is called the executor
let promise = new Promise(function(resolve, reject) {
    // the "executor", or the producing code
})
/*
* the executor runs automatically when a new promise object is created
* resolve and reject are callbacks provided by JS itself
*/

// When the executor produces its result, it will return one of these callbacks:
// `resolve(value)` if the job finished successfully, with the result `value`
// `rejet(error)` if an arror occured, with the `error` object

// the 'state; of the promise is initially 'pending', then changed to 'fulfilled' when `resolve` is called or 'rejected'
// when `reject` is called
// the 'result' goes from undefined to either 'value' or 'error' respectively

// -------------------------------
// let resolvedPromise = new Promise(function(resolve, reject) {
//     // this function executes automatically when the promise is constructed
//     setTimeout(() => resolve("success"), 1000);
// })

// console.log(resolvedPromise);
// setTimeout(() => console.log(resolvedPromise), 2000);

// let rejectedPromise = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error("Whoops!")), 1000)
// })
// console.log(rejectedPromise);
// setTimeout(() => console.log(rejectedPromise), 3000);

// // There can only be a single result or error. Any state change is final, and further changes are ignored:
// let firstImpressionWins = new Promise((resolve, reject) => {
//     resolve("Resolve happened first!");

//     reject(new Error("But I want to fail!")); // ignored
//     setTimeout(() => resolve("What about another win?"), 1000);
// })
// setTimeout(() => console.log(firstImpressionWins), 4000)
// ------------------------------------

//// Consumers: then, catch, finally
// A promise object serves as a link between the executor (the "produing code", or singer) and the consuming functions
// (the "fans"), which will receive the result or the error. Consuming functions can be registered (subscribed) using
// the methods `.then`, `.catch`, and `.finally`

/// `then`
promise.then(
    function(result) { /* handle a successful result */ }, // runs when the promise is resolved
    function(error) { /* handle error */ }, // runs when the promise is rejected
)

resolvedPromise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
});

resolvedPromise.then(
    result => console.log(result),
    error => console.log(error)
)

rejectedPromise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});
  
// reject runs the second function in .then
promise.then(
    result => alert(result), // doesn't run
    error => alert(error) // shows "Error: Whoops!" after 1 second
);

/// `catch`
// `.catch(f)` is the same as `.then(null, f)
rejectedPromise.catch(console.log); // shows "Error: Whoops!" after 1 second

/// `finally`
// Runs no matter what happens, good handler for cleanup, e.g. stopping our loading indicators as they are not needed
// anymore, no matter what the outcome is
// finally haandler has no args
// finally handler passed through results and args to the next handler
new Promise((resolve, reject) => {
    // do something that takes time, then call resolve/reject
    setTimeout(() => resolve('winner winner chicken dinner'), 1000)
})
    // runs when the promise is settled, doesn't matter how
   .finally(() => console.log("Stop the loading indicator!"))
   .then(
       result => console.log(`We can call handlers after finally, and the result is: ${result}`),
       error => console.log(`What the ...? ${error}`))

new Promise((resolve, reject) => {
    // do something that takes time, then call resolve/reject
    setTimeout(() => reject(new Error('Eat failure, freaks!')), 1000)
})
    // runs when the promise is settled, doesn't matter how
   .finally(() => console.log("Stop the loading indicator!"))
   .then(
       result => console.log(`We can call handlers after finally, and the result is: ${result}`),
       error => console.log(`What the ...? Error: ${error}`))

// NOTE: the handlers wait for a promise to settle, but if it's settled they run immediately

// A realworld example comparing callbacks to the new promises
if (this === window) {
    // callback version
    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));
    }

    // with promises
    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
        })
    }

    // usage
    let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

    promise.then(
        script => alert(`${script.src} is loaded!`),
        error => alert(`Error: ${error.message}`)
    )
    
    promise.then(script => alert('Another handler...'))
}

// Make setTimeout with a promise instead of callbacks:
const mySetTimeout = (timeInMs) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeInMs);
    })
}

mySetTimeout(3000).then(() => {
    this === window ? alert("We be in the window!") : console.log('It worked!')
});
