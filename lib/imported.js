var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getHero } from './hero';
function createHeroes() {
    return __awaiter(this, void 0, void 0, function* () {
        const heroKeys = [
            "superman",
            "batman",
            "flash"
        ];
        console.log(heroKeys);
        console.log("Everything up to this point in createHeroes was syncrhronous, aka no `await` has been used.");
        for (const key of heroKeys) {
            const item = yield getHero(key);
            console.log(`
        Name: ${item.name}
        Alias: ${item.alias}
        `);
        }
    });
}
// createHeroes();
console.log("This was run after we called createHeroes.");
/// A `Promise.all` example
// For when we want our app to run more than one operation at a time, and wait for them all to resolve.
// `Promise.all` takes anarray of Promises and returns a new promise that resolves with an array of resolved values for
// each of the promises:
function resolveAllPromises() {
    return __awaiter(this, void 0, void 0, function* () {
        const heroKeys = [
            "superman",
            "batman",
            "flash"
        ];
        const all = heroKeys.map(getHero);
        const heroDetails = yield Promise.all(all);
        console.log(heroDetails.constructor.name); // Promise.all resolves to an array
        heroDetails.forEach(detail => {
            console.log(`
        Name: ${detail.name}
        Alias: ${detail.alias}
        `);
        });
        for (const item of heroDetails) {
            console.log(`
        Name: ${item.name}
        Alias: ${item.alias}
        `);
        }
        ;
    });
}
resolveAllPromises(); // returns all at once after they are all resolved
