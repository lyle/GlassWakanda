﻿/*In this file I need to:1) find all of the notificaitons2) group them by owner user3) Send notifications to each user4) Wait 30seconds5) Do it again.*/function sendNotifications(){  	count ++;  	var notifications = ds.GlassNotification.query('sentAt == null');  	  	notifications.forEach(function(notification){  		  		  		  		console.log(notification.message);  		  	});  	  	if (count > 2) {  		console.log("closing");  		close();  	}  	setTimeout(sendNotifications, 2000);}    onconnect = function(event) {    var thePort = event.ports[0];  thePort.postMessage({ref:'hello'});  thePort.onmessage = function(message){    var data = message.data;        switch (data.type)    {      case 'start':      	        break;      case 'shutdown':        close();        break;    }  }  }var count = 0;sendNotifications();