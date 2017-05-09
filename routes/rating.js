// module.exports = function(app){
//
//   app.get("/rating", isLoggedIn, function(req,res){
//     res.render("rating");
//   })
//
//   // sending ratings to db
//   app.post("/api/rating", function(req, res){
//     userRating.create({
//       rating: req.body.star,
//       review: req.body.review,
//       notes: req.body.note,
//       userId: req.user.id
//     }).then(function(){
//         res.redirect('/');
//     });
//   });
//
//   function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()){
//     return next();
//   }
//     res.redirect('/signin');
//   };
// };
