import React, { useContext } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createNavigator } from 'react-navigation';
import { Context } from '../context/ContextProvider';
import { createAppContainer } from 'react-navigation';

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

const GroupNavigator = (props) => {
  const { groupContext } = useContext(Context);

  // console.log("GROUP CONTEXT -> ", groupContext)

  // TODO: probar creando dos navigator dependiendo del context
  // no user reduce right ni nada fancy solo if else y devolver el stack navigator

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

  const screens = false
    ? ['JoinGroup', 'StartGroup', 'Group']
    : ['Group', 'JoinGroup', 'StartGroup'];

  const GroupNavigatorStack = createStackNavigator(
    screens.reduceRight((acc, screenName) => {
      const Component =
        ConditionalGroupNavigator.router.getComponentForRouteName(screenName);
      return {
        ...acc,
        [screenName]: {
          screen: Component,
          navigationOptions: Component.navigationOptions,
        },
      };
    }, {}),
    {
      defaultNavigationOptions: defaultNavOptions,
    }
  );


  return <GroupNavigatorStack />;
};

export default GroupNavigator;