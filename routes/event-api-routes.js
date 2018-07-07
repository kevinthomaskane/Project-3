const db = require("../models");
const get_ip = require("ipware")().get_ip;
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "meetup_db"
});

module.exports = function(app) {
  //this route is for Gus and the main page
  app.get("/api/events/:sportType", function(req, res) {
    let info = get_ip(req);
    let query =
      req.params.sportType === "none"
        ? {}
        : { where: { sportType: req.params.sportType } };
    db.Event.findAll(query).then(function(data) {
      res.json({ data, ip: info });
    });
  });

  //this route is for Kevin for each specific event page
  app.get("/api/event/:id", function(req, res) {
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User,
          through: {
            attributes: [],
            where: {
              eventId: req.params.id
            }
          }
        }
      ]
    }).then(function(data) {
      db.Going.findAll({
        where: {
          eventId: req.params.id,
          isHost: true
        }
      }).then(function(response) {
        for (let i = 0; i < data.Users.length; i++) {
          if (data.Users[i].image !== null) {
            let image = data.Users[i].image.toString("base64");
            let ext = data.Users[i].dataValues.tag;
            data.Users[i].image = image;
          }
        }

        res.json({ attendees: data, host: response });
      });
    });
  });

  app.delete("/api/leaveEvent/:user_id", function(req, res) {
    db.Going.destroy({
      where: {
        eventId: req.body.eventId,
        userId: req.params.user_id
      }
    }).then(function(response) {
      res.json(response);
    });
  });

  //this route is for Ed and the profile page so users can create events
  app.post("/api/createEvent/:user_id", function(req, res) {
    db.Event.create(req.body).then(function(even) {
      db.Going.create({
        isHost: true,
        userId: req.params.user_id,
        eventId: even.id
      }).then(function(res) {});
      res.json(even);
    });
  });

  //this route is for Kevin and the specific event page to add new hosts
  app.post("/api/join/:event_id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then(function(user) {
      let EID = parseInt(req.params.event_id);
      db.Going.create({
        isHost: false,
        userId: user.id,
        eventId: EID
      }).then(function(res) {});
      res.json(user);
    });
  });

  app.post("/api/addHost/:event_id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then(function(user) {
      db.Going.create({
        isHost: true,
        userId: req.body.userId,
        eventId: req.params.event_id
      }).then(function(res) {});
      res.json(user);
    });
  });

  //this route is for deleting events owned by a user
  app.delete("/api/userEvent/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.end();
    });
  });
};
