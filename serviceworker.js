const precacheList = [
    "/", "mission.html", "resources.html", "tours.html", 
    "app.js", "weather.js",
    "_css/fonts.css", "_css/main.css", "_css/mobile.css", "_css/tablet.css",
    "_images/back_bug.gif", "_images/desert_desc_bug.gif", "_images/nature_desc_bug.gif",
    "_images/backpack_bug.gif", "_images/flag.jpg", "_images/snow_desc_bug.gif",
    "_images/calm_bug.gif", "_images/home_page_back.jpg","_images/springs_desc_bug.gif",
    "_images/calm_desc_bug.gif", "_images/kids_desc_bug.gif", "_images/star_bullet.gif",
    "_images/cycle_desc_bug.gif", "_images/logo.gif", "_images/taste_bug.gif",
    "_images/cycle_logo.png", "_images/looking.jpg", "_images/taste_desc_bug.gif",
    "_images/desert_bug.gif", "_images/mission_look.jpg", "_images/tour_badge.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("california-assets-v2")
            .then( cache => {
                cache.addAll(precacheList);
            }
        )
    );
});



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

    );
});


self.addEventListener("fetch", event => {
    const parsedUrl = new URL(event.request.url);
    if (parsedUrl.pathname.match(/^\/_css*/)) {
        // Network-first policy
        // event.respondWith(
        //     fetch(event.request)
        //         .catch( error => {
        //             return caches.match(event.request);
        //         })
        // )

        // Stale while Revalidate
        event.respondWith(
            caches.match(event.request)
                .then( response => {
                    const networkFetch = fetch(event.request)
                                    .then(networkResponse => {
                                         return caches.open("california-assets-v1")
                                            .then( cache => {
                                                cache.put(
                                                    event.request,
                                                    networkResponse.clone()
                                                )
                                                return networkResponse
                                            })
                                    });
                    return response || networkFetch;
                })
        )
    } else {
        // Cache-first policy
        event.respondWith(
            caches.match(event.request)
                .then( response => {
                    if (response) {
                        return response; // The URL is cached
                    } else {
                        if (parsedUrl.pathname.match(/^\/_fonts*/)) {
                            const fetchRequest = 
                                fetch(event.request).then(
                                    networkResponse => {
                                        return caches.open("california-fonts")
                                            .then( cache => {
                                                cache.put(event.request, networkResponse.clone());
                                                return networkResponse;
                                            })
                                    }
                                )
                            return fetchRequest;
                        } else {
                            return fetch(event.request); // Go to the network
                        }
                    }
                })
        );   
    }

})