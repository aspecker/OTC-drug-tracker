// CORE API Query 
// https://api.fda.gov/drug/label.json?api_key=7PmEXVkWa9LT8KiUDK9e0bOZ5Z2DygmqmJSx9fTl&search=openfda.product_type:otc+AND+
// this query contains our api key and the search query to restrict to OTC drugs

// SEARCH queries

// limit: add &limit=X to end of query
// exact: 
// search by drug name
// https://api.fda.gov/drug/label.json?api_key=7PmEXVkWa9LT8KiUDK9e0bOZ5Z2DygmqmJSx9fTl&search=openfda.product_type:otc+AND+openfda.brand_name:${name}+openfda.generic_name:${name}

// search by drug purpose
// https://api.fda.gov/drug/label.json?api_key=7PmEXVkWa9LT8KiUDK9e0bOZ5Z2DygmqmJSx9fTl&search=openfda.product_type:otc+AND+purpose:${symptoms}+indications_and_usage:${symptoms}

// search based on drug ID (NOT FOR USER)
// needed for querying the information about specific drugs found in a user profile
// will use the unique id of the drug found in the user's table in our database
// // https://api.fda.gov/drug/label.json?api_key=7PmEXVkWa9LT8KiUDK9e0bOZ5Z2DygmqmJSx9fTl&search=openfda.product_ndc:${drugID}

// RESPONSE object
// for SINGLE ITEM QUERY all our data will be in req.body.results[0], so we will set that to a variable (e.g drugInfo)
// not that (almost) all response objects inside results[0] are also contained in arrays, almost entirely with index 0

// RESPONSES we might need
// META
// disclaimer: req.body.meta.disclaimer
// terms: req.body.meta.terms
// license: req.body.meta.license

// INFO
// purpose: drugInfo.purpose[0]
// drug unique id: drugInfo.openfda.product_ndc[0]
// brandName: drugInfo.openfda.brand_name[0]
// genericName: drugInfo.openfda.generic_name[0]
// substance: drugInfo.openfda.substance_name[0]
// route: drugInfo.openfda.route[0]
// dosage: drugInfo.dosage_and_administration[0]
// indications: drugInfo.indications_and_usage[0]
// activeIngred: drugInfo.active_ingredient[0]

// WARNINGS
// childWarn: drugInfo.keep_out_of_reach_of_children[0]
// warning: drugInfo.warnings[0]
// whenUsing: drugInfo.when_using[0]
// askDoc: drugInfo.ask_doctor[0]
// questions: drugInfo.questions[0]
// stop use: drugInfo.stop_use[0]
// askDocOrPh: drugInfo.ask_doctor_or_pharmacist[0]