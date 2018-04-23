const db = require("../models");

module.exports = function (app) {

  app.post("/api/newUser", function(req, res) {
    req.body.token =  "t"+Math.random();
    console.log(req.body.token);
    db.User.create(req.body).then(function(data) {
      res.cookie("token", req.body.token,{maxAge: 999999999});
      res.json(data);
    });
  });

  app.post("/api/login", function(req, res) {
    db.User.update(
      {token: req.body.token},
      {where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(data) {
      if (data) {
        console.log("here");
        res.cookie("token", req.body.token,{maxAge: 999999999});
        db.User.findOne({
          where:{
            username: req.body.username
          }
        }).then(function (data) {
          res.json(data);
        });
      } else {
        res.end();
      }
    });
  });

  app.get("/api/userEvents/:id", function(req, res) {
    //console.log(req.body);
    db.User.findOne({
      where:{
        id: req.params.id
      },
      include: [{
        model: db.Event,
        through: {
          attributes: [],
          where: {
            userId: req.params.id
          }
        }
      }]
    }).then(function(data) {
      res.json(data);
    });
  });
};
