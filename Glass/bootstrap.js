
addHttpRequestHandler("^/fromMirrorApi", "Scripts/GoogleMirror.js", "subscriptionCallBack");
addHttpRequestHandler("^/login", "Scripts/ReceiveOAuth2.js",  "login");
addHttpRequestHandler("^/glassItem", "Scripts/GoogleMirror.js",  "getItem");
addHttpRequestHandler("^/glassListItems", "Scripts/GoogleMirror.js",  "listItems");
addHttpRequestHandler("^/glassListContactItems", "Scripts/GoogleMirror.js",  "listContactItems");

addHttpRequestHandler("^/testCode", "Scripts/testCode.js",  "testCode");


//this matches ~userName
addHttpRequestHandler("^/~[a-zA-Z]+[\/]*[?]*$", "Scripts/User.js", "displayUser");
//this matches ~userName/asdf/asd/asd/asd/sd/
addHttpRequestHandler("^/~[a-zA-Z]+[\/]+[\/a-zA-Z]*[?]*$", "Scripts/User.js", "notImplemented");
addHttpRequestHandler("^/startWorker", "Scripts/workerControl.js",  "startWorker");
addHttpRequestHandler("^/stopWorker", "Scripts/workerControl.js",  "stopWorker");
addHttpRequestHandler("^/startGlassInWorker", "Scripts/workerControl.js",  "startGlassInWorker");
addHttpRequestHandler("^/stopGlassInWorker", "Scripts/workerControl.js",  "stopGlassInWorker");
addHttpRequestHandler("^/GoogleMirrorList", "Scripts/GoogleMirror.js",  "list");
addHttpRequestHandler("^/GoogleMirrorDeleteItem", "Scripts/GoogleMirror.js",  "deleteItem");
//addHttpRequestHandler("^/GoogleMirrorPost", "Scripts/GoogleMirror.js",  "post");


//Need to migrate DB with these:
ds.GoogleAccess.setGlassSettingsToGoogleAccess();
ds.GoogleAccess.setGlassNotificationsToGoogleAccess()