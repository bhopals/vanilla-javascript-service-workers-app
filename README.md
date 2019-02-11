

## Service Workers in Javascript
Service workers play a key role in modern web development. In this project, the main agenda would be to go through all the features or advantages that service workers provide to web application deployed and availble to end users.


### Core Features
 - Offline (No internent connection)
 - Slower Connection (2g, 3g)
 - Unreliable Connecton
 - Progressive Web App (PWA)
 - Faster Web User ecperiece
 - Offering a consisten experience across context
 - Support high-latency network


 #### Service Workers Definition
    - A w3c Standard spec for web browsers
    - Works on the top of the web worker specification
    - It manages a scope
    - It has abilities on that scope
    - It works detached from any browser's tab or PWA's process

#### Web Workers
    - It's a JavaScript file running in its own thread
    - Services workers also have their own provess
    - It can import other files through a sync API
    - It has no access to a user interface API
    - No DOM, no window Object

#### Scopes
- Scope  : Origin + Path
- Origin : Protocol + Host + Port

Example : https://mydomain.com/testApp

** One service worker will be responsible only for one scope

#### Browser Environment
In browser environment we have several things in memory suhc as Browser's Tab, Standalone PWA's, Iframes etc, but all will be one scope, which is domain name. Each scope will have only one Service worker. So one Service Worker can be pointing to serveral clients from the same scope, and all clients will be pointing to the same Service Workers.

Any page can register a service worker.(no limit)


 ### Service Workers Functions / What Service Workers can do

 1. **PWA's (Progressive Web Apps)**  - A service worker is **mandatory** for creating a Progressive Web App. It is responsible for instaling and
    serving app files.
    
 2. **Offline Web** - A service worker can make a website or webapp available offline, totally or partially. 
 3. **Web Performance** - A service worker can cache and serve content locally, even if the user is online.
 4. **Replace the Server** - A service worker can detect and make decisions if there are abnormal situations: 
    server errors, high-latency networ, captive portals. Service workers can detect and make decision about the problems to help the applicaton serve.
 5. **Create Local Content** - A service worker can create content on the fly and deliver that contents as 
    HTTP responses to the web page or web app.
 6. **Create Middleware** - A service worker can attach a middleware to network connections.

 7. **Background Work** - With some limited ability, the service worker can execute code in the background, even if the site is on the screen or not. For example : - Offline Payment, Offline data transfers, or DB data storage.

 8. **Convert File Format** - The service worker can fetch files from the server and convert them on the fly to another format before sending it to the webpage.


### Life Cycles of Service Workers ###

PARSED >>>>> INSTALLING >>>> WAITING >>> ACTIVATING >> ACTIVATED > IDLE



### Terminology ###

    1.  Registration - It represents one instance of a service worker registration intention. Several 
        can be available in error or redundant state. Only one **waiting registration** 
        and one **active registration** should be available at any point.


    2.  Controller - It's the service worker that is currently controlling the current navigation 
        page (the curren HTML). It can be null if no service worker was present during load. 
        
        Controller can be fetched : (navigator.serviceWorker.controller).


    3.  Client - One itme in the scipe of the service worker, that can possibly be controlled by it. 
        It can be a document (an HTML page loaded from a tab, a PWA, ir an iframe) or a web worker.

        A service workers can have **n** clients


    4.  Controlled Clients - A client that is currently controlled by the service worker because 
        it was either loaded when the service worker was active, or the service worker claimerd it after activation.


    5. Uncontrolled Client - A client uncontrolled by the service worker because it was either loaded 
        when no service worker was available, or it was loaded with a special navigation action.



### Working with Service Workers ###

Initialize the service workers

```

self.addEventListener('install', event => {
    console.log("Install event");
    
})

self.addEventListener('activate', event => {
    console.log("Activate event");
    
});

```

Within the service workers, you cannot access User Interface API. For example, if from Service Workers Global scope, we try to execute "alert()", it wil throw an error, stating that 'alert is not defined'.

Also, if execute 'this' from service worker global scope, it will return Service Workers Object reference.

**Browser Options**
In Dev tool, *Application*  section you will find these three options
    1. Offline - For caching and offline functionality
    2. Update on reload - Register a new Service Wroker everytime the browser reload and refresh
    3. By pass for network - For caching and offline functionality

#### Load External Files ####
In service Worker file, we can load external Javascript files by using importScripts method, 
which loads scripts Syncronously.

```
Example :

//Sycronously loading single script.
importScripts("events.js");

//Sycronously loading multiple scripts.
//The download will happen parallel; however, it will be executed in sequence
importScripts("events.js", "tour.js");

```

Browsers do **byte-to-byte** comparison to check (check algorithm) if the service worker file is updated. The refresh happened once the max cache time configured in browser expired.

To manually trigger Service Worker update, we can use "registeration.update();"


#### Acting as a Network Proxy ####

**Fetch**
```
self.addEventListener("fetch", event => {
    console.log(`Fetching ${event.request.url}`);
    const response = new Response(`Fetching ${event.request.url}`);
    event.respondWith(response);
});

```
Fetch will refire everytime a webpage, a PWA (Progressive Web Rendering), a worker, and scope, is making the request to the network. Infact, we can responsd to any event with proper response. The response would either be an Response Object (HTTP Response) or Promise Object.

##### Response Object in Details ####

```
String body = "<h1>The bodyText</h1>"
const response = new Response(body, {
    status : 200,
    statusText : "OK",
    headers : {
        "Content-type":"text/html"
    }
})


event.respondWith(response);//NORMAL RESPONSE

event.respondWith(new Promise((resolve, reject) => {
    fetch("/")
    .then(response => {
        console.log("response:"+response.clone().text());
        resolve(response)
    })
}));//PROMISE

```

### Cache Storage API ###
 -  It's a new Storage API available client-side
 -  Different from IndexedDB, which stores OBJECTs, or Web Storage, which stores STRINGs.
 -  Keys: HTTP Requests
 -  Values: HTTP Responses
 -  It's like a browser cache but managed by our Service Workers
 -  Different from HTTP cache managed by the browser.
 -  Limits on Storage depends on the browser 
    (for example in Chrome, it's 6% of available size on users HardDrive)
 -  Most Browsers will keep the data
 -  The only exception is storage pressure
 -  Some browser delete the cache storage if the inactivity detected for a long time (days)


In some browsers, there is an API available to check for storage capacity.

```
navigator.storage.estimate().then(storage => {
    //storage.quota
    //storage.usage
});

```

NOTE: 
    -   In CACHE Storage, the owner is the Origin, not the Service Worker
    -   Several service workers might share the cache
    -   If you unregister the service worker, you do not delete the caches
    -   Responses are grouped in caches
    -   You can access the CacheStorage API not only in Service Workers but also on clients.


Sample program to store in CACHE

```
const preFetchUrls = ["/","index.html","mission.html", "tours.html"];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open("california-assets-v1")
        .then(cache => {
            cache.addAll(preFetchUrls);
        })    
    );
    
});

```

#### TEST ####

Install - Initialization of the ServiceWorker
```
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("california-assets-v1")
            .then( cache => {
                cache.addAll(precacheList);
            }
        )
    );
});

```

Fetch - On any Network call 

//Cache-first Policy
The requested resources will be served from the CACHE and if not available then the network call will be made.
This will always prefer the CACHED version over the actual one

```
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.matches(event.request)
            .then( response => {
                if(response) {
                    return response; //CACHED Version
                } else {
                    return fetch(event.request); //Network Version
                }
            }
        )
    );
});

```


//Network-first Policy - Network call for the matched regex will be given preference
```
const parsedURL = new URL(event.request.url);
if(parsedURL.pathName.match(/^\/_css*/)){
    respondWith(fetch(event.request).catch(error => {
        console.log("Error...");
    }));
}
```

//Stale while Revalidate Policy 
In this case, we would always make the call to Network for the requested resource, and the network response would 
be stored/replaced in the CACHE only, and the old stored cache Response would be returned, at the same time updated.
That means in the next refresh the last persisted changes in the Cache would be used.
In other words, each time we are updating the ASSET with the NETWORK call and add that in CACHE.

NETWORK >>> CACHE
CACHE >>>> PAGE


#### Delete old cache / Manage the cache ####

Once cache install is done, we might want to clear out old cache stored in our local storage. To do that, we can use **activate** event.

First we will create/access a list of Valid Caches. Once retrieved, we can load all the cache stored and if the cache name not present in Valid cache then we can DELETE that cache.

```
self.addEventListener("activate", event => {
    
    const cacheWhileList = ["california-font","california-assets-v1"];
        
    event.waitUntil(

        cache.keys()
            .then(names => {
                Promise.all(
                    names.map(cacheName => {
                        if(cacheWhileList.indexOf(cacheName)){
                            return caches.delete(cacheName);
                        }
                    })
                )
            })

        )
    );
});

```


#### Cache Strategies ####

 -  Precache
 -  Cache First
 -  Network First
 -  Stale while revalidate
 -  Any combination

 **Update Cache** -  To update cache resources, we can create a manifest file with all asset versions and store that file in local storage. Service worker can check changes while running and upload the cache if required.
 There are also some tools and libraries available in the market such as Workbook JS, angular/react CLI etc.
 It is all about which approach we use and suitable for our project.



### Working with API's in the service worker ###

 - Service worker has its own separate context
 - Sync API can't be executed in service worker, as if we look the thread in service worker then we have problem
 - Service workers have IndexedDB, NAvigator Objet, Preformanc Timing, WebAssembly

 **But below items are not available in the Service Worker**
    -   DOM API's
    -   Window Object
    -   Web Storage (Local Storage)
    -   Canvas
    -   Camera

 **What Available are**
    -   Cache Storage
    -   Clients API
    -   Service Worker's event
    -   Registration Object
    (In Modern new browser below API's are also available, but not in every browser)
    -   PushManager
    -   SyncManager
    -   PaymentManager
    -   NavigationPreloadManager


#### Send Messages / Communication API ####
 
**Send Message from PAGES to Service Workers**
```
function sendMesageToServiceWorker(message) {
    if(navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(message);
    } else {
        console.log("There is no Service Worker controlling this page");
    }
}

function update() {
    sendMesageToServiceWorker({
        action:"update-resource"
    })
}

```

**Recieve message in Service Worker**
Service workers have "message" event that can received all the messages sent from the
webpage to Service Worker.

```
self.addEventListener("message", event => {
    const message = event.data;
    switch(message.action){
        case "update-resoure" :
            caches.open("california-assets-v2")
                .then( cache => {
                    cache.addAll(precacheList);
                }
            )
        break;
    }
});

```

**Broadcast Message to Clients (from Service Workers to Pages)**

In below snippet, type would denote the clients whom we want to inlcude while broadcasting messages.
"clients.MatchAll({})" -> all the active tabs,PDA 

```
function alertPagesUpdate() {
    clients.matchAll({
        includeUncontrolled : false,
        type : "window"
    }).then(clients => {
        const clientId = client.id;
        const type = client.type;
        const url = client.url;
        clients.forEach(client => {
            client.postMessage({
                action:"resource-update"
            })
        });
    })
}

```

**Recieve message in Web Pages sent from Service Worker**
We need to register an event in the client side that would listen any Messages broadcasted from 
the Service Worker to Client.

```
navigator.serviceWorker.addEventListener("message", event=>{
    switch(event.data.action){
        case "resource-updates":
            alert("Message received from Service Worker");
    }
})
```

#### Sync Content/Service API data while Offline ####
**SyncManager** - It can be used to Background Sync data if its offline and later once the server is Online, 
the data would be Syncronized automatically.

if("SyncManager" in window) {
    navigator.serviceWorker.getRegistration()
    .then(registration => {
        registration.sync.register(`vote-${tourId}`);
    }); 
}