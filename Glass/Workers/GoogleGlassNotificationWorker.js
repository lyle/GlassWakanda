var Mirror = require('MirrorAPI').Mirror;

currentSession().promoteWith('Administrator');

function sendNotifications(){
  	//count ++;
	
  	var notifications = ds.GlassNotification.query('sentAt == null');
  	notifications.forEach(function(notification){
  		var mir = new Mirror(notification.googleAccount);
  		var respons = mir.postHTMLMessage(notification.message, {"bundleId":"GlassWakandaBundle"});
  		if(respons && respons.error) {
  			//some sort of error
  			errorCount ++;
  			console.log("worker error:" + JSON.stringify(respons));
  		}else{
	  		notification.sentAt = new Date();
	  		notification.save();
	  		//console.log(notification.message);
	  	}
  	});
  	//console.log("Glass Notify Worker :" + count)
  	//close();
  	if (notify && errorCount < 10){
	  	setTimeout(sendNotifications, 10000);
	}
}
  
  
onconnect = function(event) {  
  var thePort = event.ports[0];
  thePort.postMessage({"sendNotifications":notify});
  thePort.onmessage = function(message){
    var data = message.data;
    
    switch (data.command)
    {
      case 'start':
  		console.log("starting worker");
  		errorCount=0;
        notify = true;
		sendNotifications();
        break;
      case 'shutdown':
  		console.log("shutdown worker");
        notify = false;
        break;
    }
  }
     	
}
console.log("loading worker");
var notify = false;
var errorCount = 0;

