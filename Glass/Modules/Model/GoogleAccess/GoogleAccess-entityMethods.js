var entityMethods;
var googleOAuth2 = require('GoogleOAuth2/GoogleOAuth2').OAuth2;
var glassApiData = require('ApiAppData').glassUser;

var OAuth2Glass = new googleOAuth2(glassApiData.client_id,
  glassApiData.client_secret,
  glassApiData.redirect_uri,
  {scope:glassApiData.scope,
    approval_prompt:glassApiData.approval_prompt,
    access_type:"offline",
    state: 'glass'
  });

entityMethods = exports;
entityMethods.getRefreshedAccessToken = function (){
	var newTokenSet;
	if (this.refresh_token) {
		newTokenSet = OAuth2Glass.refreshAccessToken(this.refresh_token);
		if (newTokenSet && newTokenSet.error){
			return false;
		}
		if (newTokenSet && newTokenSet.access_token){
			this.access_token = newTokenSet.access_token;
			this.save();
			return this.access_token;
		}
	}else{
		return false;
	}
	
}; 
