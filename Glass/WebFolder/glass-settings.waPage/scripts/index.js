
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		ds.Person.getCurrentPerson({
				onSuccess:function(event){
					if (event.result && event.result.error){
						console.log(event.result.errorMessage);
					}else{
						$('#GoogleLogin').hide();
						$('#userProfile').show();
						sources.person.addEntity(event.result);
					}
				},
				onError:function(ev){
					console.log(ev);	
				}
			});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
