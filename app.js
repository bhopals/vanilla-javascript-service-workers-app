if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("serviceworker.js");
}

function sendMesageToServiceWorker(message) {
    if(navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(message);
    } else {
        console.log("There is no Service Worker controlling this page");
    }
}

function update() {
    sendMesageToServiceWorker({
        action:"update-resoure"
    })
}