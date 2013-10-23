var entityMethods;
entityMethods = exports;
entityMethods.getRefreshedAccessToken = function (){
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
