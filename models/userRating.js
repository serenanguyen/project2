module.exports = function(sequelize, DataTypes){
  var userRating = sequelize.define("userRating", {
    review: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        userRating.belongsTo(models.user, models.Location, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  }

);
  return userRating;
};
