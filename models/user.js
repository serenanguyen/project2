module.exports = function(sequelize, DataTypes){
//pass sequelize.define name of model and object describing model's schema
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
// returns an object stored inside User variable  
  return User;
}
