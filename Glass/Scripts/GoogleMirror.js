var Mirror = require('MirrorAPI').Mirror;
var mus = require("mustache");

function listItems(request, response){
	var currentUser = currentSession().user;
	var user= ds.Person.find("ID=:1", currentUser.ID);
	response.contentType = 'application/json';
	
	if (user) {
		var mir = new Mirror(user.GoogleAccess);
		var currentItems = mir.listItems({maxResults:200});
		response.body = JSON.stringify(currentItems);
	}else{
		response.body = JSON.stringify({"error":"not logged in?"});
	}

}

function listContactItems(request, response){
	var currentUser = currentSession().user;
	var user= ds.Person.find("ID=:1", currentUser.ID);
	response.contentType = 'application/json';
	
	if (user) {
		var mir = new Mirror(user.GoogleAccess);
		var currentItems = mir.listContacts();
		response.body = JSON.stringify(currentItems);
	}else{
		response.body = JSON.stringify({"error":"not logged in?"});
	}

}


function post(request, response){

  var res;
  xhr = new XMLHttpRequest();
  var currentPerson = ds.Person.getCurrentPerson();
  var access_token = currentPerson.GoogleAccess.access_token;
  var to_post = '{"text": "wakandaDB Google Glass App - now sending data!","notification": {"level": "DEFAULT"  }, menuItems:[{"action":"SHARE"}]}';
  var url = 'https://www.googleapis.com/mirror/v1/timeline';
  
  var auth = 'Bearer ' + access_token;
  xhr.open('POST', url);
  xhr.setRequestHeader('Authorization', auth);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept"	,"application/json");
  
  xhr.send(to_post);
  
  response.contentType = 'text/html';
  var res = "<html><body>";
  res += "<br /><br />Version of Wakanda:";
  res += process.version;
  res += "<br /><br />And here is some json google: <br />"
  res += xhr.responseText;
  res += "<br /><br /> <br />"
  res += url;
  res += "</body></html>";
  
  response.body =  res;
  
}

function list(request, response)
{
  var currentUser = currentSession().user;
  var user= ds.Person.find("ID=:1", currentUser.ID);
  var mir = new Mirror(user.GoogleAccess);
  response.contentType = 'text/html';
  
	if (!user) {
		response.body = "<html><body>Problem</body></html>";

	}else{
		var mir = new Mirror(user.GoogleAccess);
		var options = {maxResults:50};
		var theQuery = getURLQuery(request.url);
  		if (theQuery.pageToken) {
  			options.pageToken = theQuery.pageToken;
  		}
  		
		var currentItems = mir.listItems(options);

		var template = "{{#items}} {{{html}}} {{/items}}";
		var res = '<html><head><script src="/waLib/WAF/lib/jquery/jquery.min.js" type="text/javascript" charset="utf-8"></script><link rel="stylesheet" href="/lib/glass_base_style.css" /></head><body>';
  		res += mus.to_html(template, currentItems);
  		res += "<div style='margin-top: 360px;'>Version of Wakanda:";
  		res += process.version;
  		res += '<a href="'+getURLPath(request.url).join("/")+'?pageToken='+currentItems.nextPageToken+'">next</a>';
  		res += "</div>";
  		res += "<script>$( document ).ready(function() {$('body article').on('click', function(){this.parentNode.appendChild(this);})})</script>";
  		res += '<script>console.log('+JSON.stringify(currentItems)+')</script>';
  		
  		res += "</body></html>";
  
		response.body = res;
	
	}  
}

