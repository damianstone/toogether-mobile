import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Context } from '../../context/ContextProvider';
import Colors from '../../constants/Colors';
import { listMatches, loadMoreMatches } from '../../store/actions/swipe';
import {
  startConversation,
  listMyConversations,
  loadMoreConversations,
  getMyGroupChat,
} from '../../store/actions/conversation';
import { checkServerError, check400Error } from '../../utils/errors';
import no_chats from '../../assets/images/no-chats.png';
import ActivityModal from '../../components/UI/ActivityModal';
import MatchCounter from '../../components/Chat/MatchCounter';
import MatchAvatar from '../../components/Chat/MatchAvatar';
import PreviewChat from '../../components/Chat/PreviewChat';
import PreviewGroupChat from '../../components/GroupChat/PreviewGroupChat';
import * as conv from '../../constants/requestTypes/conversation';

const MatchesScreen = (props) => {
  const dispatch = useDispatch();
  const { groupContext, isOwnerGroup } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);

  const getMyGroupChatReducer = useSelector((state) => state.getMyGroupChat);
  const { data: groupChat } = getMyGroupChatReducer;

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

  const startedConversation = useSelector((state) => state.startConversation);
  const {
    error: errorStartedConversations,
    loading: loadingStartedConservation,
    data: dataStartedConversation,
  } = startedConversation;

  // Dependencies reducers to reload the chats after certain actions
  const deleteConversationReducer = useSelector(
    (state) => state.deleteConversation
  );
  const { data: conversationDeleted } = deleteConversationReducer;

  const reportProfileReducer = useSelector((state) => state.reportProfile);
  const { data: profileReported } = reportProfileReducer;

  const blockProfileReducer = useSelector((state) => state.blockProfile);
  const { data: profileBlocked } = blockProfileReducer;

  const conversationReducer = useSelector(
    (state) => state.listConversationMessages
  );
  const { data: messagesData } = conversationReducer;

  useEffect(() => {
    reload();
  }, [
    dispatch,
    conversationDeleted,
    profileBlocked,
    profileReported,
    messagesData,
  ]);

  useEffect(() => {
    if (errorListMatches) {
      if (errorListMatches?.response?.status === 400) {
        check400Error(errorListMatches);
      }
      checkServerError(errorListMatches);
    }
  }, [errorListMatches]);

  useEffect(() => {
    if (errorListConversations) {
      checkServerError(errorListConversations);
    }
  }, [errorListConversations]);

  useEffect(() => {
    if (dataStartedConversation) {
      dispatch({ type: conv.START_CONVERSATION_RESET });
      props.navigation.navigate('Chat', {
        receiverProfile: dataStartedConversation.receiver,
        conversationId: dataStartedConversation.id,
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
    setRefreshing(true);
    try {
      dispatch(listMatches());
      dispatch(listMyConversations());
      if (groupContext) {
        dispatch(getMyGroupChat(groupContext.id));
      }
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
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
      props.navigation.navigate('Chat', {
        conversationId: conversationId,
        receiverProfile: receiverProfile,
      });
    }
  };

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
    // const matchedProfile = item.matched_data.matched_profile;

    const matchedProfile = item.matched_data;
    return (
      <View style={styles.new_matches}>
        <MatchAvatar
          onShowChat={() => handleShowChatbyMatch(item.id)}
          matchedProfile={matchedProfile}
          matchedProfileHasPhoto={
            matchedProfile.matched_profile.photos.length > 0
          }
          matchedProfilePhoto={
            matchedProfile.matched_profile.photos.length > 0
              ? matchedProfile.matched_profile.photos[0].image
              : null
          }
        />
      </View>
    );
  };

  const renderGroupChat = () => {
    if (groupContext && groupChat) {
      return (
        <PreviewGroupChat
          navigation={props.navigation}
          goToGroupChat={() =>
            props.navigation.navigate('GroupChat', {
              groupId: groupContext.id,
              totalMembers: groupContext.total_members,
              currentIsOwnerGroup: isOwnerGroup,
            })
          }
          lastMessage={groupChat.last_message}
        />
      );
    }
    return null;
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

  if (loadingListMatches || refreshing || loadingListConversations) {
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}>Matches</Text>
          {!refreshing && (
            <FlatList
              ListHeaderComponentStyle={styles.listHeader}
              ListHeaderComponent={<MatchCounter matches={matches} />}
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
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View style={styles.chat_preview}>
          <Text style={styles.title}> Chats</Text>
          {conversations?.results.length == 0 ? (
            <View style={styles.noChatsContainer}>
              <Image
                style={styles.noChatsImage}
                source={require('../../assets/images/no-chats.png')}
              />
              <Text style={styles.noChatText}>No chats yet</Text>
            </View>
          ) : (
            !loadingListConversations &&
            conversations && (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={reload}
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
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderGroupChat}
              />
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
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
    paddingHorizontal: 20,
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
    paddingTop: 120,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    width: '100%',
  },

  noChatsImage: {
    resizeMode: 'contain',
    height: 100,
  },

  noChatText: {
    paddingTop: 16,
    color: Colors.white,
    fontSize: 18,
  },
});
