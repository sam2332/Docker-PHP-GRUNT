/* 
 * This code was written and produced by Sam Rudloff for the city of East Lansing.
 */

/*
 *   This function styles and formats the currency values.
 *
 *   @Param String  key   The Element id to fill with the data.
 *   @Param Number  value The data to format and place in selected id.
 *
 *   @return null
 */
function setOutput(key, value) {
	if (typeof value === 'number') {
		$('#' + key).html('$' + value.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		return true;
	}
	if (typeof value === 'string') {
		$('#' + key).html(value);
		return true;
	}
}

/*
 *   This function runs and outputs results of the calculateTax function.
 *
 *   @return null
 */
function RunCalculation() {
	
	try {
		var results = calculator.calculateTax({
			'number_of_exemptions': $('#number_of_exemptions_value').val(),
			'amount_of_income_taxable_by_the_city': $('#amount_of_income_taxable_by_the_city_value').val(),
			'taxable_value_of_your_home': $('#taxable_value_of_your_home_value').val()
		});

		// Transfer  results to output fields.
		for (var prop in results) {
			setOutput(prop + '_output', results[prop]);
		}
		// Clear errors.
		showError(false);
	} catch (e) {
		// Show errors that were thrown.
		showError(e);
	}
}

/*
 *   This function show errors in the form.
 *
 *   @return null
 */
function showError(error) {
	if (error === false) {
		$('[id*="_error"]').html('');
	} else {
		$('#' + error.extra.responsibleElement + '_error').html("Invalid Valid");
	}
}

$(document).ready(function () {
	console.log('executing page scripts');

	// Setup events for sliders.
	$('input[type="range"]').change(function () {

		// Get users input.
		var NumberOfExemptions = $('#number_of_exemptions').val();
		var AmountOfIncomeTaxableByTheCity = $('#amount_of_income_taxable_by_the_city').val();
		var TaxableValueOfYourHome = $('#taxable_value_of_your_home').val();

		// Update number display.
		$('#number_of_exemptions_value').val(NumberOfExemptions);
		$('#amount_of_income_taxable_by_the_city_value').val(AmountOfIncomeTaxableByTheCity);
		$('#taxable_value_of_your_home_value').val(TaxableValueOfYourHome);

		// Calculate Tax.
		RunCalculation();
	});
	$('input[type="range"]').mousemove(function () {

		// Get users input.
		var NumberOfExemptions = $('#number_of_exemptions').val();
		var AmountOfIncomeTaxableByTheCity = $('#amount_of_income_taxable_by_the_city').val();
		var TaxableValueOfYourHome = $('#taxable_value_of_your_home').val();

		// Update number display.
		$('#number_of_exemptions_value').val(NumberOfExemptions);
		$('#amount_of_income_taxable_by_the_city_value').val(AmountOfIncomeTaxableByTheCity);
		$('#taxable_value_of_your_home_value').val(TaxableValueOfYourHome);

		// Calculate Tax.
		RunCalculation();
	});

	// Setup events for number inputs
	$('input[type="number"]').change(function () {

		// Get users input.
		var NumberOfExemptions = parseFloat($('#number_of_exemptions_value').val());
		var AmountOfIncomeTaxableByTheCity = parseFloat($('#amount_of_income_taxable_by_the_city_value').val());
		var TaxableValueOfYourHome = parseFloat($('#taxable_value_of_your_home_value').val());

		// Update slider display.
		$('#number_of_exemptions').val(NumberOfExemptions).change();
		$('#amount_of_income_taxable_by_the_city').val(AmountOfIncomeTaxableByTheCity).change();
		$('#taxable_value_of_your_home').val(TaxableValueOfYourHome).change();

		// Calculate Tax.
		RunCalculation();
	});

	//Inital Load to prefill values
	RunCalculation();
});
