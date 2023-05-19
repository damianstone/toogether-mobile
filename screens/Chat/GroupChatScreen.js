import React, { useState, useEffect, useContext } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
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
import Colors from '../../constants/Colors';
import ChatTextInput from '../../components/Chat/ChatTextInput';
import GroupMessage from '../../components/GroupChat/GroupMessage';
import GroupChatHeader from '../../components/GroupChat/GroupChatHeader';

import { getMessageWithLinks, getWebSocketURL } from '../../utils/getMethods';
import Loader from '../../components/UI/Loader';

const WS_URL = getWebSocketURL();

const GroupChatScreen = (props) => {
  const { groupId, totalMembers, fromGroupScreen } = props.route.params;
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

  useEffect(() => {
    dispatch(listGroupMessages(groupId));
  }, []);

  useEffect(() => {
    if (errorMessages) {
      checkServerError(errorMessages);
      props.navigation.navigate('Matches');
    }
  }, [errorMessages]);

  useEffect(() => {
    const wsUrl = encodeURI(
      `ws://${WS_URL}/chat/${groupId}/?sender_id=${profileContext.id}&my_group_chat=true`
    );
    const newChatSocket = new WebSocket(wsUrl);

    newChatSocket.onopen = () => {
      console.log('Socket opened');
    };

    newChatSocket.onmessage = (event) => {
      const jsonMessage = JSON.parse(event.data);
      const messageWithLinks = getMessageWithLinks(jsonMessage.message);

      dispatch(
        addConversationMessage({
          id: jsonMessage.id,
          sent_by_current: jsonMessage.sender_id === profileContext.id,
          sent_at: jsonMessage.sent_at,
          sender_name: jsonMessage.sender_name,
          sender_photo: { ...jsonMessage.sender_photo },
          message: messageWithLinks,
        })
      );
    };

    newChatSocket.onclose = (e) => {
      console.log('Socket closed', e);
    };

    setChatSocket(newChatSocket);

    return () => newChatSocket.close();
  }, []);

  const handleSendMessage = () => {
    if (chatMessage.length >= 1000) {
      return Alert.alert(
        'Message too long',
        'You can only send messages up to 1000 characters'
      );
    }

    if (chatSocket && chatMessage) {
      chatSocket.send(chatMessage);
      setChatMessage('');
    }
  };

  const handleLoadMoreMessages = () => {
    if (messagesData?.next) {
      dispatch(loadMoreMessages(messagesData.next));
    }
  };

  const renderMessages = ({ item }) => {
    return (
      <GroupMessage
        key={item.id}
        isMyMessage={item.sent_by_current}
        message={item}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <GroupChatHeader
        navigation={props.navigation}
        totalMembers={totalMembers}
        fromGroupScreen={fromGroupScreen}
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
            keyExtractor={(message) => message.id}
            renderItem={renderMessages}
            contentContainerStyle={{ flexDirection: 'column' }}
            onEndReachedThreshold={0.2}
            onEndReached={handleLoadMoreMessages}
          />
          {loadingMessages && <Loader />}
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
