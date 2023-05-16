import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { getNameInitials, getImage } from '../../utils/getMethods';
import Colors from '../../constants/Colors';
import FastImageBackground from '../UI/FastImageBackground';

const ChatAvatar = (props) => {
  const {
    isInGroup,
    matchedData,
    matchedProfile,
    matchedProfileHasPhoto,
    matchedProfilePhoto,
    onShowProfile,
    hasBorder,
    isChat,
  } = props;

  if (matchedProfileHasPhoto) {
    return (
      <TouchableOpacity onPress={onShowProfile}>
        <FastImageBackground
          source={{
            uri: `${getImage(matchedProfilePhoto)}`,
            priority: FastImage.priority.high,
          }}
          imageStyle={styles.img}
          containerStyle={
            isInGroup ? styles.groupImageContainer : styles.singleImageContainer
          }
          onPress={onShowProfile}
        >
          {isInGroup ? (
            <View style={styles.counterCircle}>
              <Text style={styles.counterCircleText}>
                {matchedData.members_count}+
              </Text>
            </View>
          ) : null}
        </FastImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.noPhotoContainer}
      onPress={props.onShowProfile}
    >
      <Text style={{ color: Colors.white, fontSize: 20 }}>
        {getNameInitials(matchedProfile.name)}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatAvatar;

const styles = StyleSheet.create({
  groupImageContainer: {
    borderWidth: 1,
    borderColor: Colors.orange,
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: Colors.bgCard,
  },

  counterCircle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  counterCircleText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: 'bold',
    padding: 5,
  },
  //Changed width and height to 50 to match figma
  singleImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: Colors.bgCard,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  //Changed width and height to 50 to match figma
  noPhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,

    marginRight: 20,
  },
  //If the match has no messages, the avatar will have a border
  chat: {
    borderColor: Colors.orange,
    borderWidth: 2,
    width: 65,
    height: 65,
    borderRadius: 100,
  },
});
