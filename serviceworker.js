//sss
console.log("We are a service Worker");

try {
    importScripts("event.js");
} catch (error) {
    console.log("Error in importing file")
}

console.log("After Loading eventjs script");


self.addEventListener("fetch", event => {
   
    /**
     * Parsing of the URL
     */

    const parsedUrl = new URL(event.request.url);
    if(parsedUrl.pathName === "/") {
        return;
    }

    const body = `
        <!doctype html>
        <title>Service Worker HTML Generation</title>
        <h1> The Url is ${event.request.url}
        <ul>
            <li>Cache: ${event.request.cache}</li>
            <li>Credentials: ${event.request.credential}</li>
            <li>Destination: ${event.request.destination}</li>
            <li>Method: ${event.request.method}</li>
            <li>Referrer: ${event.request.referrer}</li>
        </ul>
    `;

    const response = new Response(body, {
        status : 200,
        statusText : "OK",
        headers : {
            "Content-type":"text/html"
        }
    })
    event.respondWith(response);//NORMAL RESPONSE

})