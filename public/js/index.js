// LOGIN FUNCTION
$(document).ready(function() {
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
      }).then(function(data) {
        window.location = '/meds';
      }).catch(function(err) {
        console.log(err);
      });
    }
  
  });

// SIGN UP FUNCTION
$(document).ready(function() {
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  signUpForm.on("submit", function(event) {
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
    }).then(function(data) {
        console.log(data);
        window.location = '/meds';
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});




// SEARCH FUNCTION
function search() {
    $("#warnings").html('');
    $("#brand").html('');
    $("notfound").html('');
    var searchTerm = document.getElementById("fdaSearch").value
    $.ajax({
        url: "https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+brand_name:" +
            searchTerm + "&limit=5",
        dataType: "json",
        success: function (data) {
            for (i = 0; i < 500; i++) {
                var result = "BRAND NAME "+(data.results[i].openfda.brand_name)+"<br>"+"<br>"+"GENERIC NAME "+(data.results[i].openfda.generic_name)+"<br>"+"<br>"+"ROUTE "+(data.results[i].openfda.route)+"<br>"+"<br>"+"INTAKE "+(data.results[i].when_using)+"<br>"+"<br>"+(data.results[i].purpose)+"<br>"+"<br>"+(data.results[i].dosage_and_administration)+"<br>"+"<br>"+(data.results[i].active_ingredient)+"<br>"+"<br>"+(data.results[i].questions)+"<br>"+"<br>"+"<br>";
                if (data.results[i] === null) {
                    $("#notfound").append("Drug not found")
                } else if (data.results[i] === "") {
                    document.write("Try another search")
                } else {
                    $("#brand").append(result + " " + "<br>")
                    console.log(data.results[i])
                }
            }
        },
        type: 'GET'
    });
    
        $.ajax({
        url: "https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+brand_name:" +
            searchTerm + "&limit=5",
        dataType: "json",
        success: function (data) {
            for (i = 0; i < 500; i++) {
                var warnings = "IMPORTANT: <br>"+(data.results[i].keep_out_of_reach_of_children)+"<br>"+(data.results[i].pregnancy_or_breast_feeding)+"<br>"+(data.results[i].ask_doctor)+"<br>"+(data.results[i].do_not_use)+"<br>"+(data.results[i].stop_use)+"<br>"+"<br>"+(data.results[i].warnings);
                if (data.results[i].warnings === null) {
                    return err
                } else if (data.results[i].warnings === "") {
                    document.write("Try another search")
                } else {
                    $("#warnings").append(warnings + " " + "<br>")
                    console.log(data.results[i].warnings)
                }
            }
        },
        type: 'GET'
    });
    result.clear();
    warnings.clear();
    }



// MY PILL PAL 
// modal
$(function() {
    $("#btnWarning").on("click", function(event) {
        var medicine = $(this).data("id");
        
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response) {
            req.body.results[0].warnings[0];
        })
        //append to dom
    })
})