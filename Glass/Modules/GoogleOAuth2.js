var qs = require('querystring');

function OAuth2(client_id, client_secret, redirect_uri, options){
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.redirect_uri = redirect_uri;
  this.response_type = "code";
  this.scope = "email";
  this.options = options || {};
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
  //Still need to implement this.
}

exports.OAuth2 = OAuth2;
