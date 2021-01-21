$(document).ready(function () {
    // Getting references to our form and input
    $("#register-button").on("click", function (event) {
        event.preventDefault();
        var password = $("#password-input").val().trim();
        var confirmPasswd = $("#password-input2").val().trim()

        if (password != confirmPasswd) {
            alert("Passwords do not match")
        } else {
            var userData = {
                full_name: $("#name-input").val().trim(),
                email: $("#email-input").val().trim(),
                password: $("#password-input").val().trim()
            };

            $.post("/api/signup", userData)
                .then(function (data) {
                    alert("New User Added");
                })
                .fail(function (err) {
                    var errMsg = JSON.parse(err.responseText)
                    switch (errMsg.name) {
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
