module.exports = function(sequelize, DataTypes){
  var monthlyStatus = sequelize.define("monthlyStatus", {
    location1: DataTypes.BOOLEAN,
    location2: DataTypes.BOOLEAN,
    location3: DataTypes.BOOLEAN,
    location4: DataTypes.BOOLEAN,
    location5: DataTypes.BOOLEAN,
    location6: DataTypes.BOOLEAN,
    location7: DataTypes.BOOLEAN,
    location8: DataTypes.BOOLEAN,
    location9: DataTypes.BOOLEAN,
    location10: DataTypes.BOOLEAN
  });
  return monthlyStatus;
};
