const db = require("../models");

module.exports = function (app) {
//this route is for the chat from the message board for an event
  app.get("/api/chat/:id", function (req, res) {
    db.Chat.findAll({
      where:{
        event_id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/chat/", function (req, res) {
    db.Chat.create(req.body).then(function (data) {
      res.json(data);
    }).then(function (response) {
      res.json(response);
    });
  });
};
