var methods;
methods = exports;
methods.getCurrentPerson = function(){
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
methods.signedUpOnDate = function(queryDate){
  var queryDate = queryDate || new Date();
  	if (typeof queryDate == "string"){
  	  queryDate = new Date(queryDate);
  	}
	var res ;
	currentSession().promoteWith('User');
	res = ds.Person.all();//"created_at = :1", queryDate);
	currentSession().unPromote();
	return res;
}

methods.getAllPeeopls = function(){
	var res ;
	currentSession().promoteWith('User');
	res = ds.Person.all();
	currentSession().unPromote();
	return res;
}

methods.updateEmailHash = function(){
	var returnInfo = {};
	returnInfo.totalSelected = 0;
	returnInfo.totalUpdated = 0;
	currentSession().promoteWith('RealAdmin');
	var peopleCollection = ds.Person.query("emailHash = null");
	//peopleCollection = ds.Person.all();
	for(var i = 0; i < peopleCollection.length; i++)
	{
		returnInfo.totalSelected ++;
		var theEnt = peopleCollection[i];
		//Do something here with theEnt
		theEnt.emailHash = directory.computeHA1(theEnt.email);
		
		if (theEnt.email != '****'){
			// let's make sure no email got munged
			theEnt.save();
			returnInfo.totalUpdated ++
		}	
	}
	currentSession().unPromote();
	return returnInfo;
}
methods.getGlassUsers = function(){
	var res ;
	currentSession().promoteWith('User');
	res = ds.Person.query('userName is not null and meetings != null');
	currentSession().unPromote();
	return res;
}

methods.getCurrentPerson.scope ="public";
methods.signedUpOnDate.scope ="public";
methods.updateEmailHash.scope ="public";

methods.getAllPeeopls.scope ="public";
methods.getGlassUsers.scope ="public"

//module.exports = methods;

