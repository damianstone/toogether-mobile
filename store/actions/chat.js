import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as c from '../../constants/chat';
import { ENV } from '../../environment';
import chats from '../../data/chats.json';

const BASE_URL = ENV.API_URL;
//CHAT TEST
export const getReceiverProfile = (profile_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.GET_RECEIVER_PROFILE_REQUEST });
      let id;

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };
      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/profiles/${profile_id}/`,
        headers: config,
      });

      dispatch({
        type: c.GET_RECEIVER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.GET_RECEIVER_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- CHAT --------------------------------
export const listChats = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_CHATS_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      /* const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/chats/`,
        headers: config,
      }); */
      const data = chats;

      dispatch({
        type: c.LIST_CHATS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_CHATS_FAIL,
        payload: error,
      });
    }
  };
};

export const getChat = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.GET_CHAT_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      /* const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/chats/${id}`,
        headers: config,
      }); */

      const data = chats.results.find((chat) => chat.id === id);
      dispatch({
        type: c.GET_CHAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.GET_CHAT_FAIL,
        payload: error,
      });
    }
  };
};
export const deleteChat = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.DELETE_CHAT_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/chats/${id}`,
        headers: config,
      });

      dispatch({
        type: c.DELETE_CHAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.DELETE_CHAT_FAIL,
        payload: error,
      });
    }
  };
};
