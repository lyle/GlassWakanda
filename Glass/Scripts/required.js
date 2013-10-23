var googleOAuth2 = require('GoogleOAuth2/GoogleOAuth2').OAuth2;
var ApiData = require('ApiAppData').user;
var glassApiData = require('ApiAppData').glassUser;

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
    access_type:"offline",
    state: 'glass'
  });
