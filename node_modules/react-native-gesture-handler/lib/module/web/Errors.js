export class GesturePropError extends Error {
  constructor(name, value, expectedType) {
    super("Invalid property `".concat(name, ": ").concat(value, "` expected `").concat(expectedType, "`"));
  }

}
//# sourceMappingURL=Errors.js.map