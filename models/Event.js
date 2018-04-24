module.exports = function(sequelize, DataTypes) {
  const Even = sequelize.define("Event", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultVaulte: DataTypes.NOW
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    sportType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  });

  Even.associate = function(models) {
    const User = models.User;
    Even.belongsToMany(User, {
      through: "Host",
      foreignKey: "eventId"
    });

    Even.belongsToMany(User, {
      through: "Attendee",
      foreignKey: "eventId"
    });

    Even.hasMany(models.Chat, {
      foreignKey: {
        name: "event_id",
        allowNull: false
      }
    });

  };

  return Even;
};
