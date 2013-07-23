model.Person.methods.getCurrentPerson = function(){
	var user = currentSession().user;
//	return user;
	if(user.ID === "00000000000000000000000000000000" || ! user.fullName){
		//default user - no one is logged in
		//throw new UserException("Param type error", 1);
		return {error: 100, errorMessage: 'You are not Logged in babay!'};
	}else{

//		return user;
		return ds.Person({email:user.name});
	}
};

model.Person.methods.getCurrentPerson.scope ="public";




