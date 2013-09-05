var OAuth = require('GoogleOAuth2').OAuth2;
var glassApiData = require('ApiAppData').glassUser;
var userApiData = require('ApiAppData').user;

var OAuth2 = new OAuth(userApiData.client_id,
	userApiData.client_secret,
	userApiData.redirect_uri,
	{scope:userApiData.scope,
		approval_prompt:userApiData.approval_prompt
	});
var OAuth2Glass = new OAuth(glassApiData.client_id,
	glassApiData.client_secret,
	glassApiData.redirect_uri,
	{scope:glassApiData.scope,
		approval_prompt:glassApiData.approval_prompt,
		access_type:"offline"
	});
model.GoogleAccess.methods.getVerifyTokenSecret = function(){
	return glassApiData.verifyToken;
};
model.GoogleAccess.methods.getVisitorAuthenticationURL = function(){
		return OAuth2.getAuthenticateURL();
};
model.GoogleAccess.methods.getGlassAuthenticationURL = function(){
		return OAuth2Glass.getAuthenticateURL();
};
model.GoogleAccess.methods.getVisitorAuthenticationURL.scope ="public";
model.GoogleAccess.methods.getGlassAuthenticationURL.scope ="public";

model.GoogleAccess.entityMethods.getRefreshedAccessToken = function (){
	var newTokenSet;
	if (this.refresh_token) {
		newTokenSet = OAuth2Glass.refreshAccessToken(this.refresh_token);
		if (newTokenSet && newTokenSet.error){
			//console.log(newTokenSet.error);
			return false;
		}
		if (newTokenSet && newTokenSet.access_token){
			this.access_token = newTokenSet.access_token;
			this.save();
			return this.access_token;
		}
	}else{
		//console.log('no refresh_token on record');
		return false;
	}
	
}; 
