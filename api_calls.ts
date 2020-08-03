var nodeFetch = require('node-fetch');

const covidUrl = "https://api.covid19api.com/summary";
async function awaitFunctionRequest<T>(url: string): Promise<T> {
    const response = await nodeFetch(url);
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

interface CovidResponse {
    Global: {
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number,
    },
    Countries: {
        Country: string,
        CountryCode: string,
        Slug: string,
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number,
        Date: string,
        Premium: object
    },
    Date: string
}

// const x = awaitFunctionRequest<CovidResponse>(covidUrl);
// console.log(x, x.constructor.name, typeof x)
// x.then(value => console.log(value.Countries[0]))

interface Fn {
    (url: string): Promise<string>;
}
type testFn = (url: string) => Promise<string>;

const awaitArrowRequest: <T>(url: string) => Promise<T> = async (url) => {
    const response = await nodeFetch(url);
    const jsonBody = await response.json();
    // console.log(jsonBody.Date, jsonBody.constructor.name);
    // for (const entry in jsonBody) {
    //     console.log(entry);
    // }

    // Object.values(jsonBody.Countries).forEach(record => {
    //     console.log(record.Country);
    // })
    return jsonBody;
};

const test = awaitArrowRequest<CovidResponse>(covidUrl);
test.then(() => console.log(typeof this))