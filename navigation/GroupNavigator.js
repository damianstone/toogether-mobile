import React, { useContext } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Context } from '../context/ContextProvider';

import StartGroupScreen from '../screens/Group/StartGroupScreen';
import JoinGroupScreen from '../screens/Group/JoinGroupScreen';
import GroupScreen from '../screens/Group/GroupScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerMode: 'none',
  headerStyle: {
    backgroundColor: Colors.bg,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  statusBarStyle: Colors.bg,
  headerTintColor: Colors.white,
};

const ConditionalGroupNavigator = createStackNavigator(
  {
    StartGroup: {
      screen: StartGroupScreen,
      navigationOptions: {
        ...defaultNavOptions,
        gestureDirection: 'horizontal-inverted',
      },
    },
    JoinGroup: JoinGroupScreen,
    Group: {
      screen: GroupScreen,
      navigationOptions: {
        ...defaultNavOptions,
        gestureDirection: 'horizontal',
      },
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const GroupNavigator = (props) => {
  const { groupState } = useContext(Context);

  const screens = groupState
    ? ['JoinGroup', 'StartGroup', 'Group']
    : ['Group', 'JoinGroup', 'StartGroup'];

  const routes = screens.reduceRight((acc, screenName) => {
    const Component =
      ConditionalGroupNavigator.router.getComponentForRouteName(screenName);
    console.log(Component);
    return {
      ...acc,
      [screenName]: {
        screen: Component,
        navigationOptions: Component.navigationOptions,
        routeName: screenName,
        routes: screenName,
      },
    };
  }, {});

  function transformRoutes(routesObj) {
    const routesArr = Object.entries(routesObj).map(
      ([routeName, routeData], index) => {
        return {
          routeName,
          key: routeName,
          // ...routeData,
        };
      }
    );

    return routesArr;
  }

  const navigatorProps = {
    ...props,
    navigation: {
      ...props.navigation,
      state: {
        ...props.navigation.state,
        routes: transformRoutes(routes),
        index: screens.indexOf(props.navigation.state.routeName),
      },
    },
  };
  console.log(props);
  console.log(navigatorProps);

  return <ConditionalGroupNavigator {...navigatorProps} />;
};

export default GroupNavigator;
