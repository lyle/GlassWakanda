function login(request, response){
  var theQuery = getURLQuery(request.url);
  var code = theQuery.code;
  if (code) {


    result = googleOAuth2Login(code,{type:'user'});

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

function googleOAuth2Login(code, options){
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
  userInfo = gInfo.getGoogleUserInfo(accessData.access_token);
  
  if (userInfo && userInfo.error){
    return false;
  }

  googleAccess = ds.GoogleAccess({ID:userInfo.id});
  
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


  createUserSession({
    ID: person.ID,
    name: person.email, 
    fullName: person.fullName, 
    belongsTo: ["User"]
  })


  currentSession().unPromote();

  return person;
}