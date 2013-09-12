model.Person = new DataClass("People" ,"public");
model.Person.ID = new Attribute("storage", "uuid", "key auto");
model.Person.firstName = new Attribute("storage", "string");
model.Person.lastName = new Attribute("storage", "string");
model.Person.email = new Attribute("storage", "string");
model.Person.picture = new Attribute("storage", "string");
model.Person.userName = new Attribute("storage", "string",{
	unique: true
});
model.Person.GoogleAccess = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");
model.Person.notifications = new Attribute("relatedEntities", "GlassNotification", "owner", {
	"reversePath": true
});
model.Person.photoComments = new Attribute("relatedEntities", "PhotoComment", "author", {
	"reversePath": true
});

model.Person.photos = new Attribute("relatedEntities", "Photo", "owner", {
	"reversePath": true
});

model.Person.meetings = new Attribute("relatedEntities", "Meeting", "owner", {
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
model.Person.emailHash = new Attribute("storage", "string");

model.Person.email.addEventListener("onSave", function(attributeName){
	this.emailHash = directory.computeHA1(this.email);
})

model.Person.created_at = new Attribute("storage", "date", null);
model.Person.created_at.events.onInit = function(attributeName) {
	this.created_at = new Date();
};
model.Person.updated_at = new Attribute("storage", "date", null);
model.Person.updated_at.events.onSave = function(attributeName) {
	this.updated_at = new Date();
};
model.Person.userName.events.onValidate = function(attributeName){
	var bad_chars = /[^\w]/;
	if(this.userName && bad_chars.test(this.userName)) {
		return { error: 100, errorMessage:"If you set a userName it must only contain [a-zA-Z] charictors." };  
	}
};
