var nodeFetch = require('node-fetch');

// let fn: () => string = () => {
//     console.log('It has been 5 seconds');
//     return 'test';
// }
// const val: string = fn();

// setTimeout(fn, 5000);
// // console.log(val);

// // const afn = async () => {
// //     const res = await fetch('https://api.fungenerators.com');
// //     const data = await res.json;
// //     console.log(data);
// // }
const api: string = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
const myAsyncFetch = async <T>(url: string): Promise<T> => {
    const response = await nodeFetch(url);
    const body = await response.json();
    return body;
}
const asb = myAsyncFetch(api);
setTimeout(() => console.log(asb), 1000)

// // async function makeRequest(url: string): Promise<T> {
// //     const response = await fetch(url);
// //     const body = await response.json();
// //     return body;
// // }
// //// fetch in JS
// // const fetch = require('node-fetch');
// fetch(api)
//     .then(response => response.json())
//     .then(body => console.log(body))
//     .catch(error => console.log(error.messages))


// //// Promises
// // const promise = new Promise((resolve, reject) => {});
// /*
// A promise looks like this:
//     1) takes a callbkack as a parameter
//     2) The callback takes the resolve and reject parameters
//     3) If true, it returnd the resolve, if false, it returns the reject
// */

