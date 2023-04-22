import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as b from '../../constants/requestTypes/block';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

export const listBlockedProfiles = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: b.LIST_BLOCKED_PROFILES_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/profiles/actions/get-blocked-profiles/`,
        headers: config,
      });

      dispatch({
        type: b.LIST_BLOCKED_PROFILES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: b.LIST_BLOCKED_PROFILES_FAIL,
        payload: error,
      });
    }
  };
};

export const blockProfile = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: b.BLOCK_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/${id}/actions/block-profile/`,
        headers: config,
      });

      dispatch({
        type: b.BLOCK_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: b.BLOCK_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};

export const unBlockProfile = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: b.DISBLOCK_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/${id}/actions/disblock-profile/`,
        headers: config,
      });

      dispatch({
        type: b.DISBLOCK_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: b.DISBLOCK_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};
