var GlassSettings;
GlassSettings = new DataClass("GlassSettings" ,"public");
GlassSettings.ID = new Attribute("storage", "long", "key auto");
GlassSettings.owner = new Attribute("relatedEntity", "Person", "Person");
GlassSettings.name = new Attribute("storage", "string", "btree");
GlassSettings.setting = new Attribute("storage", "string");
GlassSettings.enabled = new Attribute("storage", "bool");
var glassSettingsMethAndEvents = require("./GlassSettings-methods.js");

GlassSettings.events = glassSettingsMethAndEvents.events;
GlassSettings.entityMethods = glassSettingsMethAndEvents.entityMethods;

module.exports = GlassSettings;