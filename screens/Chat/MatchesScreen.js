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
import Colors from '../../constants/Colors';
import { listMatches, deleteMatch } from '../../store/actions/swipe';
import {
  createConversation,
  listMyConversations,
} from '../../store/actions/conversation';
import { checkServerError, check400Error } from '../../utils/errors';
import no_chats from '../../assets/images/no-chats.png';
import SwipeError from '../../components/SwipeError';
import ActivityModal from '../../components/UI/ActivityModal';
import ChatAvatar from '../../components/ChatAvatar';
import MatchCounter from '../../components/MatchCounter';
import MatchAvatar from '../../components/MatchAvatar';
import PreviewChat from '../../components/PreviewChat';

/* For test purposes */
import chats from '../../data/chats.json';

const MatchesScreen = (props) => {
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
  const listConversationsReducer = useSelector(
    (state) => state.listConversations
  );
  const {
    error: errorListConversations,
    loading: loadingListConversations,
    data: conversations,
  } = listConversationsReducer;
  const deleteMatchReducer = useSelector((state) => state.deleteMatch);
  const {
    error: errorDeleteMatch,
    loading: loadingDeleteMatch,
    data: matchDeleted,
  } = deleteMatchReducer;

  useEffect(() => {
    dispatch(listMatches());
    dispatch(listMyConversations());
  }, []);

  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      dispatch(listMatches());
    } catch (err) {
      console.log(err);
    }
    setLocalLoading(false);
  }, [dispatch]);

  const reloadChats = useCallback(async () => {
    setLocalLoading(true);
    try {
      dispatch(listMyConversations());
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
    if (errorListConversations) {
      checkServerError(errorListConversations);
    }
  }, [errorDeleteMatch, errorListMatches, errorListConversations]);

  const handleShowProfile = (profile, isInGroup) => {
    if (profile) {
      props.navigation.navigate('SwipeProfile', {
        mainProfileId: profile.id,
        isInGroup: isInGroup,
      });
    }
  };

  const handleShowChatbyMatch = async (receiverProfile, matchId) => {
    const { id } = await dispatch(createConversation(matchId));
    props.navigation.navigate({
      routeName: 'Chat',
      params: {
        receiverProfile,
        conversationId: id,
      },
    });
  };

  const handleShowChatbyId = (conversationId, receiverProfile) => {
    if (conversationId) {
      props.navigation.navigate({
        routeName: 'Chat',
        params: {
          conversationId,
          receiverProfile,
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

  if (
    loadingListMatches ||
    loadingDeleteMatch ||
    localLoading ||
    loadingListConversations
  ) {
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
      <View style={styles.noMatches}>
        <Text style={styles.noMatchesText}>You have no matches yet.</Text>
      </View>
    );
  };

  const renderBubblesMatches = ({ item }) => {
    const matchedProfile = item.matched_data.matched_profile;
    return (
      <View style={styles.new_matches}>
        <MatchAvatar
          onShowChat={() => handleShowChatbyMatch(matchedProfile, item.id)}
          matchedProfile={matchedProfile}
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
    return (
      <PreviewChat
        onShowChat={() => handleShowChatbyId(item.id, item.receiver)}
        data={item}
        receiverProfile={item.receiver}
        onShowProfile={() => handleShowProfile(item.receiver, item.receiver.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}> New Matches</Text>
          {!localLoading && (
            <FlatList
              ListHeaderComponentStyle={styles.listHeader}
              ListHeaderComponent={<MatchCounter data={matches} />}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={reload}
                  tintColor={Colors.white}
                  horizontal
                />
              }
              initialNumToRender={4}
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
          {!loadingListConversations && conversations && (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={reloadChats}
                  tintColor={Colors.white}
                />
              }
              keyExtractor={(item) => item?.id.toString()}
              contentContainerStyle={styles.chats}
              data={conversations?.results}
              renderItem={renderPreviewChats}
              ListEmptyComponent={renderNoChats}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

MatchesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Matches',
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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 10,
    paddingHorizontal: 10,
  },

  text: {
    color: 'white',
  },

  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 5,
  },

  new_matches: {
    overflow: 'hidden',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: Colors.bg,
  },

  listHeader: {
    marginTop: 10,
    marginRight: 20,
  },
  noMatches: {
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: Colors.bg,
  },

  noMatchesText: {
    color: Colors.white,
    fontSize: 16,
    justifyContent: 'center',
  },

  chats: {
    overflow: 'hidden',
    marginTop: 10,
    flexDirection: 'column',
    backgroundColor: Colors.bg,
  },

  chat_preview: {
    overflow: 'hidden',
    marginTop: 10,
    flexDirection: 'column',
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

export default MatchesScreen;
