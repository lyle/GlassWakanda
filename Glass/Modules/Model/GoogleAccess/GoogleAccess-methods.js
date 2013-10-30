var methods;
methods = exports;

var googleOAuth2 = require('GoogleOAuth2/GoogleOAuth2').OAuth2;
var ApiData = require('ApiAppData').user;
var glassApiData = require('ApiAppData').glassUser;

var OAuth2 = new googleOAuth2(ApiData.client_id,
  ApiData.client_secret,
  ApiData.redirect_uri,
  {scope:ApiData.scope,
    approval_prompt:ApiData.approval_prompt
  });

var OAuth2Glass = new googleOAuth2(glassApiData.client_id,
  glassApiData.client_secret,
  glassApiData.redirect_uri,
  {scope:glassApiData.scope,
    approval_prompt:glassApiData.approval_prompt,
    access_type:"offline",
    state: 'glass'
  });


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

