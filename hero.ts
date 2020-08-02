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

interface HeroInterface {
    name: string,
    alias: string
}
interface Heroes {
    superman: HeroInterface;
    batman: HeroInterface;
    flash: HeroInterface;
}
const newHero: Heroes = {
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
}
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
}


export async function getHero(heroKey: string) {
    return new Promise<{name: string, alias: string}>(resolve => {
        setTimeout(() => {
            resolve(hero[heroKey])
        }, 1000);
    });
}

const str = "string"
let otherString = "string"