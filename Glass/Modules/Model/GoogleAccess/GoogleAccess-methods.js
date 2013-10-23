var methods;
methods = exports;
//Note: glassApiData, OAuth2, and OAuth2Glass are set globally in required.js

methods.getVerifyTokenSecret = function(){
	return glassApiData.verifyToken;
};
methods.getVisitorAuthenticationURL = function(){
		return OAuth2.getAuthenticateURL();
};
methods.getGlassAuthenticationURL = function(){
		return OAuth2Glass.getAuthenticateURL();
};
methods.getVisitorAuthenticationURL.scope ="public";
methods.getGlassAuthenticationURL.scope ="public";
methods.getVerifyTokenSecret.scope = "publicOnServer";
