// User Rating model
module.exports = function(sequelize, DataTypes) {
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
        // associate user rating to user and location
        userRating.belongsTo(models.user, models.Location, {
          foreignKey: {
            // user rating requires a foriegn key to be created 
            allowNull: false
          }
        });
      }
    }
  });
  return userRating;
};
