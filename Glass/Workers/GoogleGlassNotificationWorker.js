/*
In this file does the following:
1) find all of the notificaitons
2) Send notifications to each user
3) Wait 10seconds
5) Do it again.
*/

var Mirror = require('MirrorAPI').Mirror;


function sendNotifications(){
  	//count ++;
  	var notifications = ds.GlassNotification.query('sentAt == null');
  	notifications.forEach(function(notification){
  		var mir = new Mirror(notification.owner.GoogleAccess);
  		mir.postHTMLMessage(notification.message, {"bundleId":"GlasswakandaDB"});
  		notification.sentAt = new Date();
  		notification.save();
  		
  	});
  	//close();
  	if (count > 0) {
  		console.log("closing");
  		close();
  	}
  	setTimeout(sendNotifications, 10000);
}
  
  
onconnect = function(event) {  
  var thePort = event.ports[0];
  thePort.postMessage({ref:'hello'});

  thePort.onmessage = function(message){
    var data = message.data;
    
    switch (data.type)
    {
      case 'start':
      	
        break;
      case 'shutdown':
        close();
        break;
    }
  }
  
}
var count = 0;

sendNotifications();
