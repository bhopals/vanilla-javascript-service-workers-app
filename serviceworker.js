//sss
console.log("We are a service Worker");

try {
    importScripts("event.js");
} catch (error) {
    console.log("Error in importing file")
}

console.log("After Loading eventjs script");


self.addEventListener("fetch", event => {
    console.log(`Fetching ${event.request.url}`);
    const response = new Response(`Fetching ${event.request.url}`);
    event.respondWith(response);
})