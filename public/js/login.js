$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // 
  // 				<input type="text" placeholder="Email" id="email-login-input">
	//			<input type="password" placeholder="Password" id="password-login-input">
	//			<input type="button" value="Login" id="login-button">

  // When the form is submitted, we validate there's an email and password entered
  $("#login-button").on("click", function(event) {
    event.preventDefault();
    console.log ("I'm here.");
    var userData = {
      email: $("#email-login-input").val().trim(),
      password: $("#password-login-input").val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    console.log (userData);

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
