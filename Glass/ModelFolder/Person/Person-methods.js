model.Person.methods.getCurrentPerson = function(){
	var user = currentSession().user;
//	return user;
	if(user.ID === "00000000000000000000000000000000" || ! user.fullName){
		//default user - no one is logged in
		//throw new UserException("Param type error", 1);
		return {error: 100, errorMessage: 'You are not Logged in babay!'};
	}else{

//		return user;
		return ds.Person({ID:user.ID});
	}
};

model.Person.events.onLoad=function(attributeName){
	if (currentSession().user.ID != this.ID) {
		try {
			currentSession().checkPermission('RealAdmin');
		}catch(e){
			//this.email = "****";
		}
	}
};


model.Person.methods.getCurrentPerson.scope ="public";




