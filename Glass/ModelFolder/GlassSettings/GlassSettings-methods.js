var Mirror = require('MirrorAPI').Mirror;
var MirrorAPI; //global - no good, but necessary to hold reference
model.GlassSettings.events.onLoad = function()
{
	//setting the global var in this context - will the produce a bug?
	MirrorAPI = new Mirror(this.owner.GoogleAccess);
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

model.GlassSettings.entityMethods.listSubscriptions = function(){
	return MirrorAPI.listSubscriptions();
};
model.GlassSettings.entityMethods.listContacts = function(){
	return MirrorAPI.listContacts();
};
model.GlassSettings.entityMethods.isSubscribed = function(){
	var subReturn = this.listSubscriptions();
	return (subReturn && subReturn.items && subReturn.items.length > 0);
};
model.GlassSettings.entityMethods.subscribeToMirrorApi = function(){
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
model.GlassSettings.entityMethods.deleteSubscriptionToMirrorApi = function(subscribeID){
	return MirrorAPI.deleteSubscription(subscribeID);
}

model.GlassSettings.entityMethods.listSubscriptions.scope ="publicOnServer";
model.GlassSettings.entityMethods.listContacts.scope ="public";
model.GlassSettings.entityMethods.isSubscribed.scope ="public";
model.GlassSettings.entityMethods.subscribeToMirrorApi.scope = "public"
