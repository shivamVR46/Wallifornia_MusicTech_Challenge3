"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

/*
api for fetching data using track name 
api : http://localhost:3000/request/:id
 */
function getData(id) {
  request('https://api.deezer.com/track/'+id, function(err, res2, body) {
    //console.log('https://api.deezer.com/track/'+req.params.id);
    if (err) console.error(err)
    else {
        var jsonObj = JSON.parse(body);
      console.log(jsonObj["title"]);
      console.log(jsonObj['artist']['name']);
      console.log(jsonObj['album']['title']);
      console.log(jsonObj['preview']);
        
        return;
    }
    
});
}



restService.post("/getSongByName", function(req, res) {

//  var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.song ?
//                "Shivam" : "Sadiq";

  // const speech = '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
  // const speech = "test 1.0"
  var speech ="";
  var trackId="";
  trackId = request('https://api.deezer.com/track/3135553', function(err, res2, body) {
    //console.log('https://api.deezer.com/track/'+req.params.id);
    if (err) trackId = "error";
    else {
        var jsonObj = JSON.parse(body);
        //trackId = jsonObj["title"];
      //console.log(jsonObj['artist']['name']);
      //console.log(jsonObj['album']['title']);
      //console.log(jsonObj['preview']);
      return jsonObj["title"];
    }
});


  switch(req.body.queryResult.parameters.song){
    case "music":
     speech = '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
     break;
    case "too long":
      speech = '<speak><audio src="https://cdns-preview-d.dzcdn.net/stream/c-ddf495316e2afbe4327d9a6e17840a69-7.mp3"><desc>Too long</audio></speech>'; 
      break;
    case "other":     
     speech = '<speak><audio src="https://cdns-preview-b.dzcdn.net/stream/c-b2e0166bba75a78251d6dca9c9c3b41a-7.mp3"><desc>deezer stream</desc></audio></speak>';
     break;
  }

  


  // '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
               //  new Audio('file:///D://file_example_MP3_700KB.mp3') ;

  // const song = req.body.result.parameters.song.toLowerCase();
  // const speech1 = new Audio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');
  // var speech = "";

  // speech = 'shivam';

  var speechResponse = {  
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };

  return res.json({
    payload: speechResponse,
    data: trackId,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});



restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });
