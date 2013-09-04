﻿

function Mirror(GoogleAccess, options){
  this.options = options || {};
  this.card = {};
  this.card.menuItems = [{"action":"SHARE"},{"action":"DELETE"},{"action":"TOGGLE_PINNED"}];
  this.card.notification = {"level": "DEFAULT"  };
  this.GoogleAccess = GoogleAccess;
  this.url = 'https://www.googleapis.com/mirror/v1/timeline';
  this.contactsUrl = 'https://www.googleapis.com/mirror/v1/contacts';
}
Mirror.prototype.listContacts = function(){
  return this.submitWithRefreshAuth('GET', this.contactsUrl, null, true);
}

Mirror.prototype.removeContact = function(contactID){
  var url = this.contactsUrl + '/' + contactID;
  return this.submitWithRefreshAuth('DELETE', url, null, true);
}

Mirror.prototype.addContact = function(contactID, displayName, imageUrlArray){
  var contact ={};
  contact.id = contactID;
  contact.displayName = displayName;
  contact.imageUrls = imageUrlArray;
  contact.priority = 7;
  contact.type = "GROUP";
  
  return this.submitWithRefreshAuth('POST',
  		this.contactsUrl,
  		JSON.stringify(contact), true);
}
Mirror.prototype.updateContact = function(contactID, displayName, imageUrlArray){
  var contact ={};
  contact.id = contactID;
  contact.displayName = displayName;
  contact.imageUrls = imageUrlArray;
  contact.priority = 7;
  contact.type = "GROUP";
  
  return this.submitWithRefreshAuth('PUT',
  		this.contactsUrl + "/" + contactID,
  		JSON.stringify(contact), true);
}


Mirror.prototype.submitWithRefreshAuth = function(method, url, body, attemptReAuth){
	var xhr = new XMLHttpRequest();
	var auth = 'Bearer ' + this.GoogleAccess.access_token;
	var response;
	xhr.open(method, url);
  	xhr.setRequestHeader('Authorization', auth);
  	xhr.setRequestHeader('Content-Type','application/json');
  	if (body) {
		xhr.send(body);
	}else{
		xhr.send();
	}
	if (xhr.responseText ){
		response = JSON.parse(xhr.responseText);
	}else{
		return {"no-response":true};
	}
	if (response && response.error && response.error.code == 401){
		//401 is "Invalid Credentials
		if (attemptReAuth && this.GoogleAccess.getRefreshedAccessToken()){
			response = this.submitWithRefreshAuth(method, url, body, false);
		}
	}
	return response;
	
}	


Mirror.prototype.postHTMLMessage = function(htmlMessage, options){
  var options = options || {};
  var to_post = {};
  to_post.html = htmlMessage;
  to_post.menuItems = options.menuItems || this.card.menuItems;
  to_post.notification = options.notification || this.card.notification;
  if (options.bundleId) {
  	to_post.bundleId = options.bundleId;
  }
  return this.sendMessage(to_post);
}

Mirror.prototype.deleteItem = function(itemId){
	var response, xhr, auth;
	xhr = new XMLHttpRequest();
	auth = 'Bearer ' + this.GoogleAccess.access_token;
	xhr.open('DELETE', this.url + "/" + itemId);
	xhr.setRequestHeader('Authorization', auth);
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send();
	
	return xhr.responseText;
}

Mirror.prototype.listItems = function(options){
	var response, xhr, auth;
	var options = options || {};
	options.maxResults = options.maxResults || 10;
	this.url += "?maxResults=" + options.maxResults;
	if(options.pageToken){
		this.url += "&pageToken=" + options.pageToken;
	}
	xhr = new XMLHttpRequest();
	auth = 'Bearer ' + this.GoogleAccess.access_token;
	xhr.open('GET', this.url);
	xhr.setRequestHeader('Authorization', auth);
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send();
	response = JSON.parse(xhr.responseText);
  
	if (response && response.error && response.error.code == 401){
		//401 is "Invalid Credentials"
		//need to refresh access token probably
		xhr = new XMLHttpRequest();
		auth = 'Bearer ' + this.GoogleAccess.getRefreshedAccessToken();
		xhr.open('GET', this.url);
		xhr.setRequestHeader('Authorization', auth);
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send();
		response = JSON.parse(xhr.responseText);
  	}
  	return response;
}
Mirror.prototype.postTextImageMessage = function(textMessage, imageURL, options){
  var options = options || {};
  var to_post = {};
  to_post.html = '<article class="photo">';
  to_post.html += '<img src="' + imageURL + '" width="100%" height="100%">';
  to_post.html += '<div class="photo-overlay"/><section><p class="text-auto-size">';
  to_post.html +=   textMessage;
  to_post.html += '</p></section></article>';
  to_post.menuItems = options.menuItems || this.card.menuItems;
  to_post.notification = options.notification || this.card.notification;
  if (options.bundleId) {
  	to_post.bundleId = options.bundleId;
  }
  return to_post;
  //return this.sendMessage(to_post);
}

Mirror.prototype.postTextMessage = function(textMessage, options) {
	//desire to re-factor this - make options loop over to modify object setting
  var options = options || {};
  var to_post = {};
  to_post.text = textMessage;
  to_post.menuItems = options.menuItems || this.card.menuItems;
  to_post.notification = options.notification || this.card.notification;
  if (options.bundleId) {
  	to_post.bundleId = options.bundleId;
  }
  return this.sendMessage(to_post);
}


Mirror.prototype.sendMessage = function(body) {
  var auth;
  var response;
  
  xhr = new XMLHttpRequest();
  auth = 'Bearer ' + this.GoogleAccess.access_token;
  xhr.open('POST', this.url);
  xhr.setRequestHeader('Authorization', auth);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(JSON.stringify(body));
  response = JSON.parse(xhr.responseText);
  
  if (response && response.error && response.error.code == 401){
  	//401 is "Invalid Credentials"
  	//need to refresh access token probably
  	xhr = new XMLHttpRequest();
  	var auth = 'Bearer ' + this.GoogleAccess.getRefreshedAccessToken();
  	xhr.open('POST', this.url);
  	xhr.setRequestHeader('Authorization', auth);
  	xhr.setRequestHeader('Content-Type','application/json');
  	xhr.send(JSON.stringify(body));
  	response = JSON.parse(xhr.responseText);
  }
  //console.log(response)
  
  return response;
}



exports.Mirror = Mirror;