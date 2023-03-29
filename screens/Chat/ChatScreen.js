import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import chat from '../../data/chats.json';
import HeaderButtom from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Context } from '../../context/ContextProvider';

import { useActionSheet } from '@expo/react-native-action-sheet';
import ActivityModal from '../../components/UI/ActivityModal';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';
import sendimg from '../../assets/images/send-button.png';
import Message from '../../components/Message';
import ChatHeader from '../../components/ChatHeader';
import {
  addConversationMessage,
  listMessages,
  deleteConversation,
} from '../../store/actions/conversation';
import { blockProfile } from '../../store/actions/block';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

API_URL = BASE_URL.replace('http://', '');

const ChatScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const conversationId = props.navigation.getParam('conversationId');
  const receiverData = props.navigation.getParam('receiverProfile');
  const { profileContext, updateProfileContext } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  const dispatch = useDispatch();

  const conversationReducer = useSelector(
    (state) => state.listConversationMessages
  );
  const {
    error: errorMessages,
    loading: loadingMessages,
    data: messages,
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
    }
  }, [errorMessages]);

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

  const handleShowProfile = (profile, isInGroup) => {
    if (profile) {
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
            props.navigation.navigate('Chat');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(blockProfile(profileId));
            props.navigation.navigate('Matches');
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
            props.navigation.navigate('Matches');
          },
        },
      ]
    );
  };

  const onOpenActionSheet = (profile, chatId) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['View Profile', 'Delete chat', 'Block profile', 'Cancel'];
    const destructiveButtonIndex = [1, 2];
    const cancelButtonIndex = 3;

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
        return null;
      }
    );
  };

  if (loadingMessages || localLoading) {
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
  const renderMessages = ({ item }) => {
    return (
      <Message
        message={item}
        isMyMessage={item.sent_by_current ? true : false}
        ownProfile={profileContext}
        matchedProfile={receiverData}
        onShowProfile={() => {
          handleShowProfile(receiverData, receiverData.isInGroup);
        }}
      />
    );
  };
  return (
    <View style={styles.screen}>
      {!loadingMessages && (
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
          data={messages?.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessages}
          contentContainerStyle={{ flexDirection: 'column' }}
          extraData={conversationReducer}
        />
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

ChatScreen.navigationOptions = (navData) => {
  const handleShowProfile = (profileid, isInGroup) => {
    if (profileid) {
      navData.navigation.navigate('SwipeProfile', {
        mainProfileId: profileid,
        isInGroup: isInGroup,
      });
    }
  };
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
