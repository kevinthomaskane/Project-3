const db = require("../models");

module.exports = function (app) {
  app.post("/api/userEvents", function(req, res) {
    //console.log(req.body);
    db.User.findOne({
      where:{
        id: req.body.userId
      },
      include: [{
        model: db.Event,
        through: {
          attributes: [],
          where: {
            userId: req.body.userId
          }
        }
      }]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/events", function (req, res) {
    let query = req.body === null ? {} : {where: req.body};
    db.Event.findAll(query).then(function (data) {
      console.log(data);
      res.json(data);
    });
  });
};
