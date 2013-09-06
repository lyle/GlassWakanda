var people;
//peopleCollection = ds.Person.query("emailHash = null");
//peopleCollection = ds.Person.all();
//peopleCollection;
var lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

lyle = ds.Person('39CCB5927E9446D9B181EB4336FC6B30');

	currentSession().promoteWith('Administrator');
lyle;
//ds.Person.find('firstName=Xiang');
//googlID = ds.GoogleAccess('101982392616981120013');//Lyle

//var Mirror = require('MirrorAPI').Mirror;
//var mir = new Mirror(googlID);
//var mir = new Mirror(googlID);
//googlID.person[0]

//ds.GoogleAccess.getVerifyTokenSecret();

lyleGS = lyle.GlassSettings[0];

//lyleGS.listSubscriptions();

//log = ds.GlassLog.createEntity(); 
//log.request = "add subscription";
//log.response = lyleGS.subscribeToMirrorApi();
lyleGS.deleteSubscriptionToMirrorApi("timeline");
//log.orig = "test script";
//log.save();
//log.response;
//ds.GlassLog.all()//.forEach( function(ent){ent.remove()}) ;
//currentSession().unPromote();

//		people = ds.Person.query("GlassSettings.name='NewUserNotifications' and GlassSettings.enabled==true");
//		people[0].GlassSettings;



//mir.postTextImageMessage("Wyatt Troxell",
//'https://lh3.googleusercontent.com/-VESQWfAMciw/AAAAAAAAAAI/AAAAAAAAADA/BA0u0FKZCyg/photo.jpg')

//mir.updateContact('GlassWakanda', 'Glass Wakanda',['https://glass.wakanda.org/lib/images/GlassWakanda_share_image.png']);


//googlID.access_token = "expired";
//googlID.save();


//currentSession().promoteWith('RealAdmin');
//var res = [];

//for(var i = 0; i < peopleCollection.length; i++)
//{
//	var theEnt = peopleCollection[i];
//	res.push({name:theEnt.fullName, email:theEnt.email, google:!!(theEnt.GoogleAccess)});
//	if (theEnt.ID = '23D966F360BB44F1A788FA9B177C6916'){
//		//theEnt.created_at = null;
//		//theEnt.save();
//	}
//}
//currentSession().unPromote();

//res;

//if (typeof window == 'object') {
//  console.log("yep, client side");
//}

