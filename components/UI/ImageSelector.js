import React, { useState, Fragment } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../../constants/Colors';

const ImageSelector = (props) => {
  const [image, setImage] = useState();

  const verifyPermissions = async () => {
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

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    setImage(image);
    props.onImageTaken(image);
  };

  const deleteImageHandler = () => {
    setImage(null);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {image && image.uri ? (
          <Image
            style={styles.image}
            source={{ uri: image.uri }}
            resizeMode="contain"
          />
        ) : (
          <>
            <Text style={{ marginBottom: 10, color: Colors.white }}>
              No Image picked yet.
            </Text>
            <Button
              title="Upload an image 📸"
              color={Colors.orange}
              onPress={() => {
                takeImageHandler();
              }}
            />
          </>
        )}
      </View>
      {image && image.uri ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={deleteImageHandler}>
            <Text style={styles.redColor}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takeImageHandler}>
            <Text style={styles.greenColor}>Change</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    marginTop: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  redColor: {
    marginVertical: 10,
    color: Colors.orange,
  },
  greenColor: {
    marginVertical: 10,
    color: Colors.green,
  },
});

export default ImageSelector;
