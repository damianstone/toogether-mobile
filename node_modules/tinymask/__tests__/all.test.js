var TinyMask = require('../index');

test('abc123def and mask ********* results on abc123def', function() {
	var instance = new TinyMask('*********');

	var expected = 'abc123def';
	var result = instance.mask('abc123def');

	expect(result).toBe(expected);
});

test('abc123def and mask AAA****** results on abc123def', function() {
	var instance = new TinyMask('AAA******');

	var expected = 'abc123def';
	var result = instance.mask('abc123def');

	expect(result).toBe(expected);
});

test('abc123def and mask 999****** results on ""', function() {
	var instance = new TinyMask('999******');

	var expected = '';
	var result = instance.mask('abc123def');

	expect(result).toBe(expected);
});
