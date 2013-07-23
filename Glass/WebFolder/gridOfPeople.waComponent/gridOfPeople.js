
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'gridOfPeople';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var matrix1 = {};	// @matrix
	// @endregion// @endlock

	// eventHandlers// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock

		var img = $(event.htmlObject.selector + ' img');
		
		if (event.source.picture){
			img[0].src = event.source.picture;
			//imgage.show();
		}else{
			//imgage.hide();
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
