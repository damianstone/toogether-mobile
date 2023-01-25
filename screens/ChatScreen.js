import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  FlatList,
  RefreshControl,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { listMatches, deleteMatch } from '../store/actions/swipe';
import { checkServerError, check400Error } from '../utils/errors';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import * as w from '../constants/swipe';
import HeaderButtom from '../components/UI/HeaderButton';
import Loader from '../components/UI/Loader';
import ChatAvatar from '../components/ChatAvatar';
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

  useEffect(() => {
    dispatch(listMatches());
  }, []);

  useEffect(() => {
    if (errorListMatches) {
      checkServerError(errorListMatches);
    }

    if (errorDeleteMatch) {
      if (errorDeleteMatch?.response?.status === 400) {
        check400Error(errorDeleteMatch);
      }
      checkServerError(errorDeleteMatch);
    }
  }, [errorDeleteMatch, errorListMatches]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      reload();
    });
    return () => unsubscribe;
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

  const handleInstagram = useCallback(async (instagram) => {
    if (!instagram || typeof instagram === 'undefined') {
      return;
    }

    const url = `https://www.instagram.com/${instagram}/`;

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const handleShowProfile = (profile, isGroup) => {
    // props.navigation.navigate('SwipeProfile', {
    //   profile: profile,
    //   isGroup: isGroup,
    //   preview: true,
    // });
    props.navigation.navigate('SwipeProfile', {
      profile: profile,
      isGroup: isGroup,
      preview: true,
    });
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

  const onOpenActionSheet = (matchedProfile, matchId) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Send message', 'Remove match', 'Cancel'];
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
          handleInstagram(matchedProfile.instagram);
        }
        if (buttonIndex === 1) {
          handleDeleteMatch(matchId);
        }
        return null;
      }
    );
  };

  const renderMatch = ({ item, index }) => {
    const matched_data = item.matched_data;
    const matchedProfile = item.matched_data.matched_profile

    return (
      <View style={styles.matchContainer}>
        <View style={styles.rowContainer}>
          <ChatAvatar
            onShowProfile={() => handleShowProfile(matchedProfile, false)}
            matchedProfile={matchedProfile}
            matchedData={matched_data}
            isInGroup={matched_data.is_group_match}
            matchedProfileHasPhoto={
              matchedProfile.photos.length > 0 ? true : false
            }
            matchedProfilePhoto={
              matchedProfile.photos.length > 0
                ? matchedProfile.photos[0].image
                : null
            }
          />
          <TouchableOpacity
            onPress={() => onOpenActionSheet(matchedProfile, item.id)}
            style={styles.cardContainer}>
            <Text style={styles.instagramText}>
              {matchedProfile.instagram
                ? `@ ${matchedProfile.instagram}`
                : 'No account found'}
            </Text>
            {matchedProfile.instagram ? (
              <TouchableOpacity
                onPress={() => handleInstagram(matchedProfile.instagram)}
                style={styles.sendButtonContainer}>
                <Image
                  source={require('../assets/images/send-button.png')}
                  style={styles.img}
                />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyMatches = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.bg,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          textAlign: 'center',
        }}>
        <View style={{ width: 200, height: 200 }}>
          <Image
            source={require('../assets/images/no-chats.png')}
            style={{ resizeMode: 'contain', flex: 1, aspectRatio: 1 }}
          />
        </View>
        <Text style={{ color: Colors.white, fontSize: 15 }}>
          No chats yet ;(
        </Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: Colors.bg, flex: 1 }}>
      <FlatList
        data={matches?.data}
        keyExtractor={(match) => match.id}
        scrollEnabled
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reload}
            tintColor={Colors.white}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={renderMatch}
        ListEmptyComponent={renderEmptyMatches}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 36,
          alignItems: 'center',
        }}>
        <Text style={{ color: Colors.white }}>
          Real-time chat in the next update
        </Text>
      </View>
    </View>
  );
};

ChatScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Chats',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('Swipe');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default ChatScreen;

const styles = StyleSheet.create({
  matchContainer: {
    width: '95%',
    paddingVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },

  cardContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.bgCard,
    height: 45,
    padding: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },

  instagramText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 1,
  },

  sendButtonContainer: {
    backgroundColor: Colors.orange,
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
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
