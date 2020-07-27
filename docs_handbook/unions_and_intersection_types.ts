// Intersection and Union types are one of thew ays in which we can compose types instead of creating them from scratch.

//// Union types
// Ex) a library could expect a parameter to be either a number or a string:
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
  
padLeft("Hello world", 4); // returns "    Hello world"
// BUT we used `any` so below would pass at compile time and fail at runtime:
let indentedString = padLeft("Hello world", true);

// While we could abstract over the two types by creating a hierarchy of types, it might be overkill (although it would
// be much more explicit). And, the original version of `padLeft` allowed us to pass in primitives, which was nice for
// simple and concise usage.
// Instead of `any`, tada! a `union` type:
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeftUnion(value: string, padding: string | number) {
    // ...
}
  
let doesntWorkNow = padLeftUnion("Hello world", true);
// Error: Argument of type 'true' is not assignable to parameter of type 'string | number'.ts(2345)
/////

//// Unions with common fields
// If we have a value that is a union type, we can only access members that are common to all types in the union:
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs(); // No problem, either fish or bird can do this
pet.swim(); // Error
// Property 'swim' does not exist on type 'Bird | Fish'.
// Property 'swim' does not exist on type 'Bird'.ts(2339)
/////

//// Discriminating unions
// A common technique for working with unions is to, inside a type object, have a single field which uses literal types
// which help TS narrow down the possible current type. For instance, a union of three types which have a single shared
// field:

type NetworkLoadingState = { // Guess I didn't actually know this was how you create a basic type object haha, = not :
    state: "loading";
  };
  
type NetworkFailedState = {
    state: "failed";
    code: number;
};

type NetworkSuccessState = {
    state: "success";
    response: {
        title: string;
        duration: number;
        summary: string;
    };
};

// Create a type which represents only one of the above types, but you aren't sure which it is yet.
type NetworkState =
    | NetworkLoadingState // How to do multiline unions
    | NetworkFailedState
    | NetworkSuccessState;

// Since the `state` field is common inside every type, it is safe for our code to access it without checking for its
// presence. And since it's a literal type, we can compare the type with an equivalent string and TS will know which
// type is currently being used:
function networkStatus(state: NetworkState): string {
    // Right now TypeScript does not know which of the three
    // potential types state could be.

    // Trying to access a property which isn't shared
    // across all types will raise an error
    state.code;
    // Property 'code' does not exist on type 'NetworkState'.
    // Property 'code' does not exist on type 'NetworkLoadingState'.ts2339

    // By switching on state, TypeScript can narrow the union
    // down in code flow analysis
    switch (state.state) {
        case "loading":
            return "Downloading...";
        case "failed":
            // The type must be NetworkFailedState here,
            // so accessing the `code` field is safe
            return `Error ${state.code} downloading`;
        case "success":
            return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
}
/////

//// Intersection types
// I think this is a confusing definition (as I think of union as the whole thing and intersection as the overlap), but
// an intersection type combines multiple types into one. They allow us to add together existing types to get a single
// type that has all the features we need.
// Ex) consistent error handling + different network requests = unique network responses:
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
  }
  
interface ArtworksData {
    artworks: { title: string }[];
}

interface ArtistsData {
    artists: { name: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
    if (response.error) {
        console.error(response.error.message);
        return;
    }

    console.log(response.artists);
};