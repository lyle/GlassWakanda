
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var matrix1 = {};	// @matrix
	var person0Event = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock
		//console.log(event);
		var img = $(event.htmlObject.selector + ' img');
		if (event.source.picture){
			img[0].src = event.source.picture;
			//imgage.show();
		}else{
			//imgage.hide();
		}
		
	};// @lock

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
	WAF.addListener("matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	WAF.addListener("person0", "onCurrentElementChange", person0Event.onCurrentElementChange, "WAF");
// @endregion
};// @endlock
