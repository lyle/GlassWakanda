var GoogleAccess;
GoogleAccess = new DataClass("GoogleAccessCollection" ,"public");
GoogleAccess.ID = new Attribute("storage", "string", "key");

GoogleAccess.access_token = new Attribute("storage", "string");
GoogleAccess.token_type = new Attribute("storage", "string");
GoogleAccess.refresh_token = new Attribute("storage", "string");

var primeDates = require("Model/dateAttributes/created_updated.js");
GoogleAccess.created_at = primeDates.created_at;
GoogleAccess.updated_at = primeDates.updated_at;

GoogleAccess.person = new Attribute("relatedEntities", "People", "GoogleAccess", {
	"reversePath": true
});
GoogleAccess.GlassSettings = new Attribute("relatedEntities", "GlassSettings", "googleAccount", {
	"reversePath": true
});
GoogleAccess.GlassNotifications = new Attribute("relatedEntities", "GlassNotification", "googleAccount", {
	"reversePath": true
});
GoogleAccess.glassIns = new Attribute("relatedEntities", "GlassIns", "googleAccount", {
	"reversePath": true
});

GoogleAccess.glassLogs = new Attribute("relatedEntities", "GlassLogs", "GoogleAccess", {
	"reversePath": true
});
GoogleAccess.access_token.scope = "publicOnServer";
GoogleAccess.refresh_token.scope = "publicOnServer";

module.exports = GoogleAccess;