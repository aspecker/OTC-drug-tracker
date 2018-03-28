const upperCase = (value) => {
	// Build up result.
	var result = "";
	// Loop over string indexes.
	for (var i = 0; i < value.length; i++) {
		// Get char code at this index.
		var code = value.charCodeAt(i);
		// For first character, or a lowercase range char following a space.
		// ... The value 97 means lowercase A, 122 means lowercase Z.
		if (i === 0 ||
			value[i - 1] === " " &&
			code >= 97 &&
			code <= 122) {
			// Convert from lowercase to uppercase by subtracting 32.
			// ... This uses ASCII values.
			result += String.fromCharCode(code - 32);
		} else {
			result += value[i];
		}
	}
	return result;
}
//
const check = () => {
	$('.add-btn').on('click', function() {
		var medArr = this.value.split('^');
		console.log(medArr);
		$.post('/api/add', {
			id: medArr[0],
			brand_name: medArr[1],
			generic_name: medArr[2],
			route: medArr[3]
		}, () => null)
	});
}
$('#searchBtn').on('click', async function() {
	$("#searchResults").empty();
	let searchTerm = $('#fdaSearch').val();
	console.log(searchTerm);
	$.get(`https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+brand_name:${searchTerm}&limit=5`,
		(req, res) => {
			let obj = req.results;
			// let parsedData = [];
			Object.keys(obj).forEach(function(key) {
				let brandName = upperCase(obj[key].openfda.brand_name[0].toLowerCase());
				let genericName = upperCase(obj[key].openfda.generic_name[0].toLowerCase());
				let route = obj[key].openfda.route[0];
				let purpose = obj[key].purpose[0];
				let doseAdmin = obj[key].dosage_and_administration[0];
				let activeIngredient = obj[key].active_ingredient[0];
				let fdaMedId = obj[key].openfda.product_ndc[0];
				let pullData = [`${fdaMedId}^${brandName}^${genericName}^${activeIngredient}`];
				console.log(pullData);
				$("#searchResults").append(
					`<tr><td>${brandName}</td><td>${genericName}</td><td>${purpose}</td><td>${doseAdmin}</td><td>${activeIngredient}</td><td><button class="add-btn btn btn-danger btn-block" id="${key}" value='${pullData}'>Click</button></td></tr><`
				);

			});
			check();
		})

})
