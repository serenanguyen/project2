module.exports = function(sequelize, DataTypes){
  var userRating = sequelize.define("userRating", {
    review: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  });
  return uesrRating;
});
