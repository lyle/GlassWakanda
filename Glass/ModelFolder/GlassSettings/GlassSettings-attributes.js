model.GlassSettings = new DataClass("GlassSettings" ,"public");
model.GlassSettings.ID = new Attribute("storage", "long", "key auto");
model.GlassSettings.owner = new Attribute("relatedEntity", "Person", "Person");
model.GlassSettings.name = new Attribute("storage", "string", "btree");
model.GlassSettings.setting = new Attribute("storage", "string");