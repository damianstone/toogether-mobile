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

import { loadMoreMessages } from '../../store/actions/conversation';
import { checkServerError } from '../../utils/errors';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import Message from '../../components/Chat/Message';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatTextInput from '../../components/Chat/ChatTextInput';
import { ENV } from '../../environment';
import GroupMessage from '../../components/GroupChat/GroupMessage';
import GroupChatHeader from '../../components/GroupChat/GroupChatHeader';

const BASE_URL = ENV.API_URL;

API_URL = BASE_URL.replace('http://', '');

const GroupChatScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  // const { conversationId, receiverProfile } = props.route.params;
  // const { profileContext, updateProfileContext } = useContext(Context);

  const [localLoading, setLocalLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const renderMessages = ({ item }) => {
    return (
      <GroupMessage isPrevMessageFromCurrentUser={true} isMyMessage={true} />
    );
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <GroupChatHeader navigation={props.navigation} />
      <View style={styles.messages_Container}>
        <FlatList
          inverted={true}
          data={[1]}
          renderItem={renderMessages}
          contentContainerStyle={{ flexDirection: 'column' }}
          onEndReachedThreshold={0.2}
        />
      </View>
      <ChatTextInput
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        handleSendMessage={() => {}}
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
