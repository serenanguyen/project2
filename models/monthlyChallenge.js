module.exports = function(sequelize, DataTypes){
  var monthlyChallenge = sequelize.define("monthlyChallenge", {
    challengeId: DataTypes.INTEGER,
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
          monthlyChallenge.hasMany(models.monthlyStatus);
          // monthlyChallenge.belongsTo(models.Locations);
        }
      }
  }
);
  return monthlyChallenge;
};
