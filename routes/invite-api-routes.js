const db = require("../models");

module.exports = function (app) {
// this route is for the chat from the message board for an event
  app.get("/api/invite/:username", function (req, res) {
    db.Invite.findAll({
      where:{
        username: req.params.username
      }
    }).then(function (data) {
      console.log(data)
      res.json(data);
    });
  });

  app.delete("/api/deleteInvite/:id", function (req, res) {
    db.Invite.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.end();
    });
  });

  app.post("/api/invite/", function (req, res) {
    db.Invite.create(req.body).then(function (data) {
      res.json(data);
    }).then(function (response) {
      res.json(response);
    });
  });
};