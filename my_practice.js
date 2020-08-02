var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function genericIdentity(arg) {
    console.log(typeof arg);
    return arg;
}
let combine = (arg1, arg2) => {
    return arg1 + arg2;
};
let betterCombine = (arg1, arg2) => {
    return arg1 + arg2;
};
function overloadCombine(arg1, arg2) {
    return arg1 + arg2;
}
// overloadCombine(1, 2);
// overloadCombine('joined', 'string');
function addFn(arg1, arg2) {
    return arg1 + arg2;
}
const addArrow = (arg1, arg2) => {
    return arg1 + arg2;
};
//// Promises
/// The old way with callbacks
const start = (callback) => {
    setTimeout(() => {
        callback('Hello');
        setTimeout(() => {
            callback('And Welcome');
            setTimeout(() => {
                callback('To Async/Await using TypeScript');
            }, 1000);
        }, 1000);
    }, 1000);
};
// start(text => console.log(text));
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
const waited = wait(1000);
// console.log(waited);
// setTimeout(() => console.log(waited), 2000)
const startAsync = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    yield wait(1000);
    callback('Hello');
    yield wait(1000);
    callback('And Welcome!');
    yield wait(1000);
    callback('To Async/Await using TypeScript');
});
// startAsync(text => console.log(text));
/// Promises in TypeScript
const firstPromise = new Promise((resolve, reject) => { });
// firstPromise.then(value => {
//     console.log('resolved', value);
// })
// firstPromise.catch(error => {
//     console.log('rejected', error);
// })
const showResolvedOutcome = (promise) => {
    promise.then(value => {
        console.log('resolved', value);
    });
};
const showRejectedOutcome = (promise) => {
    promise.catch(error => {
        console.log('rejected', error);
    });
};
// firstPromise not resolved or rejected, so neither a then nor a catch will be hit. This promise stays 'pending'
showResolvedOutcome(firstPromise);
showRejectedOutcome(firstPromise);
const resolvedPromise = new Promise((resolve, reject) => { resolve("Hello"); });
const rejectedPromise = new Promise((resolve, reject) => { reject(new Error("Rejected")); });
showResolvedOutcome(resolvedPromise);
showRejectedOutcome(rejectedPromise);
// Promise chains actually create new promise objects
const one = new Promise((resolve, reject) => {
    resolve("Hello");
});
const two = one.then(value => console.log(value)); // void because we aren't returning a value
two.then(value => {
    console.log('Hi', value);
});
const resolvedTwo = one.then(value => value); // so now two also resolves
resolvedTwo.then(value => console.log("resolvedTwo:", value));
const rejectedTwo = one.then(value => {
    throw new Error("WHHHOOOOOPPPS");
});
rejectedTwo.catch(error => console.log("rejectedTwo:", error));
/// async/await
// Async functions always return promise
const asyncFn = () => __awaiter(void 0, void 0, void 0, function* () { return console.log('async function'); });
console.log('This is asyncFn() output -->', asyncFn());
const a = 'One';
const b = new Promise((resolve, _) => resolve("Two"));
const c = new Promise((_, reject) => reject(new Error("Three")));
function gilad() {
    return __awaiter(this, void 0, void 0, function* () {
        const four = yield a; // setTimeout(() => {}, 0), so still async but goes straight to callback queue
        console.log({ a: four });
        const five = yield b;
        console.log({ b: five });
        try {
            const six = yield c;
            console.log("This ain't gonna print.");
        }
        catch (_a) {
            console.log("But this catch clause will!");
        }
    });
}
;
gilad();
function waitUntilDone() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 5000));
        console.log("The awaited promise one line above me finished, so now I can say I'M DONE!");
    });
}
;
waitUntilDone();
