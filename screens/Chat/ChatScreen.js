import React, { useState, useEffect, useCallback } from 'react';
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
import { exist } from '../../utils/checks';
import chat from '../../chats.json';
import HeaderButtom from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { getChat } from '../../store/actions/swipe';

import ActivityModal from '../../components/UI/ActivityModal';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';
import { getUserProfile } from '../../store/actions/user';
const ChatScreen = (props) => {
  const chat_id = props.navigation.getParam('chatId');
  const matchedId = props.navigation.getParam('matchedId');
  const [refreshing, setRefreshing] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const dispatch = useDispatch();
  const chatReducer = useSelector((state) => state.getChat);
  const {
    error: errorChat,
    loading: loadingChat,
    data: dataChat,
  } = chatReducer;
  const userReducer = useSelector((state) => state.userGetProfile);
  const {
    error: errorUser,
    loading: loadingUser,
    data: userData,
  } = userReducer;
  const { id } = userData;

  useEffect(() => {
    dispatch(getChat(chat_id));
    dispatch(getUserProfile);
  }, [chat_id]);

  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      await dispatch(listMatches());
    } catch (err) {
      console.log(err);
    }
    setLocalLoading(false);
  }, [dispatch]);

  if (loadingChat || loadingUser) {
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
      <View style={item.sender.id === id ? styles.byMessages : styles.messages}>
        <Text style={{ color: 'white' }}>{item.text}</Text>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.messages_Container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reload}
              tintColor={Colors.white}
            />
          }
          inverted={true}
          data={chat.results[0].messages.reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessages}
        />
      </View>
      <View style={styles.sendMessage}>
        <View style={{ flex: 2, flexDirection: 'row', padding: 10 }}>
          <TextInput
            style={{
              backgroundColor: Colors.white,
              borderRadius: 10,
              margin: 10,
              width: '85%',
              color: 'white',
            }}
            placeholder="Type a message"
            placeholderTextColor={Colors.placeholder}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.orange,
              borderRadius: 100,
              margin: 10,
              width: '15%',
            }}>
            <Text style={{ color: 'white' }}>Send</Text>
          </TouchableOpacity>
          <View />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 2,
    backgroundColor: Colors.bg,
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  matched_Name: {
    fontSize: 18,
    color: 'white',
    marginLeft: 15,
    marginTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
  },

  messages_Container: {
    flex: 1,
    marginTop: 10,
    borderBottomColor: Colors.placeholder,
    borderBottomWidth: 1,
    backgroundColor: Colors.bg,
    height: '90%',
    width: '100%',
  },
  messages: {
    backgroundColor: Colors.bgCard,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '70%',
    alignSelf: 'flex-start',
    borderBottomColor: Colors.placeholder,
    borderBottomWidth: 1,
  },

  byMessages: {
    backgroundColor: Colors.orange,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '70%',
    alignSelf: 'flex-end',
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },

  sendMessage: {
    backgroundColor: Colors.bgCard,
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
        <View style={{ marginTop: 5, flex: 2, flexDirection: 'row' }}>
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

export default ChatScreen;
