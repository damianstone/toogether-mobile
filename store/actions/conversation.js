import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as c from '../../constants/conversation';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

// -------------------------------- CHAT --------------------------------
export const listMyConversations = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_CONVERSATIONS_REQUEST });

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
        type: c.LIST_CONVERSATIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_CONVERSATIONS_FAIL,
        payload: error,
      });
    }
  };
};

export const listConversationMessages = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_CONVERSATION_MESSAGES_REQUEST });

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
        type: c.LIST_CONVERSATION_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_CONVERSATION_MESSAGES_FAIL,
        payload: error,
      });
    }
  };
};
export const deleteConversation = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.DELETE_CONVERSATION_REQUEST });

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
        type: c.DELETE_CONVERSATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.DELETE_CONVERSATION_FAIL,
        payload: error,
      });
    }
  };
};

export const createConversation = (matchId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.CREATE_CONVERSATION_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/conversations/${matchId}/start/`,
        headers: config,
      });

      dispatch({
        type: c.CREATE_CONVERSATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.CREATE_CONVERSATION_FAIL,
        payload: error,
      });
    }
  };
};
