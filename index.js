"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/getSongByName", function(req, res) {

//  var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.song ?
//                "Shivam" : "Sadiq";
  // console.log(req.body.queryResult.parameters);
  var speech ="";
  if(req.body.queryResult.parameters.song.toLowerCase().equals("music")){
     speech = 
  '<speak><audio src="https://cdns-preview-b.dzcdn.net/stream/c-b2e0166bba75a78251d6dca9c9c3b41a-7.mp3"><desc>a cat purring</desc></audio></speak>';
  }
  else{
       speech = 
    '<speak><audio ><desc>a cat purring</desc></audio></speak>';
    

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
    //data: speechResponse,
   fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});



restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });
