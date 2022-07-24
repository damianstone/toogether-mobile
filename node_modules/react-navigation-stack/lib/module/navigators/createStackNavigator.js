import * as React from 'react';
import { StackRouter, createNavigator } from 'react-navigation';
import StackView from '../views/StackView';

function createStackNavigator(routeConfigMap, stackConfig = {}) {
  const router = StackRouter(routeConfigMap, stackConfig);
  return createNavigator( // TODO: don't have time to fix it right now
  // @ts-ignore
  navigatorProps => /*#__PURE__*/React.createElement(StackView, navigatorProps), router, stackConfig);
}

export default createStackNavigator;
//# sourceMappingURL=createStackNavigator.js.map