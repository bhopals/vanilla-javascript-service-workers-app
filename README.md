

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

