import { resolve } from "path";

function genericIdentity<T>(arg: T) {
    console.log(typeof arg);
    return arg;
}

// console.log(genericIdentity('test'));
// console.log(genericIdentity<number>(5));
// console.log(genericIdentity(5));


interface Addable {
    (arg1: number, arg2: number): number;
}

interface Concatable {
    (arg1: string, arg2: string): string;
}

type Combinable = Addable & Concatable

interface betterCombinable{
    (arg1: number, arg2: number): number;
    (arg1: string, arg2: string): string;
}

// let combine: Combinable = (arg1, arg2) => {
//     return arg1 + arg2;
// }

// let betterCombine: betterCombinable = (arg1, arg2) => {
//     return arg1 + arg2;
// }

// console.log(betterCombine("joined", "string"))
// console.log(betterCombine(1, 2))
// console.log(concat(1, "test")) // Yay, this doesn't work

function overloadCombine(arg1: string, arg2: string): string;
function overloadCombine(arg1: number, arg2: number): number;
function overloadCombine(arg1: any, arg2: any) {
    return arg1 + arg2
}
// overloadCombine(1, 2);
// overloadCombine('joined', 'string');


function addFn(arg1: number, arg2: number): number {
    return arg1 + arg2;
}

const addArrow: (arg1: number, arg2: number) => number = (arg1, arg2) => {
    return arg1 + arg2;
}

//// Promises
/// The old way with callbacks
const start = (callback: (text: string) => void) => {
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

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
const waited = wait(1000);
// console.log(waited);
// setTimeout(() => console.log(waited), 2000)

const startAsync = async (callback: (s: string) => void) => {
    await wait(1000);
    callback('Hello');
    await wait(1000);
    callback('And Welcome!');
    await wait(1000);
    callback('To Async/Await using TypeScript');
}

// startAsync(text => console.log(text));

/// Promises in TypeScript
const firstPromise = new Promise<string>((resolve, reject) => {});

// firstPromise.then(value => {
//     console.log('resolved', value);
// })

// firstPromise.catch(error => {
//     console.log('rejected', error);
// })

const showResolvedOutcome = <T>(promise: Promise<T>) => {
    promise.then(value => {
        console.log('resolved', value);
    })
};
const showRejectedOutcome = <T>(promise: Promise<T>) => {
    promise.catch(error => {
        console.log('rejected', error);
    })
}

// firstPromise not resolved or rejected, so neither a then nor a catch will be hit. This promise stays 'pending'
showResolvedOutcome(firstPromise);
showRejectedOutcome(firstPromise);

const resolvedPromise = new Promise<string>((resolve, reject) => {resolve("Hello")});
const rejectedPromise = new Promise<Error>((resolve, reject) => {reject(new Error("Rejected"))});

showResolvedOutcome(resolvedPromise);
showRejectedOutcome(rejectedPromise);

// // Promise chains actually create new promise objects
// const one: Promise<string> = new Promise((resolve, reject) => {
//     resolve("Hello");
// })

// const two: Promise<void> = one.then(value => console.log(value)); // void because we aren't returning a value
// two.then(value => {
//     console.log('Hi', value);
// })

// const resolvedTwo: Promise<string> = one.then(value => value); // so now two also resolves
// resolvedTwo.then(value => console.log("resolvedTwo:", value))

// const rejectedTwo: Promise<object> = one.then(value => {
//     throw new Error("WHHHOOOOOPPPS");
// });
// rejectedTwo.catch(error => console.log("rejectedTwo:", error));

// /// async/await
// // Async functions always return promise
// const asyncFn: () => Promise<void> = async () => console.log('async function');
// console.log('This is asyncFn() output -->', asyncFn());

// const x: string = 'One';
// const y: Promise<string> = new Promise((resolve, _) => resolve("Two"));
// const z: Promise<Error> = new Promise((_, reject) => reject(new Error("Three")));

// async function gilad(): Promise<void> {
//     const four: string = await x; // setTimeout(() => {}, 0), so still async but goes straight to callback queue
//     console.log({ x: four });
//     const five: string = await y;
//     console.log({ y: five });
//     try {
//         const six: Error = await z;
//         console.log("This ain't gonna print.");
//     }
//     catch{
//         console.log("But this catch clause will!");
//     }
// };

// gilad();

// async function waitUntilDone(): Promise<void> {
//     await new Promise(resolve => setTimeout(resolve, 5000));
//     console.log("The awaited promise one line above me finished, so now I can say I'M DONE!");
// };

// waitUntilDone();

// type Cat = { name: string, purrs: boolean };
// type Dog = { name: string, barks: boolean, wags: boolean };
// type CatOrDogOrBoth = Cat | Dog
// type CatAndDog = Cat & Dog

// let cat: CatOrDogOrBoth = {
//     name: 'Bonkers',
//     purrs: true
// }

// let dog: CatOrDogOrBoth = {
//     name: 'domino',
//     barks: true,
//     wags: true
// }

// let both: CatOrDogOrBoth =  {
//     name: 'Donkers',
//     purrs: true,
//     barks: true,
//     wags: true
// }

// let combined: CatAndDog = { // requires all properties, where as Unions require one or the other
//     name: 'Combo',
//     purrs: true,
//     barks: true,
//     wags: true
// }

// let a = 1042;
// let b = 'apples and oranges';
// const c = 'pineapples';
// let d = [true, true, false];
// let e = { type: 'ficus' }
// let f = [1, false]
// const g = [3]
// let h = null