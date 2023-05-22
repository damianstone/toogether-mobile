import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';

import { logout } from './auth';
import * as c from '../../constants/requestTypes/user';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

// -------------------------------- LOCATION --------------------------------

export const userLocation = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_LOCATION_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      let location = await Location.getCurrentPositionAsync({
        accuracy: Platform.OS === 'ios' ? 3 : Location.Accuracy.High,
      });

      // let location;
      // if (Platform.OS === 'ios') {
      //   location = await Location.getCurrentPositionAsync({
      //     accuracy: Platform.OS === 'ios' ? 3 : Location.Accuracy.Highest,
      //   });
      // } else {
      //   location = {
      //     coords: {
      //       latitude: 37.4220936,
      //       longitude: -122.083922,
      //     },
      //   };
      // }

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/actions/location/`,
        headers: config,
        data: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        },
      });

      dispatch({
        type: c.USER_LOCATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_LOCATION_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- PROFILE ACTIONS --------------------------------

export const getUserProfile = (profile_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_GET_PROFILE_REQUEST });

      let id;

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

      await AsyncStorage.setItem(
        '@userData',
        JSON.stringify({
          id: data.id,
          token: data.token,
          has_account: data.has_account,
          refresh_token: data.refresh_token,
        })
      );

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
  name,
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
        url: `${BASE_URL}/api/v1/profiles/actions/create-profile/`,
        headers: config,
        data: {
          name,
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
          refresh_token: data.refresh_token,
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

export const updateUserProfile = (dataObj) => {
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
        method: 'put',
        url: `${BASE_URL}/api/v1/profiles/${userData.id}/`,
        headers: config,
        data: dataObj,
      });

      dispatch({
        type: c.USER_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: c.USER_UPDATE_RESET });
    } catch (error) {
      dispatch({
        type: c.USER_UPDATE_FAIL,
        payload: error,
      });
    }
  };
};

export const userDelete = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_DELETE_REQUEST });
      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/profiles/${userData.id}/`,
        headers: config,
      });

      dispatch({
        type: c.USER_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: c.USER_DELETE_FAIL, payload: error });
    }
  };
};

// -------------------------------- PHOTOS ACTIONS --------------------------------

export const addPhoto = (image) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_ADD_PHOTO_REQUEST });
      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));
      const imageUri = image.uri;
      const fileName = imageUri.split('/').pop();
      const fileType = fileName.split('.')[1];

      const dataForm = new FormData();

      dataForm.append('image', {
        name: fileName,
        type: Platform.OS === 'ios' ? image.type : 'image/' + fileType,
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
      const fileType = fileName.split('.')[1];

      const dataForm = new FormData();

      dataForm.append('image', {
        name: fileName,
        type: Platform.OS === 'ios' ? image.type : 'image/' + fileType,
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

// -------------------------------- REPORT ACTION --------------------------------

export const reportProfile = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.REPORT_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/${id}/actions/report-profile/`,
        headers: config,
      });

      dispatch({
        type: c.REPORT_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.REPORT_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};

export const sendRecoveryCode = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.RECOVER_CODE_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/users/recovery-code/`,
        headers: config,
        data: {
          email,
        },
      });

      dispatch({
        type: c.RECOVERY_CODE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.RECOVERY_CODE_FAIL,
        payload: error,
      });
    }
  };
};

export const validateCode = (email, code) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.VALIDATE_CODE_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/users/validate-code/`,
        headers: config,
        data: {
          email,
          code,
        },
      });

      dispatch({
        type: c.VALIDATE_CODE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.VALIDATE_CODE_FAIL,
        payload: error,
      });
    }
  };
};

export const changePassword = (email, password, repeated_password, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.CHANGE_PASSWORD_REQUEST });

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/actions/reset-password/`,
        headers: config,
        data: {
          email,
          password,
          repeated_password,
        },
      });

      dispatch({
        type: c.CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });

      dispatch({ type: c.CHANGE_PASSWORD_RESET });
    } catch (error) {
      dispatch({
        type: c.CHANGE_PASSWORD_FAIL,
        payload: error,
      });
    }
  };
};
