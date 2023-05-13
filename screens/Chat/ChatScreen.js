import React, { useState, useEffect, useContext } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import { useActionSheet } from '@expo/react-native-action-sheet';

import {
  addConversationMessage,
  listMessages,
  deleteConversation,
  loadMoreMessages,
} from '../../store/actions/conversation';
import { blockProfile } from '../../store/actions/block';
import { reportProfile } from '../../store/actions/user';
import { checkServerError } from '../../utils/errors';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import Message from '../../components/Chat/Message';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatTextInput from '../../components/Chat/ChatTextInput';
import * as u from '../../constants/requestTypes/user';
import * as b from '../../constants/requestTypes/block';
import * as c from '../../constants/requestTypes/conversation';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

API_URL = BASE_URL.replace('http://', '');

const ChatScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { conversationId, receiverProfile } = props.route.params;
  const { profileContext, updateProfileContext } = useContext(Context);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (conversationId) {
      dispatch(listMessages(conversationId));
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
    console.log('MESSAGE => ', chatMessage);
    console.log('FINISH');

    if (chatMessage.length >= 1000) {
      return Alert.alert(
        'Message too long',
        'You can only send messages up to 1000 characters'
      );
    }

    // Regular expression to detect URLs in chat message
    const urlRegex = /(https?:\/\/[^\s]+)/gi;

    // Replace URLs with clickable links
    const messageWithLinks = chatMessage.replace(urlRegex, (url) => {
      return url;
    });

    // Open clickable links in browser
    const onLinkPress = (url) => {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    };

    if (chatSocket && chatMessage) {
      chatSocket.send(chatMessage);
      dispatch(
        addConversationMessage({
          id: Math.random() * 10,
          sent_by_current: true,
          message: (
            <Text>
              {messageWithLinks.split(' ').map((word, i) => {
                if (urlRegex.test(word)) {
                  return (
                    <Text
                      key={i}
                      style={{ color: Colors.bgCard }}
                      onPress={() => onLinkPress(word)}>
                      {word}{' '}
                    </Text>
                  );
                }
                return `${word} `;
              })}
            </Text>
          ),
        })
      );
      setChatMessage('');
    }
  };

  const handleShowProfile = (profile, isInGroup, isMyProfile) => {
    if (profile) {
      if (isMyProfile) {
        props.navigation.navigate('SwipeProfile', {
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
            return;
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
    loadingDeleteConversation ||
    loadingReportProfile ||
    loadingBlockProfile
  ) {
    <ActivityModal
      loading
      title="Laoding"
      size="small"
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
        isMyMessage={item.sent_by_current}
        onShowProfile={() =>
          item.sent_by_current
            ? handleShowProfile(
                profileContext,
                profileContext.is_in_group,
                true
              )
            : handleShowProfile(receiverProfile, receiverProfile.is_in_group)
        }
      />
    );
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      {messagesData && (
        <ChatHeader
          navigation={props.navigation}
          receiverProfile={receiverProfile}
          onShowProfile={() =>
            handleShowProfile(receiverProfile, receiverProfile.is_in_group)
          }
          onActionSheet={() =>
            onOpenActionSheet(receiverProfile, conversationId)
          }
        />
      )}
      {messagesData?.results.length == 0 ? (
        <View style={styles.noMsgContainer}>
          <Image
            style={styles.noMsgImage}
            source={require('../../assets/images/no-messages.png')}
          />
          <Text style={styles.noMsgText}>Start the conversation!</Text>
        </View>
      ) : (
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
              size="small"
              activityColor="white"
              titleColor="white"
            />
          )}
        </View>
      )}
      <ChatTextInput
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        handleSendMessage={handleSendMessage}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    height: '100%',
    width: '100%',
    paddingBottom: 20,
  },

  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },

  noMsgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '100%',
  },

  noMsgImage: {
    width: '30%',
    height: '12%',
    resizeMode: 'contain',
  },

  noMsgText: {
    color: 'white',
    fontSize: 24,
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
    // flex: 2,
    lineHeight: 23,
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginTop: 2.5,
    paddingLeft: 10,
    width: '85%',
    height: 40,
    textAlignVertical: 'top',
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
