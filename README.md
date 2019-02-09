

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

