import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';

const PreviewGroupChat = ({ navigation, lastMessage, goToGroupChat }) => {
  const handleAvatarNavigation = () => {
    return navigation.navigate('TabNavigator', { screen: 'GroupNavigator' });
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={handleAvatarNavigation}
          style={styles.chat_profile_head}
        >
          <ImageBackground
            source={require('../../assets/images/group-chat-placeholder.png')}
            imageStyle={styles.img}
            style={styles.singleImageContainer}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goToGroupChat} style={styles.cardContainer}>
        <View style={styles.chat_preview}>
          <Text style={styles.matched_name}>Your Group</Text>
          <View style={styles.lastMessagesContainer}>
            {lastMessage ? (
              <Text numberOfLines={1} style={styles.last_message}>
                {lastMessage.sent_by_current
                  ? 'Me: '
                  : `${lastMessage.sender_name}: `}{' '}
                {lastMessage.message}
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.last_message}>
                Start planning with your friends
              </Text>
            )}
          </View>
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    </View>
  );
};

export default PreviewGroupChat;

const styles = StyleSheet.create({
  singleImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: Colors.bgCard,
    borderColor: Colors.calypso,
    borderWidth: 2,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },

  noPhotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    marginRight: 10,
  },

  container: {
    flexDirection: 'row',
    flex: 2,
    marginBottom: 15,
    marginTop: 10,
  },

  matched_name: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
  },

  chat_profile_head: {
    position: 'absolute',
  },

  chat_head_container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },

  chat_group_size_container: {
    position: 'absolute',
    marginLeft: 37,
    marginBottom: 10,
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chat_group_size_number: {
    fontSize: 12,
    color: 'white',
  },

  chat_preview: {
    marginLeft: 10,
    flex: 2,
    flexDirection: 'column',
    marginBottom: 10,
  },

  lastMessagesContainer: {
    flexDirection: 'row',
    width: '75%',
    flex: 2,
    justifyContent: 'space-between',
  },

  messageCount: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },

  last_message: {
    color: Colors.lightGray,
    marginTop: 5,
    fontSize: 14,
    justifyContent: 'center',
  },

  cardContainer: {
    marginLeft: 65,
    backgroundColor: Colors.bg,
    borderRadius: 10,
    width: '100%',
  },

  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGray,
    width: '75%',
  },
});
