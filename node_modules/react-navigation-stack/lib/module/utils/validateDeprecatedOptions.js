const shownWarnings = [];
const validations = [{
  check: o => typeof o.headerForceInset === 'object',
  deprecated: 'headerForceInset',
  updated: 'safeAreaInsets',
  compat: o => {
    const {
      headerForceInset,
      ...rest
    } = o;
    let safeAreaInsets = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    switch (headerForceInset) {
      case 'top':
        delete safeAreaInsets.top;
        break;

      case 'bottom':
        delete safeAreaInsets.bottom;
        break;

      case 'left':
        delete safeAreaInsets.left;
        break;

      case 'right':
        delete safeAreaInsets.right;
        break;

      case 'vertical':
        delete safeAreaInsets.top;
        delete safeAreaInsets.bottom;
        break;

      case 'horizontal':
        delete safeAreaInsets.left;
        delete safeAreaInsets.right;
        break;

      case 'always':
        safeAreaInsets = undefined;
        break;
    }

    return { ...rest,
      safeAreaInsets
    };
  }
}, {
  check: o => o.gesturesEnabled !== undefined,
  deprecated: 'gesturesEnabled',
  updated: 'gestureEnabled',
  compat: o => {
    const {
      gesturesEnabled,
      ...rest
    } = o;
    return { ...rest,
      gestureEnabled: gesturesEnabled
    };
  }
}, {
  check: o => o.header === null,
  deprecated: 'header: null',
  updated: 'headerShown: false',
  compat: o => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      header,
      ...rest
    } = o;
    return { ...rest,
      headerShown: false
    };
  }
}, {
  check: o => o.header != null && typeof o.header !== 'function',
  deprecated: 'header: <SomeElement />',
  updated: 'header: () => <SomeElement />',
  compat: o => ({ ...o,
    header: () => o.header
  })
}, {
  check: o => o.headerTitle !== undefined && typeof o.headerTitle !== 'string' && typeof o.headerTitle !== 'function',
  deprecated: 'headerTitle: <SomeElement />',
  updated: 'headerTitle: () => <SomeElement />',
  compat: o => ({ ...o,
    headerTitle: () => o.headerTitle
  })
}, ...['headerLeft', 'headerRight', 'headerBackground', 'headerBackImage'].map(p => ({
  check: o => o[p] !== undefined && typeof o[p] !== 'function',
  deprecated: "".concat(p, ": <SomeElement />"),
  updated: "".concat(p, ": () => <SomeElement />"),
  compat: o => ({ ...o,
    [p]: () => o[p]
  })
}))];
export default function validateDeprecatedOptions(options) {
  let result = options;
  const warnings = []; // Validate options to show warnings for deprecations

  validations.forEach(v => {
    if (v.check(options)) {
      result = v.compat(result);

      if (process.env.NODE_ENV !== 'production') {
        if (shownWarnings.includes(v.deprecated)) {
          return;
        }

        warnings.push(v);
        shownWarnings.push(v.deprecated);
      }
    }
  });

  if (warnings.length) {
    console.warn("Deprecation in 'navigationOptions':\n".concat(warnings.map(v => "- '".concat(v.deprecated, "' will be removed in a future version. Use '").concat(v.updated, "' instead")).join('\n')));
  }

  return result;
}
//# sourceMappingURL=validateDeprecatedOptions.js.map