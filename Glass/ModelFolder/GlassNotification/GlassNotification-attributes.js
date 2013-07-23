model.GlassNotification = new DataClass("GlassNotifications" ,"public");
model.GlassNotification.ID = new Attribute("storage", "long", "key auto");
model.GlassNotification.owner = new Attribute("relatedEntity", "Person", "Person");
model.GlassNotification.message = new Attribute("storage", "string");
model.GlassNotification.sentAt = new Attribute("storage", "date");
