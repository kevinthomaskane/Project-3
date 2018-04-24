module.exports = function (sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    content:{
      type: DataTypes.TEXT
    },
    username:{
      type:DataTypes.STRING,
      allowNull: false
    }
  });

  Chat.associate = function (models) {
    models.Chat.belongsTo(models.Event, {
      foreignKey: {
        name: "event_id",
        allowNull: false
      },
      onDelete: "CASCADE"
    });
  };

  return Chat;
};
