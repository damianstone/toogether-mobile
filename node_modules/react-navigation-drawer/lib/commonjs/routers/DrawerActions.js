"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleDrawer = exports.closeDrawer = exports.openDrawer = exports.MARK_DRAWER_IDLE = exports.MARK_DRAWER_SETTLING = exports.MARK_DRAWER_ACTIVE = exports.DRAWER_CLOSED = exports.DRAWER_OPENED = exports.TOGGLE_DRAWER = exports.CLOSE_DRAWER = exports.OPEN_DRAWER = void 0;
const OPEN_DRAWER = 'Navigation/OPEN_DRAWER';
exports.OPEN_DRAWER = OPEN_DRAWER;
const CLOSE_DRAWER = 'Navigation/CLOSE_DRAWER';
exports.CLOSE_DRAWER = CLOSE_DRAWER;
const TOGGLE_DRAWER = 'Navigation/TOGGLE_DRAWER';
exports.TOGGLE_DRAWER = TOGGLE_DRAWER;
const DRAWER_OPENED = 'Navigation/DRAWER_OPENED';
exports.DRAWER_OPENED = DRAWER_OPENED;
const DRAWER_CLOSED = 'Navigation/DRAWER_CLOSED';
exports.DRAWER_CLOSED = DRAWER_CLOSED;
const MARK_DRAWER_ACTIVE = 'Navigation/MARK_DRAWER_ACTIVE';
exports.MARK_DRAWER_ACTIVE = MARK_DRAWER_ACTIVE;
const MARK_DRAWER_SETTLING = 'Navigation/MARK_DRAWER_SETTLING';
exports.MARK_DRAWER_SETTLING = MARK_DRAWER_SETTLING;
const MARK_DRAWER_IDLE = 'Navigation/MARK_DRAWER_IDLE';
exports.MARK_DRAWER_IDLE = MARK_DRAWER_IDLE;

const openDrawer = payload => ({
  type: OPEN_DRAWER,
  ...payload
});

exports.openDrawer = openDrawer;

const closeDrawer = payload => ({
  type: CLOSE_DRAWER,
  ...payload
});

exports.closeDrawer = closeDrawer;

const toggleDrawer = payload => ({
  type: TOGGLE_DRAWER,
  ...payload
});

exports.toggleDrawer = toggleDrawer;
//# sourceMappingURL=DrawerActions.js.map