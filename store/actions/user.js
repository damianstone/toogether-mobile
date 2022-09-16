import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as c from '../../constants/user';

const BASE_URL = Constants.manifest.extra.LOCAL_URL;

// -------------------------------- LOGIN / REGISTER ACTIONS --------------------------------

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
          email,
          password,
          repeated_password,
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
          email,
          password,
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

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('@userData');

      dispatch({ type: c.USER_LOGIN_RESET });
      dispatch({ type: c.USER_LIST_PHOTOS_RESET });
      dispatch({ type: c.USER_GET_PROFILE_RESET });
    } catch (e) {
      console.log(e);
    }
  };
};

// -------------------------------- PROFILE ACTIONS --------------------------------

// GET USER -> get any profile
export const getUserProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_GET_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/profiles/${userData.id}/`,
        headers: config,
      });

      dispatch({
        type: c.USER_GET_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_GET_PROFILE_FAIL,
        payload: error,
      });
    }
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
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/${userData.id}/actions/create-profile/`,
        headers: config,
        data: {
          firstname,
          lastname,
          birthdate,
          gender,
          show_me,
          university: university || null,
          description: description || null,
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

// UPDATE USER PROFILE
export const updateUserProfile = (
  gender,
  show_me,
  university,
  city,
  description
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_UPDATE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'PATCH',
        url: `${BASE_URL}/api/v1/profiles/${userData.id}/actions/update-profile/`,
        headers: config,
        data: {
          gender,
          show_me,
          university: university || null,
          city: city || null,
          description: description || null,
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
        type: c.USER_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({ type: c.USER_UPDATE_PHOTO_RESET });
    } catch (error) {
      dispatch({
        type: c.USER_UPDATE_FAIL,
        payload: error,
      });
    }
  };
};

// GET USER -> get any profile
export const getUserDetails = () => {};

// DELETE ACCOUNT
export const deleteUser = () => {};

// -------------------------------- PHOTOS ACTIONS --------------------------------

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
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      dispatch({
        type: c.USER_ADD_PHOTO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_ADD_PHOTO_FAIL,
        payload: error,
      });
    }
  };
};

export const updatePhoto = (photo_id, image) => {
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

      const { data } = await axios.patch(
        `${BASE_URL}/api/v1/photos/${photo_id}/`,
        dataForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      dispatch({
        type: c.USER_ADD_PHOTO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_ADD_PHOTO_FAIL,
        payload: error,
      });
    }
  };
};

export const removeUserPhoto = (photo_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REMOVE_PHOTO_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/photos/${photo_id}/`,
        headers: config,
      });

      dispatch({
        type: c.USER_REMOVE_PHOTO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_REMOVE_PHOTO_FAIL,
        payload: error,
      });
    }
  };
};

export const listUserPhotos = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_LIST_PHOTOS_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/photos/`,
        headers: config,
      });

      dispatch({
        type: c.USER_LIST_PHOTOS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_LIST_PHOTOS_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- BLOCK ACTIONS --------------------------------
export const blockUser = () => {};

export const disblockUser = () => {};
