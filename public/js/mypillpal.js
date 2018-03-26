$(function() {
    $("#btnWarning").on("click", function(event) {
        var medicine = $(this).data("id");
        
        $.ajax("/api-routes/" + searchInput, {
            type: "GET",
            data: 
        })
    })




})