import React, { useEffect, useContext, useState } from 'react';
import {
  Image,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import { createGroup } from '../../store/actions/group';
import { check400Error, checkServerError } from '../../utils/errors';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

import AuthButton from '../../components/UI/AuthButton';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';
import * as g from '../../constants/group';
import ButtonAndroid from '../../components/UI/ButtonAndroid';
import Device from '../../theme/Device';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const StartGroupScreen = (props) => {
  // const navigation = useNavigation();

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
  const replaceAction = StackActions.replace("Group", {});

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
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/hands.png')}
            style={styles.image}
          />
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
      </View>
    </SafeAreaView>
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
  loadingScreen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    height: '100%',
  },

  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  imageContainer: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 0.55 * height : 0.55 * height,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  buttonsContainer: {
    alignSelf: 'center',
    width: '90%',
    padding: 3,
    marginBottom: Platform.OS === 'ios' ? 0 : 0.15 * height,
  },
});
