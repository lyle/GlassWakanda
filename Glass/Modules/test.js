
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
		//console.log(evt.data);
	}
	//wait();
}

//startSharedWorker();

currentSession().promoteWith('RealAdmin');

ds.Person.query("GlassSettings.name='NewUserNotifications' and GlassSettings.setting='yes'")[0];
person = ds.Person.find("email = :1", "troxell@gmail.com");
//if (! person) {
	//person = new ds.Person();
//}
//currentSession().promoteWith('Admin');
person = ds.Person.find("ID=269EA08067D64ECEAA14BA6343748B90")
//currentSession().promoteWith('Admin');
//gS = ds.Person.find("ID=269EA08067D64ECEAA14BA6343748B90").GlassSettings[0];
//gS.createGlassContact();
//new Date()
directory.computeHA1("troxell@gmail.com");
			//currentSession().checkPermission('Admin');