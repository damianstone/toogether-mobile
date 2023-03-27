import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
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

import ActivityModal from '../../components/UI/ActivityModal';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';
import sendimg from '../../assets/images/send-button.png';
import Message from '../../components/Message';
import ChatHeader from '../../components/ChatHeader';
import {
  createConversation,
  listConversationMessages,
} from '../../store/actions/conversation';

const ChatScreen = (props) => {
  const conversationId = props.navigation.getParam('conversationId');
  const receiverData = props.navigation.getParam('receiverProfile');
  const { profileContext, updateProfileContext } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const dispatch = useDispatch();
  const conversationReducer = useSelector(
    (state) => state.listConversationMessages
  );
  const {
    error: errorConversation,
    loading: loadingConversation,
    data: conversation,
  } = conversationReducer;
  useEffect(() => {
    if (conversationId) dispatch(listConversationMessages(conversationId));
  }, [conversationId]);

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

  if (loadingConversation || localLoading) {
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
          handleShowProfile(item.sender, receiverData.isInGroup);
        }}
      />
    );
  };
  return (
    <View style={styles.screen}>
      {!loadingConversation && (
        <ChatHeader
          onGoBack={() => handleGoBack()}
          receiverData={receiverData}
          onShowProfile={() =>
            handleShowProfile(receiverData, receiverData.is_in_group)
          }
        />
      )}
      <View style={styles.messages_Container}>
        <FlatList
          inverted={true}
          data={conversation?.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessages}
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
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
          <TouchableOpacity style={styles.imgContainer}>
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
