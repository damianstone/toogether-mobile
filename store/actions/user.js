import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as c from '../../constants/user';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = Constants.manifest.extra.LOCAL_URL;

export const userRegister = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REGISTER_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/users/register/`,
        headers: config,
        data: {
          email: email,
          password: password,
          repeated_password: repeated_password,
        },
      });

      await AsyncStorage.setItem(
        '@userData',
        JSON.stringify({
          id: data.id,
          token: data.token,
          has_account: data.has_account,
        })
      );

      dispatch({
        type: c.USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log('ERROR ACTION');
      dispatch({
        type: c.USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };
};

export const userLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_LOGIN_REQUEST });

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/users/login/`,
        headers: config,
        data: {
          email: email,
          password: password,
        },
      });

      await AsyncStorage.setItem(
        '@userData',
        JSON.stringify({
          id: data.id,
          token: data.token,
          has_account: data.has_account,
        })
      );

      dispatch({
        type: c.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_LOGIN_FAIL,
        payload: error,
      });
    }
  };
};

export const logout = (name, email) => {
  return async (dispatch) => {
    // TODO: remove data from localstorage
    // TODO: dispatch reset all the status
  };
};

export const createUserProfile = (
  firstname,
  lastname,
  birthdate,
  gender,
  show_me,
  university,
  description
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_CREATE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/${userData.id}/actions/create-profile/`,
        headers: config,
        data: {
          firstname: 'DAMIAN',
          lastname: 'STONE',
          birthdate: '2000-12-12',
          gender: 'male',
          show_me: 'women',
          university: 'bristol',
          description: 'x',

          // firstname: firstname,
          // lastname: lastname,
          // birthdate: birthdate,
          // gender: gender,
          // show_me: show_me,
          // university: university ? university : null,
          // description: description ? description : null,
        },
      });

      dispatch({
        type: c.USER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_CREATE_FAIL,
        payload: error,
      });
    }
  };
};

export const addPhoto = (image) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_ADD_PHOTO_REQUEST });
      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));
      const imageUri = image.uri;
      const fileName = imageUri.split('/').pop();

      const dataForm = new FormData();

      dataForm.append('image', {
        name: fileName,
        type: image.type,
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
      });

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/photos/`,
        dataForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + userData.token,
          },
        }
      );
      dispatch({
        type: c.USER_ADD_PHOTO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log({ ...error });
      dispatch({
        type: c.USER_ADD_PHOTO_FAIL,
        payload: error,
      });
    }
  };
};

export const deleteUserPhoto = () => {};

export const getUserPhotos = () => {};

export const blockUser = () => {};

export const disblockUser = () => {};

// UPDATE USER PROFILE
export const updateUserProfile = () => {};

// GET USER -> get any profile
export const getUserDetails = () => {};

// DELETE ACCOUNT
export const deleteUser = () => {};
