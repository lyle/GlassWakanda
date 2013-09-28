//Note: glassApiData, OAuth2, and OAuth2Glass are set globally in required.js

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
model.GoogleAccess.methods.getVerifyTokenSecret.scope = "publicOnServer";

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
