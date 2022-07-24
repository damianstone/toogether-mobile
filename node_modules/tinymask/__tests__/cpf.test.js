var TinyMask = require('../index');

test('12345678901 results on 123.456.789-01', function() {
	var instance = new TinyMask('999.999.999-99');

	var expected = '123.456.789-01';
	var result = instance.mask('12345678901');

	expect(result).toBe(expected);
});

test('1234 results on 123.4', function() {
	var instance = new TinyMask('999.999.999-99');

	var expected = '123.4';
	var result = instance.mask('1234');

	expect(result).toBe(expected);
});

test('1234567890123 results on 123.456.789-01', function() {
	var instance = new TinyMask('999.999.999-99');

	var expected = '123.456.789-01';
	var result = instance.mask('1234567890123');

	expect(result).toBe(expected);
});

test('123.456.789 results on 123.456.789', function() {
	var instance = new TinyMask('999.999.999-99');

	var expected = '123.456.789';
	var result = instance.mask('123.456.789');

	expect(result).toBe(expected);
});
