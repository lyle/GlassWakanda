
exports.getProfileGooglePlus = function( accessToken ){
  var xhr = new XMLHttpRequest();
  xhr.open('GET','https://www.googleapis.com/plus/v1/people/me?access_token=' + accessToken, false);
  xhr.send();
  return JSON.parse( xhr.responseText );
}


//var AuthenURL = OA.getAuthenticateURL({
//			response_type: ApiData.response_type,
//			scope: ApiData.scope
//  		});
//exports.OA = OA;
//exports.getAuthenticateURL = function(){
//	return AuthenURL;
//};
//exports.getAccessToken = OA.getAccessToken;
