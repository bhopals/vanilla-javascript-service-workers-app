const preFetchUrls = ["/","index.html","mission.html", "tours.html"];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open("california-assets-v1")
        .then(cache => {
            cache.addAll(preFetchUrls);
        })    
    );
    
});