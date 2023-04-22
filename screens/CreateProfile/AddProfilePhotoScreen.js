import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import ButtonAndroid from '../../components/UI/ButtonAndroid';
import AuthButton from '../../components/UI/AuthButton';
import ImageSelector from '../../components/UI/ImageSelector';
import Colors from '../../constants/Colors';
import * as c from '../../constants/requestTypes/user';
import { addPhoto } from '../../store/actions/user';
import { authenticate } from '../../store/actions/auth';
import { check400Error, checkServerError } from '../../utils/errors';

import * as authStyles from '../Auth/styles';

const AddProfilePhotoScreen = (props) => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const userAddPhotoReducer = useSelector((state) => state.userAddPhoto);
  const { error, loading, data } = userAddPhotoReducer;
  useEffect(() => {
    if (error) {
      if (error.response.status === 400) {
        check400Error(error, 'image');
      } else {
        checkServerError(error);
      }
    }

    if (data) {
      props.navigation.navigate('Swipe');
    }

    dispatch({ type: c.USER_ADD_PHOTO_RESET });
  }, [error, data]);

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const handleSkip = () => {
    Alert.alert(
      `You sure you want to continue without a photo`,
      'A pic worth more than 1000 words ;)',
      [
        {
          text: 'Later',
          onPress: () => {
            dispatch(authenticate(true));
          },
          style: 'cancel',
        },
        {
          text: 'Add photo',
        },
      ]
    );
  };

  const handleAddPhoto = () => {
    if (image && image.uri) {
      dispatch(addPhoto(image));
    }
    if (!image || !image.uri) {
      Alert.alert(
        `You have not upload any photo`,
        'Choose one from your gallery',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.screen}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <StatusBar style="light" />
      <View style={styles.auth_text_view}>
        <View style={authStyles.default.auth_text_container}>
          <Text style={authStyles.default.auth_text_big}>
            Lets upload your first photo
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
            {Platform.OS === 'ios' ? (
              <Button title="Skip" color={Colors.white} onPress={handleSkip} />
            ) : (
              <ButtonAndroid title="Skip" onPress={handleSkip} />
            )}
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
    marginTop: Platform.OS === 'ios' ? 80 : 40,
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
