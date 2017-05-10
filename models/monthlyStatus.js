module.exports = function(sequelize, DataTypes){
  var monthlyStatus = sequelize.define("monthlyStatus", {
    location1: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location3: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location4: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location5: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location6: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location7: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location8: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location9: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location10: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        monthlyStatus.belongsTo(models.user, models.challengeId, {
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
