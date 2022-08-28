import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto } from '../../store/actions/user';
import { checkServerError, getFieldErrorFromServer } from '../../utils/errors';
import * as c from '../../constants/user';

import Colors from '../../constants/Colors';
import ImageSelector from '../../components/UI/ImageSelector';
import Header from '../../components/UI/Header';
import AuthButton from '../../components/UI/AuthButton';

const AddProfilePhotoScreen = (props) => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const userAddPhotoReducer = useSelector((state) => state.userAddPhoto);
  const { error, loading, success, data } = userAddPhotoReducer;

  // TODO: fix send photo
  useEffect(() => {
    console.log({ ...error });
    if (error && !error.response.data.hasOwnProperty('image')) {
      checkServerError(error);
      dispatch({ type: c.USER_ADD_PHOTO_RESET });
    }

    if (
      error &&
      error.response !== undefined &&
      error.response.data !== undefined &&
      error.response.data.image !== undefined
    ) {
      getFieldErrorFromServer(error, 'image');
      Alert.alert(`An Error has occurred`, error.response.data.image[0], [
        {
          text: 'OK',
        },
      ]);
      dispatch({ type: c.USER_ADD_PHOTO_RESET });
    }

    if (data) {
      props.navigation.navigate('Swipe');
      dispatch({ type: c.USER_ADD_PHOTO_RESET });
    }
  }, [error, data]);

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const handleAddPhoto = () => {
    dispatch(addPhoto(image));
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View>
        <Header />
        <View styles={styles.titleContainer}>
          <Text style={styles.title}>Upload your first photo!</Text>
        </View>
      </View>
      <View style={{ width: '100%', alignSelf: 'center' }}>
        <ImageSelector onImageTaken={imageTakenHandler} />
      </View>
      <View style={styles.buttonContainer}>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.icons} />
          </View>
        ) : (
          <>
            <Button title="Skip" color={Colors.white} />
            <AuthButton text="Continue" onPress={handleAddPhoto} />
          </>
        )}
      </View>
    </View>
  );
};

export default AddProfilePhotoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bg,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: Colors.white,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 10,
    width: '65%',
    alignItems: 'center',
  },
});
