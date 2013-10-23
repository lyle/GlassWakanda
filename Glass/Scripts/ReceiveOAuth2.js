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
    var notifyMessage = '<article><figure>';
    if (userInfo.picture){
      notifyMessage += '<img src="' + userInfo.picture + '" height="100%">';
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
  

  createUserSession({
    ID: person.ID,
    name: person.email, 
    fullName: person.fullName, 
    belongsTo: ["User"]
  })


  currentSession().unPromote();

  return person;
}