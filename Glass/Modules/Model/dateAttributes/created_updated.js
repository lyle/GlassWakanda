var created_at,updated_at;

created_at = new Attribute("storage", "date", null);
created_at.events.onInit = function(attributeName) {
	this.created_at = new Date();
};

updated_at = new Attribute("storage", "date", null);
updated_at.events.onSave = function(attributeName) {
	this.updated_at = new Date();
};

exports.created_at = created_at;
exports.updated_at = updated_at;