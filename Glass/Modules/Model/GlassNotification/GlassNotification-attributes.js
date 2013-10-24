var GlassNotification
GlassNotification = new DataClass("GlassNotifications" ,"public");
GlassNotification.ID = new Attribute("storage", "long", "key auto");
GlassNotification.googleAccount = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");
GlassNotification.message = new Attribute("storage", "string");
GlassNotification.sentAt = new Attribute("storage", "date");

var primeDates = require("Model/dateAttributes/created_updated.js");
GlassNotification.created_at = primeDates.created_at;
GlassNotification.updated_at = primeDates.updated_at;

module.exports = GlassNotification;