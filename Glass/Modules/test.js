
//var scopes = require('googleScopes').scopes;

////userinfo: "https://www.googleapis.com/oauth2/v3/userinfo "


//scopes.email;
//userInfo = {};
//userInfo.id = 989;
//var ga = ds.GoogleAccess({ID:userInfo.id});
//if (! ga){
//	"yep";
//}
//[dateToIso(new Date(Date.now() + 3600)), dateToIso(new Date)]


//ds.GlassNotification.notifyWithMessage('dddds');

function startSharedWorker(){
	var workerM = new SharedWorker('Workers/GoogleGlassNotificationWorker.js', "GlassNote");
	workerM.port.onmessage = function(evt){
		console.log(evt.data);
	}
	//wait();
}

startSharedWorker();

ds.Person.query("GlassSettings.name='NewUserNotifications' and GlassSettings.setting='yes'")[0];


//new Date()