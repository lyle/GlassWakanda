var GlassIn;
GlassIn = new DataClass("GlassIns", "public");
GlassIn.ID = new Attribute("storage", "uuid", "key auto");
GlassIn.googleAccount = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");

//note from Mirror Notification user_token should be googleAccount;


GlassIn.itemId = new Attribute("storage", "string");
GlassIn.processed_at = new Attribute("storage", "date");
GlassIn.notificationBody = new Attribute("storage", "string");

var primeDates = require("Model/dateAttributes/created_updated.js");
GlassIn.created_at = primeDates.created_at;
GlassIn.updated_at = primeDates.updated_at;

module.exports = GlassIn;
