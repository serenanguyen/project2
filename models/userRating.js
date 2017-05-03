module.exports = function(sequelize, DataTypes){
  var userRating = sequelize.define("userRating", {
    review: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    rating: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        userRating.belongsTo(models.User, {
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
