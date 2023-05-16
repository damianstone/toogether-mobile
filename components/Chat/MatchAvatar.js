import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { checkPhoto } from '../../utils/checks';
import Colors from '../../constants/Colors';

const MatchAvatar = (props) => {
  const { matchedProfile, onShowChat } = props;

  const isGroup = matchedProfile.is_group_match;
  let groupSize = 0;
  if (isGroup) {
    groupSize = matchedProfile.members_count;
  }

  return (
    <TouchableOpacity onPress={onShowChat}>
      <ImageBackground
        source={checkPhoto(matchedProfile.matched_profile)}
        imageStyle={styles.img}
        style={styles.singleImageContainer}
      />
      {isGroup && (
        <View style={styles.chat_group_size_container}>
          <Text style={styles.chat_group_size_number}>{groupSize}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MatchAvatar;
const styles = StyleSheet.create({
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
  noPhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    marginRight: 20,
  },

  chat_group_size_container: {
    position: 'absolute',
    marginLeft: 32,
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
});
