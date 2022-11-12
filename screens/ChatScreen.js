import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { listMatches, deleteMatch } from '../store/actions/swipe';
import { checkServerError } from '../utils/errors';

import * as w from '../constants/swipe';
import Loader from '../components/UI/Loader';
import Colors from '../constants/Colors';

const ChatScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();

  const listMatchesReducer = useSelector((state) => state.listMatches);
  const {
    error: errorListMatches,
    loading: loadingListMatches,
    data: matches,
  } = listMatchesReducer;

  const deleteMatchReducer = useSelector((state) => state.deleteMatch);
  const {
    error: errorDeleteMatch,
    loading: loadingDeleteMatch,
    data: matchDeleted,
  } = deleteMatchReducer;

  const [loading, setLoading] = useState(
    !!(loadingListMatches || loadingDeleteMatch)
  );
  const [refreshing, setRefreshing] = useState(
    !!(loadingListMatches || loadingDeleteMatch)
  );
  const [userData, setUserData] = useState({});

  const getAsyncData = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('@userData'));

      if (user !== null) {
        setUserData(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAsyncData();
    dispatch(listMatches());
  }, []);

  useEffect(() => {
    if (errorListMatches) {
      checkServerError(errorListMatches);
    }

    if (errorDeleteMatch) {
      checkServerError(errorDeleteMatch);
    }
  }, [errorDeleteMatch, errorListMatches]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      reload();
    });
    return unsubscribe;
  }, [reload]);

  const reload = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(listMatches());
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  const handleChat = (matchId) => {
    console.log('OPEN CHAT');
  };

  const handleDeleteMatch = async (matchId) => {
    if (matchId) {
      await dispatch(deleteMatch(matchId));
    }

    if (matchDeleted) {
      dispatch({ type: w.DELETE_MATCH_RESET });
      return dispatch(listMatches());
    }
    return null;
  };

  const onOpenActionSheet = (matchId) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Chat', 'Remove match', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleChat(matchId);
        }
        if (buttonIndex === 1) {
          handleDeleteMatch(matchId);
        }
        return null;
      }
    );
  };

  const getInitials = (name) => {
    const first = name ? name.charAt(0).toUpperCase() : 'N';
    return first;
  };

  const getMatchedProfile = (match) => {
    if (match?.profile1.id === userData?.id) {
      return match.profile2;
    }
    return match?.profile1;
  };

  const renderMatch = ({ item, index }) => {
    if (!userData?.id) {
      return <Text>Problem</Text>;
    }
    const matchedProfile = getMatchedProfile(item);
    return (
      <TouchableOpacity
        onPress={() => onOpenActionSheet(item.id)}
        style={styles.imgContainer}>
        {loadingDeleteMatch && <ActivityIndicator />}
        {matchedProfile && matchedProfile.photos.length > 0 && (
          <Image
            source={{ uri: `${matchedProfile.photos[0].image}` }}
            style={styles.img}
          />
        )}
        {!matchedProfile ||
          (matchedProfile.photos.length === 0 && (
            <View style={styles.avatar_view}>
              <Text style={styles.avatar_initials}>
                {getInitials(matchedProfile.name)}
              </Text>
            </View>
          ))}
      </TouchableOpacity>
    );
  };

  const renderEmptyMatches = () => {
    return <Text style={{ color: Colors.white }}>EMPTY</Text>;
  };

  return (
    <View style={{ backgroundColor: Colors.bg, flex: 1 }}>
      <Text>New Matchs</Text>
      <FlatList
        data={matches?.data}
        horizontal
        keyExtractor={(match) => match.id}
        scrollEnabled
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reload}
            tintColor={Colors.white}
          />
        }
        renderItem={renderMatch}
        ListEmptyComponent={renderEmptyMatches}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  imgContainer: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    marginLeft: 10,
    borderRadius: 100,
  },
  img: {
    width: '100%',
    height: '100%',
  },

  avatar_view: {
    backgroundColor: Colors.orange,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_initials: {
    color: Colors.white,
    fontSize: 18,
  },
});
