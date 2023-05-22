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
import { useDispatch, useSelector } from 'react-redux';
import { listBlockedProfiles, unBlockProfile } from '../../store/actions/block';
import { checkServerError } from '../../utils/errors';
import { getNameInitials, getImage } from '../../utils/getMethods';

import Colors from '../../constants/Colors';
import * as b from '../../constants/requestTypes/block';
import FastImage from 'react-native-fast-image';

const BlockProfilesScreen = (props) => {
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

    return () => {
      if (unsubscribe.remove) {
        unsubscribe.remove();
      }
    };
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

  const renderBlockedProfile = ({ item }) => {
    return (
      <>
        <View style={styles.blockContainer}>
          <View style={styles.horizontalRowContainer}>
            {item.photos.length > 0 ? (
              <View style={styles.imageContainer}>
                <FastImage
                  source={{
                    uri: `${getImage(item.photos[0].image)}`,
                    priority: FastImage.priority.normal,
                  }}
                  style={{ width: '100%', height: '100%', borderRadius: 100 }}
                />
              </View>
            ) : (
              <View style={styles.noPhotoContainer}>
                <Text style={{ color: Colors.white, fontSize: 10 }}>
                  {getNameInitials(item.name)}
                </Text>
              </View>
            )}
            <Text style={styles.nameText}>{`${item.name}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleUnblock(item.id)}
            style={styles.buttonContainer}
          >
            <Text style={{ color: Colors.white, fontSize: 12 }}>Unblock</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </>
    );
  };

  const renderEmptyList = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.bg,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <View style={{ width: 130, height: 130 }}>
          <Image
            source={require('../../assets/images/empty-blocked-screen.png')}
            style={{ resizeMode: 'contain', flex: 1, aspectRatio: 1 }}
          />
        </View>
        <Text style={{ color: Colors.white, fontSize: 15 }}>
          {`You haven’t blocked any user`}
        </Text>
      </View>
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
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={renderBlockedProfile}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
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
