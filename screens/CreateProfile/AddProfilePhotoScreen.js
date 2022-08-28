import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto } from '../../store/actions/user';
import { check400Error, checkServerError } from '../../utils/errors';
import * as c from '../../constants/user';

import Colors from '../../constants/Colors';
import * as authStyles from '../Auth/styles';
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
    // console.log({ ...error });

    console.log(data);

    if (error && error.response.status !== 400) {
      checkServerError(error);
      dispatch({ type: c.USER_ADD_PHOTO_RESET });
    }

    if (error && error.response.status === 400) {
      check400Error(error, 'image');
      dispatch({ type: c.USER_ADD_PHOTO_RESET });
    }

    if (data) {
      props.navigation.navigate('Swipe');
      dispatch({ type: c.USER_ADD_PHOTO_RESET });
    }

    dispatch({ type: c.USER_ADD_PHOTO_RESET });
  }, [error, data]);

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const handleAddPhoto = () => {
    dispatch(addPhoto(image));
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.screen}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <StatusBar style="light" />
      <View style={styles.auth_text_view}>
        <View style={authStyles.default.auth_text_container}>
          <Text style={authStyles.default.auth_text_big}>
            Let's upload your first photo
          </Text>
        </View>
        <View style={authStyles.default.auth_text_container}>
          <Text style={authStyles.default.auth_text_small}>
            You can change your data any time after
          </Text>
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
    </ScrollView>
  );
};

export default AddProfilePhotoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  scroll: {
    backgroundColor: Colors.bg,
  },
  auth_text_view: {
    marginTop: 80,
    marginBottom: 5,
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
    flexDirection: 'column',
    justifyContent: 'center',
    width: '65%',
    alignItems: 'center',

    marginBottom: 30,
  },
});
