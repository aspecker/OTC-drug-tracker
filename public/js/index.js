// LOGIN FUNCTION
$(document).ready(function () {
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };

      if (!userData.email || !userData.password) {
        return;
      }

      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (data) {
            window.location = '/meds';
        }).catch(function (err) {
            console.log(err);
            console.log(err.responseJSON.err.message);
            $(".message").text('Username or password not found');
        });
    }

  });

// SIGN UP FUNCTION
$(document).ready(function () {
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        signUpUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function signUpUser(email, password) {
        $.post("/api/signup", {
            email: email,
            password: password
        }).then(function (data) {
            console.log(data);
            window.location = '/meds';
        }).catch(function (err) {
            // console.log(err.responseJSON);
            console.log(err.responseJSON.err.original.sqlMessage);
            var sqlMsg = err.responseJSON.err.original.sqlMessage;
            var res = sqlMsg.split("'");
            var newMsg = `The email '${res[1]}' has already been registered.`;
            $(".message").text(newMsg);
        })
    }
    })



$('.med-btn').keypress(function(e){
	if(e.which == 13){//Enter key pressed
		$('#signup').click();//Trigger search button click event
	}
});
