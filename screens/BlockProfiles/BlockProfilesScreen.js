import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { listBlockedProfiles, unBlockProfile } from '../../store/actions/block';
import { checkServerError } from '../../utils/errors';
import Constants from 'expo-constants';

import HeaderButtom from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as b from '../../constants/block';

const BlockProfilesScreen = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState();

  const blockedProfilesReducer = useSelector(
    (state) => state.listBlockedProfiles
  );
  const {
    error: errorList,
    loading: loadingList,
    data: blockedProfiles,
  } = blockedProfilesReducer;

  const unBlockProfileReducer = useSelector((state) => state.unBlockProfile);
  const {
    error: errorUnBlock,
    loading: loadingUnBlock,
    data: unBlocked,
  } = unBlockProfileReducer;

  useEffect(() => {
    dispatch(listBlockedProfiles());
  }, []);

  useEffect(() => {
    if (errorUnBlock) {
      Alert.alert(
        'Something went wrong',
        'An error ocurred un blocking the profile'
      );
      dispatch({ type: b.DISBLOCK_PROFILE_RESET });
    }
    if (unBlocked) {
      dispatch(listBlockedProfiles());
      dispatch({ type: b.DISBLOCK_PROFILE_RESET });
    }
  }, [errorUnBlock, unBlocked]);

  // add listener to fetch the user and re fetch it
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      reload();
    });
    return unsubscribe;
  }, [reload]);

  const reload = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(listBlockedProfiles());
    } catch (err) {
      checkServerError(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  const handleUnblock = async (id) => {
    if (id) {
      dispatch(unBlockProfile(id));
    }
    if (unBlocked) {
      dispatch(listBlockedProfiles());
    }
  };

  const getInitials = (firstname, lastname) => {
    const first = firstname ? firstname.charAt(0).toUpperCase() : 'N';
    const second = lastname ? lastname.charAt(0).toUpperCase() : 'N';
    console.log(first, second);
    return first + second;
  };

  const renderBlockedProfile = ({ item }) => {
    console.log(item);
    return (
      <>
        <View style={styles.blockContainer}>
          <View style={styles.horizontalRowContainer}>
            {item.photos.length > 0 ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: `${item.photos[0].image}` }}
                  style={{ width: '100%', height: '100%', borderRadius: 100 }}
                />
              </View>
            ) : (
              <View style={styles.noPhotoContainer}>
                <Text style={{ color: Colors.white, fontSize: 10 }}>
                  {getInitials(item.firstname, item.lastname)}
                </Text>
              </View>
            )}
            <Text
              style={
                styles.nameText
              }>{`${item.firstname} ${item.lastname}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleUnblock(item.id)}
            style={styles.buttonContainer}>
            <Text style={{ color: Colors.white, fontSize: 12 }}>Unblock</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={blockedProfiles ? blockedProfiles.results : []}
        horizontal={false}
        keyExtractor={(profile) => profile.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reload}
            tintColor={Colors.white}
          />
        }
        renderItem={renderBlockedProfile}
      />
    </View>
  );
};

BlockProfilesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Blocked Users',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            // go to chat screen
            navData.navigation.goBack();
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default BlockProfilesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.bg,
  },
  blockContainer: {
    width: '95%',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  horizontalRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },
  imageContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  noPhotoContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    marginRight: 20,
  },

  nameText: {
    color: Colors.white,
    fontSize: 15,
  },

  buttonContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 5,
    padding: 5,
  },

  line: {
    borderBottomColor: Colors.placeholder,
    borderBottomWidth: 0.5,
    margin: 10,
  },
});
