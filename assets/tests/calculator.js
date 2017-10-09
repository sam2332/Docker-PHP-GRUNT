var assert = require('assert');
var calculateTax = require('../js/libs/taxCalculator/calculateTax.js');

// Test Data
var orginalTestData = {
	number_of_exemptions: '1',
	amount_of_income_taxable_by_the_city: '80000',
	taxable_value_of_your_home: '7000',
};

describe('calculator', function () {
	it('runs and returns object consisting of only numbers and does not throw exception.', function () {
		var thrownException = false;
		var result;
		try {
			result = calculateTax(orginalTestData);
		} catch (e) {
			console.log(e);
			thrownException = true;
		}
		// Ensure error is not thrown
		assert.equal(false, thrownException);

		// Ensure object gets returned properly.
		assert.equal('object', typeof result);

		for (var prop in result) {
			assert.equal('number', typeof result[prop]);
		}
	});

	it('throws errors on all invalid inputs.', function () {
		for (var prop in orginalTestData) {
			assert.throws(function () {
				var testData = Object.assign({}, orginalTestData);
				testData[prop] = 'sams tests are awesome.';
				var result = calculateTax(testData);
			});
		}
	});
});
