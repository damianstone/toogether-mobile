var TinyMask = require('../index');

test('5198765432 results on (51) 9876-5432', function() {
	var instance = new TinyMask('(99) 9999-9999');

	var expected = '(51) 9876-5432';
	var result = instance.mask('5198765432');

	expect(result).toBe(expected);
});

test('51998765432 results on (51) 99876-5432', function() {
	var instance = new TinyMask('(99) 99999-9999');

	var expected = '(51) 99876-5432';
	var result = instance.mask('51998765432');

	expect(result).toBe(expected);
});
