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

const ChatScreen = (props) => {
  const chatId = props.navigation.getParam('chatId');
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
      <View
        style={
          item.sender.id === profileContext.id
            ? styles.myMessage
            : styles.senderMessage
        }>
        <Text style={styles.allMessages}>{item.text}</Text>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
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
  const matchedId = navData.navigation.getParam('matchedId');
  const matchedName = navData.navigation.getParam('matchedName');
  const isInGroup = navData.navigation.getParam('isInGroup');
  return {
    headerTitle: '  ',
    headerLeft: () => (
      <View style={styles.titleContainer}>
        <HeaderButtons HeaderButtonComponent={HeaderButtom}>
          <Item
            iconName={
              Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
            }
            title="Back"
            onPress={() => {
              navData.navigation.navigate('Chats');
            }}
          />
        </HeaderButtons>
        <View
          style={{
            marginTop: 5,
            marginLeft: 10,
            flex: 2,
            flexDirection: 'row',
          }}>
          <Avatar
            id={matchedId}
            onPress={() => handleShowProfile(matchedId, isInGroup)}
          />
          <Text style={styles.matched_Name}>{matchedName}</Text>
        </View>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 2,
    backgroundColor: Colors.bg,
    height: '100%',
    width: '100%',
  },

  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },

  matched_Name: {
    fontSize: 18,
    color: 'white',
    marginLeft: 30,
    marginTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
  },

  messages_Container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Colors.bg,
    height: '90%',
    width: '100%',
    marginBottom: 20,
  },

  senderMessage: {
    fontSize: 16,
    lineHeight: '100%',
    backgroundColor: Colors.blue,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '70%',
    alignSelf: 'flex-start',
  },

  myMessage: {
    backgroundColor: Colors.orange,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '70%',
    alignSelf: 'flex-end',
  },

  allMessages: {
    fontSize: 16,
    color: Colors.white,
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
