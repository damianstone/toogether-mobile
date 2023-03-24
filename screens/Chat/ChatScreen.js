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
import { getChat } from '../../store/actions/chat';
import { Context } from '../../context/ContextProvider';

import ActivityModal from '../../components/UI/ActivityModal';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';
import sendimg from '../../assets/images/send-button.png';
import Message from '../../components/Message';
import ChatHeader from '../../components/ChatHeader';

const ChatScreen = (props) => {
  const chatId = props.navigation.getParam('chatId');
  const matchedData = props.navigation.getParam('matchedData');
  const isInGroup = props.navigation.getParam('isInGroup');
  const { profileContext, updateProfileContext } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const dispatch = useDispatch();
  const chatReducer = useSelector((state) => state.getChat);
  const {
    error: errorChat,
    loading: loadingChat,
    data: dataChat,
  } = chatReducer;

  useEffect(() => {
    dispatch(getChat(chatId));
  }, [chatId]);

  const handleShowProfile = (profile, isInGroup) => {
    if (profile) {
      props.navigation.navigate('SwipeProfile', {
        mainProfileId: profile.id,
        isInGroup: isInGroup,
      });
    }
  };

  const handleGoBack = () => {
    props.navigation.navigate('Chats');
  };

  if (loadingChat || localLoading) {
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
        message={item.text}
        isMyMessage={profileContext?.id != item.sender.id ? false : true}
        ownProfile={profileContext}
        matchedProfile={matchedData?.matched_profile}
        onShowProfile={() => {
          handleShowProfile(item.sender.id, isInGroup);
        }}
      />
    );
  };
  return (
    <View style={styles.screen}>
      {matchedData && (
        <ChatHeader
          onGoBack={() => handleGoBack()}
          matchedData={matchedData}
          onShowProfile={() =>
            handleShowProfile(
              matchedData.matched_profile,
              matchedData.matched_profile.is_in_group
            )
          }
        />
      )}
      <View style={styles.messages_Container}>
        <FlatList
          inverted={true}
          data={chat.results[0].messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessages}
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
  },

  inputMessage: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginTop: 2.5,
    marginBottom: 10,
    paddingLeft: 10,
    width: '85%',
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
    alignSelf: 'center',
  },
});

export default ChatScreen;
