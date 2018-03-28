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
