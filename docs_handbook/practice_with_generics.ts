import { resolve } from "path";

function genericIdentity<T>(arg: T) {
    console.log(typeof arg);
    return arg;
}

console.log(genericIdentity('test'));
console.log(genericIdentity<number>(5));


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

let combine: Combinable = (arg1, arg2) => {
    return arg1 + arg2;
}

let betterCombine: betterCombinable = (arg1, arg2) => {
    return arg1 + arg2;
}

console.log(betterCombine("joined", "string"))
console.log(betterCombine(1, 2))
// console.log(concat(1, "test")) // Yay, this doesn't work

function overloadCombine(arg1: string, arg2: string): string;
function overloadCombine(arg1: number, arg2: number): number;
function overloadCombine(arg1, arg2) {
    return arg1+ arg2
}
overloadCombine(1, 2);
overloadCombine('joined', 'string');


function addFn(arg1: number, arg2: number): number {
    return arg1 + arg2;
}

const addArrow: (arg1: number, arg2: number) => number = (arg1, arg2) => {
    return arg1 + arg2;
}

// const promise: Promise<T> = new Promise((resolve, reject) => {
//     resolve('winner');
// })

// console.log(promise);

let async: (())