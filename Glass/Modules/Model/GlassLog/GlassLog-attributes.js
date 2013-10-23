var GlassLog;
GlassLog = new DataClass("GlassLogs" ,"public");
GlassLog.ID = new Attribute("storage", "long", "key auto");
GlassLog.GoogleAccess = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");
GlassLog.request = new Attribute("storage", "string");
GlassLog.response = new Attribute("storage", "string");
GlassLog.created_at = new Attribute("storage", "date");
GlassLog.orig = new Attribute("storage", "string");

module.exports = GlassLog;