"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTheme;

var React = _interopRequireWildcard(require("react"));

var _reactNavigation = require("react-navigation");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useTheme() {
  const theme = (0, _reactNavigation.useTheme)();
  return React.useMemo(() => {
    const colors = _reactNavigation.ThemeColors[theme];
    const dark = theme === 'dark';
    return {
      dark,
      colors: {
        primary: dark ? 'rgb(10, 132, 255)' : 'rgb(0, 122, 255)',
        background: dark ? 'rgb(1, 1, 1)' : 'rgb(242, 242, 242)',
        card: colors.header,
        text: colors.label,
        border: colors.headerBorder
      }
    };
  }, [theme]);
}
//# sourceMappingURL=useTheme.js.map