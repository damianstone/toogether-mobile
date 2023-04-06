import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';

import HeaderButtom from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import {
  listMatches,
  deleteMatch,
  loadMoreMatches,
} from '../../store/actions/swipe';
import {
  startConversation,
  listMyConversations,
  loadMoreConversations,
} from '../../store/actions/conversation';
import { checkServerError, check400Error } from '../../utils/errors';
import no_chats from '../../assets/images/no-chats.png';
import ActivityModal from '../../components/UI/ActivityModal';
import MatchCounter from '../../components/MatchCounter';
import MatchAvatar from '../../components/MatchAvatar';
import PreviewChat from '../../components/PreviewChat';
import * as conv from '../../constants/conversation';

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

  const startedConversation = useSelector((state) => state.startConversation);
  const {
    error: errorStartedConversations,
    loading: loadingStartedConservation,
    data: dataStartedConversation,
  } = startedConversation;

  useEffect(() => {
    dispatch(listMatches());
    dispatch(listMyConversations());
  }, [matchDeleted]);

  useEffect(() => {
    if (errorDeleteMatch) {
      if (errorDeleteMatch?.response?.status === 400) {
        check400Error(errorDeleteMatch);
      }
      checkServerError(errorDeleteMatch);
    }

    if (errorListMatches) {
      checkServerError(errorListMatches);
    }
  }, [errorDeleteMatch, errorListMatches]);

  useEffect(() => {
    if (errorListConversations) {
      checkServerError(errorListConversations);
    }
  }, [errorListConversations]);

  useEffect(() => {
    if (dataStartedConversation) {
      dispatch({ type: conv.START_CONVERSATION_RESET });
      props.navigation.navigate({
        routeName: 'Chat',
        params: {
          receiverProfile: dataStartedConversation.receiver,
          conversationId: dataStartedConversation.id,
        },
      });
    }
    if (errorStartedConversations) {
      if (errorStartedConversations?.response?.status === 400) {
        check400Error(errorStartedConversations);
      }
      checkServerError(errorStartedConversations);
    }
  }, [dataStartedConversation, errorStartedConversations]);

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

  const handleShowProfile = (profile, isInGroup) => {
    if (profile) {
      props.navigation.navigate('SwipeProfile', {
        mainProfileId: profile.id,
        isInGroup: isInGroup,
      });
    }
  };

  const handleShowChatbyMatch = (matchId) => {
    if (matchId) {
      dispatch(startConversation(matchId));
    }
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
  const handleLoadMoreMatches = () => {
    if (matches.next) {
      dispatch(loadMoreMatches(matches.next));
    }
  };

  const handleLoadMoreConversations = () => {
    if (conversations.next) {
      dispatch(loadMoreConversations(conversations.next));
    }
  };

  const renderBubblesMatches = ({ item }) => {
    const matchedProfile = item.matched_data.matched_profile;
    return (
      <View style={styles.new_matches}>
        <MatchAvatar
          onShowChat={() => handleShowChatbyMatch(item.id)}
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
      <View style={styles.noChatsContainer}>
        <View style={{ width: 200, height: 200 }}>
          <Image source={no_chats} style={styles.noChatsImage} />
        </View>
        <Text style={styles.noChatText}>No chats yet</Text>
      </View>
    );
  };

  const renderPreviewChats = ({ item }) => {
    return (
      <PreviewChat
        onShowChat={() => handleShowChatbyId(item?.id, item?.receiver)}
        data={item}
        receiverProfile={item?.receiver}
        onShowProfile={() =>
          handleShowProfile(item?.receiver, item?.receiver.is_in_group)
        }
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
              horizontal
              contentContainerStyle={styles.new_matches}
              data={matches?.results}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderBubblesMatches}
              extraData={matches}
              onEndReached={handleLoadMoreMatches}
              onEndReachedThreshold={0.3}
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
              extraData={conversations}
              onEndReached={handleLoadMoreConversations}
              onEndReachedThreshold={0.3}
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
export default MatchesScreen;

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
  noChatsContainer: {
    paddingTop: 20,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  noChatsImage: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1,
  },
  noChatText: {
    color: Colors.white,
    fontSize: 16,
  },
});
