
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var userNameMatcher = new RegExp("/~([a-zA-Z]+)");
		var url = document.URL;
		var user = url.match(userNameMatcher)[1];
		ds.Person.query("userName = :1 order by created_at desc", user,{
			onSuccess:function(event){
         		sources.person.setEntityCollection(event.result);
				document.title = "Glass Meetings with " + sources.person.fullName;
         		
         	},
     		onError:function(event){
     			
    		}, 
    	});		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
