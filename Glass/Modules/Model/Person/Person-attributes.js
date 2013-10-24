var Person;
Person = new DataClass("People" ,"public");
Person.ID = new Attribute("storage", "uuid", "key auto");
Person.firstName = new Attribute("storage", "string");
Person.lastName = new Attribute("storage", "string");
Person.email = new Attribute("storage", "string");
Person.picture = new Attribute("storage", "string");
Person.userName = new Attribute("storage", "string",{
	unique: true
});
Person.GoogleAccess = new Attribute("relatedEntity", "GoogleAccess", "GoogleAccess");

Person.photoComments = new Attribute("relatedEntities", "PhotoComment", "author", {
	"reversePath": true
});

Person.photos = new Attribute("relatedEntities", "Photo", "owner", {
	"reversePath": true
});
//
Person.meetings = new Attribute("relatedEntities", "Meetings", "owner", {
	"reversePath": true
});

Person.fullName = new Attribute("calculated", "string");

Person.fullName.onSet = function(value) { 
    var names = value.split(' '); //split value into an array 
    this.firstName = names[0];  
    this.lastName = names[1];
}

Person.fullName.onGet = function() { 
    return this.firstName + " " + this.lastName;
}
Person.emailHash = new Attribute("storage", "string");

Person.email.addEventListener("onSave", function(attributeName){
	this.emailHash = directory.computeHA1(this.email);
})

var primeDates = require("Model/dateAttributes/created_updated.js");
Person.created_at = primeDates.created_at;
Person.updated_at = primeDates.updated_at;

Person.userName.events.onValidate = function(attributeName){
	var bad_chars = /[^\w]/;
	if(this.userName && bad_chars.test(this.userName)) {
		return { error: 100, errorMessage:"If you set a userName it must only contain [a-zA-Z] charictors." };  
	}
};
Person.events.onLoad=function(attributeName){
	//if (currentSession().user.ID != this.ID  ) {
	if (currentSession().user.ID != this.ID && !currentSession().belongsTo("RealAdmin")){
		this.email = "****";
	}
};


module.exports = Person;