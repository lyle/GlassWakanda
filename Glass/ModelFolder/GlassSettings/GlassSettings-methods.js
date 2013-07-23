
model.GlassSettings.events.onInit = function()
{
	var sessionRef = currentSession();
	var currentUser = sessionRef.user;
	
	myUser = ds.Person.find("ID = :1", currentUser.ID);

	if ((currentUser !== null) && (myUser !== null)) {//if a user is logged in.		
		this.owner = myUser;
	}
	
}

model.GlassSettings.events.onRestrictingQuery = function()
{
	var sessionRef = currentSession();
	var currentUser = sessionRef.user;
	
	var result = ds.GlassSettings.createEntityCollection();
	 
	if (sessionRef.belongsTo("Administrator")) {
		result = ds.GlassSettings.all();
	} else {
		result = ds.GlassSettings.query("owner.ID = :1", currentUser.ID);
	}
	return result;
};



