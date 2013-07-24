var Mirror = require('MirrorAPI').Mirror;

function listItems(request, response){
	var currentUser = currentSession().user;
	var user= ds.Person.find("ID=:1", currentUser.ID);
	response.contentType = 'application/json';
	
	if (user) {
		var mir = new Mirror(user.GoogleAccess);
		var currentItems = mir.listItems();
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
  var res;
  //GET https://www.googleapis.com/mirror/v1/timeline
  xhr = new XMLHttpRequest();
  var currentPerson = ds.Person.getCurrentPerson();
  var access_token = currentPerson.GoogleAccess.access_token;
   //.GoogleAccess;//.access_token;
  var url = 'https://www.googleapis.com/mirror/v1/timeline/?' ;
  url += "maxResults=100";
  url += "&orderBy=displayTime";
  url += '&includeDeleted=true';
  
  var auth = 'Bearer ' + access_token;
  xhr.open('GET', url);
  
  xhr.setRequestHeader('Authorization', auth);
  xhr.setRequestHeader('User-Agent',"wakandaDB sample - lyle@4d.com")
  xhr.send();
  
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

