##Wakanda and Google Glass##

Connecting Google Glass and Wakanda

Goal:
* Be able to share pictures with strangers you meet through GoogleGlass

Done: 
* Wakanda supporting Oath2 handshake with Google to give Wakanda approval to use Google APIs.
* Oauth2 with refresh token support 
* The ability for Wakanda to send timeline cards

Todo:
* Wakanda running a service that can receive callbacks from subscriptions
  * https://developers.google.com/glass/v1/reference/subscriptions




-Lyle

###Install###

* Clone this repo to a local machine or server
* Use the [Google Code API Console](http://code.google.com) to create and API Project
  * It will need Google Mirror API access and Google+ API access
  * If running locally simply use "http://127.0.0.1:8081/login" for the redirect URL
* Copy <code>./Glass/Modules/GoogleOAuthSecret_example.js</code> to <code>./Glass/Modules/GoogleOAuthSecret.js</code>
  * And update those settings to match the stuff from your Google API Project
* Start Wakanda 6 or later poiting to this solution.