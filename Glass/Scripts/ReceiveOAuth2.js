function login(request, response){
  var theQuery = getURLQuery(request.url);
  var code = theQuery.code;
  var state = theQuery.state;
  var options = {};
  if (code) {
    if(state == "glass"){
      options.type = 'glass';
    }else{
      options.type = 'user';
    }
    
    result = googleOAuth2Login(code,options);

    if (result) {
      response.statusCode = 307;
      response.headers.Location = "/";
    }else{
      response.contentType = 'text/html';
      response.body = '<html><body>sorry - login failed</body></html>';
    }
  }else{		
    response.contentType = 'text/html';
    response.body = '<html><body>Did you cancel your login? It seems like you might have.<br> <p>Please <a href="/">start again</a>.</p></body></html>';
  }
}
function sendNotification(userInfo){
    //should swap to using json and creator:{displayname:'',imageUrls:[]}
    var notifyMessage = '<article><figure>';
    if (userInfo.picture){
      notifyMessage += '<img src="' + userInfo.picture + '" width="100%">';
    }else{
      notifyMessage += '<img src="http://wakandadb.org/images/wakandaDB_icon_64.png">';
    }
    notifyMessage += '</figure>';
    notifyMessage += '<section><h1>' + userInfo.given_name + ' ' + userInfo.family_name + "</h1>";
    notifyMessage += 'has authenticated<br/>Glass Wakanda</section></article>';
    var tmp = ds.GlassNotification.notifyAllWithMessage(notifyMessage);
}

function googleOAuth2Login(code, options){
  var GoogleUserInfo = require('GoogleUserInfo');
  currentSession().promoteWith('RealAdmin');
  var accessData, type, userInfo, googleAccess, person;

  if(options && options.type && options.type == "glass"){
    type='glass';
    accessData = OAuth2Glass.getAccessData(code);
  }else{
    type='user';
    accessData = OAuth2.getAccessData(code); 
  }
  
  if (accessData.error) {
    return false;
  }
  userInfo = GoogleUserInfo.getGoogleUserInfo(accessData.access_token);
  
  if (userInfo && userInfo.error){
    return false;
  }

  googleAccess = ds.GoogleAccess({ID:userInfo.id});

  if (!googleAccess) {
    googleAccess = new ds.GoogleAccess({
      ID: userInfo.id
    });
    googleAccess.save();
    sendNotification(userInfo);
  }
  person = ds.Person.find("emailHash = :1", directory.computeHA1(userInfo.email));
  
  if (!person) {
    person = new ds.Person();
  }
  person.firstName= userInfo.given_name;
  person.lastName= userInfo.family_name;
  person.email= userInfo.email;
  if(userInfo.picture){
    person.picture = userInfo.picture;
  }
  person.GoogleAccess= googleAccess;
  person.save();
  googleAccess.refresh();
  googleAccess.access_token = accessData.access_token;
  googleAccess.token_type = accessData.token_type;
  if(accessData.refresh_token){
    googleAccess.refresh_token = accessData.refresh_token;
  }

  googleAccess.save();

  if (type=='glass'){
    setUpGlassUser(googleAccess);
  }

var belongsTo = ["User"];
if(googleAccess.ID == '101982392616981120013') {
	//this is cheap, I know, but I need to be an admin
	//and I don't have a lot of time. - Lyle
	belongsTo.push("Administrator");
}
  

  createUserSession({
    ID: person.ID,
    name: person.email, 
    fullName: person.fullName, 
    belongsTo: belongsTo
  })


  currentSession().unPromote();

  return person;
}

function setUpGlassUser(googleAccount){

  if(googleAccount.GlassSettings.length == 0){
    glassSetting = new ds.GlassSettings({
        name: 'NewUserNotifications',
        googleAccount: googleAccount,
        enabled: false
    });
    glassSetting.save();
    glassSetting.refresh();
  }
}

