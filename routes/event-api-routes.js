const db = require("../models");

module.exports = function (app) {

  //this route is for Gus and the main page
  app.get("/api/events", function (req, res) {
    let query = req.body === null ? {} : {where: req.body};
    db.Event.findAll(query).then(function (data) {
      res.json(data);
    });
  });

  //this route is for Kevin for each specific event page
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

  //this route is for Ed and the profile page so users can create events
  app.post("/api/createEvent/:user_id", function(req, res) {
    db.Event.create(req.body)
      .then(function(even) {
        even.setUsers([req.params.user_id]);
        res.json(even);
      });
  });

  //this route is for Kevin and the specific event page to add new hosts
  app.post("/api/addHosts/:event_id", function (req, res) {
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

  //this route is for deleting events owned by a user
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
