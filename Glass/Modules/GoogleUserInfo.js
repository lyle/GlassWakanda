//curently this takes an accessToken - 
//I should switch this to take an access object
//and possibly a callback that writes any changes back to the datastore?

exports.getGoogleUserInfo = function( accessToken ){
  var xhr = new XMLHttpRequest();
  xhr.open('GET','https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken, false);
  xhr.send();
  return JSON.parse( xhr.responseText );
  //	{
  //	birthday: "0000-01-29"
  //	email: "email_address@example.com"
  //	family_name: "Last"
  //	gender: "male"
  //	given_name: "First"
  //	id: "234982392616981120234" //21 digits?
  //	link: "https://plus.google.com/234982392616981120234"
  //	locale: "en"
  //	name: "First Last"
  //	picture: "https://lh4.googleusercontent.com/some_path/photo.jpg"
  //	verified_email: true
  //	}
}

