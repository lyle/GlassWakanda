var googleOAuth2 = require('GoogleOAuth2/GoogleOAuth2').OAuth2;
var ApiData = require('ApiAppData').user;
var glassApiData = require('ApiAppData').glassUser;
var gInfo = require('GoogleUserInfo');

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
    access_type:"offline"
  });


googleListener = function (GoogleAuthCode, notUsed) {
  currentSession().promoteWith('RealAdmin');

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
    person = ds.Person.find("emailHash = :1", directory.computeHA1(userInfo.email));
    
    if (!person) {
    	person = new ds.Person();
	}
	person.firstName= userInfo.given_name;
    person.lastName= userInfo.family_name;
    person.email= userInfo.email;
    person.GoogleAccess= googleAccess;
    
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
  	notifyMessage += 'has authenticated<br/>Glass Wakanda</section></article>';
    
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
  currentSession().unPromote();

  return {
    ID: person.ID,
    name: person.email, 
    fullName: person.fullName, 
    belongsTo: ["User"]
  }
} 
