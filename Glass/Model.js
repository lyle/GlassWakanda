
model = new DataStoreCatalog();

model.GoogleAccess = require("Model/GoogleAccess/GoogleAccess-attributes.js");
model.GoogleAccess.methods = require("Model/GoogleAccess/GoogleAccess-methods.js");
model.GoogleAccess.entityMethods = require("Model/GoogleAccess/GoogleAccess-entityMethods.js");

model.Person = require("Model/Person/Person-attributes.js");
model.Person.methods = require("Model/Person/Person-methods.js");

model.GlassSettings = require("Model/GlassSettings/GlassSettings-attributes.js");

model.GlassNotification = require("Model/GlassNotification/GlassNotification-attributes.js");
model.GlassNotification.methods = require("Model/GlassNotification/GlassNotification-methods.js");

model.GlassLog = require("Model/GlassLog/GlassLog-attributes.js");

model.Photo = require("Model/Photo/Photo-attributes.js");
model.Meeting = require("Model/Meeting/Meeting-attributes.js");
model.PhotoComment = require("Model/PhotoComment/PhotoComment-attributes.js");

model.GlassIn = require("Model/GlassIn/GlassIn-attributes.js");




