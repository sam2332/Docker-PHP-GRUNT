var assert = require('assert');
var calculateTax = require('../js/libs/taxCalculator/calculateTax.js');

describe('calculator', function () {
	it('runs and returns object', function () {
		return assert.equal('object', typeof calculateTax({
			number_of_exemptions: '0',
			amount_of_income_taxable_by_the_city: '80000',
			taxable_value_of_your_home: '7000',
		}));
	});
});
