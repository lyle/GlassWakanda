
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
var GoogleLogin = {};	// @button
var documentEvent = {};	// @document
// @endregion// @endlock

loadLotsOfPeeps = function(){
  ds.Person.getAllPeeopls({
    'onSuccess': function (event) {
      event.result.toArray("fullName, picture, userName", {
        onSuccess: function(ev) 
        {
            renderGlassExplorers(ev.result);  
        }
      });
    }})
}
getGlassUsers = function(){
  ds.Person.getGlassUsers({
    'onSuccess': function (event) {
      event.result.toArray("fullName, picture, userName", {
        onSuccess: function(ev) 
        {
            renderGlassExplorers(ev.result);  
        }
      });
    },  
    'onError': function (event) {
      console.log("Error, I could not get GlassUsers");
    }
  }, {pageSize:100});
}
renderGlassExplorers = function(users){
  var glassUserListElm = $('#glassUserList');
  glassUserListElm.html('');
  var userTemplate = Mustache.compile("<div class='glassUser'><a href='/~{{{userName}}}'><img src='{{{picture}}}'><p>{{fullName}}</p></a></div>");
  users.forEach(function(entity){
    if(entity.picture){
      glassUserListElm.append(userTemplate(entity));
    }
  })
}
showNotLoggedIn = function(){
  $('#userProfile').hide();
  $('#welcome').hide();
  $('#GoogleLogin').show();
  $('#introduction').show();
}
showLoggedInUser = function(user){
  $('#introduction').hide();
  $('#welcome').show();
  $('#userProfile').show();
  $('#userProfile .uName').html(user.fullName.value);
  $('#userProfile .uPic').attr('src', user.picture.value);
  $('#userProfile button.logout').click(function(event){
    WAF.directory.logout({
      onSuccess: function(){
        showNotLoggedIn();
      }
    });
  });
}

// eventHandlers// @lock

GoogleLogin.click = function GoogleLogin_click (event)// @startlock
{// @endlock
  ds.GoogleAccess.getVisitorAuthenticationURL({
    'onSuccess': function (event) {
      document.location.href = event.result;
    },  
    'onError': function (event) {
      console.log("Error, server did not return getVisitorAuthenticationURL");
    }
  });
};// @lock

documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
{// @endlock

  showNotLoggedIn();
  getGlassUsers();
  ds.Person.getCurrentPerson({
    onSuccess:function(event){
      if (event.result && event.result.error){
        console.log(event.result.errorMessage);
      }else{
        showLoggedInUser(event.result);
        
      }
    },onError:function(event){
      console.log("error");
    }
  });
};// @lock

// @region eventManager// @startlock
WAF.addListener("GoogleLogin", "click", GoogleLogin.click, "WAF");
WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
