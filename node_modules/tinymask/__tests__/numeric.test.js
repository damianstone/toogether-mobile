var TinyMask = require('../index');

test('12345 and mask 99999 results on 12345', function() {
	var instance = new TinyMask('99999');

	var expected = '12345';
	var result = instance.mask('12345');

	expect(result).toBe(expected);
});

test('abc123 and mask 99999 results on ""', function() {
	var instance = new TinyMask('99999');

	var expected = '';
	var result = instance.mask('abc123');

	expect(result).toBe(expected);
});

test('123abc and mask 99999 results on 123', function() {
	var instance = new TinyMask('99999');

	var expected = '123';
	var result = instance.mask('123abc');

	expect(result).toBe(expected);
});
