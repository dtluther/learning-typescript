var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var nodeFetch = require('node-fetch');
const covidUrl = "https://api.covid19api.com/summary";
function awaitFunctionRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield nodeFetch(url);
        const jsonBody = yield response.json();
        // console.log(jsonBody, jsonBody.constructor.name);
        // for (const entry in jsonBody) {
        //     console.log(entry);
        // }
        // Object.values(jsonBody.Countries).forEach(record => {
        //     console.log(record.Country);
        // })
        return jsonBody;
    });
}
const awaitArrowRequest = (url) => __awaiter(this, void 0, void 0, function* () {
    const response = yield nodeFetch(url);
    const jsonBody = yield response.json();
    // console.log(jsonBody.Date, jsonBody.constructor.name);
    // for (const entry in jsonBody) {
    //     console.log(entry);
    // }
    // Object.values(jsonBody.Countries).forEach(record => {
    //     console.log(record.Country);
    // })
    return jsonBody;
});
const test = awaitArrowRequest(covidUrl);
test.then(() => console.log(typeof this));
