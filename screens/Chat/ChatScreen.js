import React, { useState, useEffect, useContext } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import { checkServerError } from '../../utils/errors';
import { useActionSheet } from '@expo/react-native-action-sheet';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import sendimg from '../../assets/images/send-button.png';
import Message from '../../components/Message';
import ChatHeader from '../../components/ChatHeader';
import {
  addConversationMessage,
  listMessages,
  deleteConversation,
  loadMoreMessages,
} from '../../store/actions/conversation';
import { blockProfile } from '../../store/actions/block';
import { reportProfile } from '../../store/actions/user';
import * as u from '../../constants/user';
import * as b from '../../constants/block';
import * as c from '../../constants/conversation';
import { ENV } from '../../environment';
const BASE_URL = ENV.API_URL;

API_URL = BASE_URL.replace('http://', '');

const ChatScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const conversationId = props.navigation.getParam('conversationId');
  const receiverData = props.navigation.getParam('receiverProfile');
  const { profileContext, updateProfileContext } = useContext(Context);
  const deleteConversationReducer = useSelector(
    (state) => state.deleteConversation
  );
  const {
    error: errorDeleteConversation,
    loading: loadingDeleteConversation,
    data: conversationDeleted,
  } = deleteConversationReducer;

  const reportProfileReducer = useSelector((state) => state.reportProfile);
  const {
    error: errorReportProfile,
    loading: loadingReportProfile,
    data: profileReported,
  } = reportProfileReducer;

  const blockProfileReducer = useSelector((state) => state.blockProfile);
  const {
    error: errorBlockProfile,
    loading: loadingBlockProfile,
    data: profileBlocked,
  } = blockProfileReducer;

  const conversationReducer = useSelector(
    (state) => state.listConversationMessages
  );
  const {
    error: errorMessages,
    loading: loadingMessages,
    data: messagesData,
  } = conversationReducer;

  const [refreshing, setRefreshing] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (conversationId) {
      dispatch(listMessages(conversationId));
      setMessages(messagesData);
    }
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) {
      const wsUrl = encodeURI(
        `ws://${API_URL}/ws/chat/${conversationId}/?sender_id=${profileContext.id}`
      );
      const newChatSocket = new WebSocket(wsUrl);

      newChatSocket.onopen = () => {
        console.log('Socket opened');
      };

      newChatSocket.onclose = (e) => {
        console.log('Socket closed', e);
      };

      setChatSocket(newChatSocket);
    }
    return () => {
      if (chatSocket) {
        chatSocket.close();
      }
      setChatMessage('');
    };
  }, [conversationId, dispatch]);

  useEffect(() => {
    if (errorMessages) {
      checkServerError(errorMessages);
      props.navigation.navigate('Matches');
    }
  }, [errorMessages]);

  useEffect(() => {
    if (conversationDeleted) {
      Alert.alert('The conversation has been deleted', 'Press ok to continue', [
        {
          text: 'Ok',
          onPress: () => {
            return;
          },
        },
      ]);
      props.navigation.navigate('Matches');
      dispatch({ type: c.DELETE_CONVERSATION_RESET });
    }
  }, [conversationDeleted]);

  useEffect(() => {
    if (errorDeleteConversation) {
      checkServerError(errorDeleteConversation);
    }
  }, [errorDeleteConversation]);

  useEffect(() => {
    if (errorReportProfile) {
      checkServerError(errorReportProfile);
    }

    if (profileReported) {
      Alert.alert('The profile has been reported', 'Press ok to continue', [
        {
          text: 'Ok',
          onPress: () => {
            return;
          },
        },
      ]);

      props.navigation.navigate('Matches');
      dispatch({ type: u.REPORT_PROFILE_RESET });
    }
  }, [errorReportProfile, profileReported]);

  useEffect(() => {
    if (errorBlockProfile) {
      checkServerError(errorBlockProfile);
    }

    if (profileBlocked) {
      Alert.alert('The profile has been blocked', 'Press ok to continue', [
        {
          text: 'Ok',
          onPress: () => {
            return;
          },
        },
      ]);

      props.navigation.navigate('Matches');
      dispatch({ type: b.BLOCK_PROFILE_RESET });
    }
  }, [errorBlockProfile, profileBlocked]);

  const handleSendMessage = () => {
    if (chatSocket && chatMessage) {
      chatSocket.send(chatMessage);
      dispatch(
        addConversationMessage({
          id: Math.random() * 10,
          sent_by_current: true,
          message: chatMessage,
        })
      );
      setChatMessage('');
    }
  };

  const handleShowProfile = (profile, isInGroup, isMyProfile) => {
    if (profile) {
      if (isMyProfile) {
        props.navigation.navigate('Profile', {
          mainProfileId: profileContext.id,
          isInGroup: profileContext.is_in_group,
          isMyProfile: true,
        });
      }
      props.navigation.navigate('SwipeProfile', {
        mainProfileId: profile.id,
        isInGroup: isInGroup,
      });
    }
  };

  const handleGoBack = () => {
    props.navigation.navigate('Matches');
  };

  const handleBlockProfile = (profileId) => {
    if (!profileId) {
      return;
    }
    Alert.alert(
      `Are you sure you want to block this profile?`,
      'This profile will not be able to see you and neither will you',
      [
        {
          text: 'No',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(blockProfile(profileId));
          },
        },
      ]
    );
  };

  const handleReportProfile = (profileId) => {
    if (!profileId) {
      return;
    }
    Alert.alert(
      `Are you sure you want to report this profile?`,
      'This profile will not be able to see you and neither will you',
      [
        {
          text: 'No',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(reportProfile(profileId));
          },
        },
      ]
    );
  };

  const handleDeleteChat = (chatId) => {
    if (!chatId) {
      return;
    }
    Alert.alert(
      `Are you sure you want to delete this chat?`,
      'This profile will not be able to see you and neither will you',
      [
        {
          text: 'No',
          onPress: () => {
            props.navigation.navigate('Chat');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(deleteConversation(chatId));
          },
        },
      ]
    );
  };

  const onOpenActionSheet = (profile, chatId) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = [
      'View Profile',
      'Delete chat',
      'Block profile',
      'Report profile',
      'Cancel',
    ];
    const destructiveButtonIndex = [1, 2, 3];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleShowProfile(profile, profile.is_in_group);
        }
        if (buttonIndex === 1) {
          handleDeleteChat(chatId);
        }
        if (buttonIndex === 2) {
          handleBlockProfile(profile.id);
        }
        if (buttonIndex === 3) {
          handleReportProfile(profile.id);
        }
        return null;
      }
    );
  };

  if (
    localLoading ||
    loadingDeleteConversation ||
    loadingReportProfile ||
    loadingBlockProfile
  ) {
    <ActivityModal
      loading
      title="Please wait"
      size="large"
      activityColor="white"
      titleColor="white"
      activityWrapperStyle={{
        backgroundColor: Colors.bg,
      }}
    />;
  }

  const handleLoadMoreMessages = () => {
    if (messagesData?.next) {
      dispatch(loadMoreMessages(messagesData.next));
    }
  };
  const renderMessages = ({ item }) => {
    return (
      <Message
        message={item}
        isMyMessage={item.sent_by_current ? true : false}
        ownProfile={profileContext}
        matchedProfile={receiverData}
        onShowProfile={() =>
          item.sent_by_current
            ? handleShowProfile(
                profileContext,
                profileContext.is_in_group,
                true
              )
            : handleShowProfile(receiverData, receiverData.is_in_group)
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      {messagesData && (
        <ChatHeader
          onGoBack={() => handleGoBack()}
          receiverData={receiverData}
          onShowProfile={() =>
            handleShowProfile(receiverData, receiverData.is_in_group)
          }
          onActionSheet={() => onOpenActionSheet(receiverData, conversationId)}
        />
      )}
      <View style={styles.messages_Container}>
        <FlatList
          inverted={true}
          data={messagesData?.results}
          renderItem={renderMessages}
          contentContainerStyle={{ flexDirection: 'column' }}
          extraData={conversationReducer}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMoreMessages}
        />
        {loadingMessages && (
          <ActivityModal
            loading
            title="Loading messages"
            size="large"
            activityColor="white"
            titleColor="white"
          />
        )}
      </View>
      <View style={styles.sendMessage}>
        <View style={{ flex: 2, flexDirection: 'row', padding: 10 }}>
          <TextInput
            inputMode="text,url"
            style={styles.inputMessage}
            placeholder="Type a message"
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => {
              setChatMessage(text);
            }}
            value={chatMessage}
          />
          <TouchableOpacity
            onPress={() => handleSendMessage()}
            style={styles.imgContainer}>
            <Image source={sendimg} style={styles.image} />
          </TouchableOpacity>
          <View />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    height: '100%',
    width: '100%',
  },

  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },

  messages_Container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Colors.bg,
    height: '90%',
    width: '100%',
    marginBottom: 20,
  },

  sendMessage: {
    backgroundColor: Colors.blue,
    height: '10%',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },

  inputMessage: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginTop: 2.5,
    paddingLeft: 10,
    width: '85%',
    height: 40,
  },
  imgContainer: {
    backgroundColor: Colors.orange,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 15,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ChatScreen;
