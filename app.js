if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("serviceworker.js");
    
    navigator.serviceWorker.addEventListener("message", event=>{
        switch(event.data.action){
            case "resource-updates":
                alert("Message received from Service Worker");
        }
    });
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
