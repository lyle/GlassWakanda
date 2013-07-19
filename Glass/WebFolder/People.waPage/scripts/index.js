
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var person0Event = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	person0Event.onCurrentElementChange = function person0Event_onCurrentElementChange (event)// @startlock
	{// @endlock
		var imgage = $('#image1 img');
		var picUrl = sources.person0.picture;
		if (picUrl){
			imgage[0].src = picUrl;
			imgage.show();
		}else{
			imgage.hide();
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("person0", "onCurrentElementChange", person0Event.onCurrentElementChange, "WAF");
// @endregion
};// @endlock
