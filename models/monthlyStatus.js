module.exports = function(sequelize, DataTypes){
  var monthlyStatus = sequelize.define("monthlyStatus", {

    location1: DataTypes.INTEGER,
    location2: DataTypes.INTEGER,
    location3: DataTypes.INTEGER,
    location4: DataTypes.INTEGER,
    location5: DataTypes.INTEGER,
    location6: DataTypes.INTEGER,
    location7: DataTypes.INTEGER,
    location8: DataTypes.INTEGER,
    location9: DataTypes.INTEGER,
    location10: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        monthlyStatus.belongsTo(models.user, models.MonthlyChallenge, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  }
);
  return monthlyStatus;
};
