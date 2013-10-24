var GlassSettings;
GlassSettings = new DataClass("GlassSettings" ,"public");
GlassSettings.ID = new Attribute("storage", "long", "key auto");
GlassSettings.googleAccount = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");
GlassSettings.name = new Attribute("storage", "string", "btree");
GlassSettings.setting = new Attribute("storage", "string");
GlassSettings.enabled = new Attribute("storage", "bool");

var primeDates = require("Model/dateAttributes/created_updated.js");
GlassSettings.created_at = primeDates.created_at;
GlassSettings.updated_at = primeDates.updated_at;

var glassSettingsMethAndEvents = require("./GlassSettings-methods.js");
GlassSettings.events = glassSettingsMethAndEvents.events;
GlassSettings.entityMethods = glassSettingsMethAndEvents.entityMethods;

module.exports = GlassSettings;