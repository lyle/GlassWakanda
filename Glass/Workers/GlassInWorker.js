var Mirror = require('MirrorAPI').Mirror;
var moment = require('moment.min');

currentSession().promoteWith('Administrator');

function processSharedMirrorItem(glassIn) {
  var MirrorAPI, mirrorItem, anImage, person, attachment, earlier, nowish, meetings, meeting;
  person = glassIn.googleAccount.person[0];
  MirrorAPI = new Mirror(glassIn.googleAccount);
  mirrorItem = MirrorAPI.getItem(glassIn.itemId);

  if (!mirrorItem || mirrorItem.error) {
    errorCount++;
    var log = new ds.GlassLog({
      request: mirrorItem.notificationBody
    })
    log.response = "getting itemId:" + glassIn.itemId + " gave error at fetch " + JSON.stringify(mirrorItem);
    log.orig = "GlassInWroker at " + Date.now();
    log.save();
    console.log("GlassInWorker error:" + JSON.stringify(mirrorItem));
  } else {
    if (mirrorItem.attachments) {
      for (var i = mirrorItem.attachments.length - 1; i >= 0; i--) {
        attachment = mirrorItem.attachments[i];
        //attachment ~= { id: "ps:5938166036004083986", contentType: "image/jpeg", contentUrl: "https://www.googleapis.com/mirror/v1/timeline/c1529178-8475-4d30-8d9e-f60160ac979e/attachments/ps:5938166036004083986?alt=media"}
        //MirrorAPI.getAttachment("ps:5938166036004083986","image/jpeg","https://www.googleapis.com/mirror/v1/timeline/c1529178-8475-4d30-8d9e-f60160ac979e/attachments/ps:5938166036004083986?alt=media");
        if (attachment && attachment.id && attachment.contentType && attachment.contentUrl) {
          anImage = MirrorAPI.getAttachment(
          attachment.id, attachment.contentType, attachment.contentUrl);
          if (anImage) {
            photo = new ds.Photo({
              owner: person
            });
            photo.image = anImage;
            if (anImage.meta && anImage.meta.EXIF && anImage.meta.EXIF.DateTimeOriginal) {
              photo.taken_at = anImage.meta.EXIF.DateTimeOriginal;
            } else {
              photo.taken_at = new Date();
            }

            earlier = moment(photo.taken_at).subtract('days', 1).format("YYYY-MM-DDTHH:mm");
            nowish = moment(photo.taken_at).add('hours', 12).format("YYYY-MM-DDTHH:mm");
            meetings = ds.Meeting.query("created_at > :1 and created_at < :2 order by created_at desc", earlier, nowish);

            if (meetings.length > 0) {
              meeting = meetings[0];
            } else {
              meeting = new ds.Meeting({
                title: moment(photo.taken_at).subtract('hours', 4).format('dddd MMM Do'),
                owner: person
              });
            }
            photo.meeting = meeting;
            meeting.save();
            photo.save();
          }
        }
      }
    }
  }
}

function processGlassIn() {
  var glassIns, glassIn, notificationBody;

  glassIns = ds.GlassIn.query('processed_at is null');
  glassIns.forEach(function(glassIn) {
    notificationBody = JSON.parse(glassIn.notificationBody);
    if (notificationBody.userActions[0].type == "SHARE") {
      processSharedMirrorItem(glassIn);
    } else {
      var log = new ds.GlassLog({
        request: glassIn.notificationBody
      })
      log.response = "This was not a Share";
      log.orig = "GlassInWroker at " + Date.now();
      log.save();
    }
    glassIn.processed_at = new Date();
    glassIn.save();
  });
  //console.log("Glass process Worker :" + count)
  //close();
  if (process && errorCount < 10) {
    setTimeout(processGlassIn, 10000);
  }
}


onconnect = function(event) {
  var thePort = event.ports[0];
  thePort.postMessage({
    "processGlassIn": process
  });
  thePort.onmessage = function(message) {
    var data = message.data;

    switch (data.command) {
    case 'start':
      console.log("starting GlassIn worker");
      errorCount = 0;
      process = true; //set to true to make it run
      processGlassIn();
      break;
    case 'shutdown':
      console.log("shutdown worker");
      process = false;
      break;
    }
  }

}
console.log("loading GlassIn worker");
var process = false;
var errorCount = 0;