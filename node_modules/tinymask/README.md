# tinymask
A js mask simple like killing zombies =).

## Usage
Install it from npm using `npm install --save tinymask`

```js
var TinyMask = require('tinymask')
var maskInstance = TinyMask('9999-9999');

var result = maskInstance.mask('12345678');

console.log(result); //1234-5678
```

By default, we use this translation:

* `9` -> Accept numbers
* `A` -> Accept alpha
* `S` -> Accept alphanumerics
* `*` -> Accept all

### Options
You can pass options for the mask. We use the defaults:

```js
var maskInstance = TinyMask('9999-9999', {
	translation: {
		'9': function (val) {
			return val.replace(/[^0-9]+/g, '');
		},
		'A': function (val) {
			return val.replace(/[^a-zA-Z]+/g, '');
		},
		'S': function (val) {
			return val.replace(/[^a-zA-Z0-9]+/g, '');
		},
		'*': function (val) {
			return val;
		}
	},
	invalidValues: [null, undefined, '']
});
```

**translation (Object | optional)**

You can add or override any of the translation keys. Ex:

```js
var maskInstance = TinyMask('9999-9999', {
	translation: {
		// in this case, we add new # translation that allow
		// blank spaces.
		'#': function (val) {
			if (val === ' ') {
				return val;
			}

			return null;
		},
		// here we override the * translation to accept only
		// some characters instead all characters.
		'*': function (val) {
			if (['*', '!', '?'].indexOf(val) >= 0) {
				return val;
			}
			return null;
		}
	}
});
```

**invalidValues (Array | optional)**

You can set ignored value. If any translation result on one of this values, that will be ignored.

```js
var maskInstance = TinyMask('9999-9999', {
	// in this case, all null, undefined, empty string or blanck spaces returned from translation will be ignored.
	invalidValues: [null, undefined, '', ' ']
});
```

## Release Notes

## 1.0.2
* Fixing editing after complete mask.

## 1.0.1
* Fixing fixed masks.

### 1.0.0
* Releasing the first version of the mask.
