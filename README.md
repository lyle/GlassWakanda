##Wakanda and Google Glass##

Connecting Google Glass and Wakanda

Goal:
* Wakanda running a service that can receive callbacks from subscriptions
  * https://developers.google.com/glass/v1/reference/subscriptions


Done: 
* Wakanda supporting Oath2 handshake with Google to give Wakanda approval to use Google APIs.
* Oauth2 with refresh token support
* The ability for Wakanda to send timeline cards

Todo:
* Refactor how refresh token gets used. 
  Currently each API would require a "try if error from OAuth use refresh token and try again" step - which is really messy.
  I think having a request handler that encapsulates the refresh token step makes sense.



-Lyle

###Install###

* Clone this repo to a local machine or server
* Use the [Google Code API Console](http://code.google.com) to create and API Project
  * It will need Google Mirror API access and Google+ API access
  * If running locally simply use "http://localhost:8081/login" for the redirect URL
* Copy <code>./Glass/Modules/GoogleOAuthSecret_example.js</code> to <code>./Glass/Modules/GoogleOAuthSecret.js</code>
  * And update those settings to match the stuff from your Google API Project
* Start Wakanda poiting to this solution.