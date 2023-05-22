import { Platform, View, Text, Linking, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { ENV } from '../environment';

const API_URL = ENV.API_URL;
const MODE = ENV.MODE;

/*
 * This function takes a name as input and returns its initials. If the name is empty or undefined, it returns "N" as the initials.
 * @param {string} name - The name to get initials from
 * @return {string} - The initials of the given name
 */
export const getNameInitials = (name) => {
  const first = name ? name.charAt(0).toUpperCase() : 'N';
  return first;
};

/*
 * This function takes a name as input and returns it. If the name is empty or undefined, it returns "Null" as the card name.
 * @param {string} name - The name to return as the card name
 * @return {string} - The card name to be displayed
 */
export const getCardName = (name) => {
  if (name) {
    return name;
  }
  return 'Null';
};

export const getImage = (backend_image) => {
  let image;
  if (MODE === 'development') {
    image = `${API_URL}${backend_image}`;
  } else {
    image = `${backend_image}`;
  }
  return image;
};

export const getWebSocketURL = () => {
  const BASE_URL = ENV.API_URL;
  if (MODE === 'rocket') {
    return BASE_URL.replace('https://', '');
  }
  return BASE_URL.replace('http://', '');
};

export const getMessageWithLinks = (stringMessage) => {
  // Regular expression to detect URLs in chat message
  const urlRegex = /(https?:\/\/[^\s]+)/gi;

  // Replace URLs with clickable links
  const messageWithLinks = stringMessage.replace(urlRegex, (url) => {
    return url;
  });

  // Open clickable links in browser
  const onLinkPress = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(
          'No sopported type of link',
          'Sorry but the message you are trying to send contains a unsupported link'
        );
      }
    });
  };

  return (
    <Text>
      {messageWithLinks.split(' ').map((word, i) => {
        if (urlRegex.test(word)) {
          return (
            <Text
              key={i}
              style={{ color: Colors.bgCard }}
              onPress={() => onLinkPress(word)}
            >
              {word}{' '}
            </Text>
          );
        }
        return `${word} `;
      })}
    </Text>
  );
};
