/*eslint valid-jsdoc: "error"*/
/*eslint-env es6*/
var calculator = (function () {
	this.isNumeric = function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	this.calculateTax = function (opt) {
		for (var prop in opt) {
			if (this.isNumeric(opt[prop]) === false) {
				throw new ExceptionClass(
					"Invalid Input", {
						responsibleElement: prop
					}
				);
			}
		}

		// Static Variables.
		var ProposedPropertyTaxMillageReduction = 0.005;
		var ProposedTaxRate = 0.01;
		var ExemptionsMultipler = 600;

		// Get user input.
		var NumberOfExemptions = opt.number_of_exemptions;
		var AmountOfIncomeTaxableByTheCity = opt.amount_of_income_taxable_by_the_city;
		var TaxableValueOfYourHome = opt.taxable_value_of_your_home;

		// Business Logic
		var ExemptionsValue = -NumberOfExemptions * ExemptionsMultipler;
		var TotalTaxableIncome = AmountOfIncomeTaxableByTheCity - ExemptionsValue;
		var TaxLiability = TotalTaxableIncome * ProposedTaxRate;
		var TotalReductionInPropertyTaxesProposed = TaxableValueOfYourHome * ProposedPropertyTaxMillageReduction;

		// Amount over time

		// 26 bi-weeks in a year round to 2 decimals.
		var AmountPerBiWeeklyPay = parseFloat(
			(
				TaxLiability / 26
			).toFixed(4)
		);

		// 52 weeks in a year round to 2 decimals.
		var AmountPerWeekPay = parseFloat(
			(
				TaxLiability / 52
			).toFixed(4)
		);

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
	};
	return this;
})();
if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = calculator;
	}
}
