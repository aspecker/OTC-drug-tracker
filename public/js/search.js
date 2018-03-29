const upperCase = (value) => {
	// Build up result.
	let result = "";
	// Loop over string indexes.
	for (let i = 0; i < value.length; i++) {
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
	$.get('/api/check', (data, status) => {
		if (!data) {
			$('.add-btn').html("Sign in");
			$('.loginAnchor').attr("href", "/login");
			return;
		} else {
			$('.add-btn').on('click', function() {
				$(this).prop("disabled", true);
				alert("Medicine was added.")
				var medArr = this.value.split('^');
				console.log(medArr);
				$.post('/api/add', {
					id: medArr[0],
					brand_name: medArr[1],
					generic_name: medArr[2],
					route: medArr[3]
				})
			});
		}
	})

}
$('#searchBtn').on('click', async function() {
	$("#searchResults").empty();
	$("#error").empty();
	let searchTerm = $('#fdaSearch').val();
	// console.log(searchTerm);
	$.ajax({
		url: `https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+brand_name:${searchTerm}&limit=5`,
		type: 'GET',
		error: (xhr, ajaxOptions, thrownError) => {
			if (xhr.status == 404) return $("#error").html("Drug not found, please check spelling");
			if (xhr.status == 500) return $("#error").html("Whoops! Something we did went wrong, plase try again.")
		}
	}).then((req, res) => {

		let obj = req.results;
		// let parsedData = [];
		Object.keys(obj).forEach(function(key) {
			let brandName = upperCase(obj[key].openfda.brand_name[0].toLowerCase());
			let genericName = upperCase(obj[key].openfda.generic_name[0].toLowerCase());
			let route = obj[key].openfda.route[0];
			let indications = obj[key].indications_and_usage[0];
			// let doseAdmin = obj[key].dosage_and_administration[0];
			let activeIngredient = obj[key].active_ingredient[0];
			let fdaMedId = obj[key].openfda.product_ndc[0];
			let pullData = [`${fdaMedId}^${brandName}^${genericName}^${activeIngredient}`];
			// console.log(pullData);
			$("#searchResults").append(
				`<tr><td>${brandName}</td><td>${genericName}</td><td>${indications}</td><td>${activeIngredient}</td><td><a class="loginAnchor" href=""><button class="add-btn btn btn-danger btn-block" id="${key}" value='${pullData}'>Click</button></a></td></tr><`
			);
		});
		check();
	})
})

$('#fdaSearch').keypress(function(e) {
	if (e.which == 13) { //Enter key pressed
		$('#searchBtn').click(); //Trigger search button click event
	}
});
