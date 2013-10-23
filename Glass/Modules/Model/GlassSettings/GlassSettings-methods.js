var Mirror = require('MirrorAPI').Mirror;
var MirrorAPI; //global - no good, but necessary to hold reference
var events = {};
var entityMethods = {};
events.onLoad = function()
{
	//setting the global var in this context - will the produce a bug?
	MirrorAPI = new Mirror(this.owner.GoogleAccess);
}
events.onInit = function()
{
	var sessionRef = currentSession();
	var currentUser = sessionRef.user;
	
	myUser = ds.Person.find("ID = :1", currentUser.ID);

	if ((currentUser !== null) && (myUser !== null)) {//if a user is logged in.		
		this.owner = myUser;
	}
	
}

events.onRestrictingQuery = function()
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

entityMethods.listSubscriptions = function(){
	return MirrorAPI.listSubscriptions();
};
entityMethods.listContacts = function(){
	return MirrorAPI.listContacts();
};
entityMethods.isSubscribed = function(){
	var subReturn = this.listSubscriptions();
	return (subReturn && subReturn.items && subReturn.items.length > 0);
};
entityMethods.subscribeToMirrorApi = function(){
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
entityMethods.deleteSubscriptionToMirrorApi = function(subscribeID){
	return MirrorAPI.deleteSubscription(subscribeID);
}

entityMethods.listSubscriptions.scope ="publicOnServer";
entityMethods.listContacts.scope ="public";
entityMethods.isSubscribed.scope ="public";
entityMethods.subscribeToMirrorApi.scope = "public"

exports.events = events;
exports.entityMethods = entityMethods;