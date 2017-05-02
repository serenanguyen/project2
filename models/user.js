module.exports = function(sequelize, DataTypes){
//pass sequelize.define name of model and object describing model's schema
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      // flag that restricts username from being entereted if there is no text value
      allowNull: false,
      // validation for character length
      validate: {
        len: [1,10]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,10]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,10]
      }
    },
    // email validation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,10]
      }
    },
    // password hash
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,10]
      }
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
