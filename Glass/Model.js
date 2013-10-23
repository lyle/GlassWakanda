// converted from guided model

model = new DataStoreCatalog();

include("ModelFolder/GoogleAccess/GoogleAccess-attributes.js");
include("ModelFolder/GoogleAccess/GoogleAccess-methods.js");

model.Person = require("Model/Person/Person-attributes.js");
model.Person.methods = require("Model/Person/Person-methods.js");

include("ModelFolder/GlassSettings/GlassSettings-attributes.js");
include("ModelFolder/GlassSettings/GlassSettings-methods.js");

include("ModelFolder/GlassNotification/GlassNotification-attributes.js");
include("ModelFolder/GlassNotification/GlassNotification-methods.js");


include("ModelFolder/Photo/Photo-attributes.js");
include("ModelFolder/Meeting/Meeting-attributes.js");
include("ModelFolder/PhotoComment/PhotoComment-attributes.js");