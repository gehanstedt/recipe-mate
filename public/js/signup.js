$(document).ready(function() {
    // Getting references to our form and input
    $("#register-button").on("click", function(event) {
        event.preventDefault();
        var password = $("#password-input").val().trim();
        var confirmPasswd = $("#password-input2").val().trim()

        if (password != confirmPasswd) {
            alert("Passwords do not match")
        }
        else {
            var userData = {
                full_name: $("#name-input").val().trim(),
                email: $("#email-input").val().trim(),
                password: $("#password-input").val().trim()
            };

            $.post("/api/signup", userData)
            .then(function(data) {
                alert("New User Added");
            })
            .fail(function(err) {
                var errMsg = JSON.parse(err.responseText)
                switch(errMsg.name) {
                    case "SequelizeUniqueConstraintError":
                        alert("Email is not unique");
                        break;
                    case "SequelizeValidationError":
                        alert("Invalid email format");
                        break;
                    default:
                        alert("Not able to add new user");
                }
            });
        }
    });
});


// $(document).ready(function() {
//   // Getting references to our form and input

//   // When the signup button is clicked, we validate the email and password are not blank
//   $("#register-button").on("click", function(event){
//   // signUpForm.onclick("#register", function(event) {

//     console.log("#name-input");
//     console.log("#email-input");
//     console.log("#password-input");
//     console.log("#password-input2");
  

//     event.preventDefault();
//     var userData = {
//       name: $("#name-input").val().trim(),
//       email: $("#email-input").val().trim(),
//       password: $("#password-input").val().trim()
//     };

//       console.log(userData);

//     if (!userData.email || !userData.password) {
//       return;
//     }
//     // If we have an email and password, run the signUpUser function
//     signUpUser(userData.name, userData.email, userData.password);
//     // $("#name-input").val("");
//     // "#email-input"
//     // "#password-input"
//     // emailInput.val("");
//     // passwordInput.val("");
//   });


//   function signUpUser(name, email, password) {
//     $.post("/api/signup", {
//       full_name: name,
//       email: email,
//       password: password
//     })
//       .then(function(data) {
//         window.location.replace("/members");
//         // If there's an error, handle it by throwing up a bootstrap alert
//       })
//       .catch(handleLoginErr);
//   }

//   function handleLoginErr(err) {
//     $("#alert.msg").text(err.responseJSON);
//     $("#alert").fadeIn(500);
//   }
// });