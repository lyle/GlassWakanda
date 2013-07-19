
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var GoogleLogin = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	GoogleLogin.click = function GoogleLogin_click (event)// @startlock
	{// @endlock
		ds.GoogleAccess.getVisitorAuthenticationURL({
			'onSuccess': function (event) {
 	        	document.location.href = event.result;
 	        },  
 	        'onError': function (event) {
 	        	console.log("Error");
 	       }
        });
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
			
			$('#userProfile').hide();
			ds.Person.getCurrentPerson({
				onSuccess:function(event){
					if (event.result && event.result.error){
						console.log(event.result.errorMessage);
					}else{
						$('#GoogleLogin').hide();
						$('#userProfile').show();
						sources.person.addEntity(event.result);
						$('#userProfile .uName').html(event.result.fullName.value);
						$('#userProfile .uPic').attr('src', event.result.picture.value);
						$('#userProfile button.logout').click(function(event){
							WAF.directory.logout({
								onSuccess: function(){
									sources.person.setEntityCollection();
									$('#GoogleLogin').show();
									$('#userProfile').hide();
								}
							});
							
						});
					}
				},onError:function(event){
					console.log("error");
				}
			});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("GoogleLogin", "click", GoogleLogin.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
