/*eslint valid-jsdoc: "error"*/
/*eslint-env es6*/

function calculateTax(options) {
	// Static Variables.
	var ProposedPropertyTaxMillageReduction = 0.005;
	var ProposedTaxRate = 0.01;

	// Get user input.
	var NumberOfExemptions = options.number_of_exemptions;
	var AmountOfIncomeTaxableByTheCity = options.amount_of_income_taxable_by_the_city;
	var TaxableValueOfYourHome = options.taxable_value_of_your_home;

	if (NumberOfExemptions === 'NaN') {
		NumberOfExemptions = 0;
	}
	if (AmountOfIncomeTaxableByTheCity === 'NaN') {
		AmountOfIncomeTaxableByTheCity = 0;
	}
	if (TaxableValueOfYourHome === 'NaN') {
		TaxableValueOfYourHome = 0;
	}
	// Business Logic
	var ExemptionsValue = -NumberOfExemptions * 600;
	var TotalTaxableIncome = AmountOfIncomeTaxableByTheCity - ExemptionsValue;
	var TaxLiability = TotalTaxableIncome * ProposedTaxRate;
	var TotalReductionInPropertyTaxesProposed = TaxableValueOfYourHome * ProposedPropertyTaxMillageReduction;

	// Amount over time
	var AmountPerBiWeeklyPay = (TaxLiability / 26).toFixed(4); // 26 bi-weeks in a year round to 2 decimals.
	var AmountPerWeekPay = (TaxLiability / 52).toFixed(4); // 52 weeks in a year round to 2 decimals.

	//Final Calulation
	var NetEffectOnTaxes = TaxLiability - TotalReductionInPropertyTaxesProposed;
	// Output formated data to screen.
	return {
		'ExemptionsValue': ExemptionsValue,
		'TotalTaxableIncome': TotalTaxableIncome,
		'TaxLiability': TaxLiability,
		'TotalReductionInPropertyTaxesProposed': TotalReductionInPropertyTaxesProposed,
		'AmountPerBiWeeklyPay': AmountPerBiWeeklyPay,
		'AmountPerWeekPay': AmountPerWeekPay,
		'NetEffectOnTaxes': NetEffectOnTaxes
	};
}
if (module) {
	module.exports = calculateTax;
}
