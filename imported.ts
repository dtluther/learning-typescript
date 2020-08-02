import { getHero } from './hero';

async function createHeroes(): Promise<void> {
    const heroKeys = [
        "superman",
        "batman",
        "flash"
    ];
    console.log(heroKeys)
    console.log("Everything up to this point in createHeroes was syncrhronous, aka no `await` has been used.")

    for (const key of heroKeys) {
        const item = await getHero(key);
        console.log(`
        Name: ${item.name}
        Alias: ${item.alias}
        `)
    }
}

// createHeroes();
console.log("This was run after we called createHeroes.")

/// A `Promise.all` example
// For when we want our app to run more than one operation at a time, and wait for them all to resolve.
// `Promise.all` takes anarray of Promises and returns a new promise that resolves with an array of resolved values for
// each of the promises:
async function resolveAllPromises(): Promise<void> {
    const heroKeys = [
        "superman",
        "batman",
        "flash"
    ];

    const all: Promise<{ name: string;alias: string }>[] = heroKeys.map(getHero);
    const heroDetails = await Promise.all(all);
    console.log(heroDetails.constructor.name); // Promise.all resolves to an array
    
    heroDetails.forEach(detail => {
        console.log(`
        Name: ${detail.name}
        Alias: ${detail.alias}
        `);
    })

    for (const item of heroDetails) {
        console.log(`
        Name: ${item.name}
        Alias: ${item.alias}
        `);
    };
}

resolveAllPromises(); // returns all at once after they are all resolved