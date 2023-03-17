import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exist } from '../../utils/checks';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';

import HeaderButtom from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import { listMatches, deleteMatch } from '../../store/actions/swipe';
import { checkServerError, check400Error } from '../../utils/errors';
import no_chats from '../../assets/images/no-chats.png';
import SwipeError from '../../components/SwipeError';
import ActivityModal from '../../components/UI/ActivityModal';
import ChatAvatar from '../../components/ChatAvatar';

/* For test purposes */
import chats from '../../data/chats.json';

const ChatsScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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

  useEffect(() => {
    dispatch(listMatches());
  }, []);
  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      await dispatch(listMatches());
    } catch (err) {
      console.log(err);
    }
    setLocalLoading(false);
  }, [dispatch]);

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

  const handleShowProfile = (profile, isInGroup) => {
    if (profile) {
      props.navigation.navigate('SwipeProfile', {
        mainProfileId: profile.id,
        isInGroup: isInGroup,
      });
    }
  };
  const handleShowChat = (chat, matchedData) => {
    if (chat) {
      props.navigation.navigate({
        routeName: 'Chat',
        params: {
          chatId: chat.id,
          isInGroup: matchedData.matched_profile.is_in_group,
          matchedId: matchedData.matched_profile.id,
          matchedName: matchedData.matched_profile.name,
        },
      });
    }
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

  if (loadingListMatches) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.screen}>
          <ActivityModal
            loading
            title="Loading"
            size="small"
            activityColor="white"
            titleColor="white"
            activityWrapperStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  const renderNoMatches = () => {
    return (
      <View style={styles.no_matches}>
        <Text style={styles.no_matches_text}>You have no matches yet.</Text>
      </View>
    );
  };

  const renderBubblesMatches = ({ item }) => {
    const matchedData = item.matched_data;
    const matchedProfile = item.matched_data.matched_profile;
    return (
      <View style={styles.new_matches}>
        <ChatAvatar
          onShowProfile={() => handleShowChat(item, matchedData)}
          matchedProfile={matchedProfile}
          matchedData={matchedData}
          isInGroup={matchedData.is_group_match}
          matchedProfileHasPhoto={matchedProfile.photos.length > 0}
          matchedProfilePhoto={
            matchedProfile.photos.length > 0
              ? matchedProfile.photos[0].image
              : null
          }
        />
      </View>
    );
  };
  const renderNoChats = () => {
    return (
      <View style={styles.no_chats}>
        <Image source={no_chats} style={styles.no_chats_image} />
        <Text style={styles.no_chats_text}>You have no chats yet.</Text>
      </View>
    );
  };

  const renderPreviewChats = ({ item }) => {
    const matchedData = item.matched_data;
    const matchedProfile = item.matched_data.matched_profile;
    return (
      <View style={styles.container}>
        <View>
          <ChatAvatar
            onShowProfile={() =>
              handleShowProfile(matchedProfile, matchedData.is_group_match)
            }
            matchedProfile={matchedProfile}
            matchedData={matchedData}
            isInGroup={matchedData.is_group_match}
            matchedProfileHasPhoto={matchedProfile.photos.length > 0}
            matchedProfilePhoto={
              matchedProfile.photos.length > 0
                ? matchedProfile.photos[0].image
                : null
            }
          />
        </View>
        <TouchableOpacity
          onLongPress={() => onOpenActionSheet(matchedProfile, item.id)}
          onPress={() => handleShowChat(item, matchedData)}
          style={styles.cardContainer}>
          <View style={styles.chat_preview}>
            <Text style={styles.matchedName}>{matchedProfile.name}</Text>
            <Text style={styles.last_message}>{item.messages[0].text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}> New Matches</Text>
          {/* {localLoading && renderAllCardSwiped()} */}
          {!localLoading && (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={reload}
                  tintColor={Colors.white}
                />
              }
              horizontal
              contentContainerStyle={styles.new_matches}
              data={matches?.results}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderBubblesMatches}
              ListEmptyComponent={renderNoMatches}
            />
          )}
        </View>
        <View style={styles.chat_preview}>
          <Text style={styles.title}> Chats</Text>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={reload}
                tintColor={Colors.white}
              />
            }
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.chats}
            data={chats.results}
            renderItem={renderPreviewChats}
            ListEmptyComponent={renderNoChats}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  screen: {
    flex: 2,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 10,
  },

  text: {
    color: 'white',
  },

  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },

  new_matches: {
    overflow: 'hidden',
    marginTop: 5,
    marginLeft: 5,
    flexDirection: 'row',
    backgroundColor: Colors.bg,
  },

  no_matches: {
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: Colors.bg,
  },

  no_matches_text: {
    color: Colors.white,
    fontSize: 16,
    justifyContent: 'center',
  },

  chats: {
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'column',
    backgroundColor: Colors.bg,
  },

  match_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.orange,
    margin: 10,
  },

  container: {
    flexDirection: 'row',
    flex: 2,
    marginBottom: 15,
  },

  matchedName: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
  },

  chat_preview: {
    flex: 2,
    flexDirection: 'column',
    marginBottom: 10,
  },

  last_message: {
    color: Colors.white,
    marginTop: 5,
    fontSize: 14,
    justifyContent: 'center',
  },

  cardContainer: {
    backgroundColor: Colors.bg,
    borderRadius: 10,
    width: '100%',
  },
});

ChatsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Chats',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.navigate('Swipe');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};
export default ChatsScreen;
