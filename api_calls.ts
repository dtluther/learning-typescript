const fetch = require('node-fetch');

const covidUrl = "https://api.covid19api.com/summary";
async function awaitFunctionRequest(url: string): Promise<object> {
    const response = await fetch(url);
    const jsonBody = await response.json();
    // console.log(jsonBody, jsonBody.constructor.name);
    // for (const entry in jsonBody) {
    //     console.log(entry);
    // }

    // Object.values(jsonBody.Countries).forEach(record => {
    //     console.log(record.Country);
    // })
    return jsonBody;
}

const x = awaitFunctionRequest(covidUrl);
console.log(x, x.constructor.name, typeof x)
x.then(value => console.log(value.Countries[0]))

interface Fn {
    (url: string): Promise<string>;
}
type testFn = (url: string) => Promise<string>;

const awaitArrowRequest: (url: string) => Promise<string> = async (url) => {
    const response = await fetch(url);
    const jsonBody = await response.json();
    // console.log(jsonBody, jsonBody.constructor.name);
    // for (const entry in jsonBody) {
    //     console.log(entry);
    // }

    // Object.values(jsonBody.Countries).forEach(record => {
    //     console.log(record.Country);
    // })
    return jsonBody;
};

