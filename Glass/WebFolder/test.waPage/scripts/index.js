
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var matrix1 = {};	// @matrix
// @endregion// @endlock

// eventHandlers// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock
		//console.log(event);
		var img = $(event.htmlObject.selector + ' img');
		//console.log(img);
		if (event.source.picture){
			img[0].src = event.source.picture;
			//imgage.show();
		}else{
			//imgage.hide();
		}
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
// @endregion
};// @endlock
