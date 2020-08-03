// Intersection and Union types are one of thew ays in which we can compose types instead of creating them from scratch.
//// Union types
// Ex) a library could expect a parameter to be either a number or a string:
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
padLeft("Hello world", 4); // returns "    Hello world"
// BUT we used `any` so below would pass at compile time and fail at runtime:
var indentedString = padLeft("Hello world", true);
// While we could abstract over the two types by creating a hierarchy of types, it might be overkill (although it would
// be much more explicit). And, the original version of `padLeft` allowed us to pass in primitives, which was nice for
// simple and concise usage.
// Instead of `any`, tada! a `union` type:
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeftUnion(value, padding) {
    // ...
}
var pet = getSmallPet();
pet.layEggs(); // No problem, either fish or bird can do this
// Since the `state` field is common inside every type, it is safe for our code to access it without checking for its
// presence. And since it's a literal type, we can compare the type with an equivalent string and TS will know which
// type is currently being used:
function networkStatus(state) {
    // Right now TypeScript does not know which of the three
    // potential types state could be.
    // Trying to access a property which isn't shared
    // across all types will raise an error
    // state.code;
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
            return "Error " + state.code + " downloading";
        case "success":
            return "Downloaded " + state.response.title + " - " + state.response.summary;
    }
}
var handleArtistsResponse = function (response) {
    if (response.error) {
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
};
