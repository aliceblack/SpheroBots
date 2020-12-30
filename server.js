var sphero = require("sphero");
var orb = sphero("D4:9C:50:B5:C4:30");

function move(speed, heading, state, option){
  orb.roll(speed, heading, state);
}

orb.connect(() => {
  console.log("connected!")
  orb.color("green");
});


const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");

var application = express();

application.use(bodyParser.json());

application.use(express.static(path.join(__dirname, 'public')));

application.post("/api/color", function(req, res) {
  if (!req.body.color) {
    handleError(res, "Invalid input", "Must provide a color.", 400);
  } else {
    console.log("orb color: "+req.body.color)
    orb.color(req.body.color);
    res.status(200);
  }
});

application.post("/api/move", function(req, res) {
  if (!req.body.direction) {
    handleError(res, "Invalid input", "Must provide a direction.", 400);
  } else {
    console.log("orb direction: "+req.body.direction)
    switch (req.body.direction) {
      case "left":
        move(70, 270, 1);
        break;
      case "right":
        move(70, 90, 1);
        break;
      case "front":
        move(70, 0, 1);
        break;
      case "back":
        move(70, 180, 1);
        break;
      case "stop":
        move(0, 0, 0);
        break;
      default:
        move(0, 0, 0);
        break;
    }
    res.status(200);
  }
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

application.use('/', router);
application.listen(process.env.port || 3000);

console.log('Running at port 3000');