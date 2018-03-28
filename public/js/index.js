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

// Med Page Functions
// Display Med Information
const printMedInfo = (medId) =>{
    $.ajax({
        url: `https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+openfda.product_ndc:"${medId}"`,
        method: 'GET'
    }).then((response)=>{
        console.log(response);
        let drugInfo = response.results[0];
        let brand = $(`<h4 class='infoHead'>${drugInfo.openfda.brand_name[0]}</h4>`);
        let generic = $(`<p class='infoItem'><strong>Generic Name:</strong> ${drugInfo.openfda.generic_name[0]}</p>`);
        let doseAdmin = $(`<p class='infoItem'><strong>Dosage/Administration:</strong> ${drugInfo.dosage_and_administration[0]}</p>`);
        let indication = $(`<p class='infoItem'><strong>Indication:</strong> ${drugInfo.indications_and_usage[0]}</p>`);
        let route = $(`<p class='infoItem'><strong>Route:</strong> ${drugInfo.openfda.route[0]}</p>`);
        $('.modal-body').empty();
        $('.modal-title').empty();
        $('.modal-title').text('Drug Information');
        $('.modal-body').append(brand,generic,doseAdmin,indication,route);
        
    })
}
// mirrors medInfo, displays modal for warning
const printWarning = (medId) =>{
    $.ajax({
        url: `https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+openfda.product_ndc:"${medId}"`,
        method: 'GET'
    }).then((response)=>{
        console.log(response);
        let drugInfo = response.results[0];
        let brand = $(`<h4 class='infoHead'>${drugInfo.openfda.brand_name[0]}</h4>`);
        let warning = $(`<p class='infoItem'><strong>Warning:</strong> ${drugInfo.warnings[0]}</p>`);
        let askDoc = $(`<p class='infoItem'><strong>Ask Doctor:</strong> ${drugInfo.ask_doctor[0]}</p>`);
        let doNotUse = $(`<p class='infoItem'><strong>Do Not Use:</strong> ${drugInfo.do_not_use[0]}</p>`);
        $('.modal-body').empty();
        $('.modal-title').empty();
        $('.modal-title').text('Warnings');
        $('.modal-body').append(brand,askDoc,doNotUse,warning,);

    })
}
// delete medicine
const deleteMed = (medId)=>{
    $.ajax({
        url: `/api/meds/${medId}`,
        method: 'DELETE'
    }).then(()=>{
        $('.modal-body').empty();
        $('.modal-title').empty();
        $('.modal-body').append(`<h2>Medicine ${medId} deleted from your records.`);
    })
}

// mirrored med and warn button on clicks 
$('.med-btn').click(function(){
    const medId = $(this).data('id');
    console.log(medId);
    printMedInfo(medId);
    $('#warning').modal('show');
})

$('.warn-btn').click(function(){
    const medId = $(this).data('id');
    console.log(medId);
    printWarning(medId);
    $('#warning').modal('show');
})

// delete button functionality
$('.delete-btn').click(function(){
    const medId = $(this).data('id');
    console.log(medId);
    deleteMed(medId);
    $('#warning').modal('show');
    $('#warning').on('hidden.bs.modal',()=>{
        window.location.reload();
    })

})

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