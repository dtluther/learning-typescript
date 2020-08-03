// interface HeroInterface {
//     superman: {
//         name: string,
//         alias: string
//     },
//     batman: {
//         name: string,
//         alias: string
//     },
//     flash: {
//         name: string,
//         alias: string
//     }
// }
// type HeroType = {
//     name: string,
//     alias: string
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const newHero = {
    superman: {
        name: "Superman",
        alias: "Clark Kent",
    },
    batman: {
        name: "Batman",
        alias: "Bruce Wayne",
    },
    flash: {
        name: "The Flash",
        alias: "Barry Allen",
    }
};
// let hero: HeroInterface;
hero = {
    superman: {
        name: "Superman",
        alias: "Clark Kent",
    },
    batman: {
        name: "Batman",
        alias: "Bruce Wayne",
    },
    flash: {
        name: "The Flash",
        alias: "Barry Allen",
    }
};
export function getHero(heroKey) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(hero[heroKey]);
            }, 1000);
        });
    });
}
const str = "string";
let otherString = "string";
