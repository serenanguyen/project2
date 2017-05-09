module.exports = function(sequelize, DataTypes){
  
  var MonthlyChallenge = sequelize.define("MonthlyChallenge", {
    name: DataTypes.STRING,
    currentChallenge: DataTypes.BOOLEAN,
    location1Id: DataTypes.INTEGER,
    location2Id: DataTypes.INTEGER,
    location3Id: DataTypes.INTEGER,
    location4Id: DataTypes.INTEGER,
    location5Id: DataTypes.INTEGER,
    location6Id: DataTypes.INTEGER,
    location7Id: DataTypes.INTEGER,
    location8Id: DataTypes.INTEGER,
    location9Id: DataTypes.INTEGER,
    location10Id: DataTypes.INTEGER
  }, {
    classMethods: {
        associate: function(models) {
          MonthlyChallenge.hasMany(models.monthlyStatus);
          // monthlyChallenge.belongsTo(models.Locations);
        }
      }
  });
  return MonthlyChallenge;
};
