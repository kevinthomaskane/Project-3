module.exports = function (sequelize, DataTypes) {
  var Invite = sequelize.define("Invite", {
    eventId:{
      type: DataTypes.INTEGER
    },
    username:{
      type:DataTypes.STRING,
      allowNull: false
    },
    sender:{
      type: DataTypes.STRING,
      allowNull: false
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Invite.associate = function (models) {
    models.Invite.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE"
    });
  };

  return Invite;
};