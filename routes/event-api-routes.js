const db = require("../models");
const get_ip = require('ipware')().get_ip;
const mysql = require("mysql");
const connection = mysql.createConnection({
   host: "localhost",
   port: 3306,

   user: "root",

   password: "",
   database: "meetup_db"
});

module.exports = function (app) {

  //this route is for Gus and the main page
  app.get("/api/events", function (req, res) {
    let info = get_ip(req);
    console.log(info);
    let query = req.body === null ? {} : {where: req.body};
    db.Event.findAll(query).then(function (data) {
      res.json({data, ip: info});
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
  app.post("/api/join/:event_id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then(function (user) {
      let query = `INSERT INTO Attendee (eventId, userId, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW());`;
      connection.query(query, [req.params.event_id, user.id ], function (err, res) {
        console.log(res);
      });
      res.json(user);
    })
  });

  app.post("/api/addHost/:event_id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then(function (user) {
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
