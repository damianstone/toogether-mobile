import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as c from '../../constants/chat';
import { ENV } from '../../environment';
import chats from '../../data/chats.json';

const BASE_URL = ENV.API_URL;

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

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/conversations/`,
        headers: config,
      });

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

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/conversations/${id}/messages/`,
        headers: config,
      });

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
        url: `${BASE_URL}/api/v1/conversations/${id}`,
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

export const createChat = (matchId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.CREATE_CHAT_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/conversations/${id}/start/`,
        headers: config,
      });

      dispatch({
        type: c.CREATE_CHAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.CREATE_CHAT_FAIL,
        payload: error,
      });
    }
  };
};
