import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { getImage } from '../../utils/getMethods';
import Colors from '../../constants/Colors';

const PreviewChat = (props) => {
  const { receiverProfile, onShowProfile, data, onShowChat } = props;

  const isGroup = receiverProfile.is_in_group;
  let groupSize = 0;
  if (isGroup) {
    groupSize = receiverProfile.member_count;
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={onShowProfile}
          style={styles.singleImageContainer}
        >
          <FastImage
            source={
              receiverProfile?.photo
                ? {
                    uri: `${getImage(receiverProfile.photo?.image)}`,
                    priority: FastImage.priority.high,
                  }
                : require('../../assets/images/placeholder-profile.png')
            }
            style={styles.img}
          />
        </TouchableOpacity>
        {isGroup && (
          <View style={styles.chat_group_size_container}>
            <Text style={styles.chat_group_size_number}>{groupSize}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onShowChat} style={styles.cardContainer}>
        <View style={styles.chat_preview}>
          <Text style={styles.matched_name}>{receiverProfile.name}</Text>
          <View style={styles.lastMessagesContainer}>
            <Text numberOfLines={1} style={styles.last_message}>
              {data?.last_message?.message}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    </View>
  );
};

export default PreviewChat;

const styles = StyleSheet.create({
  singleImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: Colors.bgCard,
    position: 'absolute',
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
