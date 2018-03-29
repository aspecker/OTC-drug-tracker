
// functions for user med page

// AJAX CALL TO API FOR INFO BUTTONS
// makes ajax call to get information and also handles conditional based on button class
const printInfo = (medId,btnType) =>{
    // make ajax call
    $.ajax({
        url: `https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+openfda.product_ndc:"${medId}"`,
        method: 'GET'
    }).then((response)=>{
        if (btnType.includes('warn-btn')){
            printWarn(response);
        } else if (btnType.includes('med-btn')){
            printMed(response);
        };
    });
};

//on click trigger for warning ajax call
$('.warn-btn').click(function(){
    let medId = $(this).data('id');
    let btnType = $(this).attr('class');
    console.log(medId);
    printInfo(medId,btnType);
    $('#warning').modal('show');
});
// process ajax call for warnings
const printWarn = (response)=>{
    let drugInfo = response.results[0];
    let brand = $(`<h4 class='infoHead'>${drugInfo.openfda.brand_name[0]}</h4>`);
    let warning = $(`<p class='infoItem'><strong>Warning:</strong> ${drugInfo.warnings[0]}</p>`);
    let askDoc = $(`<p class='infoItem'><strong>Ask Doctor:</strong> ${drugInfo.ask_doctor[0]}</p>`);
    let doNotUse = $(`<p class='infoItem'><strong>Do Not Use:</strong> ${drugInfo.do_not_use[0]}</p>`);
    $('.modal-body').empty();
    $('.modal-title').empty();
    $('.modal-title').text('Warnings');
    $('.modal-body').append(brand,askDoc,doNotUse,warning,);
};

//info button on click to trigger the ajax call
$('.med-btn').click(function(){
    let medId = $(this).data('id');
    let btnType = $(this).attr('class');
    console.log(medId);
    printInfo(medId,btnType);
    $('#warning').modal('show');
});
//process the ajax call for medicine info    
const printMed = (response)=>{
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
};

//DELETE
// delete button jquery
$('.delete-btn').click(function(){
    const medId = $(this).data('id');
    console.log(medId);
    deleteMed(medId);
    $('#warning').modal('show');
    $('#warning').on('hidden.bs.modal',()=>{
        window.location.reload();
    })
});
// delete medicine in database
const deleteMed = (medId)=>{
    $.ajax({
        url: `/api/meds/${medId}`,
        method: 'DELETE'
    }).then(()=>{
        $('.modal-body').empty();
        $('.modal-title').empty();
        $('.modal-body').append(`<h2>Medicine deleted from your records.`);
    })
}


// toggle isTaking in the database for selected medicine
$(".retire-btn").on("click", function() {
	let medArr = this.value.split(',');
	console.log(medArr)
	$.ajax({
		url: '/api/retire',
		type: 'PUT',
		data: {
			medId: medArr[0],
			isTaking: () => {
				return medArr[1] === "true" ? false : true;
			}
		}
	}).then(() => window.location.reload());
})