module.exports = function(sequelize, Sequelize){
//pass sequelize.define name of model and object describing model's schema
  var User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      // flag that restricts username from being entereted if there is no text value
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // email validation
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // password hash
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    badges: {
      type: Sequelize.STRING,
    }
  },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.userRating, models.monthlyStatus, {
          // When user is deleted, also delete any associated ratings
            onDelete: "cascade"
          });
        }
      }
    }
);
// returns an object stored inside User variable
  return User;
};
