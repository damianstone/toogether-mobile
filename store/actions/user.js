import axios from 'axios';
import * as c from '../../constants/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userRegister = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REGISTER_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/users/register/',
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
        url: 'http://127.0.0.1:8000/api/users/login/',
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

export const logout = (name, email) => {};

export const createUserProfile = (
  firstname,
  lastname,
  university,
  birthdate,
  gender,
  show_me,
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
        url: `http://127.0.0.1:8000/api/users/profiles/profile/${userData.id}/create-profile/`,
        headers: config,
        data: {
          firstname: firstname,
          lastname: lastname,
          birthdate: birthdate,
          gender: gender,
          show_me: show_me,
          university: university ? university : null,
          description: description ? description : null,
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

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/users/profiles/upload/',
        headers: config,
        data: {
          image: image,
        },
      });

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

// UPDATE USER PROFILE
export const updateUserProfile = () => {};

// GET USER -> get the user for the user profile
export const getUserDetails = () => {};

// DELETE ACCOUNT
export const deleteUser = () => {};
