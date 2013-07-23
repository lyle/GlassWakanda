model.GoogleAccess = new DataClass("GoogleAccessCollection" ,"public");

model.GoogleAccess.ID = new Attribute("storage", "string", "key");

model.GoogleAccess.person = new Attribute("relatedEntities", "People", "GoogleAccess", {
	"reversePath": true
});

model.GoogleAccess.access_token = new Attribute("storage", "string");

model.GoogleAccess.token_type = new Attribute("storage", "string");

model.GoogleAccess.refresh_token = new Attribute("storage", "string");

model.GoogleAccess.created_at = new Attribute("storage", "date", null, {
	"simpleDate": false
});

model.GoogleAccess.created_at.events.onInit = function(attributeName) {
	this.created_at = new Date();
};


model.GoogleAccess.updated_at = new Attribute("storage", "date", null, {
	"simpleDate": false
});

model.GoogleAccess.updated_at.events.onValidate = function(attributeName) {
	this.updated_at = new Date();
};


model.GoogleAccess.updated_at.events.onSave = function(attributeName) {
	this.updated_at = new Date();
};


