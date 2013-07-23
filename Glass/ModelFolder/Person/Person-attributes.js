model.Person = new DataClass("People" ,"public");
model.Person.ID = new Attribute("storage", "uuid", "key auto");
model.Person.firstName = new Attribute("storage", "string");
model.Person.lastName = new Attribute("storage", "string");
model.Person.email = new Attribute("storage", "string");
model.Person.picture = new Attribute("storage", "string");
model.Person.GoogleAccess = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");
model.Person.notifications = new Attribute("relatedEntities", "GlassNotification", "owner", {
	"reversePath": true
});
model.Person.GlassSettings = new Attribute("relatedEntities", "GlassSettings", "owner", {
	"reversePath": true
});
model.Person.fullName = new Attribute("calculated", "string");

model.Person.fullName.onSet = function(value) { 
    var names = value.split(' '); //split value into an array 
    this.firstName = names[0];  
    this.lastName = names[1];
}

model.Person.fullName.onGet = function() { 
    return this.firstName + " " + this.lastName;
}