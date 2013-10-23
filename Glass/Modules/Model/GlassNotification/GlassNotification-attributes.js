var GlassNotification
GlassNotification = new DataClass("GlassNotifications" ,"public");
GlassNotification.ID = new Attribute("storage", "long", "key auto");
GlassNotification.googleAccount = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");
GlassNotification.message = new Attribute("storage", "string");
GlassNotification.sentAt = new Attribute("storage", "date");
module.exports = GlassNotification;