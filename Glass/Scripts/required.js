var googleOAuth2 = require('GoogleOAuth2').OAuth2;
var ApiData = require('ApiAppData').user;
var gInfo = require('GoogleUserInfo');

var OAuth2 = new googleOAuth2(ApiData.client_id, ApiData.client_secret, ApiData.redirect_uri);

googleListener = function (GoogleAuthCode, notUsed) {
  //We have sent a user to Google and they have returned a code
  //that code can be used, without a secret, to get a Google Token
  //depending on the initial request and scope requested the returned
  //token will have different rights.
  var accessData;
  //console.log(GoogleAuthCode);
  
  if(GoogleAuthCode && GoogleAuthCode.length && GoogleAuthCode.length > 12){
	accessData = OAuth2.getAccessData(GoogleAuthCode);
  }else{
  	accessData = {};
  	accessData.error = 'Bypassing Google Authentication';
  }
  if (accessData && accessData.error) {
    //console.log(accessData.error)
    return false;
  }
  
  var userInfo = gInfo.getGoogleUserInfo(accessData.access_token);
  if (userInfo && userInfo.error){
    return false;
  }
  
  var googleAccess = ds.GoogleAccess({ID:userInfo.id});
  var person;
  if (!googleAccess) {
    googleAccess = new ds.GoogleAccess({
      ID: userInfo.id
    });
    googleAccess.save();
    
    person = new ds.Person({
      firstName:userInfo.given_name,
      lastName:userInfo.family_name,
      email:userInfo.email,
      GoogleAccess:googleAccess
    });
    person.save();
    googleAccess.refresh();
    
    var notifyMessage = '<article><figure>';
    if (userInfo.picture){
	  	notifyMessage += '<img src="' + userInfo.picture + '" height="100%">';
	 }else{
	  	notifyMessage += '<img src="http://wakandadb.org/images/wakandaDB_icon_64.png">';
	 }
  	notifyMessage += '</figure>';
  	notifyMessage += '<section><h1>' + person.fullName + "</h1>";
  	notifyMessage += 'has authenticated<br/>Glass wakandaDB</section></article>';
    
    var tmp = ds.GlassNotification.notifyAllWithMessage(notifyMessage);
  }
  
  googleAccess.access_token = accessData.access_token;
  googleAccess.token_type = accessData.token_type;
  if(accessData.refresh_token){
    googleAccess.refresh_token = accessData.refresh_token;
  }else{
  	googleAccess.refresh_token = '';
  }
  googleAccess.save();
  
  person = googleAccess.person[0];
  person.picture = userInfo.picture;
  person.save();

  return {
    ID: person.ID,
    name: person.email, 
    fullName: person.fullName, 
    belongsTo: ["User"]
  }
} 
