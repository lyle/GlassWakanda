var created_at,updated_at;

created_at = new Attribute("storage", "date", null, {simpleDate:false});
created_at.events.onInit = function(attributeName) {
	this.created_at = new Date();
};

updated_at = new Attribute("storage", "date", null, {simpleDate:false});
updated_at.events.onValidate = function(attributeName) {
	this.updated_at = new Date();
};

exports.created_at = created_at;
exports.updated_at = updated_at;