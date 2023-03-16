import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';
import * as c from '../../constants/user';
import getEnvVars from '../../environment';

const { API_URL: BASE_URL } = getEnvVars();

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
      // If you are getting stuck and not getting location (on Android uncomment this to get default location so that you can continue working)
      // let location;
      // if (Platform.OS === 'ios') {
      //   location = await Location.getCurrentPositionAsync({
      //     accuracy: Platform.OS === 'ios' ? 3 : Location.Accuracy.Highest,
      //   });
      // } else {
      //   location = {
      //     coords: {
      //       latitude: 37.785834,
      //       longitude: -122.406417,
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

      await AsyncStorage.setItem(
        '@userData',
        JSON.stringify({
          id: data.id,
          token: data.token,
          access_token: data.access,
          refresh_token: data.refresh,
          has_account: data.has_account,
        })
      );

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

// -------------------------------- LOGIN / REGISTER ACTIONS --------------------------------

export const authenticate = (userDataObj) => {
  return (dispatch) => {
    dispatch({ type: c.AUTHENTICATE, payload: userDataObj });
  };
};

export const userRegister = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REGISTER_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/`,
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

export const updateToken = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.REFRESH_TOKEN_REQUEST });
      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/token/refresh/`,
        headers: config,
        data: {
          refresh: userData.refresh_token,
        },
      });

      await AsyncStorage.setItem(
        '@userData',
        JSON.stringify({
          ...userData,
          token: data.token,
          access_token: data.access.token,
          refresh_token: data.refresh,
        })
      );
      dispatch({ type: c.REFRESH_TOKEN_SUCCESS, payload: data });
    } catch (error) {
      logout();
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

      await AsyncStorage.removeItem('@userData');
      dispatch({ type: c.USER_LOGIN_RESET });
      dispatch({ type: c.USER_LIST_PHOTOS_RESET });
      dispatch({ type: c.USER_GET_PROFILE_RESET });

      dispatch({ type: c.USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: c.USER_DELETE_FAIL, payload: error });
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
          ...userData,
          token: data.token,
          access_token: data.access,
          has_account: data.has_account,
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
          ...userData,
          has_account: data.has_account, // after crerate has_account is true
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
