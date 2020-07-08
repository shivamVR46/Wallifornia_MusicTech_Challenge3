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


restService.post("/getSongByName", function(req, res) {

//  var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.song ?
//                "Shivam" : "Sadiq";

  // const speech = '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
  // const speech = "test 1.0"
  var speech ="";

  var trackNameOne = "One More Time";
  var artist = "Daft Punk";
  var album = "Discovery";
  var trackOne = "https://cdns-preview-e.dzcdn.net/stream/c-e77d23e0c8ed7567a507a6d1b6a9ca1b-9.mp3";
  
  var trackNameTwo = "Superheroes";
  var artistTwo = "Daft Punk";
  var albumTwo = "Heroes";
  var trackTwo = "https://cdns-preview-3.dzcdn.net/stream/c-3d8caae0a1c59f417f31bb747c43818b-7.mp3";

  var trackNameThree = "Too Long";
  var artistThree = "Daft Punk";
  var albumThree = "Alive 2007";
  var trackThree = "https://cdns-preview-3.dzcdn.net/stream/c-3d8caae0a1c59f417f31bb747c43818b-7.mp3";

  
  switch(req.body.queryResult.parameters.song){
    case "music":
     speech = '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
     break;
    case "too":
    speech = '<speak><audio src="https://cdns-preview-3.dzcdn.net/stream/c-3d8caae0a1c59f417f31bb747c43818b-7.mp3"><desc>Too Long</desc></audio></speak>';
    break;
    case "describe too":
      speech =  '<speak>Track name : '+trackNameThree+' by Artist name : '+artistThree+' from Album : '+albumThree+' </speak>';
      break;
    case "other":     
     speech = '<speak><audio src="https://cdns-preview-b.dzcdn.net/stream/c-b2e0166bba75a78251d6dca9c9c3b41a-7.mp3"><desc>deezer stream</desc></audio></speak>';
     break;
    case "one":
      speech = '<speak><audio src = "'+trackOne+'"><desc>One More Time</desc></audio></speak>';
     break; 
    case "describe one":
      speech = '<speak>Track name : '+trackNameOne+' by Artist name : '+artist+' from Album : '+album+' </speak>';
      break;
    case "superheros":
      speech = '<speak><audio src = "'+trackTwo+'"><desc>Superheros</desc></audio></speak>';  
      break;
    case "describe superheros":
      speech = '<speak>Track name : '+trackNameTwo+' by Artist name : '+artistTwo+' from Album : '+albumTwo+'</speak>';
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
    // data: trackId,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});



restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });
