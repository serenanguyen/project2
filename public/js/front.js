
console.log("connected");
$("#submitButton").on("click", function(){
    // preventDefault();
    
    var pass1 = document.getElementById("pass1").value;
    var pass2 = document.getElementById("pass2").value;
    console.log(pass1);
    console.log(pass2);
    var ok = true;
    if (pass1 !== pass2) {
        alert("Passwords Do not match");
        document.getElementById("pass1").style.borderColor = "#E34234";
        document.getElementById("pass2").style.borderColor = "#E34234";
        ok = false;
    }
    else {
        alert("good2go");
    }
    return ok;
});
