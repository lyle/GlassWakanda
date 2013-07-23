var qs = require('querystring');

function OAuth2(client_id, client_secret, redirect_uri, options){
  this.options = options || {};
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.redirect_uri = redirect_uri;
  this.response_type = "code";
  this.scope = this.options.scope || "email";
  this.approval_prompt = this.options.approval_prompt || "auto";
  this.access_type = this.options.access_type || "online";
}

OAuth2.OAUTH2_URL = 'https://accounts.google.com/o/oauth2/auth';
OAuth2.TOKEN_URL = 'https://accounts.google.com/o/oauth2/token';
OAuth2.REVOKE_URL = 'https://accounts.google.com/o/oauth2/revoke';

OAuth2.prototype.getAuthenticateURL = function(option_arg){
  var options = option_arg || {};
  options.client_id = this.client_id;
  options.redirect_uri = this.redirect_uri;
  options.response_type = options.response_type || this.response_type;
  options.scope = options.scope || this.scope;
  options.approval_prompt = options.approval_prompt || this.approval_prompt;
  options.access_type = options.access_type || this.access_type;
  
  return OAuth2.OAUTH2_URL + '?' + qs.stringify(options);
}

OAuth2.prototype.getAccessData = function(code){
  var grant_type ="authorization_code",
    xhr;
  xhr = new XMLHttpRequest();
  xhr.open('POST', OAuth2.TOKEN_URL, false);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send(
    qs.stringify({
      code: code,
      client_id: this.client_id,
      client_secret: this.client_secret,
      redirect_uri: this.redirect_uri, 
      grant_type: grant_type
    }));
  return JSON.parse(xhr.responseText);
  // { access_token: "ya29.AHES6ZQfAtqRMlghR5N0ZgdJpoaNyg-nHY6saossoKu3UXA",
  // 	expires_in: 3600,
  // 	id_token: "eyJh..this_is_big..izF9W2U",
  // 	token_type: "Bearer"
  //};
};

OAuth2.prototype.refreshAccessToken = function(refresh_token){
  var grant_type = "refresh_token",
  	xhr;
  xhr = new XMLHttpRequest();
  xhr.open('POST', OAuth2.TOKEN_URL, false);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send(
    qs.stringify({
      client_id: this.client_id,
      client_secret: this.client_secret,
      refresh_token: refresh_token, 
      grant_type: grant_type
    }));
  return JSON.parse(xhr.responseText);
  
}

exports.OAuth2 = OAuth2;




