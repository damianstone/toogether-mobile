import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

/*
 * This function checks camera permissions and requests them if they are not granted. It returns true if permissions are granted, and false if they are not.
 * @return {boolean} - True if camera permissions are granted, false if they are not
 */
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

/*
 * This function checks location permissions and requests them if they are not granted. It returns true if permissions are granted, and false if they are not.
 * @return {boolean} - True if location permissions are granted, false if they are not
 */
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
