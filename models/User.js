module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    tag: DataTypes.STRING,
    skill_level: DataTypes.INTEGER,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT
  });

  User.associate = function(models) {
    const Even = models.Event
    User.belongsToMany(Even, {
      through: models.Going,
      foreignKey: "userId"
    });
  };
  return User;
};
