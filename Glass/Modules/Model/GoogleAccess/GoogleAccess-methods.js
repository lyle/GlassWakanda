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
methods.setGlassSettingsToGoogleAccess = function(){
	var glassSe, person;
	var gs = ds.GlassSettings.all()
	var numElems = gs.length;
	for (var i = 0; i < numElems; i++) 
	{
		glassSe = gs[i];
		person = glassSe.owner
		if (person){
	 	   glassSe.googleAccount = person.GoogleAccess;
	 	   glassSe.save();
		}
	}
};
methods.setGlassNotificationsToGoogleAccess = function(){
	var glassNotification, person;
	var gns = ds.GlassNotification.all()
	var numElems = gns.length;
	for (var i = 0; i < numElems; i++) 
	{
		glassNotification = gns[i];
		person = glassNotification.owner;
		if(person){
	 	   glassNotification.googleAccount = person.GoogleAccess;
	 	   glassNotification.save();
		}
	}
};
methods.getVisitorAuthenticationURL.scope ="public";
methods.getGlassAuthenticationURL.scope ="public";
methods.getVerifyTokenSecret.scope = "publicOnServer";
methods.setGlassSettingsToGoogleAccess.scope = "public";
methods.setGlassNotificationsToGoogleAccess.scope = "public";

