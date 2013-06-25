##Wakanda and Google Glass##

Connecting Google Glass and Wakanda

Goal:
* Wakanda running a service that can receive callbacks from subscriptions
  * https://developers.google.com/glass/v1/reference/subscriptions
* Wakanda supporting the full Oath2 handshake with Google to give Wakanda approval to use Mirror to talk to Glass
* The ability for Wakanda to send timeline cards and updates to existing timeline cards

First attempt to use the [Google API Nodejs Client](https://github.com/google/google-api-nodejs-client/) has been met with difficulty due to the incompatability of some of the required modules and Wakanda.
* Using Wakanda 5 Server/Studio - start the server and then open test.js and run it against the studio.
  * curently I am running into problems with the Request module needing access to http - and of course we should probably implement our own request module.
  
At this point it might be that we need to write our own google-api-wakanda-client module to do Oath2 and give access to the Google API.
After that we can work on using the Mirror api... hopefully that will be less chalenging.


-Lyle
