"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNavigation = require("react-navigation");

var DrawerActions = _interopRequireWildcard(require("./DrawerActions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function withDefaultValue(obj, key, defaultValue) {
  // @ts-ignore
  if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined') {
    return obj;
  } // @ts-ignore


  obj[key] = defaultValue;
  return obj;
}

const getActiveRouteKey = route => {
  if (route.routes && typeof route.index === 'number' && route.routes[route.index]) {
    return getActiveRouteKey(route.routes[route.index]);
  }

  return route.key;
};

var _default = (routeConfigs, config = {}) => {
  config = { ...config
  };
  config = withDefaultValue(config, 'resetOnBlur', config.unmountInactiveRoutes ? true : !!config.resetOnBlur);
  config = withDefaultValue(config, 'backBehavior', 'initialRoute');
  const switchRouter = (0, _reactNavigation.SwitchRouter)(routeConfigs, config);
  return { ...switchRouter,

    getActionCreators(route, navStateKey) {
      return {
        openDrawer: () => DrawerActions.openDrawer({
          key: navStateKey
        }),
        closeDrawer: () => DrawerActions.closeDrawer({
          key: navStateKey
        }),
        toggleDrawer: () => DrawerActions.toggleDrawer({
          key: navStateKey
        }),
        ...switchRouter.getActionCreators(route, navStateKey)
      };
    },

    getStateForAction(action, state) {
      // Set up the initial state if needed
      if (!state) {
        return { ...switchRouter.getStateForAction(action, undefined),
          isDrawerOpen: false
        };
      }

      const isRouterTargeted = action.key == null || action.key === state.key;

      if (isRouterTargeted) {
        // Only handle actions that are meant for this drawer, as specified by action.key.
        if (action.type === DrawerActions.CLOSE_DRAWER || action.type === _reactNavigation.NavigationActions.BACK && state.isDrawerOpen) {
          return { ...state,
            isDrawerOpen: false
          };
        }

        if (action.type === DrawerActions.OPEN_DRAWER) {
          return { ...state,
            isDrawerOpen: true
          };
        }

        if (action.type === DrawerActions.TOGGLE_DRAWER) {
          return { ...state,
            isDrawerOpen: !state.isDrawerOpen
          };
        }
      } // Fall back on switch router for screen switching logic, and handling of child routers


      const switchedState = switchRouter.getStateForAction(action, state);

      if (switchedState === null) {
        // The switch router or a child router is attempting to swallow this action. We return null to allow this.
        return null;
      } // Has the switch router changed the state?


      if (switchedState !== state) {
        // If any navigation has happened, and the drawer is maybe open, make sure to close it
        if (getActiveRouteKey(switchedState) !== getActiveRouteKey(state) && state.isDrawerOpen) {
          return { ...switchedState,
            isDrawerOpen: false
          };
        } // At this point, return the state as defined by the switch router.
        // The active route key hasn't changed, so this most likely means that a child router has returned
        // a new state like a param change, but the same key is still active and the drawer will remain open


        return switchedState;
      }

      return state;
    }

  };
};

exports.default = _default;
//# sourceMappingURL=DrawerRouter.js.map