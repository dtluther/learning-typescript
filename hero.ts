const hero: object = {
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