import React, { useState, Fragment } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImageSelector = (props) => {
  const [imageUri, setImageUri] = useState('');

  const verifyPermissions = async () => {
    const result = await ImagePicker.getCameraPermissionsAsync();
    //console.log(result);
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
      allowsEditing: true,
      quality: 0.5,
    });
    // console.log("img", image);

    setImageUri(image.uri);
    props.onImageTaken(image.uri);
  };

  const deleteImageHandler = () => {
    setImageUri(null);
  };

  let colorBorder;
  if (imageUri) colorBorder = Colors.green;
  else colorBorder = Colors.orange;

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {imageUri ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : (
          <Fragment>
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
          </Fragment>
        )}
      </View>
      {imageUri ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
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
    alignItems: 'center',
    marginVertical: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  redColor: {
    color: Colors.orange,
  },
  greenColor: {
    color: Colors.green,
  },
});

export default ImageSelector;
