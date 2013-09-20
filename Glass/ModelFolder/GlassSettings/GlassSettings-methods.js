var Mirror = require('MirrorAPI').Mirror;

var subscribeToMirrorApi = function(MirrorAPI){
	var mirrorResponse=MirrorAPI.addSubscription();
	log = ds.GlassLog.createEntity(); 
	log.request = "add subscription";
	log.response = mirrorResponse;
	log.orig = "test script";
	log.save();
	if(mirrorResponse && mirrorResponse.verifyToken) {
		delete mirrorResponse.verifyToken;
	}
	return mirrorResponse;
};

model.GlassSettings.events.onLoad = function()
{
	var MirrorAPI = new Mirror(this.owner.GoogleAccess);
	model.GlassSettings.entityMethods.listSubscriptions = MirrorAPI.listSubscriptions;
	model.GlassSettings.entityMethods.listContacts = MirrorAPI.listContacts;
	model.GlassSettings.entityMethods.deleteSubscriptionToMirrorApi = MirrorAPI.deleteSubscription;
	model.GlassSettings.entityMethods.subscribeToMirrorApi = subscribeToMirrorApi.bind(this, MirrorAPI);
}
model.GlassSettings.events.onInit = function()
{
	var sessionRef = currentSession();
	var currentUser = sessionRef.user;
	
	myUser = ds.Person.find("ID = :1", currentUser.ID);

	if ((currentUser !== null) && (myUser !== null)) {//if a user is logged in.		
		this.owner = myUser;
	}
	
}

model.GlassSettings.events.onRestrictingQuery = function()
{
	var sessionRef = currentSession();
	var currentUser = sessionRef.user;
	
	var result = ds.GlassSettings.createEntityCollection();
	 
	if (sessionRef.belongsTo("Administrator")) {
		result = ds.GlassSettings.all();
	} else {
		result = ds.GlassSettings.query("owner.ID = :1", currentUser.ID);
	}
	return result;
};

model.GlassSettings.entityMethods.isSubscribed = function(){
	var subReturn = this.listSubscriptions();
	return (subReturn && subReturn.items && subReturn.items.length > 0);
};

model.GlassSettings.entityMethods.listSubscriptions.scope ="publicOnServer";
model.GlassSettings.entityMethods.listContacts.scope ="public";
model.GlassSettings.entityMethods.isSubscribed.scope ="public";
model.GlassSettings.entityMethods.subscribeToMirrorApi.scope = "public"
