import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import * as c from '../../constants/requestTypes/user';
import * as a from '../../constants/requestTypes/auth';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

export const authenticate = (flag) => {
  return (dispatch) => {
    dispatch({
      type: a.AUTHENTICATE,
      payload: {
        isAuth: flag,
      },
    });
  };
};

export const setDidTryLogin = (flag) => {
  return (dispatch) => {
    dispatch({
      type: a.SET_DID_TRY_LOGIN,
      payload: { didTryLogin: flag },
    });
  };
};

export const refreshToken = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: a.REFRESH_TOKEN_REQUEST });
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
          token: data.access,
          refresh_token: data.refresh,
        })
      );

      dispatch({ type: a.REFRESH_TOKEN_SUCCESS, payload: data });
    } catch (error) {
      dispatch(logout());
    }
  };
};

export const register = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: a.USER_REGISTER_REQUEST });

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
          refresh_token: data.refresh_token,
        })
      );

      dispatch({
        type: a.USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: a.USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: a.USER_LOGIN_REQUEST });

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
          refresh_token: data.refresh_token,
        })
      );

      dispatch({
        type: a.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: a.USER_LOGIN_FAIL,
        payload: error,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('@userData');
      dispatch({ type: a.USER_LOGIN_RESET });
      dispatch({
        type: a.AUTHENTICATE,
        payload: { isAuth: false },
      });

      dispatch({ type: c.USER_LIST_PHOTOS_RESET });
      dispatch({ type: c.USER_GET_PROFILE_RESET });
    } catch (e) {
      console.log(e);
    }
  };
};
