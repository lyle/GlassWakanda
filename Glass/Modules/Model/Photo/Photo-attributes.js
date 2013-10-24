﻿var Photo;
Photo = new DataClass("Photos" ,"public");
Photo.ID = new Attribute("storage", "long", "key auto");
Photo.image = new Attribute("storage", "image");
Photo.taken_at = new Attribute("storage", "date", null, {simpleDate:false});
Photo.owner = new Attribute("relatedEntity", "Person", "Person");
Photo.meeting = new Attribute("relatedEntity", "Meeting", "Meeting");
Photo.comments = new Attribute("relatedEntities", "PhotoComment", "photo", {
	"reversePath": true
});
var primeDates = require("Model/dateAttributes/created_updated.js");
Photo.created_at = primeDates.created_at;
Photo.updated_at = primeDates.updated_at;
//model.Photo.events.onInit = function()

Photo.events.onSave = function()
{
	//linux does not suppor this
	//if ((! this.taken_at) && this.image && this.image.meta && this.image.meta.EXIF && this.image.meta.EXIF.DateTimeOriginal){
	//	this.taken_at = this.image.meta.EXIF.DateTimeOriginal;
	//}
}

module.exports = Photo;

