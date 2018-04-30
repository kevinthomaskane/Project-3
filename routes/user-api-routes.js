const db = require("../models");

module.exports = function (app) {

  //this route is for Ed and the create a new user page
  app.post("/api/newUser", function(req, res) {

    if(req.files !== null){
      req.body.image = req.files.file.data;
      let split = req.files.file.name.split(".");
      let ext = split[1];
      req.body.tag = ext;
    }
    req.body.token =  "t"+Math.random();
    console.log(req.body.token);
    db.User.create(req.body).then(function(data) {
      res.cookie("token", req.body.token,{maxAge: 999999999});
      res.json(data);
    }).catch(function (err) {
      console.log(err);
    });
  });

  //this route is for a user logging in
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

  app.get("/api/user/:id", function (req, res) {
    db.User.findOne({
      where:{
        id: req.params.id
      }
    }).then(function (data) {
      if (data.image !== null){
      let image = data.image.toString("base64");
      data.image = image;
      }
      res.json(data);
    })
  });
  //this route is for Ed and the profile page to display a user's events
  app.get("/api/userEvents/:id", function(req, res) {
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
      if (data.image !== null){
        let image = data.image.toString("base64");
        data.image = image;
      };
      res.json(data);
    });
  });

  app.get("/api/allUsers", function(req, res) {
    db.User.findAll({
    }).then(function(data) {
      res.json(data);
    });
  });

  app.put("/update/:id", function (req,res) {
    if(req.files !== null){
      req.body.image = req.files.file.data;
      let split = req.files.file.name.split(".");
      let ext = split[1];
      req.body.tag = ext;
    }
    db.User.update(req.body,
    {where:{
      id:req.params.id
    }}).then(function (data) {
      res.json(data);
    });
  });

};
