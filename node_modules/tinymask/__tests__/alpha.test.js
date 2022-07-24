var TinyMask = require('../index');

test('abcde and mask AAAAA results on abcde', function() {
	var instance = new TinyMask('AAAAA');

	var expected = 'abcde';
	var result = instance.mask('abcde');

	expect(result).toBe(expected);
});

test('abc12 and mask AAAAA results on abc', function() {
	var instance = new TinyMask('AAAAA');

	var expected = 'abc';
	var result = instance.mask('abc12');

	expect(result).toBe(expected);
});

test('12abc12 and mask AAAAA results on ""', function() {
	var instance = new TinyMask('AAAAA');

	var expected = '';
	var result = instance.mask('12abc12');

	expect(result).toBe(expected);
});
