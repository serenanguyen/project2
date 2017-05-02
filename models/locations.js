module.exports = function(sequelize, DataTypes){
  var Location = sequelize.define("Location", {
    name: DataTypes.STRING,
    ratingAvg:DataTypes.INTEGER,
    address: DataTypes.STRING
  });
  return Location;
};
