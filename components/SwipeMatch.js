import React from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import GradientText from './UI/GradientText';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeMatch = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;

  const {
    visible,
    title,
    currentProfileImage,
    matchedProfileImage,
    currentProfileName,
    matchedProfileName,
    currentType,
    matchedType,
    chatButtonText,
  } = props.matchData;

  console.log(currentProfileImage);

  return (
    <Modal transparent={false} visible={visible} animationType="fade">
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <GradientText style={styles.matchTitle}>{title}</GradientText>
        </View>
        <View style={styles.profilesContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${BASE_URL}${currentProfileImage}` }}
              style={styles.image}
            />
            <Text style={styles.profileName}>{currentProfileName}</Text>
            <Text style={styles.subtitle}>{currentType}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${BASE_URL}${matchedProfileImage}` }}
              style={styles.image}
            />
            <Text style={styles.profileName}>{matchedProfileName}</Text>
            <Text style={styles.subtitle}>{matchedType}</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.chatButtonContainer}
            onPress={props.chatOnPress}>
            <Text
              style={{ color: Colors.white, fontSize: 15, fontWeight: '500' }}>
              {chatButtonText}
            </Text>
            <Ionicons name="chatbubble-outline" size={20} color="white" />
          </TouchableOpacity>
          <Button
            title="Later"
            color={Platform.OS === 'ios' ? Colors.placeholder : Colors.bg}
            onPress={props.laterOnPress}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SwipeMatch;

const styles = StyleSheet.create({
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.bg,
  },
  titleContainer: {},
  matchTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  profilesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  imageContainer: {
    width: '40%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: Colors.orange,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 15,
    color: Colors.white,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.orange,
  },
  footerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonContainer: {
    backgroundColor: Colors.bgCard,
    width: '70%',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
