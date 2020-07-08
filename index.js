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

    var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.song ?
                 new Audio('file:///D://file_example_MP3_700KB.mp3') : "No such song";

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
    source: "TEST11-MASTER"
  });
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });
