var methods;
methods = exports;
methods.notifyAllWithMessage = function(theMessage)
{
	var message = theMessage;
	var	people, notificaion;
	
	if (message) {
		currentSession().promoteWith('Administrator');
		googleAccounts = ds.GoogleAccess.query("GlassSettings.name='NewUserNotifications' and GlassSettings.enabled==true");
		
		currentSession().unPromote();
		
		googleAccounts.forEach(function(account){
			notification = new ds.GlassNotification(
			{
				googleAccount: account.ID,
				message: message
			});
			notification.save();
		})
	}
	return true;
}

/*model.GlassNotification.events.onRestrictingQuery = function()
{
	var sessionRef = currentSession();
	var currentUser = sessionRef.user;
	
	var result = ds.GlassNotification.createEntityCollection();
	 
	if (sessionRef.belongsTo("Administrator")) {
		result = ds.GlassNotification.all();
	} else {
		result = ds.GlassNotification.query("owner.ID = :1", currentUser.ID);
	}
	return result;
};*/



