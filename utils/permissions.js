import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export const verifyPermissions = async () => {
  const result = await ImagePicker.getCameraPermissionsAsync();
  if (!result.granted) {
    const askPermissions = await ImagePicker.requestCameraPermissionsAsync();
    if (!askPermissions.granted) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant Camera permissions to be able to take pictures',
        [{ text: 'Okay' }]
      );
      return false;
    }
  }
  return true;
};

export const verifyLocationPermissions = async () => {
  const result = await Location.getForegroundPermissionsAsync();

  if (!result.granted) {
    const askPermissions = await Location.requestForegroundPermissionsAsync();
    if (!askPermissions.granted) {
      return false;
    }
  }
  return true;
};
