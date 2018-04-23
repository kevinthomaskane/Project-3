const db = require("../models");

module.exports = function (app) {


  app.get("/api/events", function (req, res) {
    let query = req.body === null ? {} : {where: req.body};
    db.Event.findAll(query).then(function (data) {
      res.json(data);
    });
  });

  app.get("/api/events/:id", function (req,res) {
    db.Event.findOne({
      where:{
        id: req.params.id
      },
      include: [{
        model: db.User,
        through: {
          attributes: [],
          where: {
            eventId: req.params.id
          }
        }
      }]
    }).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/addEvent", function(req, res) {
    db.Event.create({
        name: req.body.name,
      })
      .then(function(event) {
        event.setUsers([req.body.userId]);
        res.json(event);
      });
  });

  app.post("/api/contributors/:event_id", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.name
      }
    }).then(function (user) {
     // console.log(db.User.prototype);
      user.addEvents([req.params.event_id]);
      res.json(user);
    })
  });

  app.delete("/api/userEvent/:id", function (req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.end();
    });
  });

};
