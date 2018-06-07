//   A web-based hubot response manager intended to allow users to add all their memes and silly
//   responses without needing to write javascript.
//
// Configuration:
//
//
// Commands:
//   roomid - Displays the id for the room
//   roomid <room name> - Displays the id for the target room
//
// Notes:
//   This plugin requires ejs be loaded into hubot.
//
// Author:
//   Mark Webb <markwebbmn@gmail.com>

var path = require('path');

function SendRandom(arrayName) {
  return arrayName[Math.floor(Math.random()*arrayName.length)];
}

function validate_value(value) {
  try {
     if (value.match === '') {
        return false;
     }
     if (value.responses.count == 0 || value.responses[0] === '') {
        return false;
     }
     if (value.at_user !== false && value.at_user !== true) {
        return false;
     }
     if (value.exact_match !== false && value.exact_match !== true) {
        return false;
     }
   } catch (error) {
       console.log("Error validating value: " + error);
      return false;
   }
   return true;
}


module.exports = function(robot) {

    function setup_responder() {
      robot.brain.set("hubot-responses", {  "messages" : [] });
      robot.brain.set("hubot-responses-room-filters", { "whitelist" : ["*"], "blacklist" : ["GENERAL"] });
    }


    robot.respond(/open the (.*) doors/i, function(msg){
      if (msg.match[1] == "pod bay") {
        msg.reply("I'm afraid I can't let you do that.");
      } else {
        msg.reply("Opening " + msg.match[1] + " doors.");
      }
    });

    // Generic functions to find the ID of a room in case it's not apparent.
    robot.hear(/roomid$/, function(msg){
      msg.send("The room ID for this is : " + msg.message.room);
    });

    robot.hear(/roomid (.*)/, function(msg){
      roomname = msg.match[1];
      robot.adapter.chatdriver.getRoomId(roomname).then(function(id) {
         msg.send("The room ID for " + roomname + " is: " + id);
      });
    });

    robot.hear(/(.*)/i, function(msg){
      said = msg.match[1];
      room = msg.message.room;
      blacklist = robot.brain.get("hubot-responses-room-filters").blacklist;
      whitelist = robot.brain.get("hubot-responses-room-filters").whitelist;
      checks = robot.brain.get("hubot-responses").messages;
      for (i = 0, len = checks.length; i < len; i++) {
        comment_match = said.toLowerCase().indexOf(checks[i].match.toLowerCase());
        if (comment_match !== -1) {
          if (whitelist.indexOf(room) !== -1 || whitelist[0] === '*') {
            if (blacklist.indexOf(room) === -1) {
              // At this point the message matches (not exactly) and is in the whitelist and not in the blacklist,
              // Let's check for exact match and then reply or send as necessary.
              if ((checks[i].exact_match && checks[i].match.toLowerCase() === said.toLowerCase()) || (checks[i].exact_match === false)) { 
                if (checks[i].at_user) {
                  msg.reply(SendRandom(checks[i].responses));
                } else {
                  msg.send(SendRandom(checks[i].responses));
                }
              }
            }
          }
        }
      }
    });

  robot.router.set('view engine', 'ejs');
  robot.router.set('views', path.join(__dirname, 'views'));

  robot.router.get("/setup", function(req, res) {
    robot.brain.set("hubot-responses", {  "messages" : [] });
    robot.brain.set("hubot-responses-room-filters", { "whitelist" : ["*"], "blacklist" : ["GENERAL"] });
    res.end("Entered setup value.");
  });

  robot.router.get("/list", function(req, res) {
    try {
      list = robot.brain.get("hubot-responses").messages;
    } catch (error) {
      list = {};
      console.log("hubot-responder error: " + error + ".");
    }
    res.render('list', { title: 'List', messagelist: list, page: 'list' });
  });

  robot.router.get("/configuration", function(req, res) {
    try {
      rooms = robot.brain.get("hubot-responses-room-filters");
    } catch (error) {
      console.log("hubot-responder error: " + error + ".");
    }
    if (rooms === null) {
      rooms = { "whitelist" : ["NOT SET"], "blacklist" : ["NOT SET"] };
    }
    res.render('configuration', { title: 'Configuration', rooms, page: 'configuration' });
  });

  robot.router.post("/configuration", function(req, res) {
    whitelist_rooms = [];
    if (req.body['whitelist_rooms']) {
       temp_array = req.body['whitelist_rooms'].split(',');
       for (var i = 0; i < temp_array.length; i = i + 1) {
         whitelist_rooms.push(temp_array[i].trim());
       }
    }
    blacklist_rooms = [];
    if (req.body['blacklist_rooms']) {
       temp_array = req.body['blacklist_rooms'].split(',');
       for (var i = 0; i < temp_array.length; i = i + 1) {
         blacklist_rooms.push(temp_array[i].trim());
       }
    }
    value = { "blacklist" : blacklist_rooms, "whitelist" : whitelist_rooms };
    robot.brain.set("hubot-responses-room-filters", value);
    rooms = robot.brain.get("hubot-responses-room-filters");
    res.render('configuration', { title: 'Configuration', rooms, page: 'configuration', success: true });
  });

  robot.router.get("/create", function(req, res) {
    res.render('create', { title: 'New Response', page: 'create' });
  });


  robot.router.get("/delete/:id", function(req, res) {
    id = req.params.id;
    messages = robot.brain.get("hubot-responses").messages;
    try {
      message = messages[id];
      res.render('delete', { title: 'Delete Response', message, id, page: 'Delete' });
    } catch (error) {
      return res.redirect('/list');
    }
  });

  robot.router.post("/delete", function(req, res) {
    if (req.body['id']) {
      checks = robot.brain.get("hubot-responses").messages;
      checks.splice(id, 1); 
      return res.redirect('/list');
    } else {
      res.end("Could not find item to delete!");
    }
  });

  
  robot.router.post("/create", function(req, res) {
    // Iterating through responses.
    responses = [];
    finding = true;
    i = 0;
    while (finding) {
        try {
          if (req.body['message_value' + i]) {
            if (req.body['message_value' + i] !== '') {
              responses.push(req.body['message_value' + i]);
            }
          } else {
            finding = false;
          }
          i = i + 1;
        } catch (error) {
          finding = false;
        }
    }
    // Checkboxes for at_user and exact_match
    if (req.body['at_user'] && req.body['at_user'] === 'on') {
       at_user = true;
    } else {
       at_user = false;
    }
    if (req.body['exact_match'] && req.body['exact_match'] === 'on') {
       exact_match = true;
    } else {
      exact_match = false;
    }
    value = { "match" : req.body.match_value, "responses" : responses, "at_user" : at_user, "exact_match" : exact_match };
    if (validate_value(value)) {
        try {
            messages = robot.brain.get("hubot-responses").messages;
            if (req.body['id']) {
              messages[parseInt(req.body['id'], 10)] = value;
            } else {
              messages.push(value);
            }
        } catch (error) {
            try {
                robot.brain.set("hubot-responses", { "messages" : [ value ] });
            } catch (baderror) {
                return res.end("Could not insert response into database: " + baderror);
            }
        }
        return res.redirect('/list');
    } else {
       return res.end("Bad request sent -- missing required fields or invalid fields used!");
    }
  });

  robot.router.get("/edit/:id", function(req, res) {
    id = req.params.id;
    messages = robot.brain.get("hubot-responses").messages;
    try {
      message = messages[id];
      res.render('edit', { title: 'Edit Response', message, id, page: 'edit' });
    } catch (error) {
      res.render('edit', { title: 'New Response', page: 'edit' });
    }
  });
}
