directory.setLoginListener("googleListener", "Admin");

addHttpRequestHandler("^/login", "Scripts/ReceiveOAuth2.js",  "login");
addHttpRequestHandler("^/GoogleMirrorList", "Scripts/GoogleMirror.js",  "list");

addHttpRequestHandler("^/GoogleMirrorPost", "Scripts/GoogleMirror.js",  "post");
