import React, { useCallback } from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  Button,
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { exist } from '../utils/checks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getImage } from '../utils/getMethods';
import Colors from '../constants/Colors';
import GradientText from './UI/GradientText';
import ButtonAndroid from './UI/ButtonAndroid';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeMatch = (props) => {
  const {
    visible,
    title,
    currentProfileImage,
    matchedProfileImage,
    currentProfileName,
    matchedProfileName,
    currentType,
    matchedType,
    matchedInstagram,
    chatButtonText,
  } = props.matchData;

  const { chatOnPress, laterOnPress } = props;

  const handleSendMessage = useCallback(async () => {
    if (!exist(matchedInstagram)) {
      return chatOnPress();
    }

    const url = `https://www.instagram.com/${matchedInstagram}/`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <Modal transparent={false} visible={visible} animationType="fade">
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <GradientText style={styles.matchTitle}>{title}</GradientText>
        </View>
        <View style={styles.profilesContainer}>
          <View style={styles.imageContainer}>
            {currentProfileImage ? (
              <Image
                source={{ uri: `${getImage(currentProfileImage)}` }}
                style={styles.image}
              />
            ) : (
              <Image
                source={require('../assets/images/placeholder-profile.png')}
                style={styles.image}
              />
            )}
            <Text style={styles.profileName}>{currentProfileName}</Text>
            <Text style={styles.subtitle}>{currentType}</Text>
          </View>
          <View style={styles.imageContainer}>
            {matchedProfileImage ? (
              <Image
                source={{ uri: `${getImage(matchedProfileImage)}` }}
                style={styles.image}
              />
            ) : (
              <Image
                source={require('../assets/images/placeholder-profile.png')}
                style={styles.image}
              />
            )}
            <Text style={styles.profileName}>{matchedProfileName}</Text>
            <Text style={styles.subtitle}>{matchedType}</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.chatButtonContainer}
            onPress={handleSendMessage}
          >
            <Text
              style={{ color: Colors.white, fontSize: 15, fontWeight: '500' }}
            >
              {chatButtonText}
            </Text>
            <Ionicons name="chatbubble-outline" size={20} color="white" />
          </TouchableOpacity>
          {
            Platform.OS === 'ios'
            ?
              <Button
                title="Later"
                color={Platform.OS === 'ios' ? Colors.placeholder : Colors.bg}
                onPress={laterOnPress}
              />
            :
              <ButtonAndroid
                title="Later"
                onPress={laterOnPress}
              />
          }
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
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: Colors.bgCard,
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
