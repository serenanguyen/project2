$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // create newUser object
  var newUser = {
    name: $("#name").val().trim(),
    email: $("#email").val().trim(),
    username: $("#username").val().trim(),
    password: $("#password").val().trim()
  };

  // send ajax post request
  $.post("/api/users", newUser).done(function(data){
    console.log(data);
  });

  // empty each input box after click
  // $("#name").val("");
  // $("#email").val("");
  // $("#username").val("");
  // $("#password").val("");
  // $("#verifyPassword").val("");
});
