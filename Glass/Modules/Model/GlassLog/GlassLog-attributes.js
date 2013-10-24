var GlassLog;
GlassLog = new DataClass("GlassLogs" ,"public");
GlassLog.ID = new Attribute("storage", "long", "key auto");
GlassLog.GoogleAccess = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");
GlassLog.request = new Attribute("storage", "string");
GlassLog.response = new Attribute("storage", "string");
GlassLog.orig = new Attribute("storage", "string");


var primeDates = require("Model/dateAttributes/created_updated.js");
GlassLog.created_at = primeDates.created_at;
GlassLog.updated_at = primeDates.updated_at;

module.exports = GlassLog;