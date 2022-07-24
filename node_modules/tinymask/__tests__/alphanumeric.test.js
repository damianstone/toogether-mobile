var TinyMask = require('../index');

test('abc123def and mask AAA999AAA results on abc123def', function() {
	var instance = new TinyMask('AAA999AAA');

	var expected = 'abc123def';
	var result = instance.mask('abc123def');

	expect(result).toBe(expected);
});

test('123abc123def and mask AAA999AAA results on ""', function() {
	var instance = new TinyMask('AAA999AAA');

	var expected = '';
	var result = instance.mask('123abc123def');

	expect(result).toBe(expected);
});
