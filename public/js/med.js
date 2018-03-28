
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