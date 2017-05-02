module.exports = function(sequelize, DataTypes){
  var monthlyChallenge = sequelize.define("monthlyChallenge", {
    challengeId: DataTypes.STRING,
    location1Id: DataTypes.STRING,
    location2Id: DataTypes.STRING,
    location3Id: DataTypes.STRING,
    location4Id: DataTypes.STRING,
    location5Id: DataTypes.STRING,
    location6Id: DataTypes.STRING,
    location7Id: DataTypes.STRING,
    location8Id: DataTypes.STRING,
    location9Id: DataTypes.STRING,
    location10Id: DataTypes.STRING
  });
  return monthlyChallenge;
};
