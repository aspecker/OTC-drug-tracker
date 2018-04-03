// handles variable casing for adding brand name to the dbcol-sm-6
const upperCase = (value) => {
	let result = "";
	for (let i = 0; i < value.length; i++) {
		var code = value.charCodeAt(i);
		if (i === 0 ||
			value[i - 1] === " " &&
			code >= 97 &&
			code <= 122) {
			result += String.fromCharCode(code - 32);
		} else {
			result += value[i];
		}
	}
	return result;
}

const check = () => {
	$.get('/api/check', (data, status) => {
		if (!data) {
			$('.add-btn').html("Sign in");
			$('.loginAnchor').attr("href", "/login");
			return;
		} else {
			$('.add-btn').on('click', function() {
				var medArr = this.value.split('^');
				$('.modal-title').empty();
				$('.modal-body').empty();
				$('.modal-title').html('<h2>Medicine added.</h2>');
				$('.modal-body').html(`<h4>${medArr[1]} has been added to your records.</h4>`);
				$('#warning').modal('show');
				$(this).prop("disabled", true);
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
	$.ajax({
		url: `https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+brand_name:${searchTerm}&limit=5`,
		type: 'GET',
		error: (xhr, ajaxOptions, thrownError) => {
			if (xhr.status == 404) return $("#error").html("Drug not found, please check spelling");
			if (xhr.status == 500) return $("#error").html("Whoops! Something's wrong on our end. Please try again.")
		}
	}).then((req, res) => {
		$('.table').show();
		let obj = req.results;
		Object.keys(obj).forEach(function(key) {
			let brandName = upperCase(obj[key].openfda.brand_name[0].toLowerCase());
			let genericName = upperCase(obj[key].openfda.generic_name[0].toLowerCase());
			let route = obj[key].openfda.route[0];
			let indications = obj[key].indications_and_usage[0];
			let activeIngredient = obj[key].active_ingredient[0];
			let fdaMedId = obj[key].openfda.product_ndc[0];
			let pullData = [`${fdaMedId}^${brandName}^${genericName}^${activeIngredient}`];
			$("#searchResults").append(
				`<tr><td><h4>${brandName}</h4></td><td>${genericName}</td><td>${indications}</td><td>${activeIngredient}</td><td><a class="loginAnchor"><button class="add-btn btn btn-danger btn-block" id="${key}" value='${pullData}'>Add</button></a></td></tr><`
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
