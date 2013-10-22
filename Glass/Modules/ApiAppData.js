var scopes = require('GoogleScopes').scopes;
var googleOAuthSecret = require('GoogleOAuthSecret');

exports.glassUser = {
	client_id : googleOAuthSecret.client_id,
	scope : scopes.email + scopes.glass_timeline + scopes.userinfo + scopes.google_plus,
	client_secret : googleOAuthSecret.client_secret,
	response_type : "code",
	redirect_uri : googleOAuthSecret.redirect_uri,
	approval_prompt: "auto",
	verifyToken: googleOAuthSecret.verifyToken
};

exports.user = {
	client_id : googleOAuthSecret.client_id,
	scope : scopes.email + scopes.userinfo,
	client_secret : googleOAuthSecret.client_secret,
	response_type : "code",
	redirect_uri : googleOAuthSecret.redirect_uri,
	approval_prompt: "auto"
};

