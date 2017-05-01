module.exports = function(sequelize, DataTypes){
  var monthlyChallenge = sequelize.define("monthlyChallenge", {
    challenge id,
    location1 id,
    location2 id,
    location3 id,
    location4 id,
    location5 id,
    location6 id,
    location7 id,
    location8 id,
    location9 id,
    location10 id
  });
  return monthlyChallenge;
});
