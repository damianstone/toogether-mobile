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
  listGroupMessages,
  loadMoreMessages,
  addConversationMessage,
} from '../../store/actions/conversation';
import { checkServerError } from '../../utils/errors';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import ChatTextInput from '../../components/Chat/ChatTextInput';
import GroupMessage from '../../components/GroupChat/GroupMessage';
import GroupChatHeader from '../../components/GroupChat/GroupChatHeader';

import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

API_URL = BASE_URL.replace('http://', '');

const GroupChatScreen = (props) => {
  const { groupId, totalMembers, currentIsOwnerGroup } = props.route.params;
  const { showActionSheetWithOptions } = useActionSheet();
  const { profileContext } = useContext(Context);

  const [chatMessage, setChatMessage] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  const dispatch = useDispatch();

  const messagesReducer = useSelector(
    (state) => state.listConversationMessages
  );
  const {
    error: errorMessages,
    loading: loadingMessages,
    data: messagesData,
  } = messagesReducer;

  console.log(messagesData);

  useEffect(() => {
    dispatch(listGroupMessages(groupId));
  }, [groupId]);

  useEffect(() => {
    if (groupId) {
      const wsUrl = encodeURI(
        `ws://${API_URL}/ws/chat/${groupId}/?sender_id=${profileContext.id}&my_group_chat=true`
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
  }, [groupId, dispatch]);

  useEffect(() => {
    if (errorMessages) {
      checkServerError(errorMessages);
      props.navigation.navigate('Matches');
    }
  }, [errorMessages]);

  const handleSendMessage = () => {
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

  const onOpenActionSheet = (profile, chatId) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['View group', 'Delete group', 'Cancel'];
    const destructiveButtonIndex = [1, 2, 3];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        return null;
      }
    );
  };

  const handleLoadMoreMessages = () => {
    if (messagesData?.next) {
      dispatch(loadMoreMessages(messagesData.next));
    }
  };

  const renderMessages = ({ item }) => {
    return <GroupMessage isMyMessage={item.sent_by_current} message={item} />;
  };

  if (loadingMessages) {
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

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <GroupChatHeader
        navigation={props.navigation}
        totalMembers={totalMembers}
      />
      {messagesData?.results.length == 0 ? (
        <View style={styles.noMsgContainer}>
          <Image
            style={styles.noMsgImage}
            source={require('../../assets/images/no-group-messages-placeholder.png')}
          />
          <Text style={styles.noMsgText}>
            Start organizing with your friends{' '}
          </Text>
        </View>
      ) : (
        <View style={styles.messages_Container}>
          <FlatList
            inverted={true}
            data={messagesData?.results}
            renderItem={renderMessages}
            contentContainerStyle={{ flexDirection: 'column' }}
            onEndReachedThreshold={0.2}
            extraData={messagesReducer}
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

export default GroupChatScreen;

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
