var TinyMask = require('../index');

test('12345 and mask 999-99-1111 results on 123-45', function() {
	var instance = new TinyMask('999-99-1111');

	var expected = '123-45';
	var result = instance.mask('12345');

	expect(result).toBe(expected);
});

test('1234 and mask 999-99-1111 results on 123-4', function() {
	var instance = new TinyMask('999-99-1111');

	var expected = '123-4';
	var result = instance.mask('1234');

	expect(result).toBe(expected);
});

test('12-3 and mask 99-XX-99 results on 12-XX-3', function() {
	var instance = new TinyMask('99-XX-99');

	var expected = '12-XX-3';
	var result = instance.mask('12-3');

	expect(result).toBe(expected);
});

test('12-XX-3 and mask 99-XX-99 results on 12-XX-3', function() {
	var instance = new TinyMask('99-XX-99');

	var expected = '12-XX-3';
	var result = instance.mask('12-XX-3');

	expect(result).toBe(expected);
});

test('12-3 and mask 99-99-XX results on 12-3', function() {
	var instance = new TinyMask('99-99-XX');

	var expected = '12-3';
	var result = instance.mask('12-3');

	expect(result).toBe(expected);
});

test('12-34-X and mask 99-99-XX results on 12-34-X', function() {
	var instance = new TinyMask('99-99-XX');

	var expected = '12-34-X';
	var result = instance.mask('12-34-X');

	expect(result).toBe(expected);
});
