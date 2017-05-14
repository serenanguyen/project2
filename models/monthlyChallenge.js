// Monthly Challenge model
module.exports = function(sequelize, DataTypes) {

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
      // associate monthly challenge with monthly status 
      associate: function(models) {
        MonthlyChallenge.hasMany(models.monthlyStatus);
      }
    }
  });
  return MonthlyChallenge;
};
