const db = require("../models");

module.exports = function (app) {
  app.post("/api/upload/:id", function (req, res) {
    let split = req.files.file.name.split(".");
    let ext = split[1];
    db.User.update(
      {image: req.files.file.data, tag: ext},
      {where: {
        id: req.params.id
      }}
    ).then(function () {
      res.end();
    });
  });

  app.get("/api/images/:id", function (req, res) {
    db.User.findOne({
      where:{
        id: req.params.id
      }
    }).then(function (data) {
      var html =
      `<img id="profilePic" data-toggle="modal" data-target="#imageModal" src="data:${data.image.type};base64,${data.image.toString("base64")}" />`;
      res.send(html);
    });
  });

};
