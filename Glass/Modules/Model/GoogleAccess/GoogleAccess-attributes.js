var GoogleAccess;
GoogleAccess = new DataClass("GoogleAccessCollection" ,"public");
GoogleAccess.ID = new Attribute("storage", "string", "key");
GoogleAccess.person = new Attribute("relatedEntities", "People", "GoogleAccess", {
	"reversePath": true
});
GoogleAccess.GlassSettings = new Attribute("relatedEntities", "GlassSettings", "googleAccount", {
	"reversePath": true
});
//GoogleAccess.glassSubscriptionNotifications = new Attribute("relatedEntities", "GlassSubscriptionNotification", "GoogleAccess", {
//	"reversePath": true
//});
GoogleAccess.access_token = new Attribute("storage", "string",{
	scope:"publicOnServer"
});
GoogleAccess.token_type = new Attribute("storage", "string");
GoogleAccess.refresh_token = new Attribute("storage", "string",{
	scope:"publicOnServer"
});

GoogleAccess.created_at = new Attribute("storage", "date", null, {
	"simpleDate": false
});

GoogleAccess.created_at.events.onInit = function(attributeName) {
	this.created_at = new Date();
};


GoogleAccess.updated_at = new Attribute("storage", "date", null, {
	"simpleDate": false
});

GoogleAccess.updated_at.events.onValidate = function(attributeName) {
	this.updated_at = new Date();
};


GoogleAccess.updated_at.events.onSave = function(attributeName) {
	this.updated_at = new Date();
};

GoogleAccess.glassLogs = new Attribute("relatedEntities", "GlassLogs", "GoogleAccess", {
	"reversePath": true
});
module.exports = GoogleAccess;