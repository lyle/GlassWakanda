



directory.setLoginListener("googleListener", "Admin");

addHttpRequestHandler("^/login", "Scripts/ReceiveOAuth2.js",  "login");
addHttpRequestHandler("^/glassListItems", "Scripts/GoogleMirror.js",  "listItems");
addHttpRequestHandler("^/glassListContactItems", "Scripts/GoogleMirror.js",  "listContactItems");




addHttpRequestHandler("^/startWorker", "Scripts/workerControl.js",  "startWorker");
addHttpRequestHandler("^/stopWorker", "Scripts/workerControl.js",  "stopWorker");
addHttpRequestHandler("^/GoogleMirrorList", "Scripts/GoogleMirror.js",  "list");
addHttpRequestHandler("^/GoogleMirrorDeleteItem", "Scripts/GoogleMirror.js",  "deleteItem");
//addHttpRequestHandler("^/GoogleMirrorPost", "Scripts/GoogleMirror.js",  "post");
