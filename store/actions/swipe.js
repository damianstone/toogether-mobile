import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as w from '../../constants/swipe';

const BASE_URL = Constants.manifest.extra.LOCAL_URL;

export const listSwipe = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.LIST_SWIPE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/swipe/`,
        headers: config,
      });

      dispatch({
        type: w.LIST_SWIPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.LIST_SWIPE_FAIL,
        payload: error,
      });
    }
  };
};

// get the current swipe profile that could be as a single profile or a group (show preview porpuses)
export const getCurrentSwipeProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.GET_CURRENT_SWIPE_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/swipe/actions/get-swipe-profile/`,
        headers: config,
      });

      dispatch({
        type: w.GET_CURRENT_SWIPE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.GET_CURRENT_SWIPE_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};
