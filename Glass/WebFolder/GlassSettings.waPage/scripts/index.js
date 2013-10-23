
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var userNameEntry = {};	// @textField
	var glassSettingsEvent = {};	// @dataSource
	var documentEvent = {};	// @document
	var settingEnabled = {};	// @checkbox
// @endregion// @endlock
	var pageJustLoaded = true;
// eventHandlers// @lock

	userNameEntry.change = function userNameEntry_change (event)// @startlock
	{// @endlock
		if(source.person && source.person.userName){
			$("#userMessage").html('Updating Vanity URL').effect('highlight');
			source.person.save({
				onSuccess:function(event){
					$("#userMessage").html('Vanity URL Updated').effect('highlight').delay(2000).fadeOut();
				},
				onError:function(error){
					$("#userMessage").html(error['error'][0].message).effect('highlight', {color: 'red'});
				}
			});
		}
	};// @lock
	showNotLoggedIn = function(){
	  //$('#userProfile').hide();
	  $('#welcome').hide();
	  $('#GoogleLogin').show();
	  //$('#introduction').show();
	}
	showLoggedInUser = function(user){
	  //$('#introduction').hide();
	  $('#welcome').show();
	  $('#GoogleLogin').hide();
	  //$('#userProfile').show();
	  //$('#userProfile .uName').html(user.fullName.value);
	  //$('#userProfile .uPic').attr('src', user.picture.value);
	  //$('#userProfile button.logout').click(function(event){
	  //  WAF.directory.logout({
	  //    onSuccess: function(){
	  //      showNotLoggedIn();
	  //    }
	  //  });
	  //});
	}
	var getContactsInfo = function(){
		source.glassSettings.listContacts({
			onSuccess:function(event){
				updateContactsView(event.result);
			},
			onError:function(error){
				$("#userMessage").html(error['error'][0].message).effect('highlight', {color: 'red'});
			}
		});
	}
	var updateContactsView = function(contactsReturn){
		if(contactsReturn && contactsReturn.items && contactsReturn.items.length >0){
			$('#contactsStatus').html('Your Timeline has a Glass Wakanda Contact');
			$('#contactsStatus').append('<br /><img id="contactImage" width="250" src="' + contactsReturn.items[0].imageUrls[0] + '" />');
		}else{
			$('#contactsStatus').html("Your Timeline doesn't have a Glass Wakanda Contact");
			$('#contactImage').remove();
		}
	}
	var getSubscriptionInfo = function(){
			source.glassSettings.isSubscribed({
				onSuccess:function(event){
					//console.log(event.result)
					updateSubscriptionView(event.result);
				},
				onError:function(error){
					$("#userMessage").html(error['error'][0].message).effect('highlight', {color: 'red'});
				}
			});
	}
	var updateSubscriptionView = function(show){
		if(show) {
			$('#subscribedStatus').html('currently subscribed to your timeline');
		}else{
			$('#subscribedStatus').html('not currently subscribed to your timeline');
		}
	};
	GoogleLogin.click = function GoogleLogin_click (event)// @startlock
	{// @endlock
	  ds.GoogleAccess.getGlassAuthenticationURL({
	    'onSuccess': function (event) {
	      document.location.href = event.result;
	    },  
	    'onError': function (event) {
	      console.log("Error, server did not return getVisitorAuthenticationURL");
	    }
	  });
	};
	glassSettingsEvent.onCurrentElementChange = function glassSettingsEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		
		//console.log('glass settings on current element change');
		if(pageJustLoaded && this.getCurrentElement()!==null) {
			pageJustLoaded = false;
			getSubscriptionInfo();
			getContactsInfo();
			$('#toVanityURL').click(
				function(){
					document.location = ('/~' + sources.person.userName);
				}
			)
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		showNotLoggedIn();
		ds.Person.getCurrentPerson({
			onSuccess:function(event){
				if (event.result && event.result.error){
					console.log(event.result.errorMessage);
				}else{
					sources.person.addEntity(event.result);
					showLoggedInUser(event.result);
				}
			},onError:function(event){
				console.log("error");
			}
		});
  	};// @lock

	settingEnabled.click = function settingEnabled_click (event)// @startlock
	{// @endlock
		//console.log(sources.glassSettings);
		$("#userMessage").html('Updating Server...');
		sources.glassSettings.save({
        	onSuccess: function(event) {
                // displays success message in a DisplayError area
        	    $("#userMessage").html("Setting Updated").effect('highlight').delay(2000).fadeOut();
        	},
        	onError: function(error) {
                // displays error message in a DisplayError area
        	    $("#userMessage").html(error['error'][0].message).effect('highlight', {color: 'red'});
        	}
    	});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("userNameEntry", "change", userNameEntry.change, "WAF");
	WAF.addListener("glassSettings", "onCurrentElementChange", glassSettingsEvent.onCurrentElementChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("GoogleLogin", "click", GoogleLogin.click, "WAF");
	WAF.addListener("settingEnabled", "click", settingEnabled.click, "WAF");
// @endregion
};// @endlock
