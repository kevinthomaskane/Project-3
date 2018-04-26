module.exports = function (sequelize, DataTypes) {
  var Going = sequelize.define("Going", {
    isHost:{
      type: DataTypes.BOOLEAN,
      default: false
    }
  },
  {
    timestamps: false
  });

  return Going;
};
