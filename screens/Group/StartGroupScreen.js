import React, { useEffect, useContext, useState } from 'react';
import {
  Image,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import { createGroup } from '../../store/actions/group';
import { check400Error, checkServerError } from '../../utils/errors';
import { StackActions } from 'react-navigation';

import AuthButton from '../../components/UI/AuthButton';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';
import * as g from '../../constants/group';
import ButtonAndroid from '../../components/UI/ButtonAndroid';
import Device from '../../theme/Device';

const StartGroupScreen = (props) => {
  const { groupContext, updateGroupContext } = useContext(Context);

  /* set to true to have time to check if there is a group in the context and be able to redirect 
  the user to the group screen in a smooth way */
  const [transitionLoading, setTransitionLoading] = useState(true);

  const dispatch = useDispatch();

  const createGroupReducer = useSelector((state) => state.createGroup);
  const {
    loading: loadingCreate,
    error: errorCreate,
    data: dataCreate,
  } = createGroupReducer;

  // * this function replaces the first screen on the GroupNavigato stack
  const replaceAction = StackActions.replace({
    routeName: 'Group',
  });

  // * if the user is already in a group
  useEffect(() => {
    if (groupContext) {
      props.navigation.dispatch(replaceAction);
      setTransitionLoading(false);
    } else {
      setTransitionLoading(false);
    }
  }, []);

  // handle render after create group action
  useEffect(() => {
    if (errorCreate) {
      if (errorCreate?.response?.status === 400) {
        check400Error(errorCreate);
      }
      checkServerError(errorCreate);
      dispatch({ type: g.CREATE_GROUP_RESET });
    }

    if (dataCreate) {
      updateGroupContext(dataCreate);
      props.navigation.dispatch(replaceAction);
      dispatch({ type: g.CREATE_GROUP_RESET });
    }
  }, [dispatch, errorCreate, dataCreate]);

  const handleCreateGroup = () => {
    dispatch(createGroup());
  };

  const handleJoinToGroup = () => {
    props.navigation.navigate('JoinGroup');
  };

  if (loadingCreate || transitionLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={Colors.white} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollview_style}
        contentContainerStyle={styles.scrollview_content_container}
      >
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/hands.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          {Platform.OS === 'ios' ? (
            <Button
              title="Join to group"
              color={Colors.white}
              onPress={handleJoinToGroup}
            />
          ) : (
            <ButtonAndroid title="Join to group" onPress={handleJoinToGroup} />
          )}
          <AuthButton onPress={handleCreateGroup} text="Create group" />
        </View>
      </ScrollView>
    </View>
  );
};

StartGroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Group',
    headerLeft: () => (
      <Avatar
        onPress={() => {
          navData.navigation.navigate('MyProfile');
        }}
      />
    ),
  };
};

export default StartGroupScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
  loadingScreen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollview_style: {
    flexGrow: 1,
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
  },

  scrollview_content_container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },

  imageContainer: {
    marginTop: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: 400,
  },

  buttonsContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 3,
    marginBottom: Platform.OS === 'ios' ? 0 : 0.015 * Device.height,
  },

  button: {
    fontSize: 60,
    color: Colors.white,
  },

  inputsContainer: {
    padding: 3,
    width: '80%',
    marginVertical: 0,
    alignSelf: 'center',
  },
});
