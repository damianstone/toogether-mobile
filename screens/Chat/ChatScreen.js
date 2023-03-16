import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { exist } from '../../utils/checks';
import chat from '../../chats.json';
import HeaderButtom from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useEffect } from 'react';
import { getChat } from '../../store/actions/swipe';
import Avatar from '../../components/UI/Avatar';
const ChatScreen = (props) => {
  const chat_id = props.navigation.getParam('chatId');
  const matched_data = props.navigation.getParam('matchedData');
  const chatReducer = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChat(chat_id));
  }, []);

  return (
    <View>
      <Text>MatchScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

ChatScreen.navigationOptions = (navData) => {
  return {
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
          <Avatar />
          <Text style={{ color: 'white' }}>asdasd</Text>
        </View>
      </View>
    ),
  };
};

export default ChatScreen;
