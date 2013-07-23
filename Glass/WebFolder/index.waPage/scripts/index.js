
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
 	        	//console.log(event.result)
 	        },  
 	        'onError': function (event) {
 	        	console.log("Error");
 	       }
        });
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		  $('#userProfile').hide();
			$('#welcome').hide();
			ds.Person.getCurrentPerson({
				onSuccess:function(event){
					if (event.result && event.result.error){
						console.log(event.result.errorMessage);
					}else{
						$('#introduction').hide();
            $('#welcome').show();
						$('#userProfile').show();
						$('#userProfile .uName').html(event.result.fullName.value);
						$('#userProfile .uPic').attr('src', event.result.picture.value);
						$('#userProfile button.logout').click(function(event){
							WAF.directory.logout({
								onSuccess: function(){
									$('#GoogleLogin').show();
									$('#userProfile').hide();
                  $('#welcome').hide();
                  $('#introduction').show();
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
