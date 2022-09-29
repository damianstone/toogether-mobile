import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from 'react-navigation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createGroup } from '../../store/actions/group';
import { check400Error, checkServerError } from '../../utils/errors';

import AuthButton from '../../components/UI/AuthButton';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';
import * as g from '../../constants/group';

const StartGroupScreen = (props) => {
  const [storedGroupData, setStoredGroupData] = useState();
  const dispatch = useDispatch();
  const createGroupReducer = useSelector((state) => state.createGroup);
  const {
    loading: loadingCreate,
    error: errorCreate,
    data: dataCreate,
  } = createGroupReducer;

  const replaceAction = StackActions.replace({
    routeName: 'Group',
    params: {
      group_id: dataCreate ? dataCreate.id : null,
    },
  });
  // console.log('props navigation --> ', props.navigation);

  const getAsyncData = async () => {
    let group;
    try {
      group = JSON.parse(await AsyncStorage.getItem('@groupData'));

      if (group !== null) {
        setStoredGroupData(group);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAsyncData();
  }, []);

  useEffect(() => {
    if (storedGroupData) {
      props.navigation.replace('Group');
    }

    if (errorCreate) {
      if (errorCreate?.response?.status === 400) {
        check400Error(errorCreate);
      }
      checkServerError(errorCreate);
      dispatch({ type: g.CREATE_GROUP_RESET });
    }

    if (dataCreate) {
      props.navigation.replace('Group');
      dispatch({ type: g.CREATE_GROUP_RESET });
    }
  }, [dispatch, dataCreate, errorCreate, storedGroupData]);

  const handleCreateGroup = () => {
    // TODO: use replace instead of navigate
    dispatch(createGroup());
  };

  const handleJoinToGroup = () => {
    props.navigation.navigate('JoinGroup');
  };

  if (loadingCreate) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={Colors.orange} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollview_style}
        contentContainerStyle={styles.scrollview_content_container}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/hands.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Join to group"
            color={Colors.white}
            onPress={handleJoinToGroup}
          />
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
    padding: 20,
    paddingVertical: '7%',
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
