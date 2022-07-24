var TinyMask = require('../index');

test('ABC 5 with # translation results on ABC 5', function() {
	var instance = new TinyMask('AAA#9', {
		translation: {
			'#': function(val) {
				return val === ' ' ? val : null;
			}
		}
	});

	var expected = 'ABC 5';
	var result = instance.mask('ABC 5');

	expect(result).toBe(expected);
});
